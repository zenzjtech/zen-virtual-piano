import React from 'react';
import { Box, IconButton, Tooltip, Typography, Slider, styled, Paper, keyframes } from '@mui/material';
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
import type { PlaybackBarStyle } from './playback-bar-styles';

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
  /** Compact mode for header */
  compact?: boolean;
  /** Playback bar style (optional, theme-aware) */
  playbackBarStyle?: import('./playback-bar-styles').PlaybackBarStyle;
  /** Callbacks */
  onTogglePlayback: () => void;
  onStop: () => void;
  onToggleLoop: () => void;
  onSpeedChange: (speed: number) => void;
  onClear: () => void;
  onDownload: () => void;
}

// Keyframe animations
const slideUpFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const PlaybackContainer = styled(Paper, {
  shouldForwardProp: (prop) => 
    prop !== 'pianoTheme' && 
    prop !== 'isPlaying' && 
    prop !== 'compact' && 
    prop !== 'playbackBarStyle' &&
    prop !== 'isDarkBackground',
})<{ 
  pianoTheme: PianoTheme; 
  isPlaying?: boolean; 
  compact?: boolean;
  playbackBarStyle?: PlaybackBarStyle;
  isDarkBackground?: boolean;
}>(({ theme, pianoTheme, isPlaying, compact, playbackBarStyle, isDarkBackground = false }) => {
  // Use playbackBarStyle if provided, otherwise use defaults
  const containerBg = playbackBarStyle?.containerBackground
    ? (isDarkBackground ? playbackBarStyle.containerBackground.dark : playbackBarStyle.containerBackground.light)
    : pianoTheme.container.background;
  const containerBorder = playbackBarStyle?.containerBorder
    ? (isDarkBackground ? playbackBarStyle.containerBorder.dark : playbackBarStyle.containerBorder.light)
    : pianoTheme.container.border;
  const containerShadow = playbackBarStyle?.containerShadow
    ? (isDarkBackground ? playbackBarStyle.containerShadow.dark : playbackBarStyle.containerShadow.light)
    : `inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.05)`;
  const containerBlur = playbackBarStyle?.containerBlur || 'blur(8px)';
  const padding = playbackBarStyle?.containerPadding
    ? (compact 
        ? theme.spacing(playbackBarStyle.containerPadding.compact.y, playbackBarStyle.containerPadding.compact.x)
        : theme.spacing(playbackBarStyle.containerPadding.normal.y, playbackBarStyle.containerPadding.normal.x))
    : (compact ? theme.spacing(0.5, 1.5) : theme.spacing(1.5, 2));
  const borderRadius = playbackBarStyle?.containerBorderRadius
    ? (compact ? playbackBarStyle.containerBorderRadius.compact : playbackBarStyle.containerBorderRadius.normal)
    : (compact ? theme.spacing(0.75) : theme.spacing(1));

  return {
    background: containerBg,
    color: pianoTheme.colors.primary,
    padding,
    borderRadius,
    display: 'flex',
    flexDirection: compact ? 'row' : 'column',
    gap: compact ? theme.spacing(1.5) : theme.spacing(1),
    alignItems: compact ? 'center' : 'stretch',
    boxShadow: containerShadow,
    border: `1px solid ${containerBorder}`,
    position: 'relative',
    overflow: 'hidden',
    animation: `${slideUpFadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
    backdropFilter: containerBlur,
    WebkitBackdropFilter: containerBlur,
    ...(isPlaying && {
      boxShadow: `${containerShadow}, 0 0 20px rgba(${pianoTheme.colors.accent}, 0.15)`,
    }),
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
      transition: 'opacity 0.3s ease',
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
  };
});

const ControlButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme' && prop !== 'isActive',
})<{ pianoTheme: PianoTheme; isActive?: boolean }>(({ pianoTheme, isActive }) => ({
  color: pianoTheme.colors.secondary,
  zIndex: 3,
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'scale(1)',
  '&:hover': {
    color: pianoTheme.colors.accent,
    transform: 'scale(1.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  ...(isActive && {
    animation: `${pulse} 2s ease-in-out infinite`,
  }),
}));

const ProgressSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme' && prop !== 'isPlaying',
})<{ pianoTheme: PianoTheme; isPlaying?: boolean }>(({ pianoTheme, isPlaying }) => ({
  color: pianoTheme.colors.accent,
  zIndex: 3,
  transition: 'all 0.3s ease',
  '& .MuiSlider-thumb': {
    width: 12,
    height: 12,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...(isPlaying && {
      boxShadow: `0 0 8px ${pianoTheme.colors.accent}`,
    }),
  },
  '& .MuiSlider-track': {
    transition: 'all 0.3s ease',
    ...(isPlaying && {
      background: `linear-gradient(
        90deg,
        ${pianoTheme.colors.accent},
        ${pianoTheme.colors.accent}80,
        ${pianoTheme.colors.accent}
      )`,
      backgroundSize: '200% 100%',
      animation: `${shimmer} 2s linear infinite`,
    }),
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
    transition: 'opacity 0.3s ease',
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
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'scale(1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: pianoTheme.colors.accent,
    transform: 'scale(1.05)',
    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.2)`,
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

export const RecordingPlaybackBar: React.FC<RecordingPlaybackBarProps & { isDarkBackground?: boolean }> = ({
  isPlaying,
  currentPosition,
  totalDuration,
  playbackSpeed,
  loop,
  hasRecording,
  currentPositionFormatted,
  totalDurationFormatted,
  pianoTheme,
  compact = false,
  playbackBarStyle,
  isDarkBackground = false,
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

  if (compact) {
    // Compact layout for header
    return (
      <PlaybackContainer 
        elevation={2} 
        pianoTheme={pianoTheme} 
        isPlaying={isPlaying} 
        compact
        playbackBarStyle={playbackBarStyle}
        isDarkBackground={isDarkBackground}
      >
        {/* Playback Controls */}
        <Box sx={{ display: 'flex', gap: 0.25, zIndex: 3 }}>
          <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
            <ControlButton
              onClick={onTogglePlayback}
              pianoTheme={pianoTheme}
              size="small"
              isActive={isPlaying}
            >
              {isPlaying ? <PauseIcon fontSize="small" /> : <PlayIcon fontSize="small" />}
            </ControlButton>
          </Tooltip>

          <Tooltip title="Stop">
            <ControlButton
              onClick={onStop}
              pianoTheme={pianoTheme}
              size="small"
            >
              <StopIcon fontSize="small" />
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
              <LoopIcon fontSize="small" />
            </ControlButton>
          </Tooltip>
        </Box>

        {/* Progress Bar with Time */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, zIndex: 3, minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              color: pianoTheme.colors.secondary,
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              minWidth: '70px',
              whiteSpace: 'nowrap',
              zIndex: 3,
            }}
          >
            {currentPositionFormatted}
          </Typography>
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ProgressSlider
              value={currentPosition}
              min={0}
              max={totalDuration || 100}
              disabled
              pianoTheme={pianoTheme}
              isPlaying={isPlaying}
              size="small"
            />
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: pianoTheme.colors.secondary,
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              minWidth: '70px',
              whiteSpace: 'nowrap',
              textAlign: 'right',
              zIndex: 3,
            }}
          >
            {totalDurationFormatted}
          </Typography>
        </Box>

        {/* Speed Control */}
        <Tooltip title="Playback Speed">
          <SpeedButton pianoTheme={pianoTheme} onClick={handleSpeedClick}>
            <SpeedIcon sx={{ fontSize: '0.9rem' }} />
            <span style={{ fontSize: '0.7rem' }}>{playbackSpeed}x</span>
          </SpeedButton>
        </Tooltip>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 0.25, zIndex: 3 }}>
          <Tooltip title="Download Recording">
            <ControlButton
              onClick={onDownload}
              pianoTheme={pianoTheme}
              size="small"
            >
              <DownloadIcon fontSize="small" />
            </ControlButton>
          </Tooltip>

          <Tooltip title="Clear Recording">
            <ControlButton
              onClick={onClear}
              pianoTheme={pianoTheme}
              size="small"
              sx={{ '&:hover': { color: '#f44336' } }}
            >
              <DeleteIcon fontSize="small" />
            </ControlButton>
          </Tooltip>
        </Box>
      </PlaybackContainer>
    );
  }

  // Original layout for standalone use
  return (
    <PlaybackContainer 
      elevation={2} 
      pianoTheme={pianoTheme} 
      isPlaying={isPlaying}
      playbackBarStyle={playbackBarStyle}
      isDarkBackground={isDarkBackground}
    >
      {/* Controls Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, zIndex: 3 }}>
        {/* Playback Controls */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
            <ControlButton
              onClick={onTogglePlayback}
              pianoTheme={pianoTheme}
              size="small"
              isActive={isPlaying}
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
          isPlaying={isPlaying}
          size="small"
        />
      </Box>
    </PlaybackContainer>
  );
};
