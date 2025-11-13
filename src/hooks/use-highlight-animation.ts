import { useState, useEffect } from 'react';

/**
 * Hook to detect and manage highlight animation based on URL timestamp parameter
 * Triggers animation when piano page is opened via download button within 10 seconds
 */
export const useHighlightAnimation = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightParam = urlParams.get('highlight');

    if (highlightParam) {
      const timestamp = parseInt(highlightParam, 10);
      const now = Date.now();
      const timeDiff = now - timestamp;

      // Check if timestamp is within 10 seconds
      if (timeDiff >= 0 && timeDiff <= 20000) {
        setIsHighlighted(true);

        // Remove the parameter from URL to clean it up
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);

        // Animation duration - keep highlighted for a few seconds
        const animationDuration = 10000; // 3 seconds
        setTimeout(() => {
          setIsHighlighted(false);
        }, animationDuration);
      }
    }
  }, []);

  return { isHighlighted };
};
