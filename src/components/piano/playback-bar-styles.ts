/**
 * Playback bar style configuration for theme-aware display
 */

/**
 * Playback bar style configuration interface
 */
export interface PlaybackBarStyle {
  // Container properties
  containerBackground?: { dark: string; light: string };
  containerBorder?: { dark: string; light: string };
  containerShadow?: { dark: string; light: string };
  containerBlur?: string;
  containerPadding?: { compact: { x: number; y: number }; normal: { x: number; y: number } };
  containerBorderRadius?: { compact: string; normal: string };
  
  // Button properties
  buttonSize?: { compact: 'small' | 'medium'; normal: 'small' | 'medium' };
  iconFontSize?: { compact: string; normal: string };
  
  // Typography
  timeFontSize?: { compact: string; normal: string };
  speedFontSize?: { compact: string; normal: string };
  fontFamily?: string;
  
  // Colors (opacity multipliers for theme colors)
  buttonOpacity?: number;
  timeOpacity?: number;
  speedOpacity?: number;
}

/**
 * Predefined playback bar styles by category
 */
export const PLAYBACK_BAR_STYLES = {
  classic: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.06)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.2)', light: 'rgba(0, 0, 0, 0.15)' },
    containerShadow: { dark: '0 2px 8px rgba(0, 0, 0, 0.2)', light: '0 2px 8px rgba(0, 0, 0, 0.1)' },
    containerBlur: 'blur(4px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '12px', normal: '12px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  modern: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.07)', light: 'rgba(0, 0, 0, 0.05)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.18)', light: 'rgba(0, 0, 0, 0.12)' },
    containerShadow: { dark: '0 1px 6px rgba(0, 0, 0, 0.15)', light: '0 1px 6px rgba(0, 0, 0, 0.08)' },
    containerBlur: 'blur(3px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '10px', normal: '10px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  cultural: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.12)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.28)', light: 'rgba(0, 0, 0, 0.25)' },
    containerShadow: { dark: '0 2px 10px rgba(0, 0, 0, 0.25)', light: '0 2px 10px rgba(0, 0, 0, 0.18)' },
    containerBlur: 'blur(2px)',
    containerPadding: { compact: { x: 2, y: 0.75 }, normal: { x: 2.5, y: 2 } },
    containerBorderRadius: { compact: '14px', normal: '14px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  nature: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.055)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.18)', light: 'rgba(0, 0, 0, 0.13)' },
    containerShadow: { dark: '0 2px 8px rgba(0, 0, 0, 0.18)', light: '0 2px 8px rgba(0, 0, 0, 0.09)' },
    containerBlur: 'blur(4px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '12px', normal: '12px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  artistic: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.065)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.2)', light: 'rgba(0, 0, 0, 0.14)' },
    containerShadow: { dark: '0 3px 12px rgba(0, 0, 0, 0.2)', light: '0 3px 12px rgba(0, 0, 0, 0.11)' },
    containerBlur: 'blur(4px)',
    containerPadding: { compact: { x: 2, y: 0.75 }, normal: { x: 2.5, y: 2 } },
    containerBorderRadius: { compact: '16px', normal: '16px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  vintage: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.09)', light: 'rgba(0, 0, 0, 0.07)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.21)', light: 'rgba(0, 0, 0, 0.15)' },
    containerShadow: { dark: '0 2px 9px rgba(0, 0, 0, 0.21)', light: '0 2px 9px rgba(0, 0, 0, 0.11)' },
    containerBlur: 'blur(4px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '12px', normal: '12px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  professional: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.07)', light: 'rgba(0, 0, 0, 0.05)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.16)', light: 'rgba(0, 0, 0, 0.11)' },
    containerShadow: { dark: '0 1px 5px rgba(0, 0, 0, 0.14)', light: '0 1px 5px rgba(0, 0, 0, 0.07)' },
    containerBlur: 'blur(3px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '10px', normal: '10px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  romantic: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.06)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.18)', light: 'rgba(0, 0, 0, 0.13)' },
    containerShadow: { dark: '0 3px 10px rgba(0, 0, 0, 0.19)', light: '0 3px 10px rgba(0, 0, 0, 0.10)' },
    containerBlur: 'blur(4px)',
    containerPadding: { compact: { x: 2, y: 0.75 }, normal: { x: 2.5, y: 2 } },
    containerBorderRadius: { compact: '14px', normal: '14px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  energetic: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.075)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.24)', light: 'rgba(0, 0, 0, 0.16)' },
    containerShadow: { dark: '0 2px 10px rgba(0, 0, 0, 0.24)', light: '0 2px 10px rgba(0, 0, 0, 0.12)' },
    containerBlur: 'blur(3px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '10px', normal: '10px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
  minimalist: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.045)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.14)', light: 'rgba(0, 0, 0, 0.10)' },
    containerShadow: { dark: '0 1px 4px rgba(0, 0, 0, 0.12)', light: '0 1px 4px rgba(0, 0, 0, 0.06)' },
    containerBlur: 'blur(2px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '8px', normal: '8px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.92,
    speedOpacity: 0.92,
  },
  luxurious: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.08)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.25)', light: 'rgba(0, 0, 0, 0.18)' },
    containerShadow: { dark: '0 4px 14px rgba(0, 0, 0, 0.26)', light: '0 4px 14px rgba(0, 0, 0, 0.14)' },
    containerBlur: 'blur(4px)',
    containerPadding: { compact: { x: 2.5, y: 0.75 }, normal: { x: 3, y: 2.5 } },
    containerBorderRadius: { compact: '16px', normal: '16px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.7rem', normal: '0.8rem' },
    speedFontSize: { compact: '0.75rem', normal: '0.9rem' },
    fontFamily: 'monospace',
    buttonOpacity: 1.0,
    timeOpacity: 0.95,
    speedOpacity: 0.95,
  },
} as const;
