import React from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';
import { PianoKey } from './types';
import { PianoTheme } from './themes';

interface StatisticsBoardProps {
  /** Currently pressed notes with their key information */
  pressedNotes: Map<string, PianoKey>;
  /** The most recently pressed note */
  currentNote: PianoKey | null;
  /** Piano theme for consistent styling */
  pianoTheme: PianoTheme;
}

const BoardContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  background: pianoTheme.container.background,
  color: '#ffffff',
  padding: theme.spacing(2, 3),
  borderRadius: 0,
  borderTopLeftRadius: theme.spacing(1),
  borderTopRightRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  minHeight: '80px',
  boxShadow: 'none',
  border: pianoTheme.container.border,
  borderBottom: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.beforeBackground || 'transparent',
    pointerEvents: 'none',
    opacity: 0.6,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.afterBackground || 'transparent',
    pointerEvents: 'none',
    zIndex: 2,
  },
}));

const CurrentNoteDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '100px',
  padding: theme.spacing(1),
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  paddingRight: theme.spacing(3),
  position: 'relative',
  zIndex: 3,
}));

const NoteText = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#ff6b35',
  lineHeight: 1,
  marginBottom: '4px',
});

const KeyText = styled(Typography)({
  fontSize: '1.2rem',
  color: '#aaa',
  fontFamily: 'monospace',
});

const PressedKeysDisplay = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  position: 'relative',
  zIndex: 3,
}));

const PressedKeysText = styled(Typography)({
  fontSize: '1.5rem',
  fontFamily: 'monospace',
  color: '#ffffff',
  letterSpacing: '2px',
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
});

const Label = styled(Typography)({
  fontSize: '0.75rem',
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

export const StatisticsBoard: React.FC<StatisticsBoardProps> = ({
  pressedNotes,
  currentNote,
  pianoTheme,
}) => {
  // Get the keyboard keys being pressed, sorted by order
  const pressedKeyboardKeys = Array.from(pressedNotes.values())
    .map(key => key.keyboardKey)
    .join('');

  return (
    <BoardContainer elevation={0} pianoTheme={pianoTheme}>
      {/* Current Note Display */}
      <CurrentNoteDisplay>
        <NoteText variant="h3">
          {currentNote ? currentNote.note : '—'}
        </NoteText>
        <KeyText variant="body1">
          {currentNote ? currentNote.keyboardKey : ' '}
        </KeyText>
      </CurrentNoteDisplay>

      {/* Pressed Keys Display */}
      <PressedKeysDisplay>
        <Label variant="caption">Pressed Keys</Label>
        <PressedKeysText variant="h6">
          {pressedKeyboardKeys || 'Press any key...'}
        </PressedKeysText>
      </PressedKeysDisplay>
    </BoardContainer>
  );
};
