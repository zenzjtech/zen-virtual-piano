/**
 * Settings dialog header with theme and instrument information
 */

import { DialogTitle, IconButton, Box, Typography, Chip, Fade } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAppSelector } from '@/store/hook';
import { SOUND_SETS } from '@/services/sound-sets';
import type { ThemePreset } from '../../piano/theme-presets';
import type { SettingsTheme } from '../types';

interface SettingsHeaderProps {
  open: boolean;
  onClose: () => void;
  currentPreset?: ThemePreset;
  theme: SettingsTheme;
}

export const SettingsHeader = ({ open, onClose, currentPreset, theme }: SettingsHeaderProps) => {
  const soundSetId = useAppSelector((state) => state.pianoSettings.soundSet);
  const currentInstrument = SOUND_SETS[soundSetId];

  return (
    <DialogTitle
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        borderBottom: `1px solid ${theme.borderColor}`,
        color: theme.textColor,
        pb: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: theme.textColor,
            '&:hover': {
              bgcolor: theme.hoverBg,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Theme and Instrument Info */}
      <Fade in={open} timeout={400}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {currentPreset && (
            <Chip
              label={currentPreset.name}
              size="small"
              sx={{
                bgcolor: theme.paperBg,
                color: theme.textColor,
                border: `1px solid ${theme.borderColor}`,
                fontWeight: 500,
                fontSize: '0.75rem',
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          )}
          {currentInstrument && (
            <Chip
              label={currentInstrument.name}
              size="small"
              sx={{
                bgcolor: theme.paperBg,
                color: theme.secondaryTextColor,
                border: `1px solid ${theme.borderColor}`,
                fontSize: '0.75rem',
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          )}
        </Box>
      </Fade>
    </DialogTitle>
  );
};
