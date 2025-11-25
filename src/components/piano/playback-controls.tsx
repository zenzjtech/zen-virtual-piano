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
import { useAppSelector } from '@/store/hook';
import { usePlayerControls } from '@/hooks/use-player-controls';
import { useTranslation } from '@/hooks/use-translation';

interface PlaybackControlsProps {
  totalPages: number;
  pianoTheme: PianoTheme;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  totalPages,
  pianoTheme,
}) => {
  // Get playback state from Redux
  const playback = useAppSelector((state) => state.musicSheet.playback);
  
  // Get player control handlers
  const {
    handlePlayPause,
    handleStop,
    handlePreviousPage,
    handleNextPage,
    handleToggleLoop,
  } = usePlayerControls();
  const { t } = useTranslation('piano');
  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip title={t('previousPageTooltip')}>
        <span>
          <IconButton
            onClick={handlePreviousPage}
            disabled={playback.currentPage === 0}
            size="small"
            sx={{ color: pianoTheme.colors.primary }}
          >
            <PrevIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={t('nextPageTooltip')}>
        <span>
          <IconButton
            onClick={handleNextPage}
            disabled={playback.currentPage >= totalPages - 1}
            size="small"
            sx={{ color: pianoTheme.colors.primary }}
          >
            <NextIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>      

      <Tooltip title={playback.isPlaying ? t('pauseTooltip') : t('playTooltip')}>
        <IconButton
          onClick={() => handlePlayPause(playback.isPlaying)}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: pianoTheme.colors.primary,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          {playback.isPlaying ? <PauseIcon fontSize="small" /> : <PlayIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      <Tooltip title={t('stop')}>
        <IconButton
          onClick={handleStop}
          size="small"
          sx={{ color: pianoTheme.colors.primary }}
        >
          <StopIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title={playback.loopEnabled ? t('loopOn') : t('loopOff')}>
        <IconButton
          onClick={handleToggleLoop}
          size="small"
          sx={{
            color: playback.loopEnabled
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
