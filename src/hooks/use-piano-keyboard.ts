import { useEffect, useRef } from 'react';
import { createKeyboardMap } from '@/components/piano/types';
import { calculateVelocity, velocityConfig } from '@/components/piano/piano-utils'
import type { AudioEngine } from '@/services/audio-engine';

interface UsePianoKeyboardOptions {
  keyboardEnabled: boolean;
  audioEngine: AudioEngine;
  playNote: (note: string, frequency: number, velocity: number) => void;
  stopNote: (note: string) => void;
}

/**
 * Custom hook for handling keyboard interactions with the piano
 * Manages key press state, velocity calculation, and audio playback
 */
export const usePianoKeyboard = ({
  keyboardEnabled,
  audioEngine,
  playNote,
  stopNote,
}: UsePianoKeyboardOptions) => {
  const keyboardMapRef = useRef(createKeyboardMap());
  const pressedKeysRef = useRef<Set<string>>(new Set());
  
  // Track which note was actually played for each physical key code
  // This is crucial because e.key changes with shift modifier but e.code stays the same
  const keyCodeToNoteMap = useRef<Map<string, string>>(new Map());
  
  // Track key interaction times for velocity calculation
  // For keyboard: time of first keydown detection
  const keyInteractionStartTimes = useRef<Map<string, number>>(new Map());
  const keyPressStartTimes = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Only register keyboard listeners when keyboard input is enabled
    if (!keyboardEnabled) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore Ctrl+key combinations to allow other shortcuts
      if (e.ctrlKey) {
        return;
      }
      
      // Use the actual key pressed (includes shift modifiers)
      const key = e.key;
      // Use physical key code for tracking to handle shift key issues
      const code = e.code;
      
      // Prevent repeat events using physical key code
      if (pressedKeysRef.current.has(code)) {
        return;
      }

      const pianoKey = keyboardMapRef.current.get(key);
      if (!pianoKey) {
        return;
      }
      
      e.preventDefault();
      pressedKeysRef.current.add(code);
      
      // Store which note this physical key is playing
      keyCodeToNoteMap.current.set(code, pianoKey.note);
      
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
      
      // Record the actual press time for duration tracking using code
      keyPressStartTimes.current.set(code, now);
      
      // Play note with calculated velocity
      playNote(pianoKey.note, pianoKey.frequency, velocity);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      
      // Clean up timing tracking
      keyPressStartTimes.current.delete(code);
      
      // Always remove from pressed keys set using physical code
      // This prevents stuck keys from blocking future presses
      pressedKeysRef.current.delete(code);

      // Get the note that was actually played for this physical key
      // Don't use e.key because shift state may have changed
      const noteToStop = keyCodeToNoteMap.current.get(code);
      if (noteToStop) {
        e.preventDefault();
        stopNote(noteToStop);
        keyCodeToNoteMap.current.delete(code);
      }
    };

    // Focus handling to ensure keyboard events work
    const handleFocus = () => {
      audioEngine.resume();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('click', handleFocus, { once: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('click', handleFocus);
      audioEngine.stopAll();
    };
  }, [playNote, stopNote, keyboardEnabled, audioEngine]);

  return {
    keyInteractionStartTimes,
  };
};
