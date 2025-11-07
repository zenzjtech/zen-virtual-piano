/**
 * Header utility functions
 */

import whitePianoIcon from '@/assets/image/instrument/piano/white.png';
import brownPianoIcon from '@/assets/image/instrument/piano/brown.png';
import blackPianoIcon from '@/assets/image/instrument/piano/black.png';

/**
 * Determine which piano icon to use based on background theme
 */
export const getPianoIcon = (
  backgroundThemeId: string,
  isDarkBackground: boolean
): string => {
  // Dark backgrounds -> white icon
  if (isDarkBackground) {
    return whitePianoIcon;
  }
  
  // Warm/golden backgrounds -> brown icon
  const warmBackgrounds = [
    'warm',
    'gufeng-vermillion-gold',
    'zen-sakura-dawn',
    'leela-saffron-marigold',
    'isha-earth-mystic',
    'sacred-light-glory',
    'islamic-emerald-gold'
  ];
  
  if (warmBackgrounds.includes(backgroundThemeId)) {
    return brownPianoIcon;
  }
  
  // Light/cool backgrounds -> black icon
  return blackPianoIcon;
};

/**
 * Get text color based on background
 */
export const getTextColor = (isDarkBackground: boolean): string => {
  return isDarkBackground ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)';
};

/**
 * Get icon color based on background
 */
export const getIconColor = (isDarkBackground: boolean): string => {
  return isDarkBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)';
};
