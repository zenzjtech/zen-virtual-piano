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
  },
}));

const KeyboardWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2px',
  minWidth: 'fit-content',
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
