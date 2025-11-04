import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { PianoTheme } from './themes';

interface TempoControlProps {
  tempo: number;
  pianoTheme: PianoTheme;
  onTempoChange: (tempo: number) => void;
}

export const TempoControl: React.FC<TempoControlProps> = ({
  tempo,
  pianoTheme,
  onTempoChange,
}) => {
  const handleTempoChange = (_event: Event, newValue: number | number[]) => {
    const newTempo = Array.isArray(newValue) ? newValue[0] : newValue;
    onTempoChange(newTempo);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="caption" 
        sx={{ 
          color: pianoTheme.colors.secondary, 
          fontSize: '0.7rem' 
        }}
      >
        Tempo: {tempo} BPM
      </Typography>
      <Slider
        value={tempo}
        onChange={handleTempoChange}
        min={40}
        max={240}
        step={5}
        size="small"
        sx={{
          color: pianoTheme.colors.primary,
          '& .MuiSlider-thumb': {
            backgroundColor: pianoTheme.colors.primary,
          },
        }}
      />
    </Box>
  );
};
