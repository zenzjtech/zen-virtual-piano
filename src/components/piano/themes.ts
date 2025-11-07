/**
 * Piano visual themes
 * Each theme defines the visual appearance of the piano container and keys
 * 
 * This file re-exports from the themes folder for backward compatibility
 */

// Re-export everything from the themes folder
export type { PianoTheme } from './themes/index';
export {
  PIANO_THEMES,
  getTheme,
  getAllThemes,
  getLightingStyles,
  wooden,
  black,
  metal,
  white,
  roseGold,
  mahogany,
  nordicIce,
  tibetanWood,
} from './themes/index';
