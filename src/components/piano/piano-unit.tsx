import { useState, useCallback, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { Piano } from './piano';
import { StatusBoard } from './status-board';
import { SettingsBar } from './settings-bar';
import { InstrumentSelectorPopup } from './instrument-selector-popup';
import { SoundSettingsPopup } from './sound-settings-popup';
import { StyleSettingsPopup } from './style-settings-popup';
import { KeyAssistPopup } from './key-assist-popup';
import { PianoKey } from './types';
import { getTheme } from './themes';
import { getPatternTheme } from '@/theme/definitions/pattern-themes';
import { PianoUnitWrapper } from './piano-unit-styled';
import { getAudioEngine } from '@/services/audio-engine';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setSoundSet, setSustain, setShowKeyboard, setShowNoteName, setIsPianoEnabled, closeSoundPopup } from '@/store/reducers/piano-settings-slice';
import { pauseSheet, closeSearchDialog } from '@/store/reducers/music-sheet-slice';
import { useNotification } from '@/contexts/notification-context';
import { usePopupManager } from '@/hooks/use-popup-manager';
import { useSoundSettings } from '@/hooks/use-sound-settings';
import { usePianoRecording } from '@/hooks/use-piano-recording';
import { useEscapeKeyHandler } from '@/hooks/use-escape-key-handler';
import { usePopupToggle } from '@/hooks/use-popup-toggle';
import { useMetronome } from '@/hooks/use-metronome';
import { trackEvent } from '@/utils/analytics';
import { ANALYTICS_ACTION } from '@/utils/constants';
import { useTranslation } from '@/hooks/use-translation';

interface PianoUnitProps {
  /** Callback to open settings dialog */
  onOpenSettings?: (tab: 'general' | 'quotes' | 'piano' | 'keyboard') => void;
  /** Recording playback reference for mutual exclusivity */
  recordingPlaybackRef: React.MutableRefObject<{ isPlaying: boolean; pause: () => void }>;
  /** Handler to open sheet search dialog */
  onSheetSearchOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * PianoUnit - Integrated piano component containing StatusBoard, SettingsBar, and Piano
 * This component manages all piano-related state and behavior internally,
 * accessing Redux state/dispatch directly to avoid props drilling.
 */
export const PianoUnit: React.FC<PianoUnitProps> = ({ 
  onOpenSettings,
  recordingPlaybackRef,
  onSheetSearchOpen,
}) => {
  // Redux state
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.user.uid);
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const patternThemeId = useAppSelector((state) => state.theme.patternTheme);
  const soundSet = useAppSelector((state) => state.pianoSettings.soundSet);
  const sustain = useAppSelector((state) => state.pianoSettings.sustain);
  const showKeyboard = useAppSelector((state) => state.pianoSettings.showKeyboard);
  const showNoteName = useAppSelector((state) => state.pianoSettings.showNoteName);
  const isPianoEnabled = useAppSelector((state) => state.pianoSettings.isPianoEnabled);
  const isSheetPlaying = useAppSelector((state) => state.musicSheet.playback.isPlaying);
  const soundPopupOpen = useAppSelector((state) => state.pianoSettings.soundPopupOpen);
  const soundPopupTargetSection = useAppSelector((state) => state.pianoSettings.soundPopupTargetSection);
  
  // Get the actual theme objects
  const pianoTheme = getTheme(pianoThemeId);
  const patternTheme = getPatternTheme(patternThemeId);
  
  // Local component state for UI interactions
  const [pressedNotes, setPressedNotes] = useState<Map<string, PianoKey>>(new Map());
  const [currentNote, setCurrentNote] = useState<PianoKey | null>(null);
  const [isLoadingInstrument, setIsLoadingInstrument] = useState(false);
  
  // Ref for sound popup anchor (used when opening from Redux)
  const soundPopupAnchorRef = useRef<HTMLElement | null>(null);
  
  // Popup managers
  const instrumentPopup = usePopupManager();
  const soundSettingsPopup = usePopupManager();
  const styleSettingsPopup = usePopupManager();
  const keyAssistPopup = usePopupManager();
  
  // Get sheet search state from Redux (handler comes from props)
  const isSheetSearchOpen = useAppSelector((state) => state.musicSheet.isSearchDialogOpen);
  
  // Sound settings toggle handler
  const soundSettingsToggle = usePopupToggle(
    soundSettingsPopup.isOpen,
    soundSettingsPopup.handleOpen,
    soundSettingsPopup.handleClose
  );
  
  // Sheet search toggle handler
  const sheetSearchToggle = usePopupToggle(
    isSheetSearchOpen,
    onSheetSearchOpen,
    () => dispatch(closeSearchDialog())
  );
  
  // Sound settings close handler (closes both local popup and Redux state)
  const handleSoundSettingsClose = useCallback(() => {
    soundSettingsPopup.handleClose();
    dispatch(closeSoundPopup());
  }, [soundSettingsPopup, dispatch]);
  
  // Sync Redux sound popup state with local popup manager
  useEffect(() => {
    if (soundPopupOpen && !soundSettingsPopup.isOpen) {
      // Query for the metronome button or use a fallback
      const metronomeButton = document.querySelector('[data-metronome-control="true"]') as HTMLElement;
      const anchorElement = soundPopupAnchorRef.current || metronomeButton || document.body;
      
      // Create a synthetic event to open the popup
      const syntheticEvent = {
        currentTarget: anchorElement,
      } as React.MouseEvent<HTMLButtonElement>;
      
      soundSettingsPopup.handleOpen(syntheticEvent);
    }
  }, [soundPopupOpen, soundSettingsPopup.isOpen, soundSettingsPopup.handleOpen]);
  
  // Handle Escape key to close popups
  useEscapeKeyHandler(
    {
      instrumentPopupOpen: instrumentPopup.isOpen,
      soundSettingsOpen: soundSettingsPopup.isOpen,
      styleSettingsOpen: styleSettingsPopup.isOpen,
      keyAssistPopupOpen: keyAssistPopup.isOpen,
      isSheetSearchOpen,
      isKeyboardShortcutsOpen: false,
    },
    {
      handleInstrumentPopupClose: instrumentPopup.handleClose,
      handleSoundSettingsClose: handleSoundSettingsClose,
      handleStyleSettingsClose: styleSettingsPopup.handleClose,
      handleKeyAssistPopupClose: keyAssistPopup.handleClose,
      handleSheetSearchClose: sheetSearchToggle.handleClose,
      handleKeyboardShortcutsClose: () => {},
    }
  );
  
  // Determine if keyboard should be enabled (disabled when any popup is open or manually disabled)
  const isKeyboardEnabled = isPianoEnabled && 
    !instrumentPopup.isOpen && 
    !soundSettingsPopup.isOpen && 
    !styleSettingsPopup.isOpen && 
    !keyAssistPopup.isOpen && 
    !isSheetSearchOpen;
  
  // Sound settings state
  const soundSettings = useSoundSettings();
  
  // Metronome playback (uses sound settings state)
  useMetronome(
    soundSettings.metronomeEnabled,
    soundSettings.metronomeTempo,
    soundSettings.metronomeVolume
  );
  
  // Notification
  const { showNotification } = useNotification();
  const { t } = useTranslation('notifications');

  // Piano recording hook
  const {
    isRecording,
    toggleRecording,
    recordNotePress,
    recordNoteRelease,
    noteCount,
    getFormattedDuration,
  } = usePianoRecording();

  const handlePressedNotesChange = useCallback((notes: Map<string, PianoKey>, current: PianoKey | null) => {
    setPressedNotes(notes);
    setCurrentNote(current);
    
    // Stop auto-play when user presses key
    if (isSheetPlaying && current !== null) {
      dispatch(pauseSheet());
      showNotification(t('autoPlayPaused'), 'info');
    }
    
    // Pause recording playback when user plays manually
    if (recordingPlaybackRef.current.isPlaying && current !== null) {
      recordingPlaybackRef.current.pause();
      showNotification(t('playbackPaused'), 'info');
    }
  }, [isSheetPlaying, showNotification, dispatch, recordingPlaybackRef, t]);

  // Settings bar handlers
  const handleTogglePiano = () => {
    const newState = !isPianoEnabled;
    dispatch(setIsPianoEnabled(newState));
    
    // Track analytics
    const eventAction = newState ? ANALYTICS_ACTION.PIANO_ENABLED : ANALYTICS_ACTION.PIANO_DISABLED;
    trackEvent(uid, eventAction, {
      previous_state: isPianoEnabled,
      new_state: newState,
    });
  };
  
  const handleRecord = () => {
    toggleRecording();
    
    if (!isRecording) {
      showNotification(t('recordingStarted'), 'info');
      trackEvent(uid, ANALYTICS_ACTION.RECORD_STARTED, {});
    } else {
      const duration = getFormattedDuration();
      showNotification(
        t('recordingStopped', { count: noteCount, duration }),
        'success'
      );
      trackEvent(uid, ANALYTICS_ACTION.RECORD_STOPPED, {
        note_count: noteCount,
        duration,
      });
    }
  };

  const handleSoundSetChange = async (newSoundSetId: string) => {
    const previousSoundSetId = soundSet;
    setIsLoadingInstrument(true);
    dispatch(setSoundSet(newSoundSetId));
    
    // Track instrument change
    trackEvent(uid, ANALYTICS_ACTION.INSTRUMENT_CHANGED, {
      previous_instrument: previousSoundSetId,
      new_instrument: newSoundSetId,
    });
    
    try {
      // Change the sound set in the audio engine
      await getAudioEngine().changeSoundSet(newSoundSetId);
      // Reapply sustain setting after sound set change
      getAudioEngine().setSustain(sustain);
    } catch (error) {
      console.error('Failed to change sound set:', error);
    } finally {
      setIsLoadingInstrument(false);
    }
  };

  return (
    <>
      <Box 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
        }}
      >
        {/* Unified pattern wrapper for the entire piano unit */}
        <PianoUnitWrapper pianoTheme={pianoTheme} patternTheme={patternTheme}>
          {/* Statistics Board */}
          <StatusBoard 
            pressedNotes={pressedNotes}
            currentNote={currentNote}
            pianoTheme={pianoTheme}
            onSheetSearchOpen={sheetSearchToggle.handleToggle}
          />

          {/* Settings Bar */}
          <SettingsBar
            onTogglePiano={handleTogglePiano}
            onRecord={handleRecord}
            onKeyAssist={keyAssistPopup.handleOpen}
            onInstrument={instrumentPopup.handleOpen}
            onSound={soundSettingsToggle.handleToggle}
            onStyles={styleSettingsPopup.handleOpen}
          />

          {/* Piano Component */}
          <Piano 
            onPressedNotesChange={handlePressedNotesChange}
            keyboardEnabled={isKeyboardEnabled}
            onRecordNotePress={recordNotePress}
            onRecordNoteRelease={recordNoteRelease}
          />
        </PianoUnitWrapper>
      </Box>

      {/* Instrument Selector Popup */}
      <InstrumentSelectorPopup
        open={instrumentPopup.isOpen}
        anchorEl={instrumentPopup.anchorEl}
        currentSoundSetId={soundSet}
        onClose={instrumentPopup.handleClose}
        onSoundSetChange={handleSoundSetChange}
        pianoTheme={pianoTheme}
        isLoading={isLoadingInstrument}
      />

      {/* Sound Settings Popup */}
      <SoundSettingsPopup
        open={soundSettingsPopup.isOpen}
        anchorEl={soundSettingsPopup.anchorEl}
        onClose={handleSoundSettingsClose}
        sustain={sustain}
        onSustainChange={(value) => {
          dispatch(setSustain(value));
          getAudioEngine().setSustain(value);
        }}
        transpose={soundSettings.transpose}
        onTransposeChange={soundSettings.setTranspose}
        volume={soundSettings.volume}
        onVolumeChange={soundSettings.setVolume}
        metronomeEnabled={soundSettings.metronomeEnabled}
        metronomeTempo={soundSettings.metronomeTempo}
        metronomeVolume={soundSettings.metronomeVolume}
        onMetronomeToggle={soundSettings.toggleMetronome}
        onMetronomeTempoChange={soundSettings.setMetronomeTempo}
        onMetronomeVolumeChange={soundSettings.setMetronomeVolume}
        midiDevice={soundSettings.midiDevice}
        onMidiDeviceChange={soundSettings.setMidiDevice}
        pianoTheme={pianoTheme}
        targetSection={soundPopupTargetSection}
      />

      {/* Style Settings Popup */}
      <StyleSettingsPopup
        open={styleSettingsPopup.isOpen}
        anchorEl={styleSettingsPopup.anchorEl}
        onClose={styleSettingsPopup.handleClose}
        onOpenSettings={onOpenSettings ? () => onOpenSettings('general') : undefined}
      />

      {/* Key Assist Popup */}
      <KeyAssistPopup
        open={keyAssistPopup.isOpen}
        anchorEl={keyAssistPopup.anchorEl}
        showKeyboard={showKeyboard}
        showNoteName={showNoteName}
        onClose={keyAssistPopup.handleClose}
        onShowKeyboardChange={(value) => dispatch(setShowKeyboard(value))}
        onShowNoteNameChange={(value) => dispatch(setShowNoteName(value))}
        pianoTheme={pianoTheme}
      />
    </>
  );
};
