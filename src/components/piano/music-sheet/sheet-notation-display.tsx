import React, { useMemo } from 'react';
import { Box, alpha } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import { Measure } from './types';
import { PianoTheme } from '../themes';
import { useAppConfig } from '#imports';
import { getMusicSheetThemeColors } from './music-sheet-theme-colors';

interface SheetNotationDisplayProps {
  measures: Measure[];
  currentMeasure: number;
  currentNoteIndex: number;
  isPlaying: boolean;
  pianoTheme: PianoTheme;
  musicSheetThemeId: string;
  lineRange?: { start: number; end: number };
}

interface NoteToken {
  text: string;
  measureIndex: number;
  noteIndex: number;
  isMeasureSeparator: boolean;
  globalIndex: number;
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
  musicSheetThemeId,
  lineRange,
}) => {
  const appConfig = useAppConfig();
  const themeColors = getMusicSheetThemeColors(musicSheetThemeId);

  // Convert measures into flat tokens with position tracking
  const tokens = useMemo(() => {
    const result: NoteToken[] = [];
    let globalIdx = 0;
    measures.forEach((measure, measureIdx) => {
      measure.notes.forEach((note, noteIdx) => {
        result.push({
          text: (note.originalNotation || note.key) + ' ',
          measureIndex: measureIdx,
          noteIndex: noteIdx,
          isMeasureSeparator: note.originalNotation === '|',
          globalIndex: globalIdx++,
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

  const currentTokenGlobalIndex = useMemo(() => {
    if (!isPlaying) return -1;
    const token = tokens.find(token => 
      token.measureIndex === currentMeasure && 
      token.noteIndex === currentNoteIndex
    );
    return token ? token.globalIndex : -1;
  }, [tokens, isPlaying, currentMeasure, currentNoteIndex]);

  const currentLineIndex = useMemo(() => {
    if (currentTokenGlobalIndex === -1) return -1;
    return lines.findIndex(line => 
      line.some(token => token.globalIndex === currentTokenGlobalIndex)
    );
  }, [lines, currentTokenGlobalIndex]);

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'hidden',
        fontFamily: themeColors.notationFont,
        fontSize: { xs: '0.85rem', md: '1rem' },
        lineHeight: 1.8,
        color: themeColors.primary,
        '@keyframes glow': {
          '0%': {
            textShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          },
          '50%': {
            textShadow: `0 0 10px ${themeColors.accent}`,
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
            borderRadius: 1,
            transition: 'background-color 0.3s ease-in-out',
            backgroundColor: lineIdx + (lineRange?.start ?? 0) === currentLineIndex ? `rgba(${themeColors.shadow}, 0.15)` : 'transparent',
          }}
        >          
          {lineIdx + (lineRange?.start ?? 0) === currentLineIndex && (
            <ArrowRightIcon 
              sx={{ 
                position: 'absolute',
                left: theme => theme.spacing(1.5),
                fontSize: '1.5rem',
                color: themeColors.accent,
                animation: 'bounce 0.5s ease-out',
              }} 
            />
          )}
          {line.map((token, tokenIdx) => {
            const isCurrentNote = token.globalIndex === currentTokenGlobalIndex;

            return (
              <span
                key={`${lineIdx}-${tokenIdx}`}
                style={{
                  fontWeight: isCurrentNote ? 'bold' : 'normal',
                  color: isCurrentNote ? themeColors.accent : 'inherit',
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
