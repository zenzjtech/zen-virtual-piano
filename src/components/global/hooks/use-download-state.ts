/**
 * Hook for managing download state and message handling
 */

import { useState, useEffect, useCallback } from 'react';
import { DownloadState, DownloadMessage } from '../../../entrypoints/vp-download-ui/types';
import { MESSAGE_TYPES, TIMING } from '../../../entrypoints/vp-download-ui/utils';
import { useAppDispatch } from '../../../store/hook';
import { addCustomSheet } from '../../../store/reducers/music-sheet-slice';

interface UseDownloadStateReturn {
  downloadState: DownloadState;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  initiateDownload: () => void;
}

export const useDownloadState = (): UseDownloadStateReturn => {
  const [downloadState, setDownloadState] = useState<DownloadState>({ status: 'idle' });
  const [showToast, setShowToast] = useState(false);
  const dispatch = useAppDispatch();

  // Listen for messages from content script
  useEffect(() => {
    const handleMessage = (event: MessageEvent<DownloadMessage>) => {
      if (event.data.type === MESSAGE_TYPES.DOWNLOAD_SUCCESS) {
        // Save complete sheet to Redux store
        dispatch(addCustomSheet(event.data.sheet));

        setDownloadState({
          status: 'success',
          message: `"${event.data.sheet.title}" added to library & copied to clipboard!`,
        });
        setShowToast(true);

        // Reset to idle after delay
        setTimeout(() => {
          setDownloadState({ status: 'idle' });
        }, TIMING.STATE_RESET_DELAY);
      } else if (event.data.type === MESSAGE_TYPES.DOWNLOAD_ERROR) {
        setDownloadState({
          status: 'error',
          message: event.data.error || 'Failed to download sheet',
        });
        setShowToast(true);

        // Reset to idle after delay
        setTimeout(() => {
          setDownloadState({ status: 'idle' });
        }, TIMING.STATE_RESET_DELAY);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Initiate download by sending message to parent
  const initiateDownload = useCallback(() => {
    setDownloadState({ status: 'downloading' });
    window.parent.postMessage({ type: MESSAGE_TYPES.SCRAPE_AND_DOWNLOAD }, '*');
  }, []);

  return {
    downloadState,
    showToast,
    setShowToast,
    initiateDownload,
  };
};
