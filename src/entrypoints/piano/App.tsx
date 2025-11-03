import { useState } from 'react';
import { Box, Container, Typography, Slider, Paper, Button, Stack } from '@mui/material';
import { Piano } from '@/components/piano/piano';
import { StatisticsBoard } from '@/components/piano/statistics-board';
import { SettingsBar } from '@/components/piano/settings-bar';
import { PianoKey } from '@/components/piano/types';
import { getAudioEngine } from '@/services/audio-engine';
import './App.css';

function App() {
  const [sustain, setSustain] = useState(0); // Default: 0s base + 10.5s offset = 10.5s total
  const [pressedNotes, setPressedNotes] = useState<Map<string, PianoKey>>(new Map());
  const [currentNote, setCurrentNote] = useState<PianoKey | null>(null);
  const [pianoTheme, setPianoTheme] = useState('wooden'); // Current piano theme

  const handleSustainChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setSustain(value);
    getAudioEngine().setSustain(value);
  };

  const handlePressedNotesChange = (notes: Map<string, PianoKey>, current: PianoKey | null) => {
    setPressedNotes(notes);
    setCurrentNote(current);
  };

  // Settings bar handlers (placeholder for now)
  const handleRecord = () => console.log('Record clicked');
  const handleKeyAssist = () => console.log('Key Assist clicked');
  const handleSound = () => console.log('Sound clicked');
  const handleStyles = () => {
    // Cycle through themes for now
    const themes = ['wooden', 'black', 'metal', 'white'];
    const currentIndex = themes.indexOf(pianoTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setPianoTheme(themes[nextIndex]);
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

          {/* Statistics Board */}
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <StatisticsBoard 
              pressedNotes={pressedNotes}
              currentNote={currentNote}
            />
          </Box>

          {/* Settings Bar */}
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <SettingsBar
              onRecord={handleRecord}
              onKeyAssist={handleKeyAssist}
              onSound={handleSound}
              onStyles={handleStyles}
              onSave={handleSave}
              onMore={handleMore}
            />
          </Box>

          {/* Piano Component */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Piano 
              themeId={pianoTheme}
              onPressedNotesChange={handlePressedNotesChange} 
            />
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
    </Box>
  );
}

export default App;
