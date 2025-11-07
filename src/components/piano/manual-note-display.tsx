import React from 'react';
import { PianoKey } from './types';
import { PianoTheme } from './themes';
import {
  CurrentNoteDisplay,
  NoteText,
  KeyText,
} from './status-board-styled';

interface ManualNoteDisplayProps {
  lastNote: PianoKey | null;
  isNoteActive: boolean;
  pianoTheme: PianoTheme;
}

export const ManualNoteDisplay: React.FC<ManualNoteDisplayProps> = ({
  lastNote,
  isNoteActive,
  pianoTheme,
}) => {
  return (
    <CurrentNoteDisplay 
      pianoTheme={pianoTheme}
      sx={{
        width: '100px',
      }}
    >
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
  );
};
