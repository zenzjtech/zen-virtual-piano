/**
 * Header typography style definitions based on theme aesthetics
 */

import type { SxProps, Theme } from '@mui/material';

/**
 * Header typography style variants
 */
export type HeaderTypographyStyle = 
  | 'classic-serif'      // Traditional, elegant serif (Playfair Display)
  | 'modern-sans'        // Clean, minimalist sans-serif (Inter)
  | 'cultural-serif'     // Universal, respectful serif (Noto Serif)
  | 'nature-serif'       // Organic, warm serif (Lora)
  | 'artistic-italic'    // Expressive, flowing italic serif (Merriweather)
  | 'energetic-bold'     // Dynamic, uppercase sans (Montserrat)
  | 'luxurious-light'    // Refined, spacious serif (Cormorant Garamond)
  | 'tibetan-serif';     // Authentic Tibetan script (Noto Serif Tibetan)

/**
 * Get typography style based on header style variant
 */
export const getHeaderTypographyStyle = (
  style: HeaderTypographyStyle,
  textColor: string
): SxProps<Theme> => {
  const baseStyle = {
    color: textColor,
    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
  };

  switch (style) {
    case 'classic-serif':
      return {
        ...baseStyle,
        fontWeight: 600,
        fontFamily: '"Playfair Display", "Georgia", serif',
        letterSpacing: '0.02em',
      };

    case 'modern-sans':
      return {
        ...baseStyle,
        fontWeight: 500,
        fontFamily: '"Inter", "SF Pro Display", "Helvetica Neue", sans-serif',
        letterSpacing: '-0.01em',
      };

    case 'cultural-serif':
      return {
        ...baseStyle,
        fontWeight: 500,
        fontFamily: '"Noto Serif", "Georgia", serif',
        letterSpacing: '0.03em',
      };

    case 'nature-serif':
      return {
        ...baseStyle,
        fontWeight: 500,
        fontFamily: '"Lora", "Georgia", serif',
        letterSpacing: '0.01em',
      };

    case 'artistic-italic':
      return {
        ...baseStyle,
        fontWeight: 400,
        fontFamily: '"Merriweather", "Georgia", serif',
        letterSpacing: '0.02em',
        fontStyle: 'italic' as const,
      };

    case 'energetic-bold':
      return {
        ...baseStyle,
        fontWeight: 700,
        fontFamily: '"Montserrat", "Helvetica Neue", sans-serif',
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
      };

    case 'luxurious-light':
      return {
        ...baseStyle,
        fontWeight: 300,
        fontFamily: '"Cormorant Garamond", "Georgia", serif',
        letterSpacing: '0.08em',
      };

    case 'tibetan-serif':
      return {
        ...baseStyle,
        fontWeight: 500,
        fontFamily: '"Noto Serif Tibetan", "Noto Sans Tibetan", "Noto Serif", serif',
        letterSpacing: '0.04em',
      };

    default:
      return {
        ...baseStyle,
        fontWeight: 600,
        letterSpacing: '0.01em',
      };
  }
};

/**
 * Map category to default header style (fallback)
 */
export const getCategoryDefaultStyle = (category: string): HeaderTypographyStyle => {
  switch (category) {
    case 'classic':
    case 'vintage':
      return 'classic-serif';
    case 'modern':
    case 'minimalist':
    case 'professional':
      return 'modern-sans';
    case 'cultural':
      return 'cultural-serif';
    case 'nature':
      return 'nature-serif';
    case 'artistic':
    case 'romantic':
      return 'artistic-italic';
    case 'energetic':
      return 'energetic-bold';
    case 'luxurious':
      return 'luxurious-light';
    default:
      return 'classic-serif';
  }
};
