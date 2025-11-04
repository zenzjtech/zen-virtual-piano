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
