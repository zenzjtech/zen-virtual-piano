import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, styled, Paper } from '@mui/material';
import { PianoKeyComponent } from './piano-key';
import { KEY_MAPPINGS, createKeyboardMap, KeyPressState, PianoKey } from './types';
import { PianoTheme, getTheme } from './themes';
import { getAudioEngine } from '@/services/audio-engine';

const PianoContainer = styled(Paper, {
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

interface PianoProps {
  /** Visual theme for the piano */
  themeId?: string;
  /** Callback when pressed notes change */
  onPressedNotesChange?: (notes: Map<string, PianoKey>, currentNote: PianoKey | null) => void;
}

export const Piano: React.FC<PianoProps> = ({ themeId = 'wooden', onPressedNotesChange }) => {
  const pianoTheme = getTheme(themeId);
  const [pressedKeys, setPressedKeys] = useState<KeyPressState>({});
  const audioEngineRef = useRef(getAudioEngine());
  const keyboardMapRef = useRef(createKeyboardMap());
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const pressedNotesMapRef = useRef<Map<string, PianoKey>>(new Map());
  const currentNoteRef = useRef<PianoKey | null>(null);

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
    
    // Find the piano key and update tracking
    const pianoKey = KEY_MAPPINGS.find(k => k.note === note);
    if (pianoKey) {
      pressedNotesMapRef.current.set(note, pianoKey);
      currentNoteRef.current = pianoKey;
      
      // Notify parent
      if (onPressedNotesChange) {
        onPressedNotesChange(
          new Map(pressedNotesMapRef.current),
          currentNoteRef.current
        );
      }
    }
  }, [onPressedNotesChange]);

  // Handle note stop
  const stopNote = useCallback((note: string) => {
    setPressedKeys(prev => {
      const newState = { ...prev };
      delete newState[note];
      return newState;
    });
    audioEngineRef.current.stopNote(note);
    
    // Update tracking
    pressedNotesMapRef.current.delete(note);
    
    // If we just released the current note, clear it
    if (currentNoteRef.current?.note === note) {
      // Set current to the last remaining pressed note, or null
      const remaining = Array.from(pressedNotesMapRef.current.values());
      currentNoteRef.current = remaining[remaining.length - 1] || null;
    }
    
    // Notify parent
    if (onPressedNotesChange) {
      onPressedNotesChange(
        new Map(pressedNotesMapRef.current),
        currentNoteRef.current
      );
    }
  }, [onPressedNotesChange]);

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
    <PianoContainer elevation={0} pianoTheme={pianoTheme}>
      {/* Decorative Corner Plates - Only bottom corners (top corners are on StatisticsBoard) */}
      {pianoTheme.cornerPlates && (
        <>
          <CornerPlate cornerPosition="bottomLeft" pianoTheme={pianoTheme} />
          <CornerPlate cornerPosition="bottomRight" pianoTheme={pianoTheme} />
        </>
      )}
      
      <KeyboardWrapper>
        {/* White Keys */}
        <WhiteKeysContainer>
          {whiteKeys.map((key) => (
            <PianoKeyComponent
              key={key.note}
              pianoKey={key}
              theme={pianoTheme}
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
              theme={pianoTheme}
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
