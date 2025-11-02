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
  width: '60px',
  height: '200px',
  backgroundColor: isPressed ? '#e0e0e0' : '#ffffff',
  border: '1px solid #000',
  borderRadius: '0 0 5px 5px',
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingBottom: theme.spacing(1),
  transition: 'all 0.05s ease',
  boxShadow: isPressed
    ? 'inset 0 2px 5px rgba(0,0,0,0.3)'
    : '0 4px 6px rgba(0,0,0,0.1)',
  transform: isPressed ? 'translateY(2px)' : 'none',
  '&:hover': {
    backgroundColor: isPressed ? '#e0e0e0' : '#f5f5f5',
  },
}));

const BlackKey = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPressed',
})<{ isPressed: boolean }>(({ theme, isPressed }) => ({
  width: '40px',
  height: '120px',
  backgroundColor: isPressed ? '#333' : '#000',
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
  transition: 'all 0.05s ease',
  boxShadow: isPressed
    ? 'inset 0 2px 5px rgba(255,255,255,0.2)'
    : '0 4px 6px rgba(0,0,0,0.4)',
  transform: isPressed ? 'translateY(2px)' : 'none',
  '&:hover': {
    backgroundColor: isPressed ? '#333' : '#222',
  },
}));

const KeyLabel = styled('span')<{ isBlack: boolean }>(({ isBlack }) => ({
  fontSize: '12px',
  fontWeight: 'bold',
  color: isBlack ? '#fff' : '#666',
  textTransform: 'uppercase',
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
