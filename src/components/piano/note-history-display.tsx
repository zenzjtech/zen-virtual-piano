import React, { useEffect, useRef } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PianoTheme } from './themes';
import { HistoryDisplay, Label, PressedKeysText } from './status-board-styled';

interface NoteHistoryDisplayProps {
  pianoTheme: PianoTheme;
  historyText: string;
  onClearHistory: () => void;
  isClearing: boolean;
}

export const NoteHistoryDisplay: React.FC<NoteHistoryDisplayProps> = ({
  pianoTheme,
  historyText,
  onClearHistory,
  isClearing,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [historyText]);

  return (
    <HistoryDisplay sx={{ pb: 1, position: 'relative' }}>
      {/* Clear History Button */}
      <Tooltip title="Clear history" placement="top" arrow>
        <IconButton
          onClick={onClearHistory}
          size="small"
          sx={{
            position: 'absolute',
            top: theme => theme.spacing(0.5),
            left: theme => theme.spacing(0.5),
            width: theme => theme.spacing(2.5),
            height: theme => theme.spacing(2.5),
            padding: 0,
            zIndex: 10,
            color: pianoTheme.colors.primary,
            opacity: 0.7,
            transition: 'opacity 0.2s ease, color 0.2s ease',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',          
            '&:hover': {
              opacity: 1,
              color: pianoTheme.colors.secondary,            
            },
            '& .MuiSvgIcon-root': {
              fontSize: '0.75rem',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      
      <Label variant="caption" pianoTheme={pianoTheme} sx={{ ml: 2.5 }}>History</Label>
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
          // Fade-out animation when clearing
          opacity: isClearing ? 0 : 1,
          transform: isClearing ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
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
