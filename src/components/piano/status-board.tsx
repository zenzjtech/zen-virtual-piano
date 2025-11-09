import React, { useState, useEffect, useRef } from 'react';
import { PianoKey } from './types';
import { PianoTheme } from './themes';
import { useAppSelector } from '@/store/hook';
import { getPatternTheme } from './pattern-themes';
import { BoardContainer, CornerPlate } from './status-board-styled';
import { SheetModeDisplay } from './status-board-sheet-mode';
import { ManualModeDisplay } from './status-board-manual-mode';
import { useTotalPages } from '@/hooks/use-total-pages';
import { useAppConfig } from '#imports';
import { Box } from '@mui/material';
import { useNotification } from '@/contexts/notification-context';

interface StatisticsBoardProps {
  /** Currently pressed notes with their key information */
  pressedNotes: Map<string, PianoKey>;
  /** The most recently pressed note */
  currentNote: PianoKey | null;
  /** Piano theme for consistent styling */
  pianoTheme: PianoTheme;
  /** Handler to open sheet search dialog */
  onSheetSearchOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const StatusBoard: React.FC<StatisticsBoardProps> = ({
  pressedNotes,
  currentNote,
  pianoTheme,
  onSheetSearchOpen
}) => {
  const appConfig = useAppConfig();
  const { showNotification } = useNotification();
  
  // Get pattern theme from Redux
  const patternThemeId = useAppSelector((state) => state.theme.patternTheme);
  const patternTheme = getPatternTheme(patternThemeId);
  
  // Get music sheet state
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const statusDisplayMode = useAppSelector((state) => state.musicSheet.statusDisplayMode);
  
  // Calculate total pages using shared hook
  const totalPages = useTotalPages(currentSheet);
  
  // Track note history (last 20 notes)
  const [noteHistory, setNoteHistory] = useState<string[]>([]);
  // Track the most recent note and key press
  const [lastNote, setLastNote] = useState<PianoKey | null>(null);
  // Track which notes were pressed in the previous render to detect new presses
  const previousPressedNotesRef = useRef<Set<string>>(new Set());
  // Track if we're animating the history clear
  const [isClearing, setIsClearing] = useState(false);

  // Record notes ONLY when currentNote changes
  useEffect(() => {
    if (currentNote) {
      // Check if this note was already in the pressed set (focus switch vs new press)
      const wasAlreadyPressed = previousPressedNotesRef.current.has(currentNote.note);
      
      if (!wasAlreadyPressed) {
        setNoteHistory(prev => {
          const newHistory = [...prev, currentNote.keyboardKey];
          // Limit history to the configured maximum
          if (newHistory.length > appConfig.noteHistoryLimit) {
            return newHistory.slice(newHistory.length - appConfig.noteHistoryLimit);
          }
          return newHistory;
        });
      }
      
      // Update the last pressed note and key
      setLastNote(currentNote);
    }
    
    // Update the ref with current pressed notes AFTER processing
    const currentPressedNotes = new Set<string>();
    pressedNotes.forEach((key) => {
      currentPressedNotes.add(key.note);
    });
    previousPressedNotesRef.current = currentPressedNotes;
  }, [currentNote, pressedNotes, appConfig.noteHistoryLimit]);

  // Check if the last note is currently being pressed
  const isNoteActive = currentNote !== null && lastNote !== null && 
    currentNote.note === lastNote.note && 
    currentNote.keyboardKey === lastNote.keyboardKey;

  // Format history for display (show last 10)
  const historyText = noteHistory.join(' ') || 'No history yet...';
  
  // Clear history handler
  const handleClearHistory = () => {
    // Start the clearing animation
    setIsClearing(true);
    
    // After animation completes, actually clear the history
    setTimeout(() => {
      setNoteHistory([]);
      setIsClearing(false);
      showNotification('History cleared', 'success');
    }, 300); // Match animation duration
  };
  
  // Determine what to display based on mode
  const isSheetMode = statusDisplayMode === 'sheet-progress' && currentSheet;

  return (
    <BoardContainer 
      elevation={0} 
      pianoTheme={pianoTheme}
      patternTheme={patternTheme}
      sx={{
        px: 3,
        py: 3
      }}
    >
      {/* Decorative Corner Plates */}
      {pianoTheme.cornerPlates && (
        <>
          <CornerPlate cornerPosition="topLeft" pianoTheme={pianoTheme} />
          <CornerPlate cornerPosition="topRight" pianoTheme={pianoTheme} />
        </>
      )}
      
      {/* Display Mode - Sheet or Manual */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {isSheetMode ? (
          <SheetModeDisplay
            currentSheet={currentSheet}
            pianoTheme={pianoTheme}
            totalPages={totalPages}
            historyText={historyText}
            lastNote={lastNote}
            isNoteActive={isNoteActive}
            onSheetSearchOpen={onSheetSearchOpen}
            onClearHistory={handleClearHistory}
            isClearing={isClearing}
          />
        ) : (
          <ManualModeDisplay
            lastNote={lastNote}
            isNoteActive={isNoteActive}
            historyText={historyText}
            pianoTheme={pianoTheme}
            onSheetSearchOpen={onSheetSearchOpen}
            onClearHistory={handleClearHistory}
            isClearing={isClearing}
          />
        )}
      </Box>
    </BoardContainer>
  );
};
