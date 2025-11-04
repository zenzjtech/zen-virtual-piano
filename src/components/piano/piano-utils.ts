import { KEY_MAPPINGS } from './types';

/**
 * Velocity configuration (in milliseconds)
 * Simulates piano hammer speed - time from approach to full press
 */
export const velocityConfig = {
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
export const calculateVelocity = (duration: number): number => {
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
};

/**
 * Calculate positions for black keys based on their position in the pattern
 */
export const getBlackKeyOffset = (blackKey: typeof KEY_MAPPINGS[0]): number => {
  const whiteKeyWidth = 34; // 32px + 2px gap
  
  // Find which white key this black key comes after
  const blackKeyIndex = KEY_MAPPINGS.indexOf(blackKey);
  const whiteKeysBefore = KEY_MAPPINGS.slice(0, blackKeyIndex).filter(k => !k.isBlack).length;
  
  // Position between the white keys (centered)
  return whiteKeysBefore * whiteKeyWidth + 22; // Centered between white keys
};
