import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import { Measure } from './types';
import { PianoTheme } from '../themes';
import { useAppConfig } from '#imports';

interface SheetNotationDisplayProps {
  measures: Measure[];
  currentMeasure: number;
  currentNoteIndex: number;
  isPlaying: boolean;
  pianoTheme: PianoTheme;
  lineRange?: { start: number; end: number };
}

interface NoteToken {
  text: string;
  measureIndex: number;
  noteIndex: number;
  isMeasureSeparator: boolean;
}

/**
 * Displays sheet music notation with highlighted current measure and note
 * Divides content into lines based on character count for consistency
 */
export const SheetNotationDisplay: React.FC<SheetNotationDisplayProps> = ({
  measures,
  currentMeasure,
  currentNoteIndex,
  isPlaying,
  pianoTheme,
  lineRange,
}) => {
  const appConfig = useAppConfig();

  // Convert measures into flat tokens with position tracking
  const tokens = useMemo(() => {
    const result: NoteToken[] = [];
    measures.forEach((measure, measureIdx) => {
      measure.notes.forEach((note, noteIdx) => {
        result.push({
          text: (note.originalNotation || note.key) + ' ',
          measureIndex: measureIdx,
          noteIndex: noteIdx,
          isMeasureSeparator: note.originalNotation === '|',
        });
      });
    });
    return result;
  }, [measures]);

  // Divide tokens into lines based on character count
  const lines = useMemo(() => {
    const maxCharsPerLine = appConfig.musicStand.musicSheet.maxCharsPerLine;
    const result: NoteToken[][] = [];
    let currentLine: NoteToken[] = [];
    let currentLength = 0;

    tokens.forEach((token) => {
      const tokenLength = token.text.length;
      
      // If adding this token would exceed the limit and we have content, start new line
      if (currentLength + tokenLength > maxCharsPerLine && currentLine.length > 0) {
        result.push(currentLine);
        currentLine = [];
        currentLength = 0;
      }
      
      currentLine.push(token);
      currentLength += tokenLength;
    });

    // Add the last line if it has content
    if (currentLine.length > 0) {
      result.push(currentLine);
    }

    return result;
  }, [tokens]);

  // Filter lines based on lineRange (for line-based pagination)
  const displayLines = useMemo(() => {
    if (!lineRange) {
      return lines;
    }
    return lines.slice(lineRange.start, lineRange.end);
  }, [lines, lineRange]);

  const currentLineIndex = useMemo(() => {
    if (!isPlaying) return -1;
    return displayLines.findIndex(line => 
      line.some(token => 
        token.measureIndex === currentMeasure && 
        token.noteIndex === currentNoteIndex
      )
    );
  }, [displayLines, isPlaying, currentMeasure, currentNoteIndex]);

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'hidden',
        fontFamily: 'monospace',
        fontSize: { xs: '0.85rem', md: '1rem' },
        lineHeight: 1.8,
        color: 'text.primary',
        '@keyframes glow': {
          '0%': {
            textShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          },
          '50%': {
            textShadow: `0 0 10px ${pianoTheme.colors.accent}`,
          },
          '100%': {
            textShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          },
        },
        '@keyframes bounce': {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '60%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      }}
    >
      {displayLines.map((line, lineIdx) => (
        <Box
          key={lineIdx}
          sx={{
            position: 'relative',
            mb: 0.5,
            px: 0.5,
            py: 0.25,
          }}
        >          
          {lineIdx === currentLineIndex && (
            <ArrowRightIcon 
              sx={{ 
                position: 'absolute',
                left: theme => theme.spacing(1.5),
                fontSize: '1.5rem',
                animation: 'bounce 0.5s ease-out',
              }} 
            />
          )}
          {line.map((token, tokenIdx) => {
            const isCurrentNote =
              isPlaying &&
              token.measureIndex === currentMeasure &&
              token.noteIndex === currentNoteIndex;

            return (
              <span
                key={`${lineIdx}-${tokenIdx}`}
                style={{
                  fontWeight: isCurrentNote ? 'bold' : 'normal',
                  color: isCurrentNote ? pianoTheme.colors.accent : 'inherit',
                  opacity: token.isMeasureSeparator ? 0.5 : 1,
                  animation: isCurrentNote ? 'glow 1s infinite' : 'none',
                }}
              >
                {token.text}
              </span>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
