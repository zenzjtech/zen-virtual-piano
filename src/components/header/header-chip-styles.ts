import type { SxProps, Theme } from '@mui/material';

/**
 * Defines the style for the Beta chip based on the background theme.
 * @param themeId The ID of the current background theme.
 * @param isDark Whether the theme is dark.
 * @returns The SX properties for the Chip component.
 */
export const getChipStyle = (themeId: string, isDark: boolean): SxProps<Theme> => {
  const baseStyle: SxProps<Theme> = {
    ml: 1,
    fontWeight: 'bold',
    border: 'none',
    height: '20px',
    fontSize: '0.7rem',
  };

  switch (themeId) {
    // Classic & Minimalist
    case 'white':
      return { ...baseStyle, backgroundColor: '#f0f0f0', color: '#333' };
    case 'light-gray':
      return { ...baseStyle, backgroundColor: '#e0e0e0', color: '#333' };
    case 'warm':
      return { ...baseStyle, backgroundColor: '#EADDCC', color: '#5D4037' };
    case 'cool':
      return { ...baseStyle, backgroundColor: '#DDE5ED', color: '#3E5A78' };
    case 'dark':
      return { ...baseStyle, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff' };

    // Gradients
    case 'gradient-sunset':
      return { ...baseStyle, backgroundColor: 'rgba(255, 255, 255, 0.3)', color: '#fff' };
    case 'gradient-ocean':
      return { ...baseStyle, backgroundColor: 'rgba(255, 255, 255, 0.3)', color: '#fff' };
    case 'gradient-forest':
      return { ...baseStyle, backgroundColor: 'rgba(0, 0, 0, 0.2)', color: '#fff' };

    // Cultural & Artistic
    case 'morning-sky':
      return { ...baseStyle, backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#003C5A' };
    case 'gufeng-ink-jade':
      return { ...baseStyle, backgroundColor: '#A7C4B5', color: '#1A2E28' };
    case 'gufeng-vermillion-gold':
      return { ...baseStyle, backgroundColor: '#F4E5A1', color: '#8B3A3A' };
    case 'zen-sakura-dawn':
      return { ...baseStyle, backgroundColor: '#FFA8B8', color: '#5C273D' };
    case 'zen-bamboo-stone':
      return { ...baseStyle, backgroundColor: '#8B9D83', color: '#3A4A38' };
    case 'leela-saffron-marigold':
      return { ...baseStyle, backgroundColor: '#FF9933', color: '#662200' };
    case 'leela-peacock-divine':
      return { ...baseStyle, backgroundColor: '#4A90E2', color: '#fff' };
    case 'isha-earth-mystic':
      return { ...baseStyle, backgroundColor: '#B8956A', color: '#4A4458' };
    case 'sacred-light-glory':
      return { ...baseStyle, backgroundColor: '#FFD700', color: '#2F4F7F' };
    case 'islamic-emerald-gold':
      return { ...baseStyle, backgroundColor: '#DAA520', color: '#004D40' };

    // Default fallback
    default:
      return {
        ...baseStyle,
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)',
        color: isDark ? 'common.white' : 'common.black',
      };
  }
};
