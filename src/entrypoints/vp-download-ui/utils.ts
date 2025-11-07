/**
 * Utility functions for the VirtualPiano download UI
 */

import { DownloadStatus } from './types';

/**
 * Message types for cross-frame communication
 */
export const MESSAGE_TYPES = {
  SCRAPE_AND_DOWNLOAD: 'SCRAPE_AND_DOWNLOAD',
  DOWNLOAD_SUCCESS: 'DOWNLOAD_SUCCESS',
  DOWNLOAD_ERROR: 'DOWNLOAD_ERROR',
} as const;

/**
 * Timing constants
 */
export const TIMING = {
  STATE_RESET_DELAY: 3000,
  RIPPLE_ANIMATION_DURATION: 600,
  TOAST_AUTO_HIDE_DURATION: 3000,
} as const;

/**
 * Get the appropriate status message based on download state
 */
export const getStatusMessage = (status: DownloadStatus): string => {
  switch (status) {
    case 'success':
      return 'Saved to library';
    case 'warning':
      return 'Limit reached';
    case 'error':
      return 'Try again';
    case 'downloading':
      return 'Processing...';
    case 'idle':
    default:
      return '';
  }
};

/**
 * Create a unique ID for ripple effects
 */
export const createRippleId = (): number => Date.now();

/**
 * Calculate ripple position relative to button
 */
export const calculateRipplePosition = (
  event: React.MouseEvent<HTMLButtonElement>
): { x: number; y: number } => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};
