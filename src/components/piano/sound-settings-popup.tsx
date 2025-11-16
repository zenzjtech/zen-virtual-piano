import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  Button,
  Stack,
  Divider,
  Popper,
  ClickAwayListener,
  styled,
  IconButton,
} from '@mui/material';
import {
  VolumeUp as VolumeIcon,
  GraphicEq as TransposeIcon,
  MusicNote as SustainIcon,
  Tune as MetronomeIcon,
  Devices as DevicesIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';
import { StyledPopupPaper, PopupHeaderBox, PopupContentBox } from './popup-styled-components';
import { PopupSearchBar } from './popup-search-bar';
import { useAppSelector } from '@/store/hook';
import { usePopupSelectHandler } from '@/hooks/use-popup-select-handler';

interface SoundSettingsPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
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
  metronomeTempo?: number;
  metronomeVolume?: number;
  onMetronomeToggle?: () => void;
  onMetronomeTempoChange?: (tempo: number) => void;
  onMetronomeVolumeChange?: (volume: number) => void;
  // MIDI device settings
  midiDevice?: string;
  onMidiDeviceChange?: (device: string) => void;
  availableMidiDevices?: string[];
  // Piano theme
  pianoTheme: PianoTheme;
  // Target section to scroll to
  targetSection?: string;
}

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

const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme?: PianoTheme }>(({ theme, pianoTheme }) => ({
  '& .MuiSlider-thumb': pianoTheme ? {
    boxShadow: `
      0 2px 4px rgba(0, 0, 0, 0.2),
      0 0 8px ${pianoTheme.colors.accent}44
    `,
  } : {},
  '& .MuiSlider-track': pianoTheme ? {
    background: pianoTheme.colors.accent,
  } : {},
}));

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme?: PianoTheme }>(({ theme, pianoTheme }) => ({
  border: 1,
  borderStyle: 'solid',
  borderColor: pianoTheme?.colors.border || theme.palette.divider,
  transition: 'all 0.2s ease',
  boxShadow: `
    0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme?.isLight ? 0.2 : 0.05})
  `,
  '&:hover': {
    borderColor: pianoTheme?.colors.accent || theme.palette.primary.main,
    boxShadow: `
      0 0 8px ${pianoTheme?.colors.accent || theme.palette.primary.main}44,
      inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme?.isLight ? 0.15 : 0.08})
    `,
  },
  '&:disabled': {
    opacity: 0.4,
  },
}));

export const SoundSettingsPopup: React.FC<SoundSettingsPopupProps> = ({
  open,
  anchorEl,
  onClose,
  sustain,
  onSustainChange,
  transpose = 0,
  onTransposeChange,
  volume = 80,
  onVolumeChange,
  metronomeEnabled = false,
  metronomeTempo = 120,
  metronomeVolume = 50,
  onMetronomeToggle,
  onMetronomeTempoChange,
  onMetronomeVolumeChange,
  midiDevice = 'none',
  onMidiDeviceChange,
  availableMidiDevices = ['None', 'Virtual MIDI Device', 'USB MIDI Keyboard'],
  pianoTheme,
  targetSection,
}) => {
  // Read placement directly from Redux store
  const placement = useAppSelector((state) => state.pianoSettings.soundPopupPlacement) || 'bottom-start';
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use custom hook for popup select handling
  const { handleClickAway, handleSelectOpen, handleSelectClose } = usePopupSelectHandler(onClose);
  
  // Refs for each section
  const metronomeRef = useRef<HTMLDivElement>(null);
  const sustainRef = useRef<HTMLDivElement>(null);
  const transposeRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  
  // Scroll to target section when popup opens
  useEffect(() => {
    if (open && targetSection) {
      setTimeout(() => {
        let targetElement: HTMLDivElement | null = null;
        
        switch (targetSection) {
          case 'metronome':
            targetElement = metronomeRef.current;
            break;
          case 'sustain':
            targetElement = sustainRef.current;
            break;
          case 'transpose':
            targetElement = transposeRef.current;
            break;
          case 'volume':
            targetElement = volumeRef.current;
            break;
        }
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure popup is rendered
    }
  }, [open, targetSection]);

  // Define searchable settings with names and descriptions
  const settings = useMemo(() => ([
    {
      id: 'sustain',
      name: 'Sustain',
      description: 'Control how long notes ring after being played',
      keywords: ['sustain', 'hold', 'duration', 'length', 'ring'],
    },
    {
      id: 'transpose',
      name: 'Transpose',
      description: 'Shift pitch up or down by semitones',
      keywords: ['transpose', 'pitch', 'semitone', 'key', 'shift'],
    },
    {
      id: 'volume',
      name: 'Volume',
      description: 'Adjust overall sound volume',
      keywords: ['volume', 'loudness', 'sound', 'level'],
    },
    {
      id: 'midi',
      name: 'MIDI Device',
      description: 'Connect external MIDI keyboard',
      keywords: ['midi', 'device', 'keyboard', 'external', 'controller'],
    },
    {
      id: 'metronome',
      name: 'Metronome',
      description: 'Enable or disable metronome click',
      keywords: ['metronome', 'click', 'tempo', 'beat', 'rhythm'],
    },
  ]), []);

  // Filter settings based on search query
  const visibleSettings = useMemo(() => {
    if (!searchQuery.trim()) {
      return new Set(settings.map(s => s.id));
    }
    
    const query = searchQuery.toLowerCase();
    return new Set(
      settings
        .filter(setting => 
          setting.name.toLowerCase().includes(query) ||
          setting.description.toLowerCase().includes(query) ||
          setting.keywords.some(keyword => keyword.includes(query))
        )
        .map(s => s.id)
    );
  }, [searchQuery, settings]);

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
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      style={{ zIndex: 1300 }}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: placement === 'top-start' 
              ? ['bottom-start', 'top-start', 'bottom-end', 'top-end']
              : ['top-start', 'bottom-start', 'bottom-end', 'top-end'],
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            padding: 8,
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={onClose}>
        <StyledPopupPaper elevation={8} pianoTheme={pianoTheme} sx={{ minWidth: '380px', maxWidth: '480px' }}>
          <PopupHeaderBox pianoTheme={pianoTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <VolumeIcon
                sx={{
                  color: pianoTheme.colors.accent,
                  fontSize: '1.5rem',
                  filter: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))`,
                }}
              />
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  color: pianoTheme.colors.primary,
                  textShadow: `
                    0 1px 2px rgba(0, 0, 0, 0.3),
                    0 -1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.1 : 0.05})
                  `,
                  letterSpacing: '0.5px',
                }}
              >
                Sound Settings
              </Typography>
            </Box>
          </PopupHeaderBox>

          {/* Search Box */}
          <PopupSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search settings..."
            pianoTheme={pianoTheme}
            isOpen={open}
          />

          <PopupContentBox pianoTheme={pianoTheme}>
            <Stack spacing={2} divider={<Divider sx={{ borderColor: pianoTheme.colors.border }} />}>
              {/* Sustain Control */}
              {visibleSettings.has('sustain') && (
              <ControlSection ref={sustainRef}>
                <ControlLabel>
                  <SustainIcon
                    sx={{ color: pianoTheme.colors.secondary, fontSize: '1.1rem' }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
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
                    sx={{
                      ml: 'auto',
                      '& .MuiFormControlLabel-label': {
                        color: pianoTheme.colors.secondary,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      },
                    }}
                  />
                </ControlLabel>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontSize: '0.875rem',
                    color: pianoTheme.colors.secondary,
                    opacity: 0.85,
                  }}
                >
                  Adjust: {sustain.toFixed(1)}s • Total: {(sustain + 10.5).toFixed(1)}s
                </Typography>
                <StyledSlider
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
                  pianoTheme={pianoTheme}
                />
              </ControlSection>
              )}

              {/* Transpose Control */}
              {visibleSettings.has('transpose') && (
              <ControlSection ref={transposeRef}>
                <ControlLabel>
                  <TransposeIcon
                    sx={{ color: pianoTheme.colors.secondary, fontSize: '1.1rem' }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    Transpose
                  </Typography>
                </ControlLabel>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontSize: '0.875rem',
                    color: pianoTheme.colors.secondary,
                    opacity: 0.85,
                  }}
                >
                  Shift pitch up or down by semitones
                </Typography>
                <TransposeControls>
                  <StyledIconButton
                    onClick={handleTransposeDecrease}
                    disabled={transpose <= -12}
                    size="small"
                    pianoTheme={pianoTheme}
                  >
                    <RemoveIcon />
                  </StyledIconButton>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      sx={{ color: pianoTheme.colors.primary }}
                    >
                      {transpose > 0 ? '+' : ''}{transpose}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: pianoTheme.colors.secondary }}
                    >
                      semitones
                    </Typography>
                  </Box>
                  <StyledIconButton
                    onClick={handleTransposeIncrease}
                    disabled={transpose >= 12}
                    size="small"
                    pianoTheme={pianoTheme}
                  >
                    <AddIcon />
                  </StyledIconButton>
                </TransposeControls>
              </ControlSection>
              )}

              {/* Volume Control */}
              {visibleSettings.has('volume') && (
              <ControlSection ref={volumeRef}>
                <ControlLabel>
                  <VolumeIcon
                    sx={{ color: pianoTheme.colors.secondary, fontSize: '1.1rem' }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    Volume
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 'auto',
                      color: pianoTheme.colors.secondary,
                      fontWeight: 600,
                    }}
                  >
                    {volume}%
                  </Typography>
                </ControlLabel>
                <StyledSlider
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
                  pianoTheme={pianoTheme}
                />
              </ControlSection>
              )}

              {/* MIDI Device Selection */}
              {visibleSettings.has('midi') && (
              <ControlSection>
                <ControlLabel>
                  <DevicesIcon
                    sx={{ color: pianoTheme.colors.secondary, fontSize: '1.1rem' }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    MIDI Device
                  </Typography>
                </ControlLabel>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontSize: '0.875rem',
                    color: pianoTheme.colors.secondary,
                    opacity: 0.85,
                  }}
                >
                  Connect external MIDI keyboard
                </Typography>
                <Select
                  value={midiDevice}
                  onChange={(e) => onMidiDeviceChange && onMidiDeviceChange(e.target.value)}
                  onOpen={handleSelectOpen}
                  onClose={handleSelectClose}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: pianoTheme.colors.border,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: pianoTheme.colors.accent,
                    },
                    color: pianoTheme.colors.primary,
                  }}
                >
                  {availableMidiDevices.map((device) => (
                    <MenuItem key={device} value={device.toLowerCase()}>
                      {device}
                    </MenuItem>
                  ))}
                </Select>
              </ControlSection>
              )}

              {/* Metronome */}
              {visibleSettings.has('metronome') && (
              <ControlSection ref={metronomeRef}>
                <ControlLabel>
                  <MetronomeIcon
                    sx={{ color: pianoTheme.colors.secondary, fontSize: '1.1rem' }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    Metronome
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 'auto',
                      color: pianoTheme.colors.secondary,
                      fontWeight: 600,
                    }}
                  >
                    {metronomeTempo} BPM
                  </Typography>
                </ControlLabel>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontSize: '0.875rem',
                    color: pianoTheme.colors.secondary,
                    opacity: 0.85,
                  }}
                >
                  Set tempo and control metronome playback
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: pianoTheme.colors.secondary,
                      fontWeight: 600,
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    Tempo
                  </Typography>
                  <StyledSlider
                    value={metronomeTempo}
                    onChange={(_event: Event, newValue: number | number[]) => {
                      const value = Array.isArray(newValue) ? newValue[0] : newValue;
                      if (onMetronomeTempoChange) {
                        onMetronomeTempoChange(value);
                      }
                    }}
                    min={40}
                    max={240}
                    step={1}
                    marks={[
                      { value: 40, label: '40' },
                      { value: 120, label: '120' },
                      { value: 240, label: '240' },
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} BPM`}
                    size="small"
                    pianoTheme={pianoTheme}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: pianoTheme.colors.secondary,
                      fontWeight: 600,
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    Volume: {metronomeVolume}%
                  </Typography>
                  <StyledSlider
                    value={metronomeVolume}
                    onChange={(_event: Event, newValue: number | number[]) => {
                      const value = Array.isArray(newValue) ? newValue[0] : newValue;
                      if (onMetronomeVolumeChange) {
                        onMetronomeVolumeChange(value);
                      }
                    }}
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
                    pianoTheme={pianoTheme}
                  />
                </Box>
                <Button
                  variant={metronomeEnabled ? "contained" : "outlined"}
                  onClick={onMetronomeToggle}
                  fullWidth
                  startIcon={metronomeEnabled ? <PauseIcon /> : <PlayIcon />}
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    borderColor: pianoTheme.colors.border,
                    color: metronomeEnabled ? undefined : pianoTheme.colors.primary,
                    '&:hover': {
                      borderColor: pianoTheme.colors.accent,
                      boxShadow: `0 0 8px ${pianoTheme.colors.accent}44`,
                    },
                  }}
                >
                  {metronomeEnabled ? 'Stop' : 'Play'}
                </Button>
              </ControlSection>
              )}

              {/* No results message */}
              {visibleSettings.size === 0 && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: pianoTheme.colors.secondary,
                      opacity: 0.7,
                    }}
                  >
                    No settings found matching "{searchQuery}"
                  </Typography>
                </Box>
              )}
            </Stack>
          </PopupContentBox>
        </StyledPopupPaper>
      </ClickAwayListener>
    </Popper>
  );
};
