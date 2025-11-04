import React from 'react';
import { Typography, Box, IconButton, Tooltip, Slider } from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SkipPrevious as PrevIcon,
  SkipNext as NextIcon,
  Loop as LoopIcon,
} from '@mui/icons-material';
import { MusicSheet, PlaybackState } from '@/components/piano/music-sheet/types';
import { PianoTheme } from './themes';
import {
  CurrentNoteDisplay,
  KeyText,
  PressedKeysDisplay,
  Label,
  PressedKeysText,
  HistoryDisplay,
} from './status-board-styled';
import { NoteHistoryDisplay } from './note-history-display';

interface SheetModeDisplayProps {
  currentSheet: MusicSheet;
  playback: PlaybackState;
  pianoTheme: PianoTheme;
  totalPages: number;
  historyText: string;
  onPlayPause: () => void;
  onStop: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onTempoChange: (tempo: number) => void;
  onToggleLoop: () => void;
}

export const SheetModeDisplay: React.FC<SheetModeDisplayProps> = ({
  currentSheet,
  playback,
  pianoTheme,
  totalPages,
  historyText,
  onPlayPause,
  onStop,
  onPreviousPage,
  onNextPage,
  onTempoChange,
  onToggleLoop,
}) => {
  const handleTempoChange = (_event: Event, newValue: number | number[]) => {
    const tempo = Array.isArray(newValue) ? newValue[0] : newValue;
    onTempoChange(tempo);
  };

  return (
    <>
      {/* Current Sheet Info */}
      <CurrentNoteDisplay pianoTheme={pianoTheme}>
        <Typography 
          variant="h6"
          sx={{ 
            color: pianoTheme.colors.primary,
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          🎼
        </Typography>
        <KeyText variant="caption" pianoTheme={pianoTheme}>
          {playback.isPlaying ? 'Playing' : playback.isPaused ? 'Paused' : 'Ready'}
        </KeyText>
      </CurrentNoteDisplay>

      {/* Sheet Title with Player Controls */}
      <PressedKeysDisplay>
        <Box sx={{ width: '100%' }}>
          {/* Player Controls */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Main Playback Controls */}
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title="Previous Page (← LeftArrow / Backspace)">
                <span>
                  <IconButton
                    onClick={onPreviousPage}
                    disabled={playback.currentPage === 0}
                    size="small"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    <PrevIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title={playback.isPlaying ? 'Pause' : 'Play'}>
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
                  {playback.isPlaying ? <PauseIcon fontSize="small" /> : <PlayIcon fontSize="small" />}
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
                    disabled={playback.currentPage >= totalPages - 1}
                    size="small"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    <NextIcon fontSize="small" />
                  </IconButton>
                </span>
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
                  <LoopIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Tempo Control - Full Width */}
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" sx={{ color: pianoTheme.colors.secondary, fontSize: '0.7rem' }}>
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
          </Box>
        </Box>
      </PressedKeysDisplay>

      {/* History Display */}
      <NoteHistoryDisplay pianoTheme={pianoTheme} historyText={historyText} />
    </>
  );
};
