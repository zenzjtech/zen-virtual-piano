/**
 * Hook for managing download state and message handling
 */

import { useState, useEffect, useCallback } from 'react';
import { DownloadState, DownloadMessage } from '../../../entrypoints/vp-download-ui/types';
import { MESSAGE_TYPES, TIMING } from '../../../entrypoints/vp-download-ui/utils';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { addCustomSheet } from '../../../store/reducers/music-sheet-slice';
import { useAppConfig } from '#imports'

interface UseDownloadStateReturn {
  downloadState: DownloadState;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  initiateDownload: () => void;
  sheetInfo: { title: string; artist: string } | null;
}

export const useDownloadState = (): UseDownloadStateReturn => {
  const [downloadState, setDownloadState] = useState<DownloadState>({ status: 'idle' });
  const [showToast, setShowToast] = useState(false);
  const [sheetInfo, setSheetInfo] = useState<{ title: string; artist: string } | null>(null);
  const dispatch = useAppDispatch();
  const lastRemovedSheet = useAppSelector((state) => state.musicSheet.lastRemovedSheet);

  // Listen for messages from content script
  useEffect(() => {
    const handleMessage = (event: MessageEvent<DownloadMessage>) => {      
      if (event.data.type === MESSAGE_TYPES.SHEET_DETECTED) {
        setSheetInfo({
          title: event.data.title,
          artist: event.data.artist,
        });

        setDownloadState({
          status: 'success',
          message: `"${event.data.title}" by ${event.data.artist} detected!`,
        });
        setShowToast(true);

        // Reset to idle after delay
        setTimeout(() => {
          setDownloadState({ status: 'idle' });
        }, TIMING.STATE_RESET_DELAY);
      } else if (event.data.type === MESSAGE_TYPES.DOWNLOAD_SUCCESS) {
        // Save complete sheet to Redux store
        dispatch(addCustomSheet(event.data.sheet));

        // Check if a sheet was removed due to limit (FIFO)
        let message = `"${event.data.sheet.title}" added to library & copied to clipboard!`;
        let status: 'success' | 'warning' = 'success';
        
        if (lastRemovedSheet) {
          message = `"${event.data.sheet.title}" added! "${lastRemovedSheet.title}" was removed (${useAppConfig().maxCustomSheets} sheet limit).`;
          status = 'warning';
        }

        setDownloadState({
          status,
          message,
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
  }, [dispatch, lastRemovedSheet]);

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
    sheetInfo,
  };
};
