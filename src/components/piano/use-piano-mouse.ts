import { useCallback, useRef } from 'react';
import { calculateVelocity, velocityConfig } from './piano-utils';

interface UsePianoMouseOptions {
  playNote: (note: string, frequency: number, velocity: number) => void;
  stopNote: (note: string) => void;
}

/**
 * Custom hook for handling mouse interactions with the piano
 * Manages velocity calculation based on mouse hover and click timing
 */
export const usePianoMouse = ({ playNote, stopNote }: UsePianoMouseOptions) => {
  // Track key interaction times for velocity calculation
  // For mouse: time when mouse enters the key area before click
  const keyInteractionStartTimes = useRef<Map<string, number>>(new Map());

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
  }, [playNote]);
  
  const handleMouseUp = useCallback((note: string) => {
    stopNote(note);
  }, [stopNote]);
  
  const handleMouseLeave = useCallback((note: string) => {
    // Clean up interaction tracking and stop note
    keyInteractionStartTimes.current.delete(note);
    stopNote(note);
  }, [stopNote]);

  return {
    handleMouseEnter,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  };
};
