import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, styled, Paper } from '@mui/material';
import { PianoKeyComponent } from './piano-key';
import { KEY_MAPPINGS, createKeyboardMap, KeyPressState } from './types';
import { getAudioEngine } from '@/services/audio-engine';

const PianoContainer = styled(Paper)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(3),
  backgroundColor: '#1a1a1a',
  borderRadius: theme.spacing(2),
  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
}));

const KeyboardWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2px',
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

  // Calculate positions for black keys
  const getBlackKeyOffset = (index: number): number => {
    // Position black keys between white keys
    const whiteKeyWidth = 62; // 60px + 2px gap
    const whiteKeysBefore = Math.floor(index / 2);
    return whiteKeysBefore * whiteKeyWidth + 41; // Centered between white keys
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
      const key = e.key.toLowerCase();
      
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
      const key = e.key.toLowerCase();
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
    <PianoContainer elevation={10}>
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
        {blackKeys.map((key, index) => (
          <BlackKeyContainer key={key.note} offset={getBlackKeyOffset(index)}>
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
