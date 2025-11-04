import React from 'react';
import { Stack } from '@mui/material';
import { PianoKey } from './types';
import { PianoTheme } from './themes';
import { SheetButton } from './sheet-button';
import { ManualNoteDisplay } from './manual-note-display';

interface ManualControlsSectionProps {
  lastNote: PianoKey | null;
  isNoteActive: boolean;
  pianoTheme: PianoTheme;
  onSheetSearchOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ManualControlsSection: React.FC<ManualControlsSectionProps> = ({
  lastNote,
  isNoteActive,
  pianoTheme,
  onSheetSearchOpen,
}) => {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" gap={1}>
      {/* Sheet Button */}
      <SheetButton onClick={onSheetSearchOpen} pianoTheme={pianoTheme} />      
      {/* Manual Play Mode - Current Note Display */}
      <ManualNoteDisplay 
        lastNote={lastNote}
        isNoteActive={isNoteActive}
        pianoTheme={pianoTheme}
      />
    </Stack>
  );
};
