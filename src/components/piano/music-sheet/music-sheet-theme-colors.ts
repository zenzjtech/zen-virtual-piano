/**
 * Color schemes for music sheet themes
 * Each theme has colors that complement its background image
 */

export interface MusicSheetThemeColors {
  /** Primary text/icon color */
  primary: string;
  /** Accent color for hover/active states */
  accent: string;
  /** Button background color (with transparency) */
  background: string;
  /** Border color */
  border: string;
  /** Shadow color for hover effects */
  shadow: string;
}

/**
 * Get color scheme for a music sheet theme
 */
export const getMusicSheetThemeColors = (themeId: string): MusicSheetThemeColors => {
  switch (themeId) {
    case 'paper-2': // Modern Paper - cooler tones
      return {
        primary: '#2c3e50',
        accent: '#3498db',
        background: 'rgba(255, 255, 255, 0.85)',
        border: 'rgba(52, 152, 219, 0.3)',
        shadow: '52, 152, 219',
      };
    
    case 'paper-3': // Aged Paper - warm vintage tones
      return {
        primary: '#5d4037',
        accent: '#d4a574',
        background: 'rgba(245, 235, 220, 0.85)',
        border: 'rgba(212, 165, 116, 0.4)',
        shadow: '212, 165, 116',
      };
    
    case 'paper-1': // Vintage Paper - classic warm tones
    default:
      return {
        primary: '#4a3728',
        accent: '#c9a86a',
        background: 'rgba(250, 245, 235, 0.85)',
        border: 'rgba(201, 168, 106, 0.4)',
        shadow: '201, 168, 106',
      };
  }
};
