import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  Button,
  Stack,
  Divider,
  styled,
} from '@mui/material';
import {
  Close as CloseIcon,
  VolumeUp as VolumeIcon,
  GraphicEq as TransposeIcon,
  MusicNote as SustainIcon,
  Tune as MetronomeIcon,
  Devices as DevicesIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

interface SoundSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  // Sustain settings
  sustain: number;
  onSustainChange: (value: number) => void;
  // Transpose settings
  transpose?: number;
  onTransposeChange?: (value: number) => void;
  // Volume settings
  volume?: number;
  onVolumeChange?: (value: number) => void;
  // Metronome settings
  metronomeEnabled?: boolean;
  onMetronomeToggle?: () => void;
  // MIDI device settings
  midiDevice?: string;
  onMidiDeviceChange?: (device: string) => void;
  availableMidiDevices?: string[];
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '400px',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ControlSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

const ControlLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

const TransposeControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
}));

export const SoundSettingsDialog: React.FC<SoundSettingsDialogProps> = ({
  open,
  onClose,
  sustain,
  onSustainChange,
  transpose = 0,
  onTransposeChange,
  volume = 80,
  onVolumeChange,
  metronomeEnabled = false,
  onMetronomeToggle,
  midiDevice = 'none',
  onMidiDeviceChange,
  availableMidiDevices = ['None', 'Virtual MIDI Device', 'USB MIDI Keyboard'],
}) => {
  const handleSustainChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    onSustainChange(value);
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    if (onVolumeChange) {
      onVolumeChange(value);
    }
  };

  const handleTransposeIncrease = () => {
    if (onTransposeChange && transpose < 12) {
      onTransposeChange(transpose + 1);
    }
  };

  const handleTransposeDecrease = () => {
    if (onTransposeChange && transpose > -12) {
      onTransposeChange(transpose - 1);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VolumeIcon />
          <Typography variant="h6" fontWeight="600">
            Sound Settings
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ px: 3 }}>
        <Stack spacing={2} divider={<Divider />}>
          {/* Sustain Control */}
          <ControlSection>
            <ControlLabel>
              <SustainIcon color="action" fontSize="small" />
              <Typography variant="subtitle1" fontWeight="600">
                Sustain
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={sustain > -10}
                    onChange={(e) => onSustainChange(e.target.checked ? 0 : -10.5)}
                    size="small"
                  />
                }
                label={sustain > -10 ? "ON" : "OFF"}
                labelPlacement="end"
                sx={{ ml: 'auto' }}
              />
            </ControlLabel>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              Adjust: {sustain.toFixed(1)}s • Total: {(sustain + 10.5).toFixed(1)}s
            </Typography>
            <Slider
              value={sustain}
              onChange={handleSustainChange}
              min={-10.5}
              max={10}
              step={0.1}
              disabled={sustain <= -10}
              marks={[
                { value: -10.5, label: 'Off' },
                { value: 0, label: '0s' },
                { value: 10, label: '10s' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value.toFixed(1)}s`}
              size="small"
            />
          </ControlSection>

          {/* Transpose Control */}
          <ControlSection>
            <ControlLabel>
              <TransposeIcon color="action" fontSize="small" />
              <Typography variant="subtitle1" fontWeight="600">
                Transpose
              </Typography>
            </ControlLabel>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              Shift pitch up or down by semitones
            </Typography>
            <TransposeControls>
              <IconButton
                onClick={handleTransposeDecrease}
                disabled={transpose <= -12}
                size="small"
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="600">
                  {transpose > 0 ? '+' : ''}{transpose}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  semitones
                </Typography>
              </Box>
              <IconButton
                onClick={handleTransposeIncrease}
                disabled={transpose >= 12}
                size="small"
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <AddIcon />
              </IconButton>
            </TransposeControls>
          </ControlSection>

          {/* Volume Control */}
          <ControlSection>
            <ControlLabel>
              <VolumeIcon color="action" fontSize="small" />
              <Typography variant="subtitle1" fontWeight="600">
                Volume
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                {volume}%
              </Typography>
            </ControlLabel>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={100}
              step={1}
              marks={[
                { value: 0, label: '0%' },
                { value: 50, label: '50%' },
                { value: 100, label: '100%' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              size="small"
            />
          </ControlSection>

          {/* MIDI Device Selection */}
          <ControlSection>
            <ControlLabel>
              <DevicesIcon color="action" fontSize="small" />
              <Typography variant="subtitle1" fontWeight="600">
                MIDI Device
              </Typography>
            </ControlLabel>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              Connect external MIDI keyboard
            </Typography>
            <Select
              value={midiDevice}
              onChange={(e) => onMidiDeviceChange && onMidiDeviceChange(e.target.value)}
              fullWidth
              size="small"
            >
              {availableMidiDevices.map((device) => (
                <MenuItem key={device} value={device.toLowerCase()}>
                  {device}
                </MenuItem>
              ))}
            </Select>
          </ControlSection>

          {/* Metronome */}
          <ControlSection>
            <ControlLabel>
              <MetronomeIcon color="action" fontSize="small" />
              <Typography variant="subtitle1" fontWeight="600">
                Metronome
              </Typography>
            </ControlLabel>
            <Button
              variant={metronomeEnabled ? "contained" : "outlined"}
              onClick={onMetronomeToggle}
              fullWidth
              sx={{ textTransform: 'uppercase', fontWeight: 600 }}
            >
              {metronomeEnabled ? 'Metronome ON' : 'Metronome OFF'}
            </Button>
          </ControlSection>
        </Stack>
      </DialogContent>
    </StyledDialog>
  );
};
