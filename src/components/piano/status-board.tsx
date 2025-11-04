import React, { useState, useEffect } from 'react';
import { PianoKey } from './types';
import { PianoTheme } from './themes';
import { useAppSelector } from '@/store/hook';
import { BoardContainer, CornerPlate } from './status-board-styled';
import { SheetModeDisplay } from './status-board-sheet-mode';
import { ManualModeDisplay } from './status-board-manual-mode';
import { useTotalPages } from '@/hooks/use-total-pages';
import { Box } from '@mui/material';

interface StatisticsBoardProps {
  /** Currently pressed notes with their key information */
  pressedNotes: Map<string, PianoKey>;
  /** The most recently pressed note */
  currentNote: PianoKey | null;
  /** Piano theme for consistent styling */
  pianoTheme: PianoTheme;
}

export const StatusBoard: React.FC<StatisticsBoardProps> = ({
  pressedNotes,
  currentNote,
  pianoTheme,
}) => {
  // Get music sheet state
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const statusDisplayMode = useAppSelector((state) => state.musicSheet.statusDisplayMode);
  
  // Calculate total pages using shared hook
  const totalPages = useTotalPages(currentSheet);
  
  // Track note history (last 20 notes)
  const [noteHistory, setNoteHistory] = useState<string[]>([]);
  // Track the most recent note and key press
  const [lastNote, setLastNote] = useState<PianoKey | null>(null);

  // Record notes when they're pressed
  useEffect(() => {
    if (currentNote) {
      setNoteHistory(prev => {
        const newHistory = [...prev, currentNote.keyboardKey];
        return newHistory;
      });
      // Update the last pressed note and key
      setLastNote(currentNote);
    }
  }, [currentNote]);

  // Check if the last note is currently being pressed
  const isNoteActive = currentNote !== null && lastNote !== null && 
    currentNote.note === lastNote.note && 
    currentNote.keyboardKey === lastNote.keyboardKey;

  // Format history for display (show last 10)
  const historyText = noteHistory.join(' ') || 'No history yet...';
  
  // Determine what to display based on mode
  const isSheetMode = statusDisplayMode === 'sheet-progress' && currentSheet;

  return (
    <BoardContainer elevation={0} pianoTheme={pianoTheme}>
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
          />
        ) : (
          <ManualModeDisplay
            lastNote={lastNote}
            isNoteActive={isNoteActive}
            historyText={historyText}
            pianoTheme={pianoTheme}
          />
        )}
      </Box>
    </BoardContainer>
  );
};
