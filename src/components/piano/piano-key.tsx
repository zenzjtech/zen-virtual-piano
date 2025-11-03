import React from 'react';
import { Box, styled } from '@mui/material';
import { PianoKey as PianoKeyType } from './types';
import { PianoTheme } from './themes';

interface PianoKeyProps {
  pianoKey: PianoKeyType;
  isPressed: boolean;
  theme: PianoTheme;
  onMouseEnter: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const WhiteKey = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPressed' && prop !== 'keyTheme',
})<{ isPressed: boolean; keyTheme: PianoTheme }>(({ theme, isPressed, keyTheme }) => {
  // Calculate material-specific properties
  const materialGloss = keyTheme.lighting.glossiness;
  const specularStrength = keyTheme.lighting.specularIntensity;
  
  return {
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
    : `${keyTheme.whiteKey.boxShadow}, 0 ${keyTheme.lighting.shadowDepth} ${keyTheme.lighting.shadowSoftness} ${keyTheme.lighting.shadowColor}`,
  transform: isPressed ? 'translateY(2px)' : 'none',
  overflow: 'hidden',
  // Specular highlight based on material finish
  filter: `brightness(${1 + (specularStrength * 0.1)}) contrast(${1 + (materialGloss * 0.05)})`,
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
  // Add theme-specific lighting overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: keyTheme.lighting.reflectionGradient,
    opacity: keyTheme.lighting.reflectionOpacity * 0.6,
    pointerEvents: 'none',
    zIndex: 1,
    mixBlendMode: 'overlay',
  },
  '&:hover': {
    background: isPressed 
      ? keyTheme.whiteKey.activeBackground
      : keyTheme.whiteKey.hoverBackground,
    boxShadow: `${keyTheme.whiteKey.boxShadow}, ${keyTheme.lighting.interactiveGlow}`,
  },
}});  // Close the return statement

const BlackKey = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPressed' && prop !== 'keyTheme',
})<{ isPressed: boolean; keyTheme: PianoTheme }>(({ theme, isPressed, keyTheme }) => {
  // Calculate material-specific properties for black keys
  const materialGloss = keyTheme.lighting.glossiness;
  const specularStrength = keyTheme.lighting.specularIntensity;
  
  return {
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
    : `${keyTheme.blackKey.boxShadow}, 0 ${keyTheme.lighting.shadowDepth} ${keyTheme.lighting.shadowSoftness} ${keyTheme.lighting.shadowColor}`,
  transform: isPressed ? 'translateY(2px)' : 'none',
  overflow: 'hidden',
  // Enhanced material finish for black keys
  filter: `brightness(${1 + (specularStrength * 0.08)}) contrast(${1 + (materialGloss * 0.08)})`,
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
    boxShadow: `${keyTheme.blackKey.boxShadow}, ${keyTheme.lighting.interactiveGlow}`,
  },
}});  // Close the return statement for BlackKey

const KeyLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isBlack' && prop !== 'keyTheme' && prop !== 'isPressed',
})<{ isBlack: boolean; keyTheme: PianoTheme; isPressed: boolean }>(({ isBlack, keyTheme, isPressed }) => {
  // Get theme-specific colors with guaranteed contrast
  let whiteKeyColor: string;
  let blackKeyColor: string;
  
  // White keys need dark text for contrast
  if (keyTheme.id === 'wooden') {
    whiteKeyColor = '#8B7355';  // Bronze/brown for wooden theme
  } else if (keyTheme.id === 'black') {
    whiteKeyColor = '#444444';  // Dark gray for black theme (more contrast)
  } else if (keyTheme.id === 'metal') {
    whiteKeyColor = '#34495E';  // Dark slate blue for metal theme
  } else {
    whiteKeyColor = '#555555';  // Dark gray for white theme
  }
  
  // Black keys need light text for contrast on all themes
  blackKeyColor = '#CCCCCC';  // Light gray - works on all dark key backgrounds
  
  return {
    fontSize: '10px',
    fontWeight: 'bold',
    color: isBlack ? blackKeyColor : whiteKeyColor,
    textShadow: isBlack 
      ? '0 1px 1px rgba(0,0,0,0.5)' 
      : keyTheme.isLight 
        ? '0 1px 0 rgba(255,255,255,0.6)'
        : '0 1px 0 rgba(255,255,255,0.8)',
    opacity: isPressed ? 1 : (isBlack ? 0.9 : 0.75),
    transition: 'all 0.15s ease',
    transform: isPressed ? 'scale(1.1)' : 'scale(1)',
    animation: isPressed ? 'labelPulse 0.3s ease-out' : 'none',
    '@keyframes labelPulse': {
      '0%': {
        transform: 'scale(1)',
        opacity: isBlack ? 0.9 : 0.75,
      },
      '50%': {
        transform: 'scale(1.15)',
        opacity: 1,
        filter: 'brightness(1.3)',
      },
      '100%': {
        transform: 'scale(1.1)',
        opacity: 1,
      },
    },
  };
});

export const PianoKeyComponent: React.FC<PianoKeyProps> = ({
  pianoKey,
  isPressed,
  theme,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  const KeyComponent = pianoKey.isBlack ? BlackKey : WhiteKey;

  return (
    <KeyComponent
      isPressed={isPressed}
      keyTheme={theme}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onContextMenu={(e) => e.preventDefault()}
    >
      <KeyLabel isBlack={pianoKey.isBlack} keyTheme={theme} isPressed={isPressed}>{pianoKey.label}</KeyLabel>
    </KeyComponent>
  );
};
