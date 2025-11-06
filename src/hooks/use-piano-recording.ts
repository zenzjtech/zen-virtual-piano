import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  startRecording,
  stopRecording,
  recordNotePress,
  recordNoteRelease,
  clearRecording,
  RecordedNote,
} from '@/store/reducers/recording-slice';
import { PianoKey } from '@/components/piano/types';

/**
 * Custom hook for managing piano recording functionality
 * 
 * @returns Recording state and control functions
 */
export function usePianoRecording() {
  const dispatch = useAppDispatch();
  const { isRecording, recordedNotes } = useAppSelector((state) => state.recording);

  /**
   * Toggle recording state
   */
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      dispatch(stopRecording());
    } else {
      dispatch(startRecording());
    }
  }, [isRecording, dispatch]);

  /**
   * Start a new recording session
   */
  const handleStartRecording = useCallback(() => {
    dispatch(startRecording());
  }, [dispatch]);

  /**
   * Stop the current recording session
   */
  const handleStopRecording = useCallback(() => {
    dispatch(stopRecording());
  }, [dispatch]);

  /**
   * Clear all recorded notes
   */
  const handleClearRecording = useCallback(() => {
    dispatch(clearRecording());
  }, [dispatch]);

  /**
   * Record a note press event
   */
  const handleNotePress = useCallback((note: string, velocity?: number) => {
    // Dispatch always - the reducer checks isRecording state
    dispatch(recordNotePress({ note, velocity }));
  }, [dispatch]);

  /**
   * Record a note release event
   */
  const handleNoteRelease = useCallback((note: string) => {
    // Dispatch always - the reducer checks isRecording state  
    dispatch(recordNoteRelease({ note }));
  }, [dispatch]);

  /**
   * Export recording as JSON
   */
  const exportRecording = useCallback(() => {
    if (recordedNotes.length === 0) {
      return null;
    }

    const recording = {
      notes: recordedNotes,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };

    return JSON.stringify(recording, null, 2);
  }, [recordedNotes]);

  /**
   * Download recording as a JSON file
   */
  const downloadRecording = useCallback(() => {
    const jsonData = exportRecording();
    if (!jsonData) {
      return;
    }

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `piano-recording-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [exportRecording]);

  /**
   * Get recording duration in milliseconds
   */
  const getRecordingDuration = useCallback(() => {
    if (recordedNotes.length === 0) {
      return 0;
    }

    const lastNote = recordedNotes[recordedNotes.length - 1];
    return lastNote.timestamp + lastNote.duration;
  }, [recordedNotes]);

  /**
   * Format recording duration as MM:SS
   */
  const getFormattedDuration = useCallback(() => {
    const durationMs = getRecordingDuration();
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [getRecordingDuration]);

  return {
    // State
    isRecording,
    recordedNotes,
    noteCount: recordedNotes.length,
    
    // Control functions
    toggleRecording,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
    clearRecording: handleClearRecording,
    
    // Note events
    recordNotePress: handleNotePress,
    recordNoteRelease: handleNoteRelease,
    
    // Export functions
    exportRecording,
    downloadRecording,
    
    // Utility functions
    getRecordingDuration,
    getFormattedDuration,
  };
}
