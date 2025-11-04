import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Measure } from './types';
import { PianoTheme } from '../themes';

interface SheetNotationDisplayProps {
  measures: Measure[];
  currentMeasure: number;
  currentNoteIndex: number;
  isPlaying: boolean;
  pianoTheme: PianoTheme;
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
}) => {
  // Convert measures into flat tokens with position tracking
  const tokens = useMemo(() => {
    const result: NoteToken[] = [];
    measures.forEach((measure, measureIdx) => {
      measure.notes.forEach((note, noteIdx) => {
        result.push({
          text: (note.originalNotation || note.key) + ' ',
          measureIndex: measureIdx,
          noteIndex: noteIdx,
          isMeasureSeparator: false,
        });
      });
      // Add measure separator
      result.push({
        text: '| ',
        measureIndex: measureIdx,
        noteIndex: -1,
        isMeasureSeparator: true,
      });
    });
    return result;
  }, [measures]);

  // Divide tokens into lines based on character count
  const lines = useMemo(() => {
    const maxCharsPerLine = 80; // Adjust this value for desired line length
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

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'hidden',
        fontFamily: 'monospace',
        fontSize: { xs: '0.85rem', md: '1rem' },
        lineHeight: 1.8,
        color: 'text.primary',
      }}
    >
      {lines.map((line, lineIdx) => (
        <Box
          key={lineIdx}
          sx={{
            mb: 0.5,
            px: 0.5,
            py: 0.25,
          }}
        >
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
