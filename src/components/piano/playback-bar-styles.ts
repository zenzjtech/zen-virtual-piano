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
    containerBackground: { dark: 'rgba(255, 255, 255, 0.04)', light: 'rgba(0, 0, 0, 0.03)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.08)' },
    containerShadow: { dark: '0 2px 8px rgba(0, 0, 0, 0.15)', light: '0 2px 8px rgba(0, 0, 0, 0.06)' },
    containerBlur: 'blur(8px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '12px', normal: '12px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.9,
    timeOpacity: 0.85,
    speedOpacity: 0.85,
  },
  modern: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.03)', light: 'rgba(0, 0, 0, 0.02)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.06)' },
    containerShadow: { dark: '0 1px 6px rgba(0, 0, 0, 0.12)', light: '0 1px 6px rgba(0, 0, 0, 0.04)' },
    containerBlur: 'blur(10px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '10px', normal: '10px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.85,
    timeOpacity: 0.8,
    speedOpacity: 0.8,
  },
  cultural: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.05)', light: 'rgba(0, 0, 0, 0.04)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.15)', light: 'rgba(0, 0, 0, 0.10)' },
    containerShadow: { dark: '0 2px 10px rgba(0, 0, 0, 0.18)', light: '0 2px 10px rgba(0, 0, 0, 0.08)' },
    containerBlur: 'blur(6px)',
    containerPadding: { compact: { x: 2, y: 0.75 }, normal: { x: 2.5, y: 2 } },
    containerBorderRadius: { compact: '14px', normal: '14px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.88,
    timeOpacity: 0.85,
    speedOpacity: 0.85,
  },
  nature: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.04)', light: 'rgba(0, 0, 0, 0.025)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.07)' },
    containerShadow: { dark: '0 2px 8px rgba(0, 0, 0, 0.14)', light: '0 2px 8px rgba(0, 0, 0, 0.05)' },
    containerBlur: 'blur(7px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '12px', normal: '12px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.87,
    timeOpacity: 0.82,
    speedOpacity: 0.82,
  },
  artistic: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.045)', light: 'rgba(0, 0, 0, 0.035)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.08)' },
    containerShadow: { dark: '0 3px 12px rgba(0, 0, 0, 0.16)', light: '0 3px 12px rgba(0, 0, 0, 0.07)' },
    containerBlur: 'blur(9px)',
    containerPadding: { compact: { x: 2, y: 0.75 }, normal: { x: 2.5, y: 2 } },
    containerBorderRadius: { compact: '16px', normal: '16px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.9,
    timeOpacity: 0.85,
    speedOpacity: 0.85,
  },
  vintage: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.05)', light: 'rgba(0, 0, 0, 0.04)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.14)', light: 'rgba(0, 0, 0, 0.09)' },
    containerShadow: { dark: '0 2px 9px rgba(0, 0, 0, 0.17)', light: '0 2px 9px rgba(0, 0, 0, 0.07)' },
    containerBlur: 'blur(7px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '12px', normal: '12px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.88,
    timeOpacity: 0.83,
    speedOpacity: 0.83,
  },
  professional: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.03)', light: 'rgba(0, 0, 0, 0.02)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.05)' },
    containerShadow: { dark: '0 1px 5px rgba(0, 0, 0, 0.10)', light: '0 1px 5px rgba(0, 0, 0, 0.03)' },
    containerBlur: 'blur(10px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '10px', normal: '10px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.82,
    timeOpacity: 0.78,
    speedOpacity: 0.78,
  },
  romantic: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.04)', light: 'rgba(0, 0, 0, 0.03)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.07)' },
    containerShadow: { dark: '0 3px 10px rgba(0, 0, 0, 0.15)', light: '0 3px 10px rgba(0, 0, 0, 0.06)' },
    containerBlur: 'blur(8px)',
    containerPadding: { compact: { x: 2, y: 0.75 }, normal: { x: 2.5, y: 2 } },
    containerBorderRadius: { compact: '14px', normal: '14px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.92,
    timeOpacity: 0.88,
    speedOpacity: 0.88,
  },
  energetic: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.045)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.16)', light: 'rgba(0, 0, 0, 0.10)' },
    containerShadow: { dark: '0 2px 10px rgba(0, 0, 0, 0.20)', light: '0 2px 10px rgba(0, 0, 0, 0.08)' },
    containerBlur: 'blur(6px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '10px', normal: '10px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.9,
    timeOpacity: 0.85,
    speedOpacity: 0.85,
  },
  minimalist: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.02)', light: 'rgba(0, 0, 0, 0.015)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.04)' },
    containerShadow: { dark: '0 1px 4px rgba(0, 0, 0, 0.08)', light: '0 1px 4px rgba(0, 0, 0, 0.02)' },
    containerBlur: 'blur(12px)',
    containerPadding: { compact: { x: 1.5, y: 0.5 }, normal: { x: 2, y: 1.5 } },
    containerBorderRadius: { compact: '8px', normal: '8px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.65rem', normal: '0.75rem' },
    speedFontSize: { compact: '0.7rem', normal: '0.85rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.75,
    timeOpacity: 0.7,
    speedOpacity: 0.7,
  },
  luxurious: {
    containerBackground: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.05)' },
    containerBorder: { dark: 'rgba(255, 255, 255, 0.18)', light: 'rgba(0, 0, 0, 0.12)' },
    containerShadow: { dark: '0 4px 14px rgba(0, 0, 0, 0.22)', light: '0 4px 14px rgba(0, 0, 0, 0.10)' },
    containerBlur: 'blur(8px)',
    containerPadding: { compact: { x: 2.5, y: 0.75 }, normal: { x: 3, y: 2.5 } },
    containerBorderRadius: { compact: '16px', normal: '16px' },
    buttonSize: { compact: 'small' as const, normal: 'small' as const },
    iconFontSize: { compact: 'small', normal: 'medium' },
    timeFontSize: { compact: '0.7rem', normal: '0.8rem' },
    speedFontSize: { compact: '0.75rem', normal: '0.9rem' },
    fontFamily: 'monospace',
    buttonOpacity: 0.95,
    timeOpacity: 0.9,
    speedOpacity: 0.9,
  },
} as const;
