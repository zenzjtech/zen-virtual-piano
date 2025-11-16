import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/hook';
import { trackEvent } from '@/utils/analytics';
import { ANALYTICS_ACTION } from '@/utils/constants';

/**
 * Custom hook to track various settings changes with analytics
 * Includes debouncing for continuous settings to avoid excessive tracking
 */
export function useSettingsAnalytics() {
  const uid = useAppSelector((state) => state.user.uid);

  // Redux state selectors
  const sustain = useAppSelector((state) => state.pianoSettings.sustain);
  const showKeyboard = useAppSelector((state) => state.pianoSettings.showKeyboard);
  const showNoteName = useAppSelector((state) => state.pianoSettings.showNoteName);
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const backgroundThemeId = useAppSelector((state) => state.theme.backgroundTheme);
  const musicSheetThemeId = useAppSelector((state) => state.theme.musicSheetTheme);
  const patternThemeId = useAppSelector((state) => state.theme.patternTheme);

  // Refs to store previous values
  const prevValuesRef = useRef({
    sustain: sustain,
    showKeyboard: showKeyboard,
    showNoteName: showNoteName,
    pianoThemeId: pianoThemeId,
    backgroundThemeId: backgroundThemeId,
    musicSheetThemeId: musicSheetThemeId,
    patternThemeId: patternThemeId,
  });

  // Debounce timers for continuous settings
  const debounceTimersRef = useRef<{
    sustain?: NodeJS.Timeout;
    volume?: NodeJS.Timeout;
    metronomeTempo?: NodeJS.Timeout;
    metronomeVolume?: NodeJS.Timeout;
  }>({});

  // Track sustain changes with debouncing
  useEffect(() => {
    if (sustain !== prevValuesRef.current.sustain) {
      // Clear existing timer
      if (debounceTimersRef.current.sustain) {
        clearTimeout(debounceTimersRef.current.sustain);
      }

      // Set new timer
      debounceTimersRef.current.sustain = setTimeout(() => {
        trackEvent(uid, ANALYTICS_ACTION.SUSTAIN_CHANGED, {
          value: sustain,
          previous_value: prevValuesRef.current.sustain,
        });
        prevValuesRef.current.sustain = sustain;
      }, 500); // 500ms debounce
    }
  }, [sustain, uid]);

  // Track show keyboard toggle
  useEffect(() => {
    if (showKeyboard !== prevValuesRef.current.showKeyboard) {
      trackEvent(uid, ANALYTICS_ACTION.KEYBOARD_DISPLAY_TOGGLED, {
        enabled: showKeyboard,
        previous_state: prevValuesRef.current.showKeyboard,
      });
      prevValuesRef.current.showKeyboard = showKeyboard;
    }
  }, [showKeyboard, uid]);

  // Track show note names toggle
  useEffect(() => {
    if (showNoteName !== prevValuesRef.current.showNoteName) {
      trackEvent(uid, ANALYTICS_ACTION.NOTE_NAMES_TOGGLED, {
        enabled: showNoteName,
        previous_state: prevValuesRef.current.showNoteName,
      });
      prevValuesRef.current.showNoteName = showNoteName;
    }
  }, [showNoteName, uid]);

  // Track piano theme changes
  useEffect(() => {
    if (pianoThemeId !== prevValuesRef.current.pianoThemeId) {
      trackEvent(uid, ANALYTICS_ACTION.PIANO_THEME_CHANGED, {
        theme: pianoThemeId,
        previous_theme: prevValuesRef.current.pianoThemeId,
      });
      prevValuesRef.current.pianoThemeId = pianoThemeId;
    }
  }, [pianoThemeId, uid]);

  // Track background theme changes
  useEffect(() => {
    if (backgroundThemeId !== prevValuesRef.current.backgroundThemeId) {
      trackEvent(uid, ANALYTICS_ACTION.BACKGROUND_THEME_CHANGED, {
        theme: backgroundThemeId,
        previous_theme: prevValuesRef.current.backgroundThemeId,
      });
      prevValuesRef.current.backgroundThemeId = backgroundThemeId;
    }
  }, [backgroundThemeId, uid]);

  // Track music sheet theme changes
  useEffect(() => {
    if (musicSheetThemeId !== prevValuesRef.current.musicSheetThemeId) {
      trackEvent(uid, ANALYTICS_ACTION.MUSIC_SHEET_THEME_CHANGED, {
        theme: musicSheetThemeId,
        previous_theme: prevValuesRef.current.musicSheetThemeId,
      });
      prevValuesRef.current.musicSheetThemeId = musicSheetThemeId;
    }
  }, [musicSheetThemeId, uid]);

  // Track pattern theme changes
  useEffect(() => {
    if (patternThemeId !== prevValuesRef.current.patternThemeId) {
      trackEvent(uid, ANALYTICS_ACTION.PATTERN_THEME_CHANGED, {
        theme: patternThemeId,
        previous_theme: prevValuesRef.current.patternThemeId,
      });
      prevValuesRef.current.patternThemeId = patternThemeId;
    }
  }, [patternThemeId, uid]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimersRef.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);
}

/**
 * Hook to track sound settings changes (used in components that manage local sound settings)
 */
export function useSoundSettingsAnalytics(
  transpose: number,
  volume: number,
  metronomeEnabled: boolean,
  metronomeTempo: number,
  metronomeVolume: number
) {
  const uid = useAppSelector((state) => state.user.uid);

  // Refs to store previous values
  const soundPrevValuesRef = useRef({
    transpose: transpose,
    volume: volume,
    metronomeEnabled: metronomeEnabled,
    metronomeTempo: metronomeTempo,
    metronomeVolume: metronomeVolume,
  });

  // Debounce timers for continuous sound settings
  const soundDebounceTimersRef = useRef<{
    volume?: NodeJS.Timeout;
    metronomeTempo?: NodeJS.Timeout;
    metronomeVolume?: NodeJS.Timeout;
  }>({});

  // Track transpose changes (immediate, no debouncing needed)
  useEffect(() => {
    if (transpose !== soundPrevValuesRef.current.transpose) {
      trackEvent(uid, ANALYTICS_ACTION.TRANSPOSE_CHANGED, {
        value: transpose,
        previous_value: soundPrevValuesRef.current.transpose,
      });
      soundPrevValuesRef.current.transpose = transpose;
    }
  }, [transpose, uid]);

  // Track volume changes with debouncing
  useEffect(() => {
    if (volume !== soundPrevValuesRef.current.volume) {
      // Clear existing timer
      if (soundDebounceTimersRef.current.volume) {
        clearTimeout(soundDebounceTimersRef.current.volume);
      }

      // Set new timer
      soundDebounceTimersRef.current.volume = setTimeout(() => {
        trackEvent(uid, ANALYTICS_ACTION.VOLUME_CHANGED, {
          value: volume,
          previous_value: soundPrevValuesRef.current.volume,
        });
        soundPrevValuesRef.current.volume = volume;
      }, 500); // 500ms debounce
    }
  }, [volume, uid]);

  // Track metronome toggle
  useEffect(() => {
    if (metronomeEnabled !== soundPrevValuesRef.current.metronomeEnabled) {
      trackEvent(uid, ANALYTICS_ACTION.METRONOME_TOGGLED, {
        enabled: metronomeEnabled,
        previous_state: soundPrevValuesRef.current.metronomeEnabled,
      });
      soundPrevValuesRef.current.metronomeEnabled = metronomeEnabled;
    }
  }, [metronomeEnabled, uid]);

  // Track metronome tempo changes with debouncing
  useEffect(() => {
    if (metronomeTempo !== soundPrevValuesRef.current.metronomeTempo) {
      // Clear existing timer
      if (soundDebounceTimersRef.current.metronomeTempo) {
        clearTimeout(soundDebounceTimersRef.current.metronomeTempo);
      }

      // Set new timer
      soundDebounceTimersRef.current.metronomeTempo = setTimeout(() => {
        trackEvent(uid, ANALYTICS_ACTION.METRONOME_TEMPO_CHANGED, {
          value: metronomeTempo,
          previous_value: soundPrevValuesRef.current.metronomeTempo,
        });
        soundPrevValuesRef.current.metronomeTempo = metronomeTempo;
      }, 500); // 500ms debounce
    }
  }, [metronomeTempo, uid]);

  // Track metronome volume changes with debouncing
  useEffect(() => {
    if (metronomeVolume !== soundPrevValuesRef.current.metronomeVolume) {
      // Clear existing timer
      if (soundDebounceTimersRef.current.metronomeVolume) {
        clearTimeout(soundDebounceTimersRef.current.metronomeVolume);
      }

      // Set new timer
      soundDebounceTimersRef.current.metronomeVolume = setTimeout(() => {
        trackEvent(uid, ANALYTICS_ACTION.METRONOME_VOLUME_CHANGED, {
          value: metronomeVolume,
          previous_value: soundPrevValuesRef.current.metronomeVolume,
        });
        soundPrevValuesRef.current.metronomeVolume = metronomeVolume;
      }, 500); // 500ms debounce
    }
  }, [metronomeVolume, uid]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(soundDebounceTimersRef.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);
}
