import React, { useState, useEffect } from 'react';
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
  height: '80px',
  // Enhanced realistic box shadow with multiple layers
  boxShadow: `
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2),
    inset 2px 0 4px rgba(0, 0, 0, 0.15),
    inset -2px 0 4px rgba(0, 0, 0, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.3)
  `,
  border: pianoTheme.container.border,
  borderBottom: 'none',
  position: 'relative',
  overflow: 'hidden',
  // Top edge highlight (beveled edge effect)
  borderTop: `1px solid rgba(255, 255, 255, 0.15)`,
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
  // Enhanced border with depth
  borderRight: `1px solid ${pianoTheme.colors.border}`,
  borderRightWidth: '2px',
  // Add subtle inner shadow for recessed effect
  boxShadow: `
    inset -1px 0 2px rgba(0, 0, 0, 0.2),
    1px 0 0 rgba(255, 255, 255, 0.05)
  `,
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
  // Enhanced text with glow and depth
  textShadow: `
    0 0 10px rgba(255, 107, 53, 0.4),
    0 0 20px rgba(255, 107, 53, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 150, 100, 0.3)
  `,
  filter: 'drop-shadow(0 0 8px rgba(255, 107, 53, 0.3))',
});

const KeyText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '1.2rem',
  color: pianoTheme.colors.secondary,
  fontFamily: 'monospace',
  // Subtle embossed text effect
  textShadow: `
    0 1px 0 rgba(255, 255, 255, 0.1),
    0 -1px 0 rgba(0, 0, 0, 0.5)
  `,
}));

const PressedKeysDisplay = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  position: 'relative',
  zIndex: 3,
  minWidth: 0, // Allow text overflow
  padding: theme.spacing(1, 1.5),
  background: 'rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(0.5),
  // Recessed panel effect
  boxShadow: `
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.05)
  `,
  border: '1px solid rgba(0, 0, 0, 0.2)',
}));

const HistoryDisplay = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  position: 'relative',
  zIndex: 3,
  // Enhanced divider with depth
  borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
  paddingLeft: theme.spacing(3),
  marginLeft: theme.spacing(2),
  minWidth: 0, // Allow text overflow
  padding: theme.spacing(1, 1.5),
  background: 'rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(0.5),
  // Recessed panel effect
  boxShadow: `
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.05),
    -1px 0 0 rgba(255, 255, 255, 0.05)
  `,
  border: '1px solid rgba(0, 0, 0, 0.2)',
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
  // Subtle engraved text effect
  textShadow: `
    0 1px 1px rgba(0, 0, 0, 0.8),
    0 -1px 0 rgba(255, 255, 255, 0.1)
  `,
}));

const Label = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '0.75rem',
  color: pianoTheme.colors.secondary,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  opacity: 0.8,
  // Etched label effect
  textShadow: `
    0 1px 0 rgba(0, 0, 0, 0.5),
    0 -1px 0 rgba(255, 255, 255, 0.1)
  `,
  fontWeight: 600,
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
    // Enhanced metallic look with multiple shadows
    boxShadow: `
      ${cornerStyle.boxShadow},
      inset 0 1px 2px rgba(255, 255, 255, 0.3),
      inset 0 -1px 2px rgba(0, 0, 0, 0.4),
      0 2px 4px rgba(0, 0, 0, 0.3)
    `,
    zIndex: 4,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2) rotate(15deg)',
      boxShadow: `
        ${cornerStyle.boxShadow}, 
        0 0 12px rgba(212, 175, 55, 0.6),
        inset 0 1px 2px rgba(255, 255, 255, 0.4),
        inset 0 -1px 2px rgba(0, 0, 0, 0.5),
        0 4px 8px rgba(0, 0, 0, 0.4)
      `,
    },
    '&:active': {
      transform: 'scale(0.95) rotate(-5deg)',
      boxShadow: `
        inset 0 2px 4px rgba(0, 0, 0, 0.6),
        inset 0 -1px 1px rgba(255, 255, 255, 0.1)
      `,
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

export const StatusBoard: React.FC<StatisticsBoardProps> = ({
  pressedNotes,
  currentNote,
  pianoTheme,
}) => {
  // Track note history (last 20 notes)
  const [noteHistory, setNoteHistory] = useState<string[]>([]);
  // Track the most recent note and key press
  const [lastNote, setLastNote] = useState<PianoKey | null>(null);

  // Record notes when they're pressed
  useEffect(() => {
    if (currentNote) {
      setNoteHistory(prev => {
        const newHistory = [currentNote.note, ...prev];
        return newHistory.slice(0, 20); // Keep only last 20 notes
      });
      // Update the last pressed note and key
      setLastNote(currentNote);
    }
  }, [currentNote]);

  // Check if the last note is currently being pressed
  const isNoteActive = currentNote !== null && lastNote !== null && 
    currentNote.note === lastNote.note && 
    currentNote.keyboardKey === lastNote.keyboardKey;

  // Format history for display (show last 10)
  const historyText = noteHistory.slice(0, 10).join(' → ') || 'No history yet...';

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
        <NoteText 
          variant="h3"
          sx={{ 
            opacity: isNoteActive ? 1 : 0.4,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          {lastNote ? lastNote.note : '—'}
        </NoteText>
        <KeyText 
          variant="body1" 
          pianoTheme={pianoTheme}
          sx={{ 
            opacity: isNoteActive ? 1 : 0.4,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          {lastNote ? lastNote.keyboardKey : ' '}
        </KeyText>
      </CurrentNoteDisplay>

      {/* Pressed Keys Display */}
      <PressedKeysDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>Last Pressed Key</Label>
        <PressedKeysText variant="h6" pianoTheme={pianoTheme}>
          {lastNote?.keyboardKey || 'Press any key...'}
        </PressedKeysText>
      </PressedKeysDisplay>

      {/* History Display */}
      <HistoryDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>History</Label>
        <PressedKeysText variant="h6" pianoTheme={pianoTheme} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {historyText}
        </PressedKeysText>
      </HistoryDisplay>
    </BoardContainer>
  );
};
