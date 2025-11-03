import { useState } from 'react';
import { Box, Container, Typography, Slider, Paper } from '@mui/material';
import { Piano } from '@/components/piano/piano';
import { getAudioEngine } from '@/services/audio-engine';
import './App.css';

function App() {
  const [sustain, setSustain] = useState(0); // Default: 0s base + 10.5s offset = 10.5s total

  const handleSustainChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setSustain(value);
    getAudioEngine().setSustain(value);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 4,
          py: 4,
        }}
      >
        <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
          🎹 Zen Virtual Piano
        </Typography>
        
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Play piano using your keyboard or click the keys with your mouse
        </Typography>
        
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ fontStyle: 'italic' }}>
          5+ Octaves • C2 to C7 • 67 Keys
        </Typography>

        {/* Sustain Control */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="subtitle2" gutterBottom color="text.primary">
            Sustain: {sustain.toFixed(1)}s → Total: {(sustain + 10.5).toFixed(1)}s
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
          />
        </Paper>

        <Piano />

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
          Use numbers (1-0), letters (q-m), and Shift for sharps/flats
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
