import React from 'react';
import { PianoKey } from './types';
import { PianoTheme } from './themes';
import {
  CurrentNoteDisplay,
  NoteText,
  KeyText,
  PressedKeysDisplay,
  Label,
  PressedKeysText,
  HistoryDisplay,
} from './status-board-styled';

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
  return (
    <>
      {/* Manual Play Mode - Current Note Display */}
      <CurrentNoteDisplay pianoTheme={pianoTheme}>
        <NoteText 
          variant="h3"
          sx={{ 
            opacity: isNoteActive ? 1 : 0.4,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          {lastNote ? lastNote.note : '—'}
        </NoteText>
        <KeyText 
          variant="body1" 
          pianoTheme={pianoTheme}
          sx={{ 
            opacity: isNoteActive ? 1 : 0.4,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          {lastNote ? lastNote.keyboardKey : ' '}
        </KeyText>
      </CurrentNoteDisplay>

      {/* Pressed Keys Display */}
      <PressedKeysDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>Last Pressed Key</Label>
        <PressedKeysText variant="h6" pianoTheme={pianoTheme}>
          {lastNote?.keyboardKey || 'Press any key...'}
        </PressedKeysText>
      </PressedKeysDisplay>

      {/* History Display */}
      <HistoryDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>History</Label>
        <PressedKeysText 
          variant="h6" 
          pianoTheme={pianoTheme} 
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {historyText}
        </PressedKeysText>
      </HistoryDisplay>
    </>
  );
};
