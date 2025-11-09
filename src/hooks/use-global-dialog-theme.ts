/**
 * Unified dialog theme hook
 * Provides consistent, background-aware styling for all dialogs
 * Reads directly from Redux store to avoid prop drilling
 */

import { useMemo } from 'react';
import { useAppSelector } from '@/store/hook';
import { isDarkBackgroundTheme } from '@/theme/background-themes';
import { THEME_PRESETS } from '@/components/piano/theme-presets';
import { HeaderThemeStyle } from '@/theme/definitions/header-theme-styles';

export interface DialogTheme {
  // Background & surfaces
  dialogBg: string;
  paperBg: string;
  sectionBg: string;
  hoverBg: string;
  highlightBg: string;
  
  // Borders & dividers
  borderColor: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  
  // Accent colors
  accentPrimary: string;      // Primary green
  accentPrimaryBg: string;    // Primary green with transparency
  accentSecondary?: string;   // Secondary accent from preset
  
  // Effects
  backdropBlur: string;
  boxShadow: string;
  
  // Utilities
  isDarkBackground: boolean;
  
  // Theme style (from preset)
  headerThemeStyle?: HeaderThemeStyle;
}

/**
 * Hook to get unified dialog theme based on current background theme
 * Automatically reads from Redux store - no prop drilling needed!
 */
export const useDialogTheme = (): DialogTheme => {
  // Read theme state from Redux
  const backgroundThemeId = useAppSelector((state) => state.theme.backgroundTheme);
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const musicSheetThemeId = useAppSelector((state) => state.theme.musicSheetTheme);
  
  return useMemo(() => {
    // Determine if background is dark
    const isDark = isDarkBackgroundTheme(backgroundThemeId);
    
    // Find current preset for additional styling hints
    const currentPreset = THEME_PRESETS.find(
      (preset) =>
        preset.pianoTheme === pianoThemeId &&
        preset.backgroundTheme === backgroundThemeId &&
        preset.musicSheetTheme === musicSheetThemeId
    );
    
    // Extract header theme style if available
    const headerThemeStyle = currentPreset?.headerThemeStyle;
    
    // Primary accent color (green - consistent across all dialogs)
    const accentPrimary = '#10b981'; // Emerald green
    
    // Build theme object with fallbacks
    const backdropBlur = headerThemeStyle?.appBar.backdropBlur
      ? isDark
        ? headerThemeStyle.appBar.backdropBlur.dark
        : headerThemeStyle.appBar.backdropBlur.light
      : isDark
      ? 'blur(20px)'
      : 'blur(16px)';

    const dialogBg = headerThemeStyle?.appBar.backgroundColor
      ? isDark
        ? headerThemeStyle.appBar.backgroundColor.dark
        : headerThemeStyle.appBar.backgroundColor.light
      : isDark
      ? 'rgba(40, 40, 40, 0.98)'
      : 'rgba(255, 255, 255, 0.98)';

    const borderColor = headerThemeStyle?.appBar.borderColor
      ? isDark
        ? headerThemeStyle.appBar.borderColor.dark
        : headerThemeStyle.appBar.borderColor.light
      : isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)';

    const boxShadow = headerThemeStyle?.appBar.boxShadow
      ? isDark
        ? headerThemeStyle.appBar.boxShadow.dark
        : headerThemeStyle.appBar.boxShadow.light
      : isDark
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.15)';

    const hoverBg = headerThemeStyle?.iconButton.hoverBackground
      ? isDark
        ? headerThemeStyle.iconButton.hoverBackground.dark
        : headerThemeStyle.iconButton.hoverBackground.light
      : isDark
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)';

    // Standard colors
    const textPrimary = isDark
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(0, 0, 0, 0.87)';
      
    const textSecondary = isDark
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.6)';
      
    const paperBg = isDark
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.02)';
      
    const sectionBg = isDark
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(0, 0, 0, 0.02)';
      
    const highlightBg = isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)';
    
    const accentPrimaryBg = isDark
      ? 'rgba(16, 185, 129, 0.15)'
      : 'rgba(16, 185, 129, 0.08)';

    return {
      dialogBg,
      paperBg,
      sectionBg,
      hoverBg,
      highlightBg,
      borderColor,
      textPrimary,
      textSecondary,
      accentPrimary,
      accentPrimaryBg,
      backdropBlur,
      boxShadow,
      isDarkBackground: isDark,
      headerThemeStyle,
    };
  }, [backgroundThemeId, pianoThemeId, musicSheetThemeId]);
};
