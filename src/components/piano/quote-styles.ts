/**
 * Quote style configuration for theme-aware quote display
 */

/**
 * Quote style configuration interface
 */
export interface QuoteStyle {
  textFontSize: { md: string; lg: string };
  textFontWeight: number;
  textOpacity: number;
  textLetterSpacing: string;
  authorFontSize: { md: string; lg: string };
  authorFontWeight: number;
  authorOpacity: number;
  fontStyle?: 'normal' | 'italic';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

/**
 * Predefined quote styles by category
 */
export const QUOTE_STYLES = {
  classic: {
    textFontSize: { md: '0.75rem', lg: '0.85rem' },
    textFontWeight: 500,
    textOpacity: 0.9,
    textLetterSpacing: '0.02em',
    authorFontSize: { md: '0.65rem', lg: '0.7rem' },
    authorFontWeight: 400,
    authorOpacity: 0.7,
    fontStyle: 'normal' as const,
  },
  modern: {
    textFontSize: { md: '0.8rem', lg: '0.9rem' },
    textFontWeight: 400,
    textOpacity: 0.85,
    textLetterSpacing: '0em',
    authorFontSize: { md: '0.65rem', lg: '0.7rem' },
    authorFontWeight: 300,
    authorOpacity: 0.65,
    fontStyle: 'normal' as const,
  },
  cultural: {
    textFontSize: { md: '0.75rem', lg: '0.85rem' },
    textFontWeight: 500,
    textOpacity: 0.88,
    textLetterSpacing: '0.03em',
    authorFontSize: { md: '0.65rem', lg: '0.7rem' },
    authorFontWeight: 400,
    authorOpacity: 0.72,
    fontStyle: 'normal' as const,
  },
  nature: {
    textFontSize: { md: '0.75rem', lg: '0.85rem' },
    textFontWeight: 450,
    textOpacity: 0.87,
    textLetterSpacing: '0.01em',
    authorFontSize: { md: '0.65rem', lg: '0.7rem' },
    authorFontWeight: 400,
    authorOpacity: 0.68,
    fontStyle: 'normal' as const,
  },
  artistic: {
    textFontSize: { md: '0.8rem', lg: '0.9rem' },
    textFontWeight: 400,
    textOpacity: 0.9,
    textLetterSpacing: '0.02em',
    authorFontSize: { md: '0.7rem', lg: '0.75rem' },
    authorFontWeight: 400,
    authorOpacity: 0.75,
    fontStyle: 'italic' as const,
  },
  vintage: {
    textFontSize: { md: '0.75rem', lg: '0.85rem' },
    textFontWeight: 500,
    textOpacity: 0.88,
    textLetterSpacing: '0.02em',
    authorFontSize: { md: '0.65rem', lg: '0.7rem' },
    authorFontWeight: 400,
    authorOpacity: 0.7,
    fontStyle: 'normal' as const,
  },
  professional: {
    textFontSize: { md: '0.75rem', lg: '0.85rem' },
    textFontWeight: 450,
    textOpacity: 0.82,
    textLetterSpacing: '0em',
    authorFontSize: { md: '0.6rem', lg: '0.65rem' },
    authorFontWeight: 400,
    authorOpacity: 0.6,
    fontStyle: 'normal' as const,
  },
  romantic: {
    textFontSize: { md: '0.8rem', lg: '0.9rem' },
    textFontWeight: 400,
    textOpacity: 0.92,
    textLetterSpacing: '0.02em',
    authorFontSize: { md: '0.7rem', lg: '0.75rem' },
    authorFontWeight: 400,
    authorOpacity: 0.78,
    fontStyle: 'italic' as const,
  },
  energetic: {
    textFontSize: { md: '0.75rem', lg: '0.85rem' },
    textFontWeight: 600,
    textOpacity: 0.9,
    textLetterSpacing: '0.05em',
    authorFontSize: { md: '0.65rem', lg: '0.7rem' },
    authorFontWeight: 500,
    authorOpacity: 0.7,
    fontStyle: 'normal' as const,
    textTransform: 'uppercase' as const,
  },
  minimalist: {
    textFontSize: { md: '0.75rem', lg: '0.85rem' },
    textFontWeight: 300,
    textOpacity: 0.75,
    textLetterSpacing: '0em',
    authorFontSize: { md: '0.6rem', lg: '0.65rem' },
    authorFontWeight: 300,
    authorOpacity: 0.55,
    fontStyle: 'normal' as const,
  },
  luxurious: {
    textFontSize: { md: '0.8rem', lg: '0.9rem' },
    textFontWeight: 300,
    textOpacity: 0.95,
    textLetterSpacing: '0.08em',
    authorFontSize: { md: '0.7rem', lg: '0.75rem' },
    authorFontWeight: 300,
    authorOpacity: 0.8,
    fontStyle: 'normal' as const,
  },
} as const;
