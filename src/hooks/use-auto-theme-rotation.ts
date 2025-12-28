/**
 * Custom hook for automatic theme rotation
 * Checks periodically and applies random theme preset based on user settings
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { setPianoTheme, setBackgroundTheme, setMusicSheetTheme, setPatternTheme, setLastThemeChangeDate } from '@/store/reducers/theme-slice';
import { getRandomPreset } from '@/components/piano/theme-presets';
import { useNotification } from '@/contexts/notification-context';
import { analytics } from '@/utils/analytics';
import type { ThemeChangeInterval } from '@/store/reducers/theme-slice';

export const useAutoThemeRotation = (uid?: string) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!theme.autoThemeEnabled) return;

    const shouldChangeTheme = (): boolean => {
      const now = new Date();
      const lastChangeDate = new Date(theme.lastThemeChangeDate);
      
      const getMinutesDiff = () => Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
      
      switch (theme.autoThemeInterval as ThemeChangeInterval) {
        case 'daily': {
          const today = now.toISOString().split('T')[0];
          const lastChange = lastChangeDate.toISOString().split('T')[0];
          return today !== lastChange;
        }
        case 'hourly': {
          const hoursDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 36e5;
          return hoursDiff >= 1;
        }
        case '30min':
          return getMinutesDiff() >= 30;
        case '15min':
          return getMinutesDiff() >= 15;
        case '10min':
          return getMinutesDiff() >= 10;
        case '5min':
          return getMinutesDiff() >= 5;
        case '1min':
          return getMinutesDiff() >= 1;
        default:
          return false;
      }
    };

    const applyRandomTheme = () => {
      const randomPreset = getRandomPreset();
      
      // Apply all four theme components
      dispatch(setPianoTheme(randomPreset.pianoTheme));
      dispatch(setBackgroundTheme(randomPreset.backgroundTheme));
      dispatch(setMusicSheetTheme(randomPreset.musicSheetTheme));
      dispatch(setPatternTheme(randomPreset.patternTheme || 'none'));
      
      // Update last change timestamp
      dispatch(setLastThemeChangeDate(new Date().toISOString()));
      
      // User feedback
      showNotification(`🎨 Theme changed to "${randomPreset.name}"`, 'info');
      
      // Analytics
      analytics.trackEvent('Auto theme change', { preset: randomPreset.name });
    };

    // Check every minute if theme should change
    const checkInterval = setInterval(() => {
      if (shouldChangeTheme()) {
        applyRandomTheme();
      }
    }, 60000);

    return () => clearInterval(checkInterval);
  }, [theme.autoThemeEnabled, theme.autoThemeInterval, theme.lastThemeChangeDate, dispatch, showNotification, uid]);
};
