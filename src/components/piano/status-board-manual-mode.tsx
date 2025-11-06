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

interface ManualModeDisplayProps {
  lastNote: PianoKey | null;
  isNoteActive: boolean;
  historyText: string;
  pianoTheme: PianoTheme;
  onSheetSearchOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClearHistory: () => void;
  isClearing: boolean;
}

export const ManualModeDisplay: React.FC<ManualModeDisplayProps> = ({
  lastNote,
  isNoteActive,
  historyText,
  pianoTheme,
  onSheetSearchOpen,
  onClearHistory,
  isClearing,
}) => {
  
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
      <NoteHistoryDisplay 
        pianoTheme={pianoTheme} 
        historyText={historyText} 
        onClearHistory={onClearHistory}
        isClearing={isClearing}
      />
      
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
