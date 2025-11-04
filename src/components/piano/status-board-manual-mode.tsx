import React from 'react';
import { PianoKey } from './types';
import { PianoTheme } from './themes';
import {
  PressedKeysDisplay,
  Label,
  PressedKeysText,
} from './status-board-styled';
import { NoteHistoryDisplay } from './note-history-display';
import { ManualControlsSection } from './manual-controls-section';
import { useSheetSearch } from '@/hooks/use-sheet-search';

interface ManualModeDisplayProps {
  lastNote: PianoKey | null;
  isNoteActive: boolean;
  historyText: string;
  pianoTheme: PianoTheme;
}

export const ManualModeDisplay: React.FC<ManualModeDisplayProps> = ({
  lastNote,
  isNoteActive,
  historyText,
  pianoTheme,
}) => {
  // Sheet search hook
  const { handleSheetSearchOpen } = useSheetSearch();
  
  return (
    <>
      {/* Pressed Keys Display */}
      <PressedKeysDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>Last Pressed Key</Label>
        <PressedKeysText variant="h6" pianoTheme={pianoTheme}>
          {lastNote?.keyboardKey || 'Press any key...'}
        </PressedKeysText>
      </PressedKeysDisplay>

      {/* History Display */}
      <NoteHistoryDisplay pianoTheme={pianoTheme} historyText={historyText} />
      
      {/* Manual Controls Section */}
      <ManualControlsSection
        lastNote={lastNote}
        isNoteActive={isNoteActive}
        pianoTheme={pianoTheme}
        onSheetSearchOpen={handleSheetSearchOpen}
      />   
    </>
  );
};
