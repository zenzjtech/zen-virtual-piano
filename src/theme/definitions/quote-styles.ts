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
  // Visual enhancement properties
  containerBackground?: { dark: string; light: string };
  containerBorder?: { dark: string; light: string };
  containerShadow?: { dark: string; light: string };
  containerBlur?: string;
  containerPadding?: { md: number; lg: number };
  containerBorderRadius?: string;
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.04)', light: 'rgba(0, 0, 0, 0.03)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.08)' },
    containerShadow: { dark: '0 2px 8px rgba(0, 0, 0, 0.15)', light: '0 2px 8px rgba(0, 0, 0, 0.06)' },
    containerBlur: 'blur(8px)',
    containerPadding: { md: 1.5, lg: 2 },
    containerBorderRadius: '12px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.03)', light: 'rgba(0, 0, 0, 0.02)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.06)' },
    containerShadow: { dark: '0 1px 6px rgba(0, 0, 0, 0.12)', light: '0 1px 6px rgba(0, 0, 0, 0.04)' },
    containerBlur: 'blur(10px)',
    containerPadding: { md: 1.5, lg: 2 },
    containerBorderRadius: '10px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.05)', light: 'rgba(0, 0, 0, 0.04)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.15)', light: 'rgba(0, 0, 0, 0.10)' },
    containerShadow: { dark: '0 2px 10px rgba(0, 0, 0, 0.18)', light: '0 2px 10px rgba(0, 0, 0, 0.08)' },
    containerBlur: 'blur(6px)',
    containerPadding: { md: 2, lg: 2.5 },
    containerBorderRadius: '14px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.04)', light: 'rgba(0, 0, 0, 0.025)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.07)' },
    containerShadow: { dark: '0 2px 8px rgba(0, 0, 0, 0.14)', light: '0 2px 8px rgba(0, 0, 0, 0.05)' },
    containerBlur: 'blur(7px)',
    containerPadding: { md: 1.5, lg: 2 },
    containerBorderRadius: '12px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.045)', light: 'rgba(0, 0, 0, 0.035)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.08)' },
    containerShadow: { dark: '0 3px 12px rgba(0, 0, 0, 0.16)', light: '0 3px 12px rgba(0, 0, 0, 0.07)' },
    containerBlur: 'blur(9px)',
    containerPadding: { md: 2, lg: 2.5 },
    containerBorderRadius: '16px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.05)', light: 'rgba(0, 0, 0, 0.04)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.14)', light: 'rgba(0, 0, 0, 0.09)' },
    containerShadow: { dark: '0 2px 9px rgba(0, 0, 0, 0.17)', light: '0 2px 9px rgba(0, 0, 0, 0.07)' },
    containerBlur: 'blur(7px)',
    containerPadding: { md: 1.5, lg: 2 },
    containerBorderRadius: '12px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.03)', light: 'rgba(0, 0, 0, 0.02)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.05)' },
    containerShadow: { dark: '0 1px 5px rgba(0, 0, 0, 0.10)', light: '0 1px 5px rgba(0, 0, 0, 0.03)' },
    containerBlur: 'blur(10px)',
    containerPadding: { md: 1.5, lg: 2 },
    containerBorderRadius: '10px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.04)', light: 'rgba(0, 0, 0, 0.03)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.07)' },
    containerShadow: { dark: '0 3px 10px rgba(0, 0, 0, 0.15)', light: '0 3px 10px rgba(0, 0, 0, 0.06)' },
    containerBlur: 'blur(8px)',
    containerPadding: { md: 2, lg: 2.5 },
    containerBorderRadius: '14px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.045)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.16)', light: 'rgba(0, 0, 0, 0.10)' },
    containerShadow: { dark: '0 2px 10px rgba(0, 0, 0, 0.20)', light: '0 2px 10px rgba(0, 0, 0, 0.08)' },
    containerBlur: 'blur(6px)',
    containerPadding: { md: 1.5, lg: 2 },
    containerBorderRadius: '10px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.02)', light: 'rgba(0, 0, 0, 0.015)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.04)' },
    containerShadow: { dark: '0 1px 4px rgba(0, 0, 0, 0.08)', light: '0 1px 4px rgba(0, 0, 0, 0.02)' },
    containerBlur: 'blur(12px)',
    containerPadding: { md: 1.5, lg: 2 },
    containerBorderRadius: '8px',
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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.05)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.18)', light: 'rgba(0, 0, 0, 0.12)' },
    containerShadow: { dark: '0 4px 14px rgba(0, 0, 0, 0.22)', light: '0 4px 14px rgba(0, 0, 0, 0.10)' },
    containerBlur: 'blur(8px)',
    containerPadding: { md: 2.5, lg: 3 },
    containerBorderRadius: '16px',
  },
} as const;
