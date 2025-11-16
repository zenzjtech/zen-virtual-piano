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
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const favorites = useAppSelector((state) => state.musicSheet.userData.favorites);
  const customSheets = useAppSelector((state) => state.musicSheet.userData.customSheets);
  const deletedSheets = useAppSelector((state) => state.musicSheet.userData.deletedSheets);
  const showQuote = useAppSelector((state) => state.quoteSettings.showQuote);
  const quoteInterval = useAppSelector((state) => state.quoteSettings.interval);
  const showOnlyFavorites = useAppSelector((state) => state.quoteSettings.showOnlyFavorites);
  const favoriteQuoteIds = useAppSelector((state) => state.quoteSettings.favoriteQuoteIds);
  const isPlaying = useAppSelector((state) => state.musicSheet.playback.isPlaying);
  const isPaused = useAppSelector((state) => state.musicSheet.playback.isPaused);
  const currentPage = useAppSelector((state) => state.musicSheet.playback.currentPage);
  const tempo = useAppSelector((state) => state.musicSheet.playback.tempo);

  // Refs to store previous values
  const prevValuesRef = useRef({
    sustain: sustain,
    showKeyboard: showKeyboard,
    showNoteName: showNoteName,
    pianoThemeId: pianoThemeId,
    backgroundThemeId: backgroundThemeId,
    musicSheetThemeId: musicSheetThemeId,
    patternThemeId: patternThemeId,
    currentSheet: currentSheet,
    favorites: [...favorites],
    customSheets: { ...customSheets },
    deletedSheets: [...deletedSheets],
    showQuote: showQuote,
    quoteInterval: quoteInterval,
    showOnlyFavorites: showOnlyFavorites,
    favoriteQuoteIds: [...favoriteQuoteIds],
    isPlaying: isPlaying,
    isPaused: isPaused,
    currentPage: currentPage,
    tempo: tempo,
  });

  // Debounce timers for continuous settings
  const debounceTimersRef = useRef<{
    sustain?: NodeJS.Timeout;
    volume?: NodeJS.Timeout;
    metronomeTempo?: NodeJS.Timeout;
    metronomeVolume?: NodeJS.Timeout;
    page?: NodeJS.Timeout;
    tempo?: NodeJS.Timeout;
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

  // Track sheet changes
  useEffect(() => {
    const prevSheet = prevValuesRef.current.currentSheet;
    const currentSheetId = currentSheet?.id || null;
    const prevSheetId = prevSheet?.id || null;

    if (currentSheetId !== prevSheetId) {
      trackEvent(uid, ANALYTICS_ACTION.SHEET_CHANGED, {
        sheet_id: currentSheetId,
        sheet_title: currentSheet?.title || null,
        previous_sheet_id: prevSheetId,
        previous_sheet_title: prevSheet?.title || null,
        sheet_artist: currentSheet?.artist || null,
        sheet_difficulty: currentSheet?.difficulty || null,
      });
      prevValuesRef.current.currentSheet = currentSheet;
    }
  }, [currentSheet, uid]);

  // Track favorites changes
  useEffect(() => {
    const prevFavorites = prevValuesRef.current.favorites;
    const currentFavorites = favorites;

    // Check if a sheet was added to favorites
    const addedFavorites = currentFavorites.filter(id => !prevFavorites.includes(id));
    addedFavorites.forEach(sheetId => {
      trackEvent(uid, ANALYTICS_ACTION.SHEET_FAVORITED, {
        sheet_id: sheetId,
      });
    });

    // Check if a sheet was removed from favorites
    const removedFavorites = prevFavorites.filter(id => !currentFavorites.includes(id));
    removedFavorites.forEach(sheetId => {
      trackEvent(uid, ANALYTICS_ACTION.SHEET_UNFAVORITED, {
        sheet_id: sheetId,
      });
    });

    prevValuesRef.current.favorites = [...currentFavorites];
  }, [favorites, uid]);

  // Track custom sheets changes
  useEffect(() => {
    const prevCustomSheets = prevValuesRef.current.customSheets;
    const currentCustomSheets = customSheets;

    // Check for newly added custom sheets
    const addedSheetIds = Object.keys(currentCustomSheets).filter(
      id => !prevCustomSheets[id]
    );

    addedSheetIds.forEach(sheetId => {
      const sheet = currentCustomSheets[sheetId];
      trackEvent(uid, ANALYTICS_ACTION.CUSTOM_SHEET_ADDED, {
        sheet_id: sheetId,
        sheet_title: sheet.title,
        sheet_artist: sheet.artist,
        sheet_difficulty: sheet.difficulty,
      });
    });

    prevValuesRef.current.customSheets = { ...currentCustomSheets };
  }, [customSheets, uid]);

  // Track deleted sheets changes
  useEffect(() => {
    const prevDeletedSheets = prevValuesRef.current.deletedSheets;
    const currentDeletedSheets = deletedSheets;

    // Check for newly deleted sheets
    const newlyDeleted = currentDeletedSheets.filter(
      id => !prevDeletedSheets.includes(id)
    );

    newlyDeleted.forEach(sheetId => {
      trackEvent(uid, ANALYTICS_ACTION.SHEET_DELETED, {
        sheet_id: sheetId,
      });
    });

    prevValuesRef.current.deletedSheets = [...currentDeletedSheets];
  }, [deletedSheets, uid]);

  // Track quote display toggle
  useEffect(() => {
    if (showQuote !== prevValuesRef.current.showQuote) {
      trackEvent(uid, ANALYTICS_ACTION.QUOTE_DISPLAY_TOGGLED, {
        enabled: showQuote,
        previous_state: prevValuesRef.current.showQuote,
      });
      prevValuesRef.current.showQuote = showQuote;
    }
  }, [showQuote, uid]);

  // Track quote interval changes
  useEffect(() => {
    if (quoteInterval !== prevValuesRef.current.quoteInterval) {
      trackEvent(uid, ANALYTICS_ACTION.QUOTE_INTERVAL_CHANGED, {
        interval: quoteInterval,
        previous_interval: prevValuesRef.current.quoteInterval,
      });
      prevValuesRef.current.quoteInterval = quoteInterval;
    }
  }, [quoteInterval, uid]);

  // Track show only favorites toggle
  useEffect(() => {
    if (showOnlyFavorites !== prevValuesRef.current.showOnlyFavorites) {
      trackEvent(uid, ANALYTICS_ACTION.QUOTE_FAVORITES_FILTER_TOGGLED, {
        enabled: showOnlyFavorites,
        previous_state: prevValuesRef.current.showOnlyFavorites,
      });
      prevValuesRef.current.showOnlyFavorites = showOnlyFavorites;
    }
  }, [showOnlyFavorites, uid]);

  // Track quote favorites changes
  useEffect(() => {
    const prevFavorites = prevValuesRef.current.favoriteQuoteIds;
    const currentFavorites = favoriteQuoteIds;

    // Check if a quote was added to favorites
    const addedFavorites = currentFavorites.filter(id => !prevFavorites.includes(id));
    addedFavorites.forEach(quoteId => {
      trackEvent(uid, ANALYTICS_ACTION.QUOTE_FAVORITED, {
        quote_id: quoteId,
      });
    });

    // Check if a quote was removed from favorites
    const removedFavorites = prevFavorites.filter(id => !currentFavorites.includes(id));
    removedFavorites.forEach(quoteId => {
      trackEvent(uid, ANALYTICS_ACTION.QUOTE_UNFAVORITED, {
        quote_id: quoteId,
      });
    });

    prevValuesRef.current.favoriteQuoteIds = [...currentFavorites];
  }, [favoriteQuoteIds, uid]);

  // Track playback state changes
  useEffect(() => {
    if (isPlaying !== prevValuesRef.current.isPlaying) {
      if (isPlaying) {
        trackEvent(uid, ANALYTICS_ACTION.SHEET_PLAYBACK_STARTED, {
          sheet_id: currentSheet?.id || null,
          sheet_title: currentSheet?.title || null,
        });
      } else if (!isPaused) {
        // Only track stopped if not paused (paused is a separate state)
        trackEvent(uid, ANALYTICS_ACTION.SHEET_PLAYBACK_STOPPED, {
          sheet_id: currentSheet?.id || null,
          sheet_title: currentSheet?.title || null,
        });
      }
      prevValuesRef.current.isPlaying = isPlaying;
    }
  }, [isPlaying, isPaused, currentSheet, uid]);

  useEffect(() => {
    if (isPaused !== prevValuesRef.current.isPaused && !isPlaying) {
      trackEvent(uid, ANALYTICS_ACTION.SHEET_PLAYBACK_PAUSED, {
        sheet_id: currentSheet?.id || null,
        sheet_title: currentSheet?.title || null,
      });
      prevValuesRef.current.isPaused = isPaused;
    }
  }, [isPaused, isPlaying, currentSheet, uid]);

  // Track page changes (with debouncing to avoid excessive tracking during navigation)
  useEffect(() => {
    if (currentPage !== prevValuesRef.current.currentPage) {
      // Clear existing timer
      if (debounceTimersRef.current.page) {
        clearTimeout(debounceTimersRef.current.page);
      }

      // Set new timer for page changes (short debounce since page changes are discrete)
      debounceTimersRef.current.page = setTimeout(() => {
        trackEvent(uid, ANALYTICS_ACTION.SHEET_PAGE_CHANGED, {
          sheet_id: currentSheet?.id || null,
          sheet_title: currentSheet?.title || null,
          page: currentPage,
          previous_page: prevValuesRef.current.currentPage,
        });
        prevValuesRef.current.currentPage = currentPage;
      }, 200); // 200ms debounce for page navigation
    }
  }, [currentPage, currentSheet, uid]);

  // Track tempo changes with debouncing (since tempo can be adjusted rapidly with sliders)
  useEffect(() => {
    if (tempo !== prevValuesRef.current.tempo) {
      // Clear existing timer
      if (debounceTimersRef.current.tempo) {
        clearTimeout(debounceTimersRef.current.tempo);
      }

      // Set new timer for tempo changes
      debounceTimersRef.current.tempo = setTimeout(() => {
        trackEvent(uid, ANALYTICS_ACTION.SHEET_TEMPO_CHANGED, {
          sheet_id: currentSheet?.id || null,
          sheet_title: currentSheet?.title || null,
          tempo: tempo,
          previous_tempo: prevValuesRef.current.tempo,
        });
        prevValuesRef.current.tempo = tempo;
      }, 500); // 500ms debounce for tempo adjustments
    }
  }, [tempo, currentSheet, uid]);

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
