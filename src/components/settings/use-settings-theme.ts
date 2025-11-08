/**
 * Hook for extracting theme-aware colors from HeaderThemeStyle
 * Provides consistent styling across settings dialog
 */

import { useMemo } from 'react';
import type { HeaderThemeStyle } from '../header/header-theme-styles';

export const useSettingsTheme = (
  isDarkBackground: boolean,
  headerThemeStyle?: HeaderThemeStyle
) => {
  return useMemo(() => {
    // Extract theme values with fallbacks
    const backdropBlur = headerThemeStyle?.appBar.backdropBlur
      ? isDarkBackground
        ? headerThemeStyle.appBar.backdropBlur.dark
        : headerThemeStyle.appBar.backdropBlur.light
      : isDarkBackground
      ? 'blur(20px)'
      : 'blur(16px)';

    const dialogBg = headerThemeStyle?.appBar.backgroundColor
      ? isDarkBackground
        ? headerThemeStyle.appBar.backgroundColor.dark
        : headerThemeStyle.appBar.backgroundColor.light
      : isDarkBackground
      ? 'rgba(30, 30, 30, 0.98)'
      : 'rgba(255, 255, 255, 0.98)';

    const borderColor = headerThemeStyle?.appBar.borderColor
      ? isDarkBackground
        ? headerThemeStyle.appBar.borderColor.dark
        : headerThemeStyle.appBar.borderColor.light
      : isDarkBackground
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.12)';

    const boxShadow = headerThemeStyle?.appBar.boxShadow
      ? isDarkBackground
        ? headerThemeStyle.appBar.boxShadow.dark
        : headerThemeStyle.appBar.boxShadow.light
      : isDarkBackground
      ? '0 8px 32px rgba(0, 0, 0, 0.5)'
      : '0 8px 32px rgba(0, 0, 0, 0.15)';

    const hoverBg = headerThemeStyle?.iconButton.hoverBackground
      ? isDarkBackground
        ? headerThemeStyle.iconButton.hoverBackground.dark
        : headerThemeStyle.iconButton.hoverBackground.light
      : isDarkBackground
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.04)';

    // Standard text colors (not from theme)
    const textColor = isDarkBackground
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(0, 0, 0, 0.87)';
    const secondaryTextColor = isDarkBackground
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.6)';
    const paperBg = isDarkBackground
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.02)';
    const highlightBg = isDarkBackground
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)';

    return {
      backdropBlur,
      dialogBg,
      borderColor,
      boxShadow,
      hoverBg,
      textColor,
      secondaryTextColor,
      paperBg,
      highlightBg,
    };
  }, [isDarkBackground, headerThemeStyle]);
};
