import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  startPlayback,
  pausePlayback,
  resumePlayback,
  stopPlayback,
  updatePlaybackPosition,
  setPlaybackSpeed,
  toggleLoop,
  RecordedNote,
} from '@/store/reducers/recording-slice';

interface PlaybackCallbacks {
  /** Callback to play a note */
  onPlayNote: (note: string, frequency: number, velocity: number) => void;
  /** Callback to stop a note */
  onStopNote: (note: string) => void;
}

/**
 * Custom hook for managing recording playback
 * Handles the playback timing and note triggering
 */
export function useRecordingPlayback({ onPlayNote, onStopNote }: PlaybackCallbacks) {
  const dispatch = useAppDispatch();
  const { recordedNotes, playback } = useAppSelector((state) => state.recording);
  const { isPlaying, currentPosition, playbackSpeed, loop } = playback;

  const playbackStartTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const playedNotesRef = useRef<Set<number>>(new Set());
  const activeNotesRef = useRef<Map<string, number>>(new Map()); // note -> timeout ID

  /**
   * Calculate the frequency for a given note
   * This is a simplified version - you might want to import from your types
   */
  const getNoteFrequency = useCallback((note: string): number => {
    // Note frequencies mapping (simplified, can be expanded)
    const noteFrequencies: { [key: string]: number } = {
      'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41,
      'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00,
      'A#2': 116.54, 'B2': 123.47, 'C3': 130.81, 'C#3': 138.59, 'D3': 146.83,
      'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00,
      'G#3': 207.65, 'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18,
      'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
      'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25,
      'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00,
      'A#5': 932.33, 'B5': 987.77, 'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66,
      'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98,
      'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53, 'C7': 2093.00,
    };
    return noteFrequencies[note] || 440.0; // Default to A4
  }, []);

  /**
   * Stop all currently playing notes
   */
  const stopAllNotes = useCallback(() => {
    activeNotesRef.current.forEach((timeoutId, note) => {
      clearTimeout(timeoutId);
      onStopNote(note);
    });
    activeNotesRef.current.clear();
  }, [onStopNote]);

  /**
   * Playback loop - runs on animation frame
   */
  const playbackLoop = useCallback(() => {
    if (!isPlaying || !playbackStartTimeRef.current) {
      return;
    }

    const now = Date.now();
    const elapsed = (now - playbackStartTimeRef.current) * playbackSpeed;
    const newPosition = elapsed;

    // Update position
    dispatch(updatePlaybackPosition(newPosition));

    // Play notes at the current position
    recordedNotes.forEach((recordedNote, index) => {
      if (playedNotesRef.current.has(index)) {
        return; // Already played this note
      }

      // Check if it's time to play this note
      if (recordedNote.timestamp <= newPosition) {
        playedNotesRef.current.add(index);
        
        // Play the note
        const frequency = getNoteFrequency(recordedNote.note);
        onPlayNote(recordedNote.note, frequency, recordedNote.velocity);

        // Schedule note stop
        const timeoutId = window.setTimeout(() => {
          onStopNote(recordedNote.note);
          activeNotesRef.current.delete(recordedNote.note);
        }, recordedNote.duration / playbackSpeed);

        activeNotesRef.current.set(recordedNote.note, timeoutId);
      }
    });

    // Check if playback is complete
    const totalDuration = recordedNotes.length > 0
      ? Math.max(...recordedNotes.map(n => n.timestamp + n.duration))
      : 0;

    if (newPosition >= totalDuration) {
      if (loop) {
        // Restart playback
        stopAllNotes();
        playedNotesRef.current.clear();
        playbackStartTimeRef.current = Date.now();
        dispatch(updatePlaybackPosition(0));
      } else {
        // Stop playback
        dispatch(stopPlayback());
        stopAllNotes();
        playedNotesRef.current.clear();
        return;
      }
    }

    // Continue playback
    animationFrameRef.current = requestAnimationFrame(playbackLoop);
  }, [isPlaying, playbackSpeed, recordedNotes, loop, dispatch, onPlayNote, onStopNote, getNoteFrequency, stopAllNotes]);

  /**
   * Start playback
   */
  const handleStartPlayback = useCallback(() => {
    if (recordedNotes.length === 0) {
      return;
    }

    stopAllNotes();
    playedNotesRef.current.clear();
    playbackStartTimeRef.current = Date.now();
    dispatch(startPlayback());
  }, [recordedNotes, dispatch, stopAllNotes]);

  /**
   * Pause playback
   */
  const handlePausePlayback = useCallback(() => {
    dispatch(pausePlayback());
    stopAllNotes();
  }, [dispatch, stopAllNotes]);

  /**
   * Resume playback
   */
  const handleResumePlayback = useCallback(() => {
    // Adjust start time to account for current position
    playbackStartTimeRef.current = Date.now() - (currentPosition / playbackSpeed);
    dispatch(resumePlayback());
  }, [dispatch, currentPosition, playbackSpeed]);

  /**
   * Stop playback
   */
  const handleStopPlayback = useCallback(() => {
    dispatch(stopPlayback());
    stopAllNotes();
    playedNotesRef.current.clear();
    playbackStartTimeRef.current = null;
  }, [dispatch, stopAllNotes]);

  /**
   * Toggle play/pause
   */
  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      handlePausePlayback();
    } else if (currentPosition > 0) {
      handleResumePlayback();
    } else {
      handleStartPlayback();
    }
  }, [isPlaying, currentPosition, handlePausePlayback, handleResumePlayback, handleStartPlayback]);

  /**
   * Set playback speed
   */
  const handleSetPlaybackSpeed = useCallback((speed: number) => {
    dispatch(setPlaybackSpeed(speed));
  }, [dispatch]);

  /**
   * Toggle loop mode
   */
  const handleToggleLoop = useCallback(() => {
    dispatch(toggleLoop());
  }, [dispatch]);

  /**
   * Get total duration in milliseconds
   */
  const getTotalDuration = useCallback(() => {
    if (recordedNotes.length === 0) {
      return 0;
    }
    return Math.max(...recordedNotes.map(n => n.timestamp + n.duration));
  }, [recordedNotes]);

  /**
   * Format time in MM:SS
   */
  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Effect to handle playback loop
  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(playbackLoop);
    } else {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllNotes();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stopAllNotes]);

  return {
    // State
    isPlaying,
    currentPosition,
    playbackSpeed,
    loop,
    totalDuration: getTotalDuration(),
    hasRecording: recordedNotes.length > 0,
    
    // Controls
    play: handleStartPlayback,
    pause: handlePausePlayback,
    resume: handleResumePlayback,
    stop: handleStopPlayback,
    togglePlayback,
    setPlaybackSpeed: handleSetPlaybackSpeed,
    toggleLoop: handleToggleLoop,
    
    // Utilities
    formatTime,
    currentPositionFormatted: formatTime(currentPosition),
    totalDurationFormatted: formatTime(getTotalDuration()),
  };
}
