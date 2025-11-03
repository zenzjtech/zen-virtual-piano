import React from 'react';
import { Box, styled } from '@mui/material';
import { PianoKey as PianoKeyType } from './types';

interface PianoKeyProps {
  pianoKey: PianoKeyType;
  isPressed: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const WhiteKey = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPressed',
})<{ isPressed: boolean }>(({ theme, isPressed }) => ({
  width: '32px',
  height: '140px',
  background: isPressed 
    ? 'linear-gradient(to bottom, #E8E4DC 0%, #F5F1E8 50%, #E8E4DC 100%)'
    : 'linear-gradient(to bottom, #FFFEF9 0%, #F5F1E8 50%, #FFFEF9 100%)',
  border: '1px solid #8B7355',
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
    ? 'inset 0 3px 8px rgba(74, 47, 26, 0.4), inset 0 1px 2px rgba(0,0,0,0.2)'
    : '0 4px 8px rgba(74, 47, 26, 0.25), 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
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
  '&:hover': {
    background: isPressed 
      ? 'linear-gradient(to bottom, #E8E4DC 0%, #F5F1E8 50%, #E8E4DC 100%)'
      : 'linear-gradient(to bottom, #F9F7F0 0%, #F0EBE0 50%, #F9F7F0 100%)',
  },
}));

const BlackKey = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPressed',
})<{ isPressed: boolean }>(({ theme, isPressed }) => ({
  width: '22px',
  height: '90px',
  background: isPressed 
    ? 'linear-gradient(to bottom, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
    : 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 70%, #0a0a0a 100%)',
  border: '1px solid #000',
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
    : '0 6px 10px rgba(0,0,0,0.6), 0 3px 6px rgba(74, 47, 26, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
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
  '&:hover': {
    background: isPressed 
      ? 'linear-gradient(to bottom, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
      : 'linear-gradient(to bottom, #1a1a1a 0%, #252525 70%, #1a1a1a 100%)',
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
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  const KeyComponent = pianoKey.isBlack ? BlackKey : WhiteKey;

  return (
    <KeyComponent
      isPressed={isPressed}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onContextMenu={(e) => e.preventDefault()}
    >
      <KeyLabel isBlack={pianoKey.isBlack}>{pianoKey.label}</KeyLabel>
    </KeyComponent>
  );
};
