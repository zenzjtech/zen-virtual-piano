import React from 'react';
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

/**
 * Displays sheet music notation with highlighted current measure and note
 */
export const SheetNotationDisplay: React.FC<SheetNotationDisplayProps> = ({
  measures,
  currentMeasure,
  currentNoteIndex,
  isPlaying,
  pianoTheme,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: { xs: '0.85rem', md: '1rem' },
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
        color: 'text.primary',
      }}
    >
      {measures.map((measure, idx) => (
        <Box
          key={idx}
          sx={{
            mb: 1,
            backgroundColor:
              isPlaying && idx === currentMeasure
                ? 'rgba(255, 193, 7, 0.2)'
                : 'transparent',
            px: 0.5,
            py: 0.25,
            borderRadius: 0.5,
            transition: 'background-color 0.2s',
          }}
        >
          {measure.notes.map((note, noteIdx) => (
            <span
              key={noteIdx}
              style={{
                fontWeight:
                  isPlaying &&
                  idx === currentMeasure &&
                  noteIdx === currentNoteIndex
                    ? 'bold'
                    : 'normal',
                color:
                  isPlaying &&
                  idx === currentMeasure &&
                  noteIdx === currentNoteIndex
                    ? pianoTheme.colors.accent
                    : 'inherit',
              }}
            >
              {note.originalNotation || note.key}{' '}
            </span>
          ))}
          {' | '}
        </Box>
      ))}
    </Box>
  );
};
