import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Stack } from '@mui/material';
import { PianoUnit } from '@/components/piano/piano-unit';
import { AppDialogs } from '@/components/global/app-dialogs';
import { MusicStand } from '@/components/music-sheet/music-stand';
import { Header } from '@/components/header';
import { getTheme } from '@/components/piano/themes';
import { THEME_PRESETS } from '@/components/piano/theme-presets';
import { getAudioEngine } from '@/services/audio-engine';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setPatternTheme } from '@/store/reducers/theme-slice';
import { addSheets, loadSheet } from '@/store/reducers/music-sheet-slice';
import { useNotification } from '@/contexts/notification-context';
import { showOnboarding } from '@/store/reducers/onboarding-slice';
import { getBuiltInSheetMetadata, initSheetLibrary } from '@/services/sheet-library';
import { useMetronome } from '@/hooks/use-metronome';
import { useEscapeKeyHandler } from '@/hooks/use-escape-key-handler';
import { useSheetKeyboardControls } from '@/hooks/use-sheet-keyboard-controls';
import { useAuthRestore } from '@/hooks/use-auth-restore';
import { usePianoRecording } from '@/hooks/use-piano-recording';
import { useRecordingPlayback } from '@/hooks/use-recording-playback';
import { usePlaybackMutex } from '@/hooks/use-playback-mutex';
import { useAutoThemeRotation } from '@/hooks/use-auto-theme-rotation';
import { useSoundSettings } from '@/hooks/use-sound-settings';
import { useSheetSearch } from '@/hooks/use-sheet-search';
import { useHighlightAnimation } from '@/hooks/use-highlight-animation';
import { useSettingsAnalytics, useSoundSettingsAnalytics } from '@/hooks/use-settings-analytics';
import { getBackgroundStyle, isDarkBackgroundTheme } from '@/theme/definitions/background-themes';
import './App.css';
import { trackPageEvent, trackEvent } from '@/utils/analytics';
import { ANALYTICS_ACTION } from '@/utils/constants';
import i18n from '@/lib/i18n/index';
import { useTranslation } from '@/hooks/use-translation';

function App() {
  // Redux state for persistent settings
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.user.uid);    
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const backgroundThemeId = useAppSelector((state) => state.theme.backgroundTheme);
  const musicSheetThemeId = useAppSelector((state) => state.theme.musicSheetTheme);
  const patternThemeId = useAppSelector((state) => state.theme.patternTheme);
  
  // Music sheet state
  const isMusicStandVisible = useAppSelector((state) => state.musicSheet.isMusicStandVisible);
  const recentlyPlayed = useAppSelector((state) => state.musicSheet.userData.recentlyPlayed);
  const hasManuallyClosedSheet = useAppSelector((state) => state.musicSheet.hasManuallyClosedSheet);
  
  // Onboarding state
  const hasCompletedOnboarding = useAppSelector((state) => state.onboarding.hasCompletedOnboarding);
  
  // i18n state
  const locale = useAppSelector((state) => state.i18n.locale);
  // Keyboard shortcuts dialog state
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
  
  // Settings dialog state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'general' | 'quotes' | 'piano' | 'keyboard'>('general');
  
  // Sound settings and metronome
  const soundSettings = useSoundSettings();
  const soundSet = useAppSelector((state) => state.pianoSettings.soundSet);
  useMetronome(soundSettings.metronomeEnabled, soundSettings.metronomeTempo, soundSettings.metronomeVolume);
  
  // Sheet search hook - shared between PianoUnit and AppDialogs
  const { handleSheetSearchOpen, anchorEl: sheetSearchAnchorEl, handleSheetSearchClose } = useSheetSearch();
  
  // Notification
  const { showNotification } = useNotification();
  const { t } = useTranslation('notifications');

  // Piano recording hook for playback
  const {
    downloadRecording,
    clearRecording,
    noteCount,
  } = usePianoRecording();

  // Restore auth session on mount (if cached token exists)
  useAuthRestore();

  // Auto theme rotation
  useAutoThemeRotation(uid);

  // Highlight animation when opened via download button
  const { isHighlighted } = useHighlightAnimation();

  // Settings analytics tracking
  useSettingsAnalytics();
  useSoundSettingsAnalytics(
    soundSettings.transpose,
    soundSettings.volume,
    soundSettings.metronomeEnabled,
    soundSettings.metronomeTempo,
    soundSettings.metronomeVolume
  );

  useEffect(() => {    
      trackPageEvent(uid, ANALYTICS_ACTION.PAGE_VIEW, 'Home', {}, document.URL);    
  }, [uid]);

  // Load built-in sheet library on mount
  useEffect(() => {
    const loadSheets = async () => {
      try {
        await initSheetLibrary();
        const sheets = getBuiltInSheetMetadata();
        dispatch(addSheets(sheets));
        
        // Only auto-load sheet if user hasn't manually closed it before
        if (!hasManuallyClosedSheet) {
          // Load last played sheet, or default to 'kiss-the-rain-v2'
          const defaultSheetId = recentlyPlayed.length > 0 ? recentlyPlayed[0] : 'beethoven-fur-elise';
          dispatch(loadSheet(defaultSheetId));
        }
      } catch (error) {
        console.error('Failed to initialize sheet library:', error);
      }
    };
    
    loadSheets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Show onboarding after music stand loads (with a slight delay for better UX)
  useEffect(() => {
    if (isMusicStandVisible && !hasCompletedOnboarding) {
      const timer = setTimeout(() => {
        dispatch(showOnboarding());
      }, 500); // 500ms delay to let the music stand render first
      
      return () => clearTimeout(timer);
    }
  }, [isMusicStandVisible, hasCompletedOnboarding, dispatch]);

  // Sync i18n language with Redux locale
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  // Initialize AudioEngine with current soundSetId from Redux store
  useEffect(() => {
    getAudioEngine(soundSet);
  }, [soundSet]);


  // Handle Escape key to close keyboard shortcuts dialog
  useEscapeKeyHandler(
    {
      instrumentPopupOpen: false,
      soundSettingsOpen: false,
      styleSettingsOpen: false,
      keyAssistPopupOpen: false,
      isSheetSearchOpen: false,
      isKeyboardShortcutsOpen,
    },
    {
      handleInstrumentPopupClose: () => {},
      handleSoundSettingsClose: () => {},
      handleStyleSettingsClose: () => {},
      handleKeyAssistPopupClose: () => {},
      handleSheetSearchClose: () => {},
      handleKeyboardShortcutsClose: () => setIsKeyboardShortcutsOpen(false),
    }
  );

  // Handle all keyboard shortcuts for sheet mode (navigation, playback, tempo)
  useSheetKeyboardControls();

  // Handle "?" key to show keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle "?" when no popups are open and not typing in an input
      if (
        event.key === '?' &&
        !isKeyboardShortcutsOpen &&
        !settingsOpen
      ) {
        const target = event.target as HTMLElement;
        const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
        
        if (!isInputField) {
          event.preventDefault();
          setIsKeyboardShortcutsOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isKeyboardShortcutsOpen, settingsOpen]);


  // Define playNote and stopNote callbacks for playback
  const playNoteCallback = useCallback((note: string, frequency: number, velocity: number) => {
    getAudioEngine().playNote(note, frequency, velocity);
  }, []);

  const stopNoteCallback = useCallback((note: string) => {
    getAudioEngine().stopNote(note);
  }, []);

  // Recording playback hook
  const recordingPlayback = useRecordingPlayback({
    onPlayNote: playNoteCallback,
    onStopNote: stopNoteCallback,
  });

  // Track latest recording playback state in ref to avoid stale closures
  const recordingPlaybackRef = useRef(recordingPlayback);
  useEffect(() => {
    recordingPlaybackRef.current = recordingPlayback;
  }, [recordingPlayback]);

  // Mutual exclusivity between sheet music and recording playback
  const isSheetPlaying = useAppSelector((state) => state.musicSheet.playback.isPlaying);
  usePlaybackMutex({
    isSheetPlaying,
    isRecordingPlaying: recordingPlayback.isPlaying,
    pauseRecordingPlayback: recordingPlayback.pause,
    showNotification,
  });

  const handleClearRecording = () => {
    recordingPlayback.stop();
    clearRecording();
    showNotification(t('recordingCleared'), 'info');
    trackEvent(uid, ANALYTICS_ACTION.RECORD_CLEARED, {});
  };

  const handleDownloadRecording = () => {
    downloadRecording();
    showNotification(t('recordingDownloaded'), 'success');
    trackEvent(uid, ANALYTICS_ACTION.RECORD_DOWNLOADED, { note_count: noteCount });
  };

  
  // Settings dialog handlers
  const handleOpenSettings = (tab: 'general' | 'quotes' | 'piano' | 'keyboard' = 'general') => {
    setSettingsTab(tab);
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  // Get background theme styles and determine if it's a dark background
  const isDarkBackground = isDarkBackgroundTheme(backgroundThemeId);
  
  // Find current preset based on all three theme attributes (for playback bar and header styles)
  const currentPreset = THEME_PRESETS.find(
    (preset) =>
      preset.pianoTheme === pianoThemeId &&
      preset.backgroundTheme === backgroundThemeId &&
      preset.musicSheetTheme === musicSheetThemeId
  );
  
  // Get piano theme for header
  const pianoTheme = getTheme(pianoThemeId);

  // Sync pattern theme from current preset on mount/preset change
  useEffect(() => {
    if (currentPreset && currentPreset.patternTheme) {
      // Only update if different to avoid unnecessary dispatches
      if (patternThemeId !== currentPreset.patternTheme) {
        dispatch(setPatternTheme(currentPreset.patternTheme));
      }
    }
  }, [currentPreset, patternThemeId, dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        ...getBackgroundStyle(backgroundThemeId)
      }}
    >
      {/* Sticky Header */}
      <Header 
        backgroundThemeId={backgroundThemeId}
        isDarkBackground={isDarkBackground}
        onShowKeyboardShortcuts={() => setIsKeyboardShortcutsOpen(true)}
        recordingPlayback={recordingPlayback.hasRecording ? {
          hasRecording: recordingPlayback.hasRecording,
          isPlaying: recordingPlayback.isPlaying,
          currentPosition: recordingPlayback.currentPosition,
          totalDuration: recordingPlayback.totalDuration,
          playbackSpeed: recordingPlayback.playbackSpeed,
          loop: recordingPlayback.loop,
          currentPositionFormatted: recordingPlayback.currentPositionFormatted,
          totalDurationFormatted: recordingPlayback.totalDurationFormatted,
          pianoTheme: pianoTheme,
          playbackBarStyle: currentPreset?.playbackBarStyle,
          onTogglePlayback: recordingPlayback.togglePlayback,
          onStop: recordingPlayback.stop,
          onToggleLoop: recordingPlayback.toggleLoop,
          onSpeedChange: recordingPlayback.setPlaybackSpeed,
          onClear: handleClearRecording,
          onDownload: handleDownloadRecording,
        } : undefined}
      />

      <Container
        sx={{
          maxHeight: '100vh',
          '@media (max-width: 1400px) and (max-height: 900px)': {
            transform: 'scale(0.7)',
            transformOrigin: 'top center',   
            width: '125%',
            // ml: '-12.5%',
            // marginBottom: '-35vh', // Compensate for vertical gap left by scaling
          },           
        }}
      >
        <Stack
          spacing={{ xs: 2, md: 3, lg: 4 }}
          alignItems="center"
          sx={{
            textAlign: 'center',
            width: '100%',            
            py: { xs: 2, md: 3, lg: 4 },           
          }}          
        >
            {/* Music Stand - appears when sheet is loaded */}
            {isMusicStandVisible && (
              <MusicStand pianoTheme={pianoTheme} isHighlighted={isHighlighted} />
            )}

            {/* Integrated Piano Unit */}
            <PianoUnit 
              onOpenSettings={handleOpenSettings}
              recordingPlaybackRef={recordingPlaybackRef}
              onSheetSearchOpen={handleSheetSearchOpen}
            />          

          {/* Instructions */}
          {/* <Paper
            elevation={0}
            sx={{
              px: 3,
              py: 2,
              backgroundColor: isDarkBackground ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              border: '1px solid',
              borderColor: isDarkBackground ? 'rgba(255, 255, 255, 0.3)' : 'grey.200',
              borderRadius: 2,
              maxWidth: 600,
            }}
          >
            <Typography 
              variant="body2" 
              sx={{
                color: isDarkBackground ? 'rgba(255, 255, 255, 0.9)' : 'text.secondary',
              }}
            >
              💡 <strong>Keyboard Shortcuts:</strong> Use numbers (1-0), letters (q-m), and Shift for sharps/flats
            </Typography>
          </Paper> */}
        </Stack>
      </Container>

      {/* App Dialogs */}
      <AppDialogs
        settingsOpen={settingsOpen}
        settingsTab={settingsTab}
        isKeyboardShortcutsOpen={isKeyboardShortcutsOpen}
        onCloseSettings={handleCloseSettings}
        onCloseKeyboardShortcuts={() => setIsKeyboardShortcutsOpen(false)}
        sheetSearchAnchorEl={sheetSearchAnchorEl}
        onSheetSearchClose={handleSheetSearchClose}
      />
    </Box>
  );
}

export default App;
