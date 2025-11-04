import React, { useState, useEffect, useMemo } from 'react';
import { PianoKey } from './types';
import { PianoTheme } from './themes';
import { useAppSelector } from '@/store/hook';
import { BoardContainer, CornerPlate } from './status-board-styled';
import { SheetModeDisplay } from './status-board-sheet-mode';
import { ManualModeDisplay } from './status-board-manual-mode';
import { TransitionWrapper } from './status-board-transition';
import { useAppConfig } from '#imports';

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
  const playback = useAppSelector((state) => state.musicSheet.playback);
  const statusDisplayMode = useAppSelector((state) => state.musicSheet.statusDisplayMode);
  const appConfig = useAppConfig();
  
  // Calculate totalPages dynamically (same logic as MusicStand)
  const totalPages = useMemo(() => {
    if (!currentSheet) return 1;
    
    const allMeasures = currentSheet.pages[0]?.measures || [];
    const { maxCharsPerLine, linesPerPage } = appConfig.musicStand.musicSheet;
    
    const tokens: string[] = [];
    allMeasures.forEach((measure) => {
      measure.notes.forEach((note) => {
        tokens.push((note.originalNotation || note.key) + ' ');
      });
    });
    
    let lineCount = 0;
    let currentLength = 0;
    tokens.forEach((token) => {
      if (currentLength + token.length > maxCharsPerLine && currentLength > 0) {
        lineCount++;
        currentLength = 0;
      }
      currentLength += token.length;
    });
    if (currentLength > 0) lineCount++;
    
    return Math.ceil(lineCount / linesPerPage);
  }, [currentSheet, appConfig.musicStand.musicSheet]);
  
  // Track note history (last 20 notes)
  const [noteHistory, setNoteHistory] = useState<string[]>([]);
  // Track the most recent note and key press
  const [lastNote, setLastNote] = useState<PianoKey | null>(null);

  // Record notes when they're pressed
  useEffect(() => {
    if (currentNote) {
      setNoteHistory(prev => {
        const newHistory = [currentNote.note, ...prev];
        return newHistory.slice(0, 20); // Keep only last 20 notes
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
  const historyText = noteHistory.slice(0, 10).join(' → ') || 'No history yet...';
  
  // Determine what to display based on mode
  const isSheetMode = statusDisplayMode === 'sheet-progress' && currentSheet;
  const showBoth = statusDisplayMode === 'both';

  return (
    <BoardContainer elevation={0} pianoTheme={pianoTheme}>
      {/* Decorative Corner Plates */}
      {pianoTheme.cornerPlates && (
        <>
          <CornerPlate cornerPosition="topLeft" pianoTheme={pianoTheme} />
          <CornerPlate cornerPosition="topRight" pianoTheme={pianoTheme} />
        </>
      )}
      
      {/* Display Mode - Sheet or Manual with Transitions */}
      <TransitionWrapper transitionKey={isSheetMode ? 'sheet' : 'manual'}>
        {isSheetMode ? (
          <SheetModeDisplay
            currentSheet={currentSheet}
            playback={playback}
            pianoTheme={pianoTheme}
            totalPages={totalPages}
          />
        ) : (
          <ManualModeDisplay
            lastNote={lastNote}
            isNoteActive={isNoteActive}
            historyText={historyText}
            pianoTheme={pianoTheme}
          />
        )}
      </TransitionWrapper>
    </BoardContainer>
  );
};
