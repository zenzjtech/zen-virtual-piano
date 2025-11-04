import { Box, styled, Paper, alpha } from '@mui/material';
import { PianoTheme } from './themes';

export const PianoContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  display: 'inline-block',
  padding: theme.spacing(3),
  background: pianoTheme.container.background,
  borderRadius: 0,
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
  boxShadow: pianoTheme.container.boxShadow,
  border: pianoTheme.container.border,
  borderTop: 'none',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
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
    borderRadius: 0,
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
  },
}));

export const KeyboardWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2px',
  minWidth: 'fit-content',
  zIndex: 3,
});

export const WhiteKeysContainer = styled(Box)({
  display: 'flex',
  position: 'relative',
  gap: '2px',
});

export const BlackKeyContainer = styled(Box)<{ offset: number }>(({ offset }) => ({
  position: 'absolute',
  left: `${offset}px`,
  top: 0,
  zIndex: 2,
}));

export const DisabledOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: pianoTheme.isLight
    ? alpha('#ffffff', 0.75)
    : alpha('#000000', 0.65),
  backdropFilter: 'blur(2px)',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  borderRadius: 0,
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
  transition: 'opacity 0.2s ease-in-out',
  cursor: 'not-allowed',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: `2px dashed ${alpha(pianoTheme.colors.border, 0.3)}`,
    borderRadius: 0,
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    pointerEvents: 'none',
  },
}));

export const DisabledMessage = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2, 3),
  background: pianoTheme.isLight
    ? alpha('#ffffff', 0.9)
    : alpha('#1a1a1a', 0.9),
  border: `1px solid ${pianoTheme.colors.border}`,
  borderRadius: theme.spacing(1),
  boxShadow: `
    0 4px 12px ${alpha('#000000', 0.15)},
    inset 0 1px 0 ${alpha('#ffffff', pianoTheme.isLight ? 0.5 : 0.1)}
  `,
}));

export const CornerPlate = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cornerPosition' && prop !== 'pianoTheme',
})<{ cornerPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'; pianoTheme: PianoTheme }>(({ theme, cornerPosition, pianoTheme }) => {
  const positions = {
    topLeft: { top: theme.spacing(1), left: theme.spacing(1) },
    topRight: { top: theme.spacing(1), right: theme.spacing(1) },
    bottomLeft: { bottom: theme.spacing(1), left: theme.spacing(1) },
    bottomRight: { bottom: theme.spacing(1), right: theme.spacing(1) },
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
