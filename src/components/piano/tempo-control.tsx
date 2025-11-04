import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { PianoTheme } from './themes';
import { useAppSelector } from '@/store/hook';
import { usePlayerControls } from '@/hooks/use-player-controls';

interface TempoControlProps {
  pianoTheme: PianoTheme;
}

export const TempoControl: React.FC<TempoControlProps> = ({
  pianoTheme,
}) => {
  // Get tempo from Redux
  const tempo = useAppSelector((state) => state.musicSheet.playback.tempo);
  
  // Get tempo change handler
  const { handleTempoChange } = usePlayerControls();

  const onTempoChange = (_event: Event, newValue: number | number[]) => {
    const newTempo = Array.isArray(newValue) ? newValue[0] : newValue;
    handleTempoChange(newTempo);
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
        onChange={onTempoChange}
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
