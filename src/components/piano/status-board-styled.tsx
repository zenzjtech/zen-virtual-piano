import { Box, Paper, Typography, styled } from '@mui/material';
import { PianoTheme } from './themes';

export const BoardContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  background: pianoTheme.container.background,
  color: pianoTheme.colors.primary,  
  borderRadius: 0,
  borderTopLeftRadius: theme.spacing(1.5),
  borderTopRightRadius: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  minHeight: '54px',
  width: '100%',
  boxSizing: 'border-box',
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
  // Pattern is now applied at PianoUnit wrapper level
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.beforeBackground || 'none',
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
    background: pianoTheme.container.afterBackground || 'none',
    pointerEvents: 'none',
    zIndex: 2,
  },
}));

export const CurrentNoteDisplay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '70px',
  padding: theme.spacing(0.75, 1),
  // Dynamic background based on theme brightness
  background: pianoTheme.isLight 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(0.5),
  // Recessed panel effect with theme-aware shadows
  boxShadow: pianoTheme.isLight 
    ? `
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05),
      0 1px 0 rgba(255, 255, 255, 0.05)
    `
    : `
      inset 0 2px 4px rgba(0, 0, 0, 0.5),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1),
      0 1px 0 rgba(255, 255, 255, 0.1)
    `,
  // Theme-aware border
  border: pianoTheme.isLight 
    ? '1px solid rgba(0, 0, 0, 0.2)' 
    : '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  zIndex: 3,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

export const NoteText = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#ff6b35',
  lineHeight: 1,
  marginBottom: '1px',
  // Enhanced text with glow and depth
  textShadow: `
    0 0 10px rgba(255, 107, 53, 0.4),
    0 0 20px rgba(255, 107, 53, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 150, 100, 0.3)
  `,
  filter: 'drop-shadow(0 0 8px rgba(255, 107, 53, 0.3))',
  transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
});

export const KeyText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '0.8rem',
  color: pianoTheme.colors.secondary,
  fontFamily: 'monospace',
  // Subtle embossed text effect
  textShadow: `
    0 1px 0 rgba(255, 255, 255, 0.1),
    0 -1px 0 rgba(0, 0, 0, 0.5)
  `,
  transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
}));

export const PressedKeysDisplay = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
  position: 'relative',
  zIndex: 3,
  minWidth: 0, // Allow text overflow
  height: '83px', // Maintain consistent height across modes
  padding: theme.spacing(0.4, 0.8),
  background: 'rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(0.5),
  // Recessed panel effect
  boxShadow: `
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.05)
  `,
  border: '1px solid rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

export const HistoryDisplay = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
  position: 'relative',
  zIndex: 3,
  // Enhanced divider with depth
  borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
  paddingLeft: theme.spacing(1.5),
  marginLeft: theme.spacing(1),
  minWidth: 0, // Allow text overflow
  height: '83px', // Match height of PressedKeysDisplay with content
  padding: theme.spacing(0.4, 0.8),
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
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

export const PressedKeysText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '1rem',
  fontFamily: 'monospace',
  color: pianoTheme.colors.primary,
  letterSpacing: '0.5px',
  minHeight: '18px',
  display: 'flex',
  alignItems: 'center',
  // Subtle engraved text effect
  textShadow: `
    0 1px 1px rgba(0, 0, 0, 0.8),
    0 -1px 0 rgba(255, 255, 255, 0.1)
  `,
  transition: 'color 0.3s ease, opacity 0.3s ease',
}));

export const Label = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  fontSize: '0.6rem',
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
  transition: 'opacity 0.3s ease',
}));

export const CornerPlate = styled(Box, {
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
