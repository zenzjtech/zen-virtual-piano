import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Stack } from '@mui/material';
import { Piano } from '@/components/piano/piano';
import { StatusBoard } from '@/components/piano/status-board';
import { SettingsBar } from '@/components/piano/settings-bar';
import { InstrumentSelectorPopup } from '@/components/piano/instrument-selector-popup';
import { SoundSettingsPopup } from '@/components/piano/sound-settings-popup';
import { StyleSettingsPopup } from '@/components/piano/style-settings-popup';
import { KeyAssistPopup } from '@/components/piano/key-assist-popup';
import { SheetSearchDialog } from '@/components/piano/music-sheet/sheet-search-dialog';
import { MusicStand } from '@/components/piano/music-sheet/music-stand';
import { Header } from '@/components/piano/header';
import { PianoKey } from '@/components/piano/types';
import { getTheme } from '@/components/piano/themes';
import { getAudioEngine } from '@/services/audio-engine';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setTheme, setSoundSet, setSustain, setBackgroundTheme, setShowKeyboard, setShowNoteName, setIsPianoEnabled } from '@/store/reducers/piano-settings-slice';
import { openSearchDialog, closeSearchDialog, switchToManualMode, addSheets } from '@/store/reducers/music-sheet-slice';
import { getBuiltInSheets } from '@/services/sheet-library';
import { usePopupManager } from '@/hooks/use-popup-manager';
import { useSoundSettings } from '@/hooks/use-sound-settings';
import { useEscapeKeyHandler } from '@/hooks/use-escape-key-handler';
import { useSheetNavigation } from '@/hooks/use-sheet-navigation';
import { getBackgroundStyle, isDarkBackgroundTheme } from '@/theme/background-themes';
import './App.css';
import { trackPageEvent, trackEvent } from '@/utils/analytics';
import { ANALYTICS_ACTION } from '@/utils/constants';

function App() {
  // Redux state for persistent settings
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.user.uid);    
  const pianoThemeId = useAppSelector((state) => state.pianoSettings.theme);
  const soundSet = useAppSelector((state) => state.pianoSettings.soundSet);
  const sustain = useAppSelector((state) => state.pianoSettings.sustain);
  const backgroundThemeId = useAppSelector((state) => state.pianoSettings.backgroundTheme);
  const showKeyboard = useAppSelector((state) => state.pianoSettings.showKeyboard);
  const showNoteName = useAppSelector((state) => state.pianoSettings.showNoteName);
  const isPianoEnabled = useAppSelector((state) => state.pianoSettings.isPianoEnabled);
  
  // Music sheet state
  const isSheetSearchOpen = useAppSelector((state) => state.musicSheet.isSearchDialogOpen);
  const isMusicStandVisible = useAppSelector((state) => state.musicSheet.isMusicStandVisible);
  const isSheetPlaying = useAppSelector((state) => state.musicSheet.playback.isPlaying);
  
  // Get the actual theme object
  const pianoTheme = getTheme(pianoThemeId);
  
  // Local component state for UI interactions
  const [pressedNotes, setPressedNotes] = useState<Map<string, PianoKey>>(new Map());
  const [currentNote, setCurrentNote] = useState<PianoKey | null>(null);
  
  // Popup managers
  const instrumentPopup = usePopupManager();
  const soundSettingsPopup = usePopupManager();
  const styleSettingsPopup = usePopupManager();
  const keyAssistPopup = usePopupManager();
  const sheetSearchPopup = usePopupManager();
  
  // Determine if keyboard should be enabled (disabled when any popup is open or manually disabled)
  const isKeyboardEnabled = isPianoEnabled && !instrumentPopup.isOpen && !soundSettingsPopup.isOpen && !styleSettingsPopup.isOpen && !keyAssistPopup.isOpen && !isSheetSearchOpen;
  
  // Sound settings state
  const soundSettings = useSoundSettings();

  useEffect(() => {    
      trackPageEvent(uid, ANALYTICS_ACTION.PAGE_VIEW, 'Home', {}, document.URL);    
  }, [uid]);

  // Load built-in sheet library on mount
  useEffect(() => {
    const sheets = getBuiltInSheets();
    dispatch(addSheets(sheets));
  }, [dispatch]);

  // Sync audio engine with Redux state on mount
  useEffect(() => {
    getAudioEngine().setSustain(sustain);
  }, [sustain]);

  // Sheet search close handler with Redux dispatch
  const handleSheetSearchClose = useCallback(() => {
    sheetSearchPopup.handleClose();
    dispatch(closeSearchDialog());
  }, [sheetSearchPopup, dispatch]);

  // Handle Escape key to close popups or enable piano
  useEscapeKeyHandler(
    {
      instrumentPopupOpen: instrumentPopup.isOpen,
      soundSettingsOpen: soundSettingsPopup.isOpen,
      styleSettingsOpen: styleSettingsPopup.isOpen,
      keyAssistPopupOpen: keyAssistPopup.isOpen,
      isSheetSearchOpen,
    },
    {
      handleInstrumentPopupClose: instrumentPopup.handleClose,
      handleSoundSettingsClose: soundSettingsPopup.handleClose,
      handleStyleSettingsClose: styleSettingsPopup.handleClose,
      handleKeyAssistPopupClose: keyAssistPopup.handleClose,
      handleSheetSearchClose,
    }
  );

  // Handle Enter/Backspace navigation for sheet mode
  useSheetNavigation();


  const handlePressedNotesChange = useCallback((notes: Map<string, PianoKey>, current: PianoKey | null) => {
    setPressedNotes(notes);
    setCurrentNote(current);
    
    // Auto-switch to manual mode when user presses any key during sheet playback
    if (isSheetPlaying && current !== null) {
      dispatch(switchToManualMode());
    }
  }, [isSheetPlaying, dispatch]);

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
  
  const handleRecord = () => console.log('Record clicked');

  const handleSoundSetChange = async (newSoundSetId: string) => {
    dispatch(setSoundSet(newSoundSetId));
    // Change the sound set in the audio engine
    await getAudioEngine().changeSoundSet(newSoundSetId);
    // Reapply sustain setting after sound set change
    getAudioEngine().setSustain(sustain);
  };
  
  const handlePianoThemeChange = (themeId: string) => {
    dispatch(setTheme(themeId));
  };
  
  const handleBackgroundThemeChange = (themeId: string) => {
    dispatch(setBackgroundTheme(themeId));
  };

  const handleSheets = (event: React.MouseEvent<HTMLButtonElement>) => {
    sheetSearchPopup.handleOpen(event);
    dispatch(openSearchDialog());
  };

  // Get background theme styles and determine if it's a dark background
  const isDarkBackground = isDarkBackgroundTheme(backgroundThemeId);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        ...getBackgroundStyle(backgroundThemeId),
      }}
    >
      {/* Sticky Header */}
      <Header 
        backgroundThemeId={backgroundThemeId}
        isDarkBackground={isDarkBackground}
      />

      <Container maxWidth="lg">
        <Stack
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{
            textAlign: 'center',
            py: { xs: 2, md: 4 },
          }}
        >

          {/* Music Stand - appears when sheet is loaded */}
          {isMusicStandVisible && (
            <MusicStand pianoTheme={pianoTheme} />
          )}

          {/* Integrated Piano Unit */}
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
              />

              {/* Settings Bar */}
              <SettingsBar
                onTogglePiano={handleTogglePiano}
                isPianoEnabled={isPianoEnabled}
                onRecord={handleRecord}
                onKeyAssist={keyAssistPopup.handleOpen}
                onInstrument={instrumentPopup.handleOpen}
                onSound={soundSettingsPopup.handleOpen}
                onStyles={styleSettingsPopup.handleOpen}
                onSheets={handleSheets}
                pianoTheme={pianoTheme}
              />

              {/* Piano Component */}
              <Piano 
                themeId={pianoThemeId}
                onPressedNotesChange={handlePressedNotesChange}
                keyboardEnabled={isKeyboardEnabled}
                showKeyboard={showKeyboard}
                showNoteName={showNoteName}
              />
            </Box>
          </Box>

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

      {/* Instrument Selector Popup */}
      <InstrumentSelectorPopup
        open={instrumentPopup.isOpen}
        anchorEl={instrumentPopup.anchorEl}
        currentSoundSetId={soundSet}
        onClose={instrumentPopup.handleClose}
        onSoundSetChange={handleSoundSetChange}
        pianoTheme={pianoTheme}
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
        onMetronomeToggle={soundSettings.toggleMetronome}
        midiDevice={soundSettings.midiDevice}
        onMidiDeviceChange={soundSettings.setMidiDevice}
        pianoTheme={pianoTheme}
      />

      {/* Style Settings Popup */}
      <StyleSettingsPopup
        open={styleSettingsPopup.isOpen}
        anchorEl={styleSettingsPopup.anchorEl}
        onClose={styleSettingsPopup.handleClose}
        currentPianoTheme={pianoThemeId}
        currentBackgroundTheme={backgroundThemeId}
        onPianoThemeChange={handlePianoThemeChange}
        onBackgroundThemeChange={handleBackgroundThemeChange}
        pianoTheme={pianoTheme}
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

      {/* Sheet Search Dialog */}
      <SheetSearchDialog
        open={isSheetSearchOpen}
        anchorEl={sheetSearchPopup.anchorEl}
        onClose={handleSheetSearchClose}
        pianoTheme={pianoTheme}
      />
    </Box>
  );
}

export default App;
