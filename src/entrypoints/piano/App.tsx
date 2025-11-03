import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Typography, Slider, Paper, Button, Stack } from '@mui/material';
import { Piano } from '@/components/piano/piano';
import { StatusBoard } from '@/components/piano/status-board';
import { SettingsBar } from '@/components/piano/settings-bar';
import { InstrumentSelectorPopup } from '@/components/piano/instrument-selector-popup';
import { SoundSettingsPopup } from '@/components/piano/sound-settings-popup';
import { PianoKey } from '@/components/piano/types';
import { getTheme } from '@/components/piano/themes';
import { getAudioEngine } from '@/services/audio-engine';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setTheme, setSoundSet, setSustain } from '@/components/piano/piano-settings-slice';
import './App.css';

function App() {
  // Redux state for persistent settings
  const dispatch = useAppDispatch();
  const pianoThemeId = useAppSelector((state) => state.pianoSettings.theme);
  const soundSet = useAppSelector((state) => state.pianoSettings.soundSet);
  const sustain = useAppSelector((state) => state.pianoSettings.sustain);
  
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
  
  // Refs for focus management - store trigger buttons
  const instrumentButtonRef = useRef<HTMLElement | null>(null);
  const soundButtonRef = useRef<HTMLElement | null>(null);
  
  // Determine if keyboard should be enabled (disabled when any popup is open)
  const isKeyboardEnabled = !instrumentPopupOpen && !soundSettingsOpen;
  
  // Additional sound settings (local state for now, can be moved to Redux later)
  const [transpose, setTranspose] = useState(0);
  const [volume, setVolume] = useState(80);
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const [midiDevice, setMidiDevice] = useState('none');

  // Sync audio engine with Redux state on mount
  useEffect(() => {
    getAudioEngine().setSustain(sustain);
  }, [sustain]);

  // Handle Escape key to close popups
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Close any open popup and return focus
        if (instrumentPopupOpen) {
          handleInstrumentPopupClose();
          event.preventDefault();
        } else if (soundSettingsOpen) {
          handleSoundSettingsClose();
          event.preventDefault();
        }
      }
    };

    // Only add listener if any popup is open
    if (instrumentPopupOpen || soundSettingsOpen) {
      window.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [instrumentPopupOpen, soundSettingsOpen]);

  const handleSustainChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    dispatch(setSustain(value));
    getAudioEngine().setSustain(value);
  };

  const handlePressedNotesChange = useCallback((notes: Map<string, PianoKey>, current: PianoKey | null) => {
    setPressedNotes(notes);
    setCurrentNote(current);
  }, []);

  // Settings bar handlers
  const handleRecord = () => console.log('Record clicked');
  const handleKeyAssist = () => console.log('Key Assist clicked');
  
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
  
  const handleStyles = () => {
    // Cycle through themes
    const themes = ['wooden', 'black', 'metal', 'white'];
    const currentIndex = themes.indexOf(pianoThemeId);
    const nextIndex = (currentIndex + 1) % themes.length;
    dispatch(setTheme(themes[nextIndex]));
  };
  
  const handleSave = () => console.log('Save clicked');
  const handleMore = () => console.log('More clicked');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
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
                color: 'grey.900',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
              }}
            >
              🎹 Zen Virtual Piano
            </Typography>
            
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                mb: 1.5,
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.125rem' },
              }}
            >
              Play piano using your keyboard or click the keys with your mouse
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'grey.600',
                fontStyle: 'italic',
              }}
            >
              5+ Octaves • C2 to C7 • 67 Keys
            </Typography>
          </Box>

          {/* Sustain Control Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              width: '100%',
              maxWidth: 500,
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              fontWeight="600"
              sx={{ 
                color: 'grey.900',
                mb: 3,
              }}
            >
              Sustain Control
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Adjust: {sustain.toFixed(1)}s • Total: {(sustain + 10.5).toFixed(1)}s
            </Typography>
            <Slider
              value={sustain}
              onChange={handleSustainChange}
              min={-10.5}
              max={10}
              step={0.1}
              marks={[
                { value: -10.5, label: 'Off' },
                { value: 0, label: '0s' },
                { value: 10, label: '10s' },              
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value.toFixed(1)}s`}
              sx={{
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(76, 175, 80, 0.16)',
                  },
                  '&.Mui-active': {
                    boxShadow: '0px 0px 0px 12px rgba(76, 175, 80, 0.16)',
                  },
                },
                '& .MuiSlider-mark': {
                  backgroundColor: 'grey.400',
                },
                '& .MuiSlider-markLabel': {
                  color: 'grey.600',
                  fontSize: '0.75rem',
                },
              }}
            />
          </Paper>

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
                onRecord={handleRecord}
                onKeyAssist={handleKeyAssist}
                onInstrument={handleInstrument}
                onSound={handleSound}
                onStyles={handleStyles}
                onSave={handleSave}
                onMore={handleMore}
                pianoTheme={pianoTheme}
              />

              {/* Piano Component */}
              <Piano 
                themeId={pianoThemeId}
                onPressedNotesChange={handlePressedNotesChange}
                keyboardEnabled={isKeyboardEnabled}
              />
            </Box>
          </Box>

          {/* Instructions */}
          <Paper
            elevation={0}
            sx={{
              px: 3,
              py: 2,
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              maxWidth: 600,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              💡 <strong>Keyboard Shortcuts:</strong> Use numbers (1-0), letters (q-m), and Shift for sharps/flats
            </Typography>
          </Paper>
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
    </Box>
  );
}

export default App;
