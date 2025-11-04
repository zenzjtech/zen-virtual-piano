import React, { useEffect, useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [historyText]);

  return (
    <HistoryDisplay sx={{ pb: 1 }}>
      <Label variant="caption" pianoTheme={pianoTheme}>History</Label>
      <PressedKeysText
        ref={scrollRef}
        variant="body2"
        pianoTheme={pianoTheme}
        sx={{ 
          whiteSpace: 'normal',          
          wordBreak: 'break-word',
          overflowY: 'auto',
          maxHeight: '60px', // Allow scrolling within the container
          lineHeight: 1,
          display: 'block', // Override flex display to allow wrapping
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
          },
        }}
      >
        {historyText}
      </PressedKeysText>
    </HistoryDisplay>
  );
};
