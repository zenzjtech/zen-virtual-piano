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

interface SettingsBarProps {
  onRecord?: () => void;
  onKeyAssist?: () => void;
  onSound?: () => void;
  onStyles?: () => void;
  onSave?: () => void;
  onMore?: () => void;
}

const BarContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2a2a2a',
  color: '#ffffff',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  border: '1px solid #333',
  flexWrap: 'wrap',
}));

const SettingButton = styled(Button)(({ theme }) => ({
  color: '#aaa',
  borderColor: '#444',
  minWidth: '100px',
  padding: theme.spacing(1, 2),
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#666',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
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
}) => {
  return (
    <BarContainer elevation={3}>
      <SettingButton
        variant="outlined"
        startIcon={<RecordIcon sx={{ fontSize: '1rem' }} />}
        onClick={onRecord}
      >
        Record
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<KeyboardIcon sx={{ fontSize: '1rem' }} />}
        onClick={onKeyAssist}
      >
        Key Assist
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<SoundIcon sx={{ fontSize: '1rem' }} />}
        onClick={onSound}
      >
        Sound
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<StylesIcon sx={{ fontSize: '1rem' }} />}
        onClick={onStyles}
      >
        Styles
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<SaveIcon sx={{ fontSize: '1rem' }} />}
        onClick={onSave}
      >
        Save
      </SettingButton>

      <SettingButton
        variant="outlined"
        startIcon={<MoreIcon sx={{ fontSize: '1rem' }} />}
        onClick={onMore}
      >
        More
      </SettingButton>
    </BarContainer>
  );
};
