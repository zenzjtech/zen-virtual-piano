/**
 * General settings tab content
 */

import { Typography } from '@mui/material';
import type { SettingsTheme } from '../types';

interface GeneralTabProps {
  theme: SettingsTheme;
}

export const GeneralTab = ({ theme }: GeneralTabProps) => (
  <Typography sx={{ color: theme.secondaryTextColor, mb: 2 }}>
    General extension settings coming soon...
  </Typography>
);
