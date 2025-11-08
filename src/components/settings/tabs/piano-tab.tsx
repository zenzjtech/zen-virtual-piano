/**
 * Piano settings tab content
 */

import { Typography } from '@mui/material';
import type { SettingsTheme } from '../types';

interface PianoTabProps {
  theme: SettingsTheme;
}

export const PianoTab = ({ theme }: PianoTabProps) => (
  <Typography sx={{ color: theme.secondaryTextColor, mb: 2 }}>
    Piano settings coming soon...
  </Typography>
);
