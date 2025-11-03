import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, styled, Paper, Typography, alpha } from '@mui/material';
import { KeyboardOutlined as KeyboardIcon } from '@mui/icons-material';
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

const DisabledOverlay = styled(Box, {
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

const DisabledMessage = styled(Box, {
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
  /** Whether keyboard input is enabled (default: true) */
  keyboardEnabled?: boolean;
  /** Show keyboard shortcuts on keys */
  showKeyboard?: boolean;
  /** Show note names on keys */
  showNoteName?: boolean;
}

export const Piano: React.FC<PianoProps> = ({ 
  themeId = 'wooden', 
  onPressedNotesChange, 
  keyboardEnabled = true,
  showKeyboard = false,
  showNoteName = false,
}) => {
  const pianoTheme = getTheme(themeId);
  const [pressedKeys, setPressedKeys] = useState<KeyPressState>({});
  const audioEngineRef = useRef(getAudioEngine());
  const keyboardMapRef = useRef(createKeyboardMap());
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const pressedNotesMapRef = useRef<Map<string, PianoKey>>(new Map());
  const currentNoteRef = useRef<PianoKey | null>(null);
  
  // Track key interaction times for velocity calculation
  // For keyboard: time of first keydown detection
  // For mouse: time when mouse enters the key area before click
  const keyInteractionStartTimes = useRef<Map<string, number>>(new Map());
  const keyPressStartTimes = useRef<Map<string, number>>(new Map());
  
  // Velocity configuration (in milliseconds)
  // Simulates piano hammer speed - time from approach to full press
  const velocityConfig = {
    minDuration: 30,    // Very fast press (< 30ms) = velocity 1.0 (loud, forte)
    maxDuration: 200,   // Slow press (> 200ms) = velocity 0.3 (soft, piano)
    minVelocity: 0.3,   // Minimum velocity for very slow/deliberate presses
    maxVelocity: 1.0,   // Maximum velocity for very fast/hard presses
    keyboardDefault: 0.8, // Default velocity for direct keyboard input (moderately loud)
  };
  
  /**
   * Calculate velocity based on attack duration (approach to press)
   * Simulates the speed at which a piano key is pressed
   * Faster approach = higher velocity (louder sound)
   * Slower approach = lower velocity (softer sound)
   */
  const calculateVelocity = useCallback((duration: number): number => {
    const { minDuration, maxDuration, minVelocity, maxVelocity } = velocityConfig;
    
    // Very fast press - maximum velocity (fortissimo)
    if (duration <= minDuration) {
      return maxVelocity;
    }
    
    // Very slow press - minimum velocity (pianissimo)
    if (duration >= maxDuration) {
      return minVelocity;
    }
    
    // Linear interpolation between min and max
    // Inverse relationship: shorter duration = higher velocity
    const normalizedDuration = (duration - minDuration) / (maxDuration - minDuration);
    return maxVelocity - (normalizedDuration * (maxVelocity - minVelocity));
  }, []);

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
  const playNote = useCallback((note: string, frequency: number, velocity: number = 1.0) => {
    setPressedKeys(prev => ({ ...prev, [note]: true }));
    audioEngineRef.current.playNote(note, frequency, velocity);
    
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
    // Only register keyboard listeners when keyboard input is enabled
    if (!keyboardEnabled) {
      return;
    }

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
        
        const now = performance.now();
        let velocity = velocityConfig.keyboardDefault;
        
        // Check if we have an interaction start time (from hover or previous interaction)
        const interactionStart = keyInteractionStartTimes.current.get(key);
        if (interactionStart) {
          // Calculate velocity based on time from interaction to press
          const duration = now - interactionStart;
          velocity = calculateVelocity(duration);
          keyInteractionStartTimes.current.delete(key);
        }
        
        // Record the actual press time for duration tracking
        keyPressStartTimes.current.set(key, now);
        
        // Play note with calculated velocity
        playNote(pianoKey.note, pianoKey.frequency, velocity);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key;
      
      // Calculate and log the press duration for debugging
      const startTime = keyPressStartTimes.current.get(key);
      if (startTime !== undefined) {
        const pressDuration = performance.now() - startTime;
        console.log(`Key "${key}" held for ${pressDuration.toFixed(0)}ms`);
        keyPressStartTimes.current.delete(key);
      }
      
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
  }, [playNote, stopNote, keyboardEnabled]);

  // Mouse interaction handlers for velocity tracking
  const handleMouseEnter = useCallback((note: string) => {
    // Record when mouse enters the key area (for velocity calculation)
    keyInteractionStartTimes.current.set(note, performance.now());
  }, []);
  
  const handleMouseDown = useCallback((note: string, frequency: number) => {
    const now = performance.now();
    let velocity = velocityConfig.keyboardDefault; // Default for mouse clicks
    
    // Check if we have an interaction start time (from mouse enter)
    const interactionStart = keyInteractionStartTimes.current.get(note);
    if (interactionStart) {
      // Calculate velocity based on time from mouse enter to click
      const duration = now - interactionStart;
      velocity = calculateVelocity(duration);
      console.log(`Mouse click on ${note}: ${duration.toFixed(0)}ms approach → velocity: ${velocity.toFixed(2)}`);
    }
    
    playNote(note, frequency, velocity);
  }, [playNote, calculateVelocity]);
  
  const handleMouseUp = useCallback((note: string) => {
    stopNote(note);
  }, [stopNote]);
  
  const handleMouseLeave = useCallback((note: string) => {
    // Clean up interaction tracking and stop note
    keyInteractionStartTimes.current.delete(note);
    stopNote(note);
  }, [stopNote]);

  // Separate white and black keys
  const whiteKeys = KEY_MAPPINGS.filter(key => !key.isBlack);
  const blackKeys = KEY_MAPPINGS.filter(key => key.isBlack);

  return (
    <PianoContainer elevation={0} pianoTheme={pianoTheme}>
      {/* Disabled Overlay */}
      {!keyboardEnabled && (
        <DisabledOverlay pianoTheme={pianoTheme}>
          <DisabledMessage pianoTheme={pianoTheme}>
            <KeyboardIcon
              sx={{
                fontSize: '2.5rem',
                color: pianoTheme.colors.secondary,
                opacity: 0.7,
              }}
            />
            <Typography
              variant="body1"
              fontWeight="600"
              sx={{
                color: pianoTheme.colors.primary,
                textAlign: 'center',
                letterSpacing: '0.3px',
              }}
            >
              Keyboard Input Disabled
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: pianoTheme.colors.secondary,
                textAlign: 'center',
                fontSize: '0.75rem',
                opacity: 0.85,
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              Press <Box component="kbd" sx={{
                px: 1,
                py: 0.5,
                borderRadius: '4px',
                backgroundColor: pianoTheme.isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
                border: `1px solid ${pianoTheme.colors.border}`,
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                boxShadow: `0 2px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}>Esc</Box> or click away to enable
            </Typography>
          </DisabledMessage>
        </DisabledOverlay>
      )}
      
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
              onMouseEnter={() => handleMouseEnter(key.note)}
              onMouseDown={() => handleMouseDown(key.note, key.frequency)}
              onMouseUp={() => handleMouseUp(key.note)}
              onMouseLeave={() => handleMouseLeave(key.note)}
              showKeyboard={showKeyboard}
              showNoteName={showNoteName}
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
              onMouseEnter={() => handleMouseEnter(key.note)}
              onMouseDown={() => handleMouseDown(key.note, key.frequency)}
              onMouseUp={() => handleMouseUp(key.note)}
              onMouseLeave={() => handleMouseLeave(key.note)}
              showKeyboard={showKeyboard}
              showNoteName={showNoteName}
            />
          </BlackKeyContainer>
        ))}
      </KeyboardWrapper>
    </PianoContainer>
  );
};
