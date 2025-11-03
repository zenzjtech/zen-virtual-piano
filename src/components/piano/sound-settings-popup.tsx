import React, { useState, useMemo } from 'react';
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
  IconButton,
  Popper,
  ClickAwayListener,
  styled,
  InputAdornment,
} from '@mui/material';
import {
  VolumeUp as VolumeIcon,
  GraphicEq as TransposeIcon,
  MusicNote as SustainIcon,
  Tune as MetronomeIcon,
  Devices as DevicesIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';
import { StyledPopupPaper, PopupHeaderBox, PopupContentBox, SearchBox, SearchInput } from './popup-styled-components';

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
  onMetronomeToggle?: () => void;
  // MIDI device settings
  midiDevice?: string;
  onMidiDeviceChange?: (device: string) => void;
  availableMidiDevices?: string[];
  // Piano theme
  pianoTheme: PianoTheme;
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
  onMetronomeToggle,
  midiDevice = 'none',
  onMidiDeviceChange,
  availableMidiDevices = ['None', 'Virtual MIDI Device', 'USB MIDI Keyboard'],
  pianoTheme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

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
      placement="bottom-start"
      style={{ zIndex: 1300 }}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: ['top-start', 'bottom-start', 'bottom-end', 'top-end'],
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
          <SearchBox pianoTheme={pianoTheme}>
            <SearchInput
              fullWidth
              size="small"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pianoTheme={pianoTheme}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery('')}
                      edge="end"
                      sx={{ color: pianoTheme.colors.secondary }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </SearchBox>

          <PopupContentBox pianoTheme={pianoTheme}>
            <Stack spacing={2} divider={<Divider sx={{ borderColor: pianoTheme.colors.border }} />}>
              {/* Sustain Control */}
              {visibleSettings.has('sustain') && (
              <ControlSection>
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
              <ControlSection>
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
              <ControlSection>
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
              <ControlSection>
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
                </ControlLabel>
                <Button
                  variant={metronomeEnabled ? "contained" : "outlined"}
                  onClick={onMetronomeToggle}
                  fullWidth
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
                  {metronomeEnabled ? 'Metronome ON' : 'Metronome OFF'}
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
