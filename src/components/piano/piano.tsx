import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, styled, Paper } from '@mui/material';
import { PianoKeyComponent } from './piano-key';
import { KEY_MAPPINGS, createKeyboardMap, KeyPressState } from './types';
import { getAudioEngine } from '@/services/audio-engine';

const PianoContainer = styled(Paper)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #8B5A3C 0%, #6B4423 50%, #4A2F1A 100%)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(74, 47, 26, 0.3), inset 0 1px 0 rgba(139, 90, 60, 0.4)',
  border: '2px solid #5D3A1A',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing(2),
    background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        rgba(0, 0, 0, 0.03) 80px,
        rgba(0, 0, 0, 0.03) 81px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 20px,
        rgba(0, 0, 0, 0.02) 20px,
        rgba(0, 0, 0, 0.02) 21px
      )
    `,
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
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 30%, transparent 60%)',
    pointerEvents: 'none',
    zIndex: 2,
    borderRadius: theme.spacing(2),
  },
}));

const KeyboardWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2px',
  minWidth: 'fit-content',
  zIndex: 3,
});

const WhiteKeysContainer = styled(Box)({
  display: 'flex',
  position: 'relative',
  gap: '2px',
});

const BlackKeyContainer = styled(Box)<{ offset: number }>(({ offset }) => ({
  position: 'absolute',
  left: `${offset}px`,
  top: 0,
  zIndex: 2,
}));

const CornerPlate = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cornerPosition',
})<{ cornerPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }>(({ theme, cornerPosition }) => {
  const positions = {
    topLeft: { top: theme.spacing(1), left: theme.spacing(1) },
    topRight: { top: theme.spacing(1), right: theme.spacing(1) },
    bottomLeft: { bottom: theme.spacing(1), left: theme.spacing(1) },
    bottomRight: { bottom: theme.spacing(1), right: theme.spacing(1) },
  };

  return {
    position: 'absolute',
    ...positions[cornerPosition],
    width: '15px',
    height: '15px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #B8941E 100%)',
    border: '1px solid #8B7355',
    borderRadius: '50%',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
    zIndex: 4,
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

export const Piano: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<KeyPressState>({});
  const audioEngineRef = useRef(getAudioEngine());
  const keyboardMapRef = useRef(createKeyboardMap());
  const pressedKeysRef = useRef<Set<string>>(new Set());

  // Calculate positions for black keys based on their position in the pattern
  const getBlackKeyOffset = (blackKey: typeof KEY_MAPPINGS[0]): number => {
    const whiteKeyWidth = 34; // 32px + 2px gap
    
    // Find which white key this black key comes after
    const blackKeyIndex = KEY_MAPPINGS.indexOf(blackKey);
    const whiteKeysBefore = KEY_MAPPINGS.slice(0, blackKeyIndex).filter(k => !k.isBlack).length;
    
    // Position between the white keys (centered)
    return whiteKeysBefore * whiteKeyWidth + 22; // Centered between white keys
  };

  // Handle note play
  const playNote = useCallback((note: string, frequency: number) => {
    setPressedKeys(prev => ({ ...prev, [note]: true }));
    audioEngineRef.current.playNote(note, frequency);
  }, []);

  // Handle note stop
  const stopNote = useCallback((note: string) => {
    setPressedKeys(prev => {
      const newState = { ...prev };
      delete newState[note];
      return newState;
    });
    audioEngineRef.current.stopNote(note);
  }, []);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use the actual key pressed (includes shift modifiers)
      const key = e.key;
      
      // Prevent repeat events
      if (pressedKeysRef.current.has(key)) {
        return;
      }

      const pianoKey = keyboardMapRef.current.get(key);
      if (pianoKey) {
        e.preventDefault();
        pressedKeysRef.current.add(key);
        playNote(pianoKey.note, pianoKey.frequency);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key;
      pressedKeysRef.current.delete(key);

      const pianoKey = keyboardMapRef.current.get(key);
      if (pianoKey) {
        e.preventDefault();
        stopNote(pianoKey.note);
      }
    };

    // Focus handling to ensure keyboard events work
    const handleFocus = () => {
      audioEngineRef.current.resume();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('click', handleFocus, { once: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('click', handleFocus);
      audioEngineRef.current.stopAll();
    };
  }, [playNote, stopNote]);

  // Separate white and black keys
  const whiteKeys = KEY_MAPPINGS.filter(key => !key.isBlack);
  const blackKeys = KEY_MAPPINGS.filter(key => key.isBlack);

  return (
    <PianoContainer elevation={0}>
      {/* Decorative Brass Corner Plates */}
      <CornerPlate cornerPosition="topLeft" />
      <CornerPlate cornerPosition="topRight" />
      <CornerPlate cornerPosition="bottomLeft" />
      <CornerPlate cornerPosition="bottomRight" />
      
      <KeyboardWrapper>
        {/* White Keys */}
        <WhiteKeysContainer>
          {whiteKeys.map((key) => (
            <PianoKeyComponent
              key={key.note}
              pianoKey={key}
              isPressed={!!pressedKeys[key.note]}
              onMouseDown={() => playNote(key.note, key.frequency)}
              onMouseUp={() => stopNote(key.note)}
              onMouseLeave={() => stopNote(key.note)}
            />
          ))}
        </WhiteKeysContainer>

        {/* Black Keys */}
        {blackKeys.map((key) => (
          <BlackKeyContainer key={key.note} offset={getBlackKeyOffset(key)}>
            <PianoKeyComponent
              pianoKey={key}
              isPressed={!!pressedKeys[key.note]}
              onMouseDown={() => playNote(key.note, key.frequency)}
              onMouseUp={() => stopNote(key.note)}
              onMouseLeave={() => stopNote(key.note)}
            />
          </BlackKeyContainer>
        ))}
      </KeyboardWrapper>
    </PianoContainer>
  );
};
