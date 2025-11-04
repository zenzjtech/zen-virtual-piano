import React from 'react';
import { Box, Paper, IconButton, Typography, Slider, Tooltip, Collapse } from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SkipPrevious as PrevIcon,
  SkipNext as NextIcon,
  Loop as LoopIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  UnfoldMore as AutoScrollIcon,
} from '@mui/icons-material';
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
import bookImage from '@/assets/image/music-sheet.png';

interface MusicStandProps {
  pianoTheme: PianoTheme;
}

/**
 * Music Stand Component
 * Displays sheet music on an open book background with playback controls
 */
export const MusicStand: React.FC<MusicStandProps> = ({ pianoTheme }) => {
  const dispatch = useAppDispatch();
  
  // Redux state
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const playback = useAppSelector((state) => state.musicSheet.playback);
  const isMinimized = useAppSelector((state) => state.musicSheet.isMusicStandMinimized);
  
  if (!currentSheet) return null;
  
  const currentPage = currentSheet.pages[playback.currentPage];
  const totalPages = currentSheet.pages.length;
  
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
  
  const handleTempoChange = (_event: Event, newValue: number | number[]) => {
    const tempo = Array.isArray(newValue) ? newValue[0] : newValue;
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
        mb: 2,
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
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* Music Book Display */}
        <Collapse in={!isMinimized}>
          <Paper
            elevation={8}
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundImage: `url(${bookImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Book Content Area */}
            <Box
              sx={{
                position: 'absolute',
                top: '15%',
                left: '12%',
                right: '12%',
                bottom: '15%',
                display: 'flex',
                gap: 2,
              }}
            >
              {/* Left Page */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    color: 'text.primary',
                  }}
                >
                  {currentSheet.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    mb: 2,
                    color: 'text.secondary',
                    fontSize: { xs: '0.7rem', md: '0.8rem' },
                  }}
                >
                  {currentSheet.artist}
                </Typography>
                
                {/* Sheet Notation Display */}
                <Box
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                    fontSize: { xs: '0.85rem', md: '1rem' },
                    lineHeight: 1.8,
                    whiteSpace: 'pre-wrap',
                    color: 'text.primary',
                  }}
                >
                  {currentPage?.measures.map((measure, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        mb: 1,
                        backgroundColor:
                          playback.isPlaying && idx === playback.currentMeasure
                            ? 'rgba(255, 193, 7, 0.2)'
                            : 'transparent',
                        px: 0.5,
                        py: 0.25,
                        borderRadius: 0.5,
                        transition: 'background-color 0.2s',
                      }}
                    >
                      {measure.notes.map((note, noteIdx) => (
                        <span
                          key={noteIdx}
                          style={{
                            fontWeight:
                              playback.isPlaying &&
                              idx === playback.currentMeasure &&
                              noteIdx === playback.currentNoteIndex
                                ? 'bold'
                                : 'normal',
                            color:
                              playback.isPlaying &&
                              idx === playback.currentMeasure &&
                              noteIdx === playback.currentNoteIndex
                                ? pianoTheme.colors.accent
                                : 'inherit',
                          }}
                        >
                          {note.key}{' '}
                        </span>
                      ))}
                      {' | '}
                    </Box>
                  ))}
                </Box>
              </Box>
              
              {/* Right Page - Placeholder for now */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" color="text.disabled">
                  Page {playback.currentPage + 1} of {totalPages}
                </Typography>
              </Box>
            </Box>
            
            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
              }}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        </Collapse>
        
        {/* Player Controls */}
        <Paper
          elevation={3}
          sx={{
            px: 3,
            py: 2,
            background: pianoTheme.container.background,
            color: pianoTheme.colors.primary,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Minimize/Expand Button */}
            <Tooltip title={isMinimized ? 'Expand' : 'Minimize'}>
              <IconButton
                onClick={handleToggleMinimize}
                size="small"
                sx={{ color: pianoTheme.colors.primary }}
              >
                {isMinimized ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Tooltip>
            
            {/* Playback Controls */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Previous Page">
                <span>
                  <IconButton
                    onClick={handlePreviousPage}
                    disabled={playback.currentPage === 0}
                    size="small"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    <PrevIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Next Page">
                <span>
                  <IconButton
                    onClick={handleNextPage}
                    disabled={playback.currentPage >= totalPages - 1}
                    size="small"
                    sx={{ color: pianoTheme.colors.primary }}
                  >
                    <NextIcon />
                  </IconButton>
                </span>
              </Tooltip>
                            
              <Tooltip title={playback.isPlaying ? 'Pause' : 'Play'}>
                <IconButton
                  onClick={handlePlayPause}
                  size="medium"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: pianoTheme.colors.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  {playback.isPlaying ? <PauseIcon /> : <PlayIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Stop">
                <IconButton
                  onClick={handleStop}
                  size="small"
                  sx={{ color: pianoTheme.colors.primary }}
                >
                  <StopIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            {/* Tempo Control */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
              <Typography variant="caption" sx={{ minWidth: 80 }}>
                Tempo: {playback.tempo} BPM
              </Typography>
              <Slider
                value={playback.tempo}
                onChange={handleTempoChange}
                min={40}
                max={240}
                step={5}
                size="small"
                sx={{
                  color: pianoTheme.colors.primary,
                  '& .MuiSlider-thumb': {
                    backgroundColor: pianoTheme.colors.primary,
                  },
                }}
              />
            </Box>
            
            {/* Options */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title={playback.autoScroll ? 'Auto-scroll: ON' : 'Auto-scroll: OFF'}>
                <IconButton
                  onClick={handleToggleAutoScroll}
                  size="small"
                  sx={{
                    color: playback.autoScroll
                      ? pianoTheme.colors.primary
                      : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <AutoScrollIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={playback.loopEnabled ? 'Loop: ON' : 'Loop: OFF'}>
                <IconButton
                  onClick={handleToggleLoop}
                  size="small"
                  sx={{
                    color: playback.loopEnabled
                      ? pianoTheme.colors.primary
                      : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <LoopIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
