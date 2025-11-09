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
import { getAudioEngine } from '@/services/audio-engine';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setSoundSet, setSustain, setShowKeyboard, setShowNoteName, setIsPianoEnabled } from '@/store/reducers/piano-settings-slice';
import { pauseSheet } from '@/store/reducers/music-sheet-slice';
import { useNotification } from '@/contexts/notification-context';
import { usePopupManager } from '@/hooks/use-popup-manager';
import { useSoundSettings } from '@/hooks/use-sound-settings';
import { useSheetSearch } from '@/hooks/use-sheet-search';
import { usePianoRecording } from '@/hooks/use-piano-recording';
import { useEscapeKeyHandler } from '@/hooks/use-escape-key-handler';
import { trackEvent } from '@/utils/analytics';
import { ANALYTICS_ACTION } from '@/utils/constants';

interface PianoUnitProps {
  /** Callback to open settings dialog */
  onOpenSettings?: (tab: 'general' | 'quotes' | 'piano' | 'keyboard') => void;
  /** Recording playback reference for mutual exclusivity */
  recordingPlaybackRef: React.MutableRefObject<{ isPlaying: boolean; pause: () => void }>;
}

/**
 * PianoUnit - Integrated piano component containing StatusBoard, SettingsBar, and Piano
 * This component manages all piano-related state and behavior internally,
 * accessing Redux state/dispatch directly to avoid props drilling.
 */
export const PianoUnit: React.FC<PianoUnitProps> = ({ 
  onOpenSettings,
  recordingPlaybackRef,
}) => {
  // Redux state
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.user.uid);
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const soundSet = useAppSelector((state) => state.pianoSettings.soundSet);
  const sustain = useAppSelector((state) => state.pianoSettings.sustain);
  const showKeyboard = useAppSelector((state) => state.pianoSettings.showKeyboard);
  const showNoteName = useAppSelector((state) => state.pianoSettings.showNoteName);
  const isPianoEnabled = useAppSelector((state) => state.pianoSettings.isPianoEnabled);
  const isSheetPlaying = useAppSelector((state) => state.musicSheet.playback.isPlaying);
  
  // Get the actual theme object
  const pianoTheme = getTheme(pianoThemeId);
  
  // Local component state for UI interactions
  const [pressedNotes, setPressedNotes] = useState<Map<string, PianoKey>>(new Map());
  const [currentNote, setCurrentNote] = useState<PianoKey | null>(null);
  const [isLoadingInstrument, setIsLoadingInstrument] = useState(false);
  
  // Popup managers
  const instrumentPopup = usePopupManager();
  const soundSettingsPopup = usePopupManager();
  const styleSettingsPopup = usePopupManager();
  const keyAssistPopup = usePopupManager();
  
  // Sheet search hook
  const { isSheetSearchOpen, handleSheetSearchOpen, handleSheetSearchClose } = useSheetSearch();
  
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
      handleSoundSettingsClose: soundSettingsPopup.handleClose,
      handleStyleSettingsClose: styleSettingsPopup.handleClose,
      handleKeyAssistPopupClose: keyAssistPopup.handleClose,
      handleSheetSearchClose,
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
  
  // Notification
  const { showNotification } = useNotification();

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
      showNotification('Auto-play paused. You can now play manually.', 'info');
    }
    
    // Pause recording playback when user plays manually
    if (recordingPlaybackRef.current.isPlaying && current !== null) {
      recordingPlaybackRef.current.pause();
      showNotification('Playback paused. You can now play manually.', 'info');
    }
  }, [isSheetPlaying, showNotification, dispatch, recordingPlaybackRef]);

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
      showNotification('🔴 Recording started', 'info');
      trackEvent(uid, ANALYTICS_ACTION.RECORD_STARTED, {});
    } else {
      const duration = getFormattedDuration();
      showNotification(
        `⏹️ Recording stopped (${noteCount} notes, ${duration})`,
        'success'
      );
      trackEvent(uid, ANALYTICS_ACTION.RECORD_STOPPED, {
        note_count: noteCount,
        duration,
      });
    }
  };

  const handleSoundSetChange = async (newSoundSetId: string) => {
    setIsLoadingInstrument(true);
    dispatch(setSoundSet(newSoundSetId));
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
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          {/* Statistics Board */}
          <StatusBoard 
            pressedNotes={pressedNotes}
            currentNote={currentNote}
            pianoTheme={pianoTheme}
            onSheetSearchOpen={handleSheetSearchOpen}
          />

          {/* Settings Bar */}
          <SettingsBar
            onTogglePiano={handleTogglePiano}
            onRecord={handleRecord}
            onKeyAssist={keyAssistPopup.handleOpen}
            onInstrument={instrumentPopup.handleOpen}
            onSound={soundSettingsPopup.handleOpen}
            onStyles={styleSettingsPopup.handleOpen}
          />

          {/* Piano Component */}
          <Piano 
            onPressedNotesChange={handlePressedNotesChange}
            keyboardEnabled={isKeyboardEnabled}
            onRecordNotePress={recordNotePress}
            onRecordNoteRelease={recordNoteRelease}
          />
        </Box>
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
        onClose={soundSettingsPopup.handleClose}
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
