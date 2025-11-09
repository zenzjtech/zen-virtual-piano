import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Tune as MetronomeIcon } from '@mui/icons-material';
import { PianoTheme } from './themes';
import { useAppDispatch } from '@/store/hook';
import { openSoundPopup } from '@/store/reducers/piano-settings-slice';

interface MetronomeControlProps {
  pianoTheme: PianoTheme;
}

export const MetronomeControl: React.FC<MetronomeControlProps> = ({
  pianoTheme,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openSoundPopup('metronome'));
  };

  return (
    <Tooltip title="Metronome Settings" placement="top">
      <IconButton
        onClick={handleClick}
        size="small"
        data-metronome-control="true"
        sx={{
          color: pianoTheme.colors.primary,
          border: `1px solid ${pianoTheme.colors.border}`,
          borderRadius: 1,
          padding: '4px 8px',
          '&:hover': {
            borderColor: pianoTheme.colors.accent,
            backgroundColor: pianoTheme.isLight 
              ? 'rgba(0, 0, 0, 0.04)' 
              : 'rgba(255, 255, 255, 0.08)',
          },
        }}
      >
        <MetronomeIcon sx={{ fontSize: '1.2rem' }} />
      </IconButton>
    </Tooltip>
  );
};
