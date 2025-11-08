/**
 * Custom hook for automatic theme rotation
 * Checks periodically and applies random theme preset based on user settings
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { setTheme, setBackgroundTheme, setMusicSheetTheme } from '@/store/reducers/piano-settings-slice';
import { setLastThemeChangeDate } from '@/store/reducers/auto-theme-slice';
import { getRandomPreset } from '@/components/piano/theme-presets';
import { useNotification } from '@/contexts/notification-context';
import { trackEvent } from '@/utils/analytics';
import type { ThemeChangeInterval } from '@/store/reducers/auto-theme-slice';

export const useAutoThemeRotation = (uid?: string) => {
  const dispatch = useAppDispatch();
  const autoTheme = useAppSelector((state) => state.autoTheme);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!autoTheme.enabled) return;

    const shouldChangeTheme = (): boolean => {
      const now = new Date();
      const lastChangeDate = new Date(autoTheme.lastChangeDate);
      
      const getMinutesDiff = () => Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
      
      switch (autoTheme.interval as ThemeChangeInterval) {
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
      
      // Apply all three theme components
      dispatch(setTheme(randomPreset.pianoTheme));
      dispatch(setBackgroundTheme(randomPreset.backgroundTheme));
      dispatch(setMusicSheetTheme(randomPreset.musicSheetTheme));
      
      // Update last change timestamp
      dispatch(setLastThemeChangeDate(new Date().toISOString()));
      
      // User feedback
      showNotification(`🎨 Theme changed to "${randomPreset.name}"`, 'info');
      
      // Analytics
      if (uid) {
        trackEvent(uid, 'Auto theme change', { preset: randomPreset.name });
      }
    };

    // Check every minute if theme should change
    const checkInterval = setInterval(() => {
      if (shouldChangeTheme()) {
        applyRandomTheme();
      }
    }, 60000);

    return () => clearInterval(checkInterval);
  }, [autoTheme.enabled, autoTheme.interval, autoTheme.lastChangeDate, dispatch, showNotification, uid]);
};
