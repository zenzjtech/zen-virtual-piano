import { Box, styled, keyframes } from '@mui/material';
import { PianoTheme } from './themes';
import { PatternTheme } from './pattern-themes';

/**
 * Unified pattern wrapper for the entire PianoUnit
 * Applies pattern overlay across StatusBoard, SettingsBar, and Piano seamlessly
 */
export const PianoUnitWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme' && prop !== 'patternTheme',
})<{ pianoTheme: PianoTheme; patternTheme?: PatternTheme }>(({ theme, pianoTheme, patternTheme }) => {
  const twinkleAnimation = patternTheme?.animation ? keyframes`${patternTheme.animation.keyframes}` : 'none';

  return {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  position: 'relative',
  
  // Pattern overlay - beforePattern layer
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: theme.spacing(1.5),
    borderTopRightRadius: theme.spacing(1.5),
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    background: patternTheme?.beforePattern || 'none',
    pointerEvents: 'none',
    opacity: 0.6,
    zIndex: 1,
    animation: patternTheme?.animation
      ? `${twinkleAnimation} ${patternTheme.animation.duration} ${patternTheme.animation.timingFunction} ${patternTheme.animation.iterationCount}`
      : 'none',
  },
  
  // Pattern overlay - afterPattern layer
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: theme.spacing(1.5),
    borderTopRightRadius: theme.spacing(1.5),
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    background: patternTheme?.afterPattern || 'none',
    pointerEvents: 'none',
    zIndex: 2,
  },
}});
