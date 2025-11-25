import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hook';
import { useNotification } from '@/contexts/notification-context';
import { useTranslation } from '@/hooks/use-translation';
import { pauseSheet } from '@/store/reducers/music-sheet-slice';

interface PlaybackMutexOptions {
  /** Whether sheet music is currently playing */
  isSheetPlaying: boolean;
  /** Whether recording playback is currently playing */
  isRecordingPlaying: boolean;
  /** Recording playback pause function */
  pauseRecordingPlayback: () => void;
  /** Notification callback */
  showNotification: (message: string, type: 'info' | 'success' | 'error') => void;
}

/**
 * Custom hook to handle mutual exclusivity between sheet music playback and recording playback.
 * When one starts playing, it automatically pauses the other.
 * 
 * @param options - Configuration options for playback mutex
 */
export function usePlaybackMutex({
  isSheetPlaying,
  isRecordingPlaying,
  pauseRecordingPlayback,
  showNotification,
}: PlaybackMutexOptions) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('notifications');

  // Track previous states to detect transitions
  const prevIsSheetPlayingRef = useRef(isSheetPlaying);
  const prevIsRecordingPlayingRef = useRef(isRecordingPlaying);

  // Mutual exclusivity: pause recording playback when sheet music starts playing
  useEffect(() => {
    // Only trigger when sheet music STARTS playing (transition from false to true)
    if (isSheetPlaying && !prevIsSheetPlayingRef.current && isRecordingPlaying) {
      pauseRecordingPlayback();
      showNotification(t('recordingPlaybackPaused'), 'info');
    }
    prevIsSheetPlayingRef.current = isSheetPlaying;
  }, [isSheetPlaying, isRecordingPlaying, pauseRecordingPlayback, showNotification, t]);

  // Mutual exclusivity: pause sheet music when recording playback starts
  useEffect(() => {
    // Only trigger when recording STARTS playing (transition from false to true)
    if (isRecordingPlaying && !prevIsRecordingPlayingRef.current && isSheetPlaying) {
      dispatch(pauseSheet());
      showNotification(t('sheetMusicPaused'), 'info');
    }
    prevIsRecordingPlayingRef.current = isRecordingPlaying;
  }, [isRecordingPlaying, isSheetPlaying, dispatch, showNotification, t]);
}
