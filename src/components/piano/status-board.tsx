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
  color: pianoTheme.colors.primary,
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

const CurrentNoteDisplay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '100px',
  padding: theme.spacing(1),
  borderRight: `1px solid ${pianoTheme.colors.border}`,
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

const KeyText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '1.2rem',
  color: pianoTheme.colors.secondary,
  fontFamily: 'monospace',
}));

const PressedKeysDisplay = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  position: 'relative',
  zIndex: 3,
}));

const PressedKeysText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '1.5rem',
  fontFamily: 'monospace',
  color: pianoTheme.colors.primary,
  letterSpacing: '2px',
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
}));

const Label = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '0.75rem',
  color: pianoTheme.colors.secondary,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  opacity: 0.8,
}));

const CornerPlate = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cornerPosition' && prop !== 'pianoTheme',
})<{ cornerPosition: 'topLeft' | 'topRight'; pianoTheme: PianoTheme }>(({ theme, cornerPosition, pianoTheme }) => {
  const positions = {
    topLeft: { top: theme.spacing(1), left: theme.spacing(1) },
    topRight: { top: theme.spacing(1), right: theme.spacing(1) },
  };

  const cornerStyle = pianoTheme.cornerPlates || {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
  };

  return {
    position: 'absolute',
    ...positions[cornerPosition],
    width: '15px',
    height: '15px',
    background: cornerStyle.background,
    border: cornerStyle.border,
    borderRadius: '50%',
    boxShadow: cornerStyle.boxShadow,
    zIndex: 4,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2) rotate(15deg)',
      boxShadow: `${cornerStyle.boxShadow}, 0 0 12px rgba(212, 175, 55, 0.6)`,
    },
    '&:active': {
      transform: 'scale(0.95) rotate(-5deg)',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '2px',
      right: '2px',
      bottom: '2px',
      border: '1px solid rgba(184, 148, 30, 0.6)',
      borderRadius: '50%',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '4px',
      height: '4px',
      background: 'radial-gradient(circle, #8B7355 0%, #6B5A3C 100%)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.5)',
    },
  };
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
      {/* Decorative Corner Plates */}
      {pianoTheme.cornerPlates && (
        <>
          <CornerPlate cornerPosition="topLeft" pianoTheme={pianoTheme} />
          <CornerPlate cornerPosition="topRight" pianoTheme={pianoTheme} />
        </>
      )}
      
      {/* Current Note Display */}
      <CurrentNoteDisplay pianoTheme={pianoTheme}>
        <NoteText variant="h3">
          {currentNote ? currentNote.note : '—'}
        </NoteText>
        <KeyText variant="body1" pianoTheme={pianoTheme}>
          {currentNote ? currentNote.keyboardKey : ' '}
        </KeyText>
      </CurrentNoteDisplay>

      {/* Pressed Keys Display */}
      <PressedKeysDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>Pressed Keys</Label>
        <PressedKeysText variant="h6" pianoTheme={pianoTheme}>
          {pressedKeyboardKeys || 'Press any key...'}
        </PressedKeysText>
      </PressedKeysDisplay>
    </BoardContainer>
  );
};
