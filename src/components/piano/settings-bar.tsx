import React from 'react';
import { Box, Button, styled, Paper } from '@mui/material';
import {
  FiberManualRecord as RecordIcon,
  Keyboard as KeyboardIcon,
  VolumeUp as SoundIcon,
  Palette as StylesIcon,
  Save as SaveIcon,
  MoreHoriz as MoreIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';

interface SettingsBarProps {
  onRecord?: () => void;
  onKeyAssist?: () => void;
  onSound?: () => void;
  onStyles?: () => void;
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
  boxShadow: 'none',
  border: pianoTheme.container.border,
  borderTop: 'none',
  borderBottom: 'none',
  flexWrap: 'wrap',
  position: 'relative',
  overflow: 'hidden',
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
  '&:hover': {
    borderColor: pianoTheme.colors.accent,
    backgroundColor: pianoTheme.isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
    color: pianoTheme.colors.accent,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(0.75),
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
        Styles
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
