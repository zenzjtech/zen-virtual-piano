import React from 'react';
import { Box, Button, styled, Paper } from '@mui/material';
import {
  FiberManualRecord as RecordIcon,
  Keyboard as KeyboardIcon,
  VolumeUp as SoundIcon,
  Palette as StylesIcon,
  Save as SaveIcon,
  MoreHoriz as MoreIcon,
  Piano as InstrumentIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';

interface SettingsBarProps {
  onRecord?: () => void;
  onKeyAssist?: () => void;
  onInstrument?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSound?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onStyles?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSave?: () => void;
  onMore?: () => void;
  /** Piano theme for consistent styling */
  pianoTheme: PianoTheme;
}

const BarContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  background: pianoTheme.container.background,
  color: pianoTheme.colors.primary,
  padding: theme.spacing(1.5, 2),
  borderRadius: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  // Enhanced realistic box shadow with recessed look
  boxShadow: `
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15),
    inset 2px 0 3px rgba(0, 0, 0, 0.1),
    inset -2px 0 3px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.05)
  `,
  border: pianoTheme.container.border,
  borderTop: 'none',
  borderBottom: 'none',
  flexWrap: 'wrap',
  position: 'relative',
  overflow: 'hidden',
  // Subtle inner border highlight
  borderLeft: `1px solid rgba(255, 255, 255, 0.05)`,
  borderRight: `1px solid rgba(255, 255, 255, 0.05)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.beforeBackground || 'transparent',
    pointerEvents: 'none',
    opacity: 0.6,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.afterBackground || 'transparent',
    pointerEvents: 'none',
    zIndex: 2,
  },
}));

const SettingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  color: pianoTheme.colors.secondary,
  borderColor: pianoTheme.colors.border,
  minWidth: '100px',
  padding: theme.spacing(1, 2),
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  position: 'relative',
  zIndex: 3,
  background: pianoTheme.isLight 
    ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)',
  // Enhanced button with realistic depth and lighting
  boxShadow: `
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2)
  `,
  // Subtle text shadow for depth
  textShadow: `
    0 1px 1px rgba(0, 0, 0, 0.3),
    0 -1px 0 rgba(255, 255, 255, 0.05)
  `,
  '&:hover': {
    borderColor: pianoTheme.colors.accent,
    background: pianoTheme.isLight 
      ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.08) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.15) 100%)',
    color: pianoTheme.colors.accent,
    // Enhanced glow on hover
    boxShadow: `
      0 0 12px rgba(212, 175, 55, 0.3),
      0 2px 6px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(0, 0, 0, 0.25)
    `,
    transform: 'translateY(-1px)',
    textShadow: `
      0 0 8px rgba(212, 175, 55, 0.4),
      0 1px 2px rgba(0, 0, 0, 0.4)
    `,
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: `
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05)
    `,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(0.75),
    filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '80px',
    fontSize: '0.65rem',
    padding: theme.spacing(0.75, 1.5),
  },
}));

export const SettingsBar: React.FC<SettingsBarProps> = ({
  onRecord,
  onKeyAssist,
  onInstrument,
  onSound,
  onStyles,
  onSave,
  onMore,
  pianoTheme,
}) => {
  return (
    <BarContainer elevation={0} pianoTheme={pianoTheme}>
      <SettingButton
        variant="outlined"
        startIcon={<RecordIcon sx={{ fontSize: '1rem' }} />}
        onClick={onRecord}
        pianoTheme={pianoTheme}
      >
        Record
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<KeyboardIcon sx={{ fontSize: '1rem' }} />}
        onClick={onKeyAssist}
        pianoTheme={pianoTheme}
      >
        Key Assist
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<InstrumentIcon sx={{ fontSize: '1rem' }} />}
        onClick={onInstrument}
        pianoTheme={pianoTheme}
      >
        Instrument
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<SoundIcon sx={{ fontSize: '1rem' }} />}
        onClick={onSound}
        pianoTheme={pianoTheme}
      >
        Sound
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<StylesIcon sx={{ fontSize: '1rem' }} />}
        onClick={onStyles}
        pianoTheme={pianoTheme}
      >
        Appearances
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<SaveIcon sx={{ fontSize: '1rem' }} />}
        onClick={onSave}
        pianoTheme={pianoTheme}
      >
        Save
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<MoreIcon sx={{ fontSize: '1rem' }} />}
        onClick={onMore}
        pianoTheme={pianoTheme}
      >
        More
      </SettingButton>
    </BarContainer>
  );
};
