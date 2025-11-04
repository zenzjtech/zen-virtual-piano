import React from 'react';
import { Stack } from '@mui/material';
import { PianoTheme } from './themes';
import { SheetButton } from './sheet-button';
import { SheetPlaybackStatus } from './sheet-playback-status';

interface SheetControlsSectionProps {
  pianoTheme: PianoTheme;
  onSheetSearchOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SheetControlsSection: React.FC<SheetControlsSectionProps> = ({
  pianoTheme,
  onSheetSearchOpen,
}) => {
  return (
    <Stack 
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      sx={{ 
        px: 1        
      }}
    >
      <SheetButton onClick={onSheetSearchOpen} pianoTheme={pianoTheme} />

      {/* Current Sheet Info */}
      <SheetPlaybackStatus pianoTheme={pianoTheme} />
    </Stack>
  );
};
