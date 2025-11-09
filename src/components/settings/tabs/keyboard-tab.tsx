/**
 * Keyboard shortcuts settings tab content
 */

import { Typography } from '@mui/material';
import type { SettingsTheme } from '../types';

interface KeyboardTabProps {
  theme: SettingsTheme;
}

export const KeyboardTab = ({ theme }: KeyboardTabProps) => (
  <Typography sx={{ color: theme.textSecondary, mb: 2 }}>
    Keyboard shortcut settings coming soon...
  </Typography>
);
