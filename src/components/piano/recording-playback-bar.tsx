import React from 'react';
import { Box, IconButton, Tooltip, Typography, Slider, styled, Paper } from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Loop as LoopIcon,
  Speed as SpeedIcon,
  Delete as DeleteIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';

interface RecordingPlaybackBarProps {
  /** Whether playback is active */
  isPlaying: boolean;
  /** Current playback position in ms */
  currentPosition: number;
  /** Total duration in ms */
  totalDuration: number;
  /** Playback speed multiplier */
  playbackSpeed: number;
  /** Loop enabled */
  loop: boolean;
  /** Whether recording has any notes */
  hasRecording: boolean;
  /** Current position formatted */
  currentPositionFormatted: string;
  /** Total duration formatted */
  totalDurationFormatted: string;
  /** Piano theme */
  pianoTheme: PianoTheme;
  /** Callbacks */
  onTogglePlayback: () => void;
  onStop: () => void;
  onToggleLoop: () => void;
  onSpeedChange: (speed: number) => void;
  onClear: () => void;
  onDownload: () => void;
}

const PlaybackContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  background: pianoTheme.container.background,
  color: pianoTheme.colors.primary,
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  boxShadow: `
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15),
    0 1px 0 rgba(255, 255, 255, 0.05)
  `,
  border: pianoTheme.container.border,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.beforeBackground || 'transparent',
    pointerEvents: 'none',
    opacity: 0.6,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.afterBackground || 'transparent',
    pointerEvents: 'none',
    zIndex: 2,
  },
}));

const ControlButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  color: pianoTheme.colors.secondary,
  zIndex: 3,
  '&:hover': {
    color: pianoTheme.colors.accent,
  },
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

const ProgressSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ pianoTheme }) => ({
  color: pianoTheme.colors.accent,
  zIndex: 3,
  '& .MuiSlider-thumb': {
    width: 12,
    height: 12,
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
  },
}));

const SpeedButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: `1px solid ${pianoTheme.colors.border}`,
  color: pianoTheme.colors.secondary,
  fontSize: '0.75rem',
  fontWeight: 600,
  zIndex: 3,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: pianoTheme.colors.accent,
  },
}));

export const RecordingPlaybackBar: React.FC<RecordingPlaybackBarProps> = ({
  isPlaying,
  currentPosition,
  totalDuration,
  playbackSpeed,
  loop,
  hasRecording,
  currentPositionFormatted,
  totalDurationFormatted,
  pianoTheme,
  onTogglePlayback,
  onStop,
  onToggleLoop,
  onSpeedChange,
  onClear,
  onDownload,
}) => {
  if (!hasRecording) {
    return null;
  }

  const handleSpeedClick = () => {
    // Cycle through speeds: 0.5x -> 0.75x -> 1x -> 1.25x -> 1.5x -> 2x -> 0.5x
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.findIndex(s => Math.abs(s - playbackSpeed) < 0.01);
    const nextIndex = (currentIndex + 1) % speeds.length;
    onSpeedChange(speeds[nextIndex]);
  };

  return (
    <PlaybackContainer elevation={2} pianoTheme={pianoTheme}>
      {/* Controls Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, zIndex: 3 }}>
        {/* Playback Controls */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
            <ControlButton
              onClick={onTogglePlayback}
              pianoTheme={pianoTheme}
              size="small"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </ControlButton>
          </Tooltip>

          <Tooltip title="Stop">
            <ControlButton
              onClick={onStop}
              pianoTheme={pianoTheme}
              size="small"
            >
              <StopIcon />
            </ControlButton>
          </Tooltip>

          <Tooltip title={loop ? 'Loop: ON' : 'Loop: OFF'}>
            <ControlButton
              onClick={onToggleLoop}
              pianoTheme={pianoTheme}
              size="small"
              sx={{
                color: loop ? pianoTheme.colors.accent : pianoTheme.colors.secondary,
              }}
            >
              <LoopIcon />
            </ControlButton>
          </Tooltip>
        </Box>

        {/* Time Display */}
        <Typography
          variant="caption"
          sx={{
            color: pianoTheme.colors.secondary,
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            minWidth: '80px',
            zIndex: 3,
          }}
        >
          {currentPositionFormatted} / {totalDurationFormatted}
        </Typography>

        {/* Speed Control */}
        <Tooltip title="Playback Speed">
          <SpeedButton pianoTheme={pianoTheme} onClick={handleSpeedClick}>
            <SpeedIcon sx={{ fontSize: '1rem' }} />
            <span>{playbackSpeed}x</span>
          </SpeedButton>
        </Tooltip>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Action Buttons */}
        <Tooltip title="Download Recording">
          <ControlButton
            onClick={onDownload}
            pianoTheme={pianoTheme}
            size="small"
          >
            <DownloadIcon />
          </ControlButton>
        </Tooltip>

        <Tooltip title="Clear Recording">
          <ControlButton
            onClick={onClear}
            pianoTheme={pianoTheme}
            size="small"
            sx={{ '&:hover': { color: '#f44336' } }}
          >
            <DeleteIcon />
          </ControlButton>
        </Tooltip>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ px: 1, zIndex: 3 }}>
        <ProgressSlider
          value={currentPosition}
          min={0}
          max={totalDuration || 100}
          disabled
          pianoTheme={pianoTheme}
          size="small"
        />
      </Box>
    </PlaybackContainer>
  );
};
