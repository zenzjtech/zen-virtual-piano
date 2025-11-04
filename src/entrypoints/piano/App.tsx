import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Typography, Slider, Paper, Button, Stack } from '@mui/material';
import { Piano } from '@/components/piano/piano';
import { StatusBoard } from '@/components/piano/status-board';
import { SettingsBar } from '@/components/piano/settings-bar';
import { InstrumentSelectorPopup } from '@/components/piano/instrument-selector-popup';
import { SoundSettingsPopup } from '@/components/piano/sound-settings-popup';
import { StyleSettingsPopup } from '@/components/piano/style-settings-popup';
import { KeyAssistPopup } from '@/components/piano/key-assist-popup';
import { SheetSearchDialog } from '@/components/piano/music-sheet/sheet-search-dialog';
import { MusicStand } from '@/components/piano/music-sheet/music-stand';
import { PianoKey } from '@/components/piano/types';
import { getTheme } from '@/components/piano/themes';
import { getAudioEngine } from '@/services/audio-engine';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setTheme, setSoundSet, setSustain, setBackgroundTheme, setShowKeyboard, setShowNoteName, setIsPianoEnabled } from '@/store/reducers/piano-settings-slice';
import { openSearchDialog, closeSearchDialog, switchToManualMode, addSheets } from '@/store/reducers/music-sheet-slice';
import { getBuiltInSheets } from '@/services/sheet-library';
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
  
  // Instrument popup state
  const [instrumentPopupAnchor, setInstrumentPopupAnchor] = useState<HTMLElement | null>(null);
  const instrumentPopupOpen = Boolean(instrumentPopupAnchor);
  
  // Sound settings popup state
  const [soundSettingsAnchor, setSoundSettingsAnchor] = useState<HTMLElement | null>(null);
  const soundSettingsOpen = Boolean(soundSettingsAnchor);
  
  // Style settings popup state
  const [styleSettingsAnchor, setStyleSettingsAnchor] = useState<HTMLElement | null>(null);
  const styleSettingsOpen = Boolean(styleSettingsAnchor);
  
  // Key Assist popup state
  const [keyAssistPopupAnchor, setKeyAssistPopupAnchor] = useState<HTMLElement | null>(null);
  const keyAssistPopupOpen = Boolean(keyAssistPopupAnchor);
  
  // Sheet search popup state
  const [sheetSearchAnchor, setSheetSearchAnchor] = useState<HTMLElement | null>(null);
  
  // Refs for focus management - store trigger buttons
  const instrumentButtonRef = useRef<HTMLElement | null>(null);
  const soundButtonRef = useRef<HTMLElement | null>(null);
  const styleButtonRef = useRef<HTMLElement | null>(null);
  const keyAssistButtonRef = useRef<HTMLElement | null>(null);
  const sheetButtonRef = useRef<HTMLElement | null>(null);
  
  // Determine if keyboard should be enabled (disabled when any popup is open or manually disabled)
  const isKeyboardEnabled = isPianoEnabled && !instrumentPopupOpen && !soundSettingsOpen && !styleSettingsOpen && !keyAssistPopupOpen && !isSheetSearchOpen;
  
  // Additional sound settings (local state for now, can be moved to Redux later)
  const [transpose, setTranspose] = useState(0);
  const [volume, setVolume] = useState(80);
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const [midiDevice, setMidiDevice] = useState('none');

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

  // Handle Escape key to close popups or enable piano
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Priority 1: Close any open popup and return focus
        if (instrumentPopupOpen) {
          handleInstrumentPopupClose();
          event.preventDefault();
        } else if (soundSettingsOpen) {
          handleSoundSettingsClose();
          event.preventDefault();
        } else if (styleSettingsOpen) {
          handleStyleSettingsClose();
          event.preventDefault();
        } else if (keyAssistPopupOpen) {
          handleKeyAssistPopupClose();
          event.preventDefault();
        } else if (isSheetSearchOpen) {
          handleSheetSearchClose();
          event.preventDefault();
        } 
        // Priority 2: Enable piano if it's disabled and no popups are open
        else if (!isPianoEnabled) {
          dispatch(setIsPianoEnabled(true));
          trackEvent(uid, ANALYTICS_ACTION.PIANO_ENABLED, {
            previous_state: false,
            new_state: true,
            trigger: 'escape_key',
          });
          event.preventDefault();
        }
      }
    };

    // Add listener if any popup is open OR if piano is disabled
    if (instrumentPopupOpen || soundSettingsOpen || styleSettingsOpen || keyAssistPopupOpen || isSheetSearchOpen || !isPianoEnabled) {
      window.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [instrumentPopupOpen, soundSettingsOpen, styleSettingsOpen, keyAssistPopupOpen, isSheetSearchOpen, isPianoEnabled, dispatch, uid]);

  const handleSustainChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    dispatch(setSustain(value));
    getAudioEngine().setSustain(value);
  };

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
  
  const handleKeyAssist = (event: React.MouseEvent<HTMLButtonElement>) => {
    keyAssistButtonRef.current = event.currentTarget;
    setKeyAssistPopupAnchor(event.currentTarget);
  };
  
  const handleKeyAssistPopupClose = () => {
    setKeyAssistPopupAnchor(null);
    // Return focus to trigger button
    setTimeout(() => {
      keyAssistButtonRef.current?.focus();
    }, 100);
  };
  
  const handleInstrument = (event: React.MouseEvent<HTMLButtonElement>) => {
    instrumentButtonRef.current = event.currentTarget;
    setInstrumentPopupAnchor(event.currentTarget);
  };
  
  const handleInstrumentPopupClose = () => {
    setInstrumentPopupAnchor(null);
    // Return focus to trigger button
    setTimeout(() => {
      instrumentButtonRef.current?.focus();
    }, 100);
  };
  
  const handleSound = (event: React.MouseEvent<HTMLButtonElement>) => {
    soundButtonRef.current = event.currentTarget;
    setSoundSettingsAnchor(event.currentTarget);
  };
  
  const handleSoundSettingsClose = () => {
    setSoundSettingsAnchor(null);
    // Return focus to trigger button
    setTimeout(() => {
      soundButtonRef.current?.focus();
    }, 100);
  };
  
  const handleSoundSetChange = async (newSoundSetId: string) => {
    dispatch(setSoundSet(newSoundSetId));
    // Change the sound set in the audio engine
    await getAudioEngine().changeSoundSet(newSoundSetId);
    // Reapply sustain setting after sound set change
    getAudioEngine().setSustain(sustain);
  };
  
  const handleStyles = (event: React.MouseEvent<HTMLButtonElement>) => {
    styleButtonRef.current = event.currentTarget;
    setStyleSettingsAnchor(event.currentTarget);
  };
  
  const handleStyleSettingsClose = () => {
    setStyleSettingsAnchor(null);
    // Return focus to trigger button
    setTimeout(() => {
      styleButtonRef.current?.focus();
    }, 100);
  };
  
  const handlePianoThemeChange = (themeId: string) => {
    dispatch(setTheme(themeId));
  };
  
  const handleBackgroundThemeChange = (themeId: string) => {
    dispatch(setBackgroundTheme(themeId));
  };
  
  const handleSheets = (event: React.MouseEvent<HTMLButtonElement>) => {
    sheetButtonRef.current = event.currentTarget;
    setSheetSearchAnchor(event.currentTarget);
    dispatch(openSearchDialog());
  };
  
  const handleSheetSearchClose = () => {
    setSheetSearchAnchor(null);
    dispatch(closeSearchDialog());
    // Return focus to trigger button
    setTimeout(() => {
      sheetButtonRef.current?.focus();
    }, 100);
  };

  // Get background theme styles and determine if it's a dark background
  const isDarkBackground = ['dark', 'gradient-ocean', 'gufeng-ink-jade', 'leela-peacock-divine', 'isha-earth-mystic', 'sacred-light-glory', 'islamic-emerald-gold'].includes(backgroundThemeId);
  
  const getBackgroundStyle = () => {
    switch (backgroundThemeId) {
      case 'white':
        return { backgroundColor: '#FFFFFF' };
      case 'light-gray':
        return { backgroundColor: '#F5F5F5' };
      case 'warm':
        return { backgroundColor: '#FFF8F0' };
      case 'cool':
        return { backgroundColor: '#F0F4F8' };
      case 'dark':
        return { backgroundColor: '#2C2C2C' };
      case 'gradient-sunset':
        return { background: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)' };
      case 'gradient-ocean':
        return { background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' };
      case 'gradient-forest':
        return { background: 'linear-gradient(135deg, #56AB2F 0%, #A8E063 100%)' };
      case 'gufeng-ink-jade':
        return { background: 'linear-gradient(135deg, #2C3E50 0%, #3C5A4E 50%, #4A6B5A 100%)' };
      case 'gufeng-vermillion-gold':
        return { background: 'linear-gradient(135deg, #8B3A3A 0%, #C84B31 35%, #D4AF37 70%, #F4E5A1 100%)' };
      case 'zen-sakura-dawn':
        return { background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE5EC 25%, #FFB7C5 60%, #FFA8B8 100%)' };
      case 'zen-bamboo-stone':
        return { background: 'linear-gradient(135deg, #D4D9D4 0%, #B4C4B4 35%, #8B9D83 70%, #6B7B68 100%)' };
      case 'leela-saffron-marigold':
        return { background: 'linear-gradient(135deg, #FFE5CC 0%, #FFB366 30%, #FF9933 60%, #CC6600 100%)' };
      case 'leela-peacock-divine':
        return { background: 'linear-gradient(135deg, #667EEA 0%, #4A90E2 25%, #2E5F8F 60%, #1A3A5C 100%)' };
      case 'isha-earth-mystic':
        return { background: 'linear-gradient(135deg, #D4A574 0%, #B8956A 25%, #8B6F47 55%, #6B5B4A 80%, #4A4458 100%)' };
      case 'sacred-light-glory':
        return { background: 'linear-gradient(135deg, #FFF8E7 0%, #FFD700 20%, #E6B800 40%, #4169E1 70%, #2F4F7F 100%)' };
      case 'islamic-emerald-gold':
        return { background: 'linear-gradient(135deg, #F0E68C 0%, #DAA520 25%, #00704A 60%, #004D40 100%)' };
      default:
        return { backgroundColor: '#FFFFFF' };
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        ...getBackgroundStyle(),
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={{ xs: 4, md: 5 }}
          alignItems="center"
          sx={{
            textAlign: 'center',
          }}
        >
          {/* Header Section */}
          <Box sx={{ maxWidth: 700, px: 2 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="600"
              sx={{
                color: isDarkBackground ? 'rgba(255, 255, 255, 0.95)' : 'grey.900',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
              }}
            >
              🎹 Zen Virtual Piano
            </Typography>          
          </Box>

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
                onKeyAssist={handleKeyAssist}
                onInstrument={handleInstrument}
                onSound={handleSound}
                onStyles={handleStyles}
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
        open={instrumentPopupOpen}
        anchorEl={instrumentPopupAnchor}
        currentSoundSetId={soundSet}
        onClose={handleInstrumentPopupClose}
        onSoundSetChange={handleSoundSetChange}
        pianoTheme={pianoTheme}
      />

      {/* Sound Settings Popup */}
      <SoundSettingsPopup
        open={soundSettingsOpen}
        anchorEl={soundSettingsAnchor}
        onClose={handleSoundSettingsClose}
        sustain={sustain}
        onSustainChange={(value) => {
          dispatch(setSustain(value));
          getAudioEngine().setSustain(value);
        }}
        transpose={transpose}
        onTransposeChange={setTranspose}
        volume={volume}
        onVolumeChange={setVolume}
        metronomeEnabled={metronomeEnabled}
        onMetronomeToggle={() => setMetronomeEnabled(!metronomeEnabled)}
        midiDevice={midiDevice}
        onMidiDeviceChange={setMidiDevice}
        pianoTheme={pianoTheme}
      />

      {/* Style Settings Popup */}
      <StyleSettingsPopup
        open={styleSettingsOpen}
        anchorEl={styleSettingsAnchor}
        onClose={handleStyleSettingsClose}
        currentPianoTheme={pianoThemeId}
        currentBackgroundTheme={backgroundThemeId}
        onPianoThemeChange={handlePianoThemeChange}
        onBackgroundThemeChange={handleBackgroundThemeChange}
        pianoTheme={pianoTheme}
      />

      {/* Key Assist Popup */}
      <KeyAssistPopup
        open={keyAssistPopupOpen}
        anchorEl={keyAssistPopupAnchor}
        showKeyboard={showKeyboard}
        showNoteName={showNoteName}
        onClose={handleKeyAssistPopupClose}
        onShowKeyboardChange={(value) => dispatch(setShowKeyboard(value))}
        onShowNoteNameChange={(value) => dispatch(setShowNoteName(value))}
        pianoTheme={pianoTheme}
      />

      {/* Sheet Search Dialog */}
      <SheetSearchDialog
        open={isSheetSearchOpen}
        anchorEl={sheetSearchAnchor}
        onClose={handleSheetSearchClose}
        pianoTheme={pianoTheme}
      />
    </Box>
  );
}

export default App;
