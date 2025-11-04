import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SkipPrevious as PrevIcon,
  SkipNext as NextIcon,
  Loop as LoopIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentPage: number;
  totalPages: number;
  loopEnabled: boolean;
  pianoTheme: PianoTheme;
  onPlayPause: () => void;
  onStop: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onToggleLoop: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  currentPage,
  totalPages,
  loopEnabled,
  pianoTheme,
  onPlayPause,
  onStop,
  onPreviousPage,
  onNextPage,
  onToggleLoop,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip title="Previous Page (← LeftArrow / Backspace)">
        <span>
          <IconButton
            onClick={onPreviousPage}
            disabled={currentPage === 0}
            size="small"
            sx={{ color: pianoTheme.colors.primary }}
          >
            <PrevIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
        <IconButton
          onClick={onPlayPause}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: pianoTheme.colors.primary,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          {isPlaying ? <PauseIcon fontSize="small" /> : <PlayIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Stop">
        <IconButton
          onClick={onStop}
          size="small"
          sx={{ color: pianoTheme.colors.primary }}
        >
          <StopIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Next Page (→ RightArrow / Enter)">
        <span>
          <IconButton
            onClick={onNextPage}
            disabled={currentPage >= totalPages - 1}
            size="small"
            sx={{ color: pianoTheme.colors.primary }}
          >
            <NextIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={loopEnabled ? 'Loop: ON' : 'Loop: OFF'}>
        <IconButton
          onClick={onToggleLoop}
          size="small"
          sx={{
            color: loopEnabled
              ? pianoTheme.colors.primary
              : 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <LoopIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
