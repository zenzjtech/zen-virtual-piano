import React from 'react';
import { Box } from '@mui/material';
import { PianoTheme } from './themes';
import { PressedKeysDisplay } from './status-board-styled';
import { PlaybackControls } from './playback-controls';
import { TempoControl } from './tempo-control';
import { MetronomeControl } from './metronome-control';

interface PlayerControlsContainerProps {
  totalPages: number;
  pianoTheme: PianoTheme;
}

export const PlayerControlsContainer: React.FC<PlayerControlsContainerProps> = ({
  totalPages,
  pianoTheme,
}) => {
  return (
    <PressedKeysDisplay
        sx={{
            justifyContent: 'center'
        }}
    >      
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'row', gap: 1,                        
        }}>
            <PlaybackControls
            totalPages={totalPages}
            pianoTheme={pianoTheme}
            />

            <TempoControl pianoTheme={pianoTheme} />
            
            <MetronomeControl pianoTheme={pianoTheme} />
        </Box>      
    </PressedKeysDisplay>
  );
};
