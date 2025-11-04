import React from 'react';
import { Box } from '@mui/material';
import { PianoTheme } from './themes';
import { PressedKeysDisplay } from './status-board-styled';
import { PlaybackControls } from './playback-controls';
import { TempoControl } from './tempo-control';

interface PlayerControlsContainerProps {
  isPlaying: boolean;
  currentPage: number;
  totalPages: number;
  loopEnabled: boolean;
  tempo: number;
  pianoTheme: PianoTheme;
  onPlayPause: () => void;
  onStop: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onToggleLoop: () => void;
  onTempoChange: (tempo: number) => void;
}

export const PlayerControlsContainer: React.FC<PlayerControlsContainerProps> = ({
  isPlaying,
  currentPage,
  totalPages,
  loopEnabled,
  tempo,
  pianoTheme,
  onPlayPause,
  onStop,
  onPreviousPage,
  onNextPage,
  onToggleLoop,
  onTempoChange,
}) => {
  return (
    <PressedKeysDisplay>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <PlaybackControls
            isPlaying={isPlaying}
            currentPage={currentPage}
            totalPages={totalPages}
            loopEnabled={loopEnabled}
            pianoTheme={pianoTheme}
            onPlayPause={onPlayPause}
            onStop={onStop}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            onToggleLoop={onToggleLoop}
          />

          <TempoControl
            tempo={tempo}
            pianoTheme={pianoTheme}
            onTempoChange={onTempoChange}
          />
        </Box>
      </Box>
    </PressedKeysDisplay>
  );
};
