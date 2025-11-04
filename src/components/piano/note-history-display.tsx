import React from 'react';
import { PianoTheme } from './themes';
import { HistoryDisplay, Label, PressedKeysText } from './status-board-styled';

interface NoteHistoryDisplayProps {
  pianoTheme: PianoTheme;
  historyText: string;
}

export const NoteHistoryDisplay: React.FC<NoteHistoryDisplayProps> = ({
  pianoTheme,
  historyText,
}) => {
  return (
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
  );
};
