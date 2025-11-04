import React from 'react';
import { MusicSheet } from '@/components/piano/music-sheet/types';
import { PianoTheme } from './themes';
import { PianoKey } from './types';
import { NoteHistoryDisplay } from './note-history-display';
import { PlayerControlsContainer } from './player-controls-container';
import { ManualControlsSection } from './manual-controls-section';

interface SheetModeDisplayProps {
  currentSheet: MusicSheet;
  pianoTheme: PianoTheme;
  totalPages: number;
  historyText: string;
  lastNote: PianoKey | null;
  isNoteActive: boolean;
  onSheetSearchOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SheetModeDisplay: React.FC<SheetModeDisplayProps> = ({
  currentSheet,
  pianoTheme,
  totalPages,
  historyText,
  lastNote,
  isNoteActive,
  onSheetSearchOpen,
}) => {
  
  return (
    <>
      {/* Player Controls */}
      <PlayerControlsContainer
        totalPages={totalPages}
        pianoTheme={pianoTheme}
      />

      {/* History Display */}
      <NoteHistoryDisplay pianoTheme={pianoTheme} historyText={historyText} />

      {/* Manual Controls Section */}
      <ManualControlsSection
        lastNote={lastNote}
        isNoteActive={isNoteActive}
        pianoTheme={pianoTheme}
        onSheetSearchOpen={onSheetSearchOpen}
      />
    </>
  );
};
