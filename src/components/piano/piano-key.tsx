import React from 'react';
import { Box, styled } from '@mui/material';
import { PianoKey as PianoKeyType } from './types';
import { PianoTheme } from './themes';

interface PianoKeyProps {
  pianoKey: PianoKeyType;
  isPressed: boolean;
  theme: PianoTheme;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const WhiteKey = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPressed' && prop !== 'keyTheme',
})<{ isPressed: boolean; keyTheme: PianoTheme }>(({ theme, isPressed, keyTheme }) => ({
  width: '32px',
  height: '140px',
  background: isPressed 
    ? keyTheme.whiteKey.activeBackground
    : keyTheme.whiteKey.background,
  border: keyTheme.whiteKey.border,
  borderRadius: '0 0 5px 5px',
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingBottom: theme.spacing(1),
  transition: 'all 0.08s ease',
  boxShadow: isPressed
    ? 'inset 0 3px 8px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(0,0,0,0.2)'
    : keyTheme.whiteKey.boxShadow,
  transform: isPressed ? 'translateY(2px)' : 'none',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '8px',
    background: 'linear-gradient(to bottom, rgba(139, 115, 85, 0.6), transparent)',
    borderRadius: '0 0 50% 50%',
    opacity: isPressed ? 0 : 1,
    animation: isPressed ? 'none' : 'damperTouch 0.3s ease-out',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0.15) 40%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    opacity: 0,
    animation: isPressed ? 'ripple 0.4s ease-out' : 'none',
    pointerEvents: 'none',
  },
  '@keyframes damperTouch': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-8px)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'translateY(0)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateY(0)',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(0)',
      opacity: 1,
    },
    '100%': {
      transform: 'translate(-50%, -50%) scale(2.5)',
      opacity: 0,
    },
  },
  '&:hover': {
    background: isPressed 
      ? keyTheme.whiteKey.activeBackground
      : keyTheme.whiteKey.hoverBackground,
  },
}));

const BlackKey = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPressed' && prop !== 'keyTheme',
})<{ isPressed: boolean; keyTheme: PianoTheme }>(({ theme, isPressed, keyTheme }) => ({
  width: '22px',
  height: '90px',
  background: isPressed 
    ? keyTheme.blackKey.activeBackground
    : keyTheme.blackKey.background,
  border: keyTheme.blackKey.border,
  borderRadius: '0 0 3px 3px',
  position: 'absolute',
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingBottom: theme.spacing(0.5),
  zIndex: 2,
  transition: 'all 0.08s ease',
  boxShadow: isPressed
    ? 'inset 0 3px 8px rgba(0,0,0,0.8), inset 0 1px 3px rgba(255,255,255,0.1)'
    : keyTheme.blackKey.boxShadow,
  transform: isPressed ? 'translateY(2px)' : 'none',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '15%',
    right: '15%',
    height: '6px',
    background: 'linear-gradient(to bottom, rgba(139, 115, 85, 0.5), transparent)',
    borderRadius: '0 0 50% 50%',
    opacity: isPressed ? 0 : 1,
    animation: isPressed ? 'none' : 'damperTouch 0.3s ease-out',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(76, 175, 80, 0.25) 0%, rgba(76, 175, 80, 0.12) 40%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    opacity: 0,
    animation: isPressed ? 'ripple 0.4s ease-out' : 'none',
    pointerEvents: 'none',
  },
  '@keyframes damperTouch': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-6px)',
    },
    '50%': {
      opacity: 0.7,
      transform: 'translateY(0)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateY(0)',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(0)',
      opacity: 1,
    },
    '100%': {
      transform: 'translate(-50%, -50%) scale(2.5)',
      opacity: 0,
    },
  },
  '&:hover': {
    background: isPressed 
      ? keyTheme.blackKey.activeBackground
      : keyTheme.blackKey.hoverBackground,
  },
}));

const KeyLabel = styled('span')<{ isBlack: boolean }>(({ isBlack }) => ({
  fontSize: '10px',
  fontWeight: 'bold',
  color: isBlack ? '#888' : '#8B7355',
  textTransform: 'uppercase',
  textShadow: isBlack ? '0 1px 1px rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.8)',
  opacity: 0.7,
}));

export const PianoKeyComponent: React.FC<PianoKeyProps> = ({
  pianoKey,
  isPressed,
  theme,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  const KeyComponent = pianoKey.isBlack ? BlackKey : WhiteKey;

  return (
    <KeyComponent
      isPressed={isPressed}
      keyTheme={theme}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onContextMenu={(e) => e.preventDefault()}
    >
      <KeyLabel isBlack={pianoKey.isBlack}>{pianoKey.label}</KeyLabel>
    </KeyComponent>
  );
};
