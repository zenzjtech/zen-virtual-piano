import React, { useState, useCallback, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { KeyboardOutlined as KeyboardIcon } from '@mui/icons-material';
import { PianoKeyComponent } from './piano-key';
import { KEY_MAPPINGS, KeyPressState, PianoKey } from './types';
import { getTheme } from './themes';
import { getPatternTheme } from './pattern-themes';
import { useAppSelector } from '@/store/hook';
import { getAudioEngine } from '@/services/audio-engine';
import { getBlackKeyOffset } from './piano-utils';
import { usePianoKeyboard } from '@/hooks/use-piano-keyboard';
import { usePianoMouse } from '../../hooks/use-piano-mouse';
import {
  PianoContainer,
  KeyboardWrapper,
  WhiteKeysContainer,
  BlackKeyContainer,
  DisabledOverlay,
  DisabledMessage,
  CornerPlate,
} from './piano-styled';

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
  /** Optional recording callback for note press */
  onRecordNotePress?: (note: string, velocity?: number) => void;
  /** Optional recording callback for note release */
  onRecordNoteRelease?: (note: string) => void;
}

export const Piano: React.FC<PianoProps> = ({ 
  themeId = 'wooden',
  onPressedNotesChange, 
  keyboardEnabled = true,
  showKeyboard = false,
  showNoteName = false,
  onRecordNotePress,
  onRecordNoteRelease,
}) => {
  // Read pattern theme directly from Redux
  const patternThemeId = useAppSelector((state) => state.theme.patternTheme);
  
  const pianoTheme = getTheme(themeId);
  const patternTheme = getPatternTheme(patternThemeId);
  const [pressedKeys, setPressedKeys] = useState<KeyPressState>({});
  const audioEngineRef = useRef(getAudioEngine());
  const pressedNotesMapRef = useRef<Map<string, PianoKey>>(new Map());
  const currentNoteRef = useRef<PianoKey | null>(null);

  // Handle note play
  const playNote = useCallback((note: string, frequency: number, velocity: number = 1.0) => {
    setPressedKeys(prev => ({ ...prev, [note]: true }));
    audioEngineRef.current.playNote(note, frequency, velocity);
    
    // Record note press if recording is enabled
    if (onRecordNotePress) {
      onRecordNotePress(note, velocity);
    }
    
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
    
    // Record note release if recording is enabled
    if (onRecordNoteRelease) {
      onRecordNoteRelease(note);
    }
    
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

  // Use custom hooks for keyboard and mouse interactions
  usePianoKeyboard({
    keyboardEnabled,
    audioEngine: audioEngineRef.current,
    playNote,
    stopNote,
  });

  const {
    handleMouseEnter,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  } = usePianoMouse({
    playNote,
    stopNote,
  });

  // Separate white and black keys
  const whiteKeys = KEY_MAPPINGS.filter(key => !key.isBlack);
  const blackKeys = KEY_MAPPINGS.filter(key => key.isBlack);

  return (
    <PianoContainer elevation={0} pianoTheme={pianoTheme} patternTheme={patternTheme}>
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
