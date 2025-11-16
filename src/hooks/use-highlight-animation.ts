import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hook';
import { useNotification } from '@/contexts/notification-context';
import { useAppConfig } from '#imports';

/**
 * Hook to detect and manage highlight animation based on URL timestamp parameter
 * Triggers animation when piano page is opened via download button within 20 seconds
 */
export const useHighlightAnimation = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { showNotification } = useNotification();
  const config = useAppConfig();

  // Get current sheet information from Redux
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightParam = urlParams.get('highlight');

    if (highlightParam) {
      const timestamp = parseInt(highlightParam, 10);
      const now = Date.now();
      const timeDiff = now - timestamp;

      // Check if timestamp is within 20 seconds
      if (timeDiff >= 0 && timeDiff <= config.app.highlightAnimationDelay) {
        setIsHighlighted(true);

        // Show notification with song information
        if (currentSheet) {
          const notificationMessage = `🎵 "${currentSheet.title}" by ${currentSheet.artist.name} has been added to your sheet library!`;
          showNotification(notificationMessage, 'success');
        }

        // Remove the parameter from URL to clean it up
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);

        // Animation duration - keep highlighted for a few seconds
        const animationDuration = config.app.highlightAnimationDuration;
        setTimeout(() => {
          setIsHighlighted(false);
        }, animationDuration);
      }
    }
  }, [currentSheet, showNotification]);

  return { isHighlighted };
};
