import React from 'react';
import { Box, Paper, IconButton, Typography, Slider, Tooltip } from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SkipPrevious as PrevIcon,
  SkipNext as NextIcon,
  Loop as LoopIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  UnfoldMore as AutoScrollIcon,
} from '@mui/icons-material';
import { PlaybackState } from './types';
import { PianoTheme } from '../themes';

interface PlayerControlsProps {
  playback: PlaybackState;
  totalPages: number;
  isMinimized: boolean;
  pianoTheme: PianoTheme;
  onPlayPause: () => void;
  onStop: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onTempoChange: (tempo: number) => void;
  onToggleLoop: () => void;
  onToggleAutoScroll: () => void;
  onToggleMinimize: () => void;
}

/**
 * Player controls for sheet music playback
 */
export const PlayerControls: React.FC<PlayerControlsProps> = ({
  playback,
  totalPages,
  isMinimized,
  pianoTheme,
  onPlayPause,
  onStop,
  onPreviousPage,
  onNextPage,
  onTempoChange,
  onToggleLoop,
  onToggleAutoScroll,
  onToggleMinimize,
}) => {
  const handleTempoChange = (_event: Event, newValue: number | number[]) => {
    const tempo = Array.isArray(newValue) ? newValue[0] : newValue;
    onTempoChange(tempo);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        px: 3,
        py: 2,
        background: pianoTheme.container.background,
        color: pianoTheme.colors.primary,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Minimize/Expand Button */}
        <Tooltip title={isMinimized ? 'Expand' : 'Minimize'}>
          <IconButton
            onClick={onToggleMinimize}
            size="small"
            sx={{ color: pianoTheme.colors.primary }}
          >
            {isMinimized ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Tooltip>

        {/* Playback Controls */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Previous Page (← LeftArrow / Backspace)">
            <span>
              <IconButton
                onClick={onPreviousPage}
                disabled={playback.currentPage === 0}
                size="small"
                sx={{ color: pianoTheme.colors.primary }}
              >
                <PrevIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Next Page (→ RightArrow / Enter)">
            <span>
              <IconButton
                onClick={onNextPage}
                disabled={playback.currentPage >= totalPages - 1}
                size="small"
                sx={{ color: pianoTheme.colors.primary }}
              >
                <NextIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={playback.isPlaying ? 'Pause' : 'Play'}>
            <IconButton
              onClick={onPlayPause}
              size="medium"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: pianoTheme.colors.primary,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              {playback.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Stop">
            <IconButton
              onClick={onStop}
              size="small"
              sx={{ color: pianoTheme.colors.primary }}
            >
              <StopIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Tempo Control */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
          <Typography variant="caption" sx={{ minWidth: 80 }}>
            Tempo: {playback.tempo} BPM
          </Typography>
          <Slider
            value={playback.tempo}
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

        {/* Options */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={playback.autoScroll ? 'Auto-scroll: ON' : 'Auto-scroll: OFF'}>
            <IconButton
              onClick={onToggleAutoScroll}
              size="small"
              sx={{
                color: playback.autoScroll
                  ? pianoTheme.colors.primary
                  : 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <AutoScrollIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={playback.loopEnabled ? 'Loop: ON' : 'Loop: OFF'}>
            <IconButton
              onClick={onToggleLoop}
              size="small"
              sx={{
                color: playback.loopEnabled
                  ? pianoTheme.colors.primary
                  : 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <LoopIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};
