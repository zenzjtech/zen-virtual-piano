import { useEffect, useRef } from 'react';
import metronomeSound from '@/assets/audio/metronome.mp3?url';

/**
 * Custom hook to manage metronome playback
 * @param enabled - Whether the metronome is playing
 * @param tempo - Tempo in BPM (beats per minute)
 * @param volume - Volume level (0-100)
 */
export function useMetronome(enabled: boolean, tempo: number, volume: number = 50) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(metronomeSound);
      audioRef.current.volume = volume / 100;
    }

    // Clean up function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Update volume whenever it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    // Stop any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (enabled && audioRef.current) {
      // Calculate interval in milliseconds (60000ms = 1 minute)
      const interval = 60000 / tempo;

      // Play immediately
      const playSound = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => {
            console.error('Error playing metronome:', err);
          });
        }
      };

      playSound();

      // Set up interval for continuous playback
      intervalRef.current = setInterval(playSound, interval);
    } else if (audioRef.current) {
      // Stop the sound
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, tempo]);

  // Return cleanup function if needed externally
  return {
    stop: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };
}
