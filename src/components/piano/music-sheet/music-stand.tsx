import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  playSheet,
  pauseSheet,
  stopSheet,
  previousPage,
  nextPage,
  setTempo,
  toggleLoop,
  toggleAutoScroll,
  unloadSheet,
  toggleMusicStandMinimized,
} from '@/store/reducers/music-sheet-slice';
import { PianoTheme } from '../themes';
import { MusicBookDisplay } from './music-book-display';
import { PlayerControls } from './player-controls';
import { useAppConfig } from '#imports';

interface MusicStandProps {
  pianoTheme: PianoTheme;
}

/**
 * Music Stand Component
 * Displays sheet music on an open book background with playback controls
 */
export const MusicStand: React.FC<MusicStandProps> = ({ pianoTheme }) => {
  const dispatch = useAppDispatch();
  const appConfig = useAppConfig();
  
  // Redux state
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const playback = useAppSelector((state) => state.musicSheet.playback);
  const isMinimized = useAppSelector((state) => state.musicSheet.isMusicStandMinimized);
  
  if (!currentSheet) return null;
  
  // Calculate totalPages dynamically based on config
  const totalPages = useMemo(() => {
    const allMeasures = currentSheet.pages[0]?.measures || [];
    const { maxCharsPerLine, linesPerPage } = appConfig.musicStand.musicSheet;
    
    // Count total lines
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
    
    const calculatedPages = Math.ceil(lineCount / linesPerPage);
    console.log('[MusicStand] Sheet:', currentSheet.title);
    console.log('[MusicStand] Total measures:', allMeasures.length);
    console.log('[MusicStand] Total tokens:', tokens.length);
    console.log('[MusicStand] Total lines:', lineCount);
    console.log('[MusicStand] Lines per page:', linesPerPage);
    console.log('[MusicStand] Calculated pages:', calculatedPages);
    
    return calculatedPages;
  }, [currentSheet, appConfig.musicStand.musicSheet]);
  
  // Event handlers
  const handlePlayPause = () => {
    if (playback.isPlaying) {
      dispatch(pauseSheet());
    } else {
      dispatch(playSheet());
    }
  };
  
  const handleStop = () => {
    dispatch(stopSheet());
  };
  
  const handlePreviousPage = () => {
    dispatch(previousPage());
  };
  
  const handleNextPage = () => {
    dispatch(nextPage());
  };
  
  const handleTempoChange = (tempo: number) => {
    dispatch(setTempo(tempo));
  };
  
  const handleToggleLoop = () => {
    dispatch(toggleLoop());
  };
  
  const handleToggleAutoScroll = () => {
    dispatch(toggleAutoScroll());
  };
  
  const handleClose = () => {
    dispatch(unloadSheet());
  };
  
  const handleToggleMinimize = () => {
    dispatch(toggleMusicStandMinimized());
  };
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mb: 1.4,
        animation: 'slideDown 0.4s ease-out',
        '@keyframes slideDown': {
          from: {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* Music Book Display */}
        <MusicBookDisplay
          currentSheet={currentSheet}
          playback={playback}
          isMinimized={isMinimized}
          pianoTheme={pianoTheme}
          onClose={handleClose}
        />
        
        {/* Player Controls */}
        <PlayerControls
          playback={playback}
          totalPages={totalPages}
          isMinimized={isMinimized}
          pianoTheme={pianoTheme}
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onTempoChange={handleTempoChange}
          onToggleLoop={handleToggleLoop}
          onToggleAutoScroll={handleToggleAutoScroll}
          onToggleMinimize={handleToggleMinimize}
        />
      </Box>
    </Box>
  );
};
