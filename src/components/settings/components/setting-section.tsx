/**
 * Reusable settings section wrapper
 */

import { Paper, Box } from '@mui/material';
import type { ReactNode } from 'react';
import type { SettingsTheme } from '../types';

interface SettingSectionProps {
  children: ReactNode;
  theme: SettingsTheme;
}

export const SettingSection = ({ children, theme }: SettingSectionProps) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      mb: 2.5,
      bgcolor: theme.paperBg,
      borderRadius: 2,
      border: `1px solid ${theme.borderColor}`,
    }}
  >
    <Box>{children}</Box>
  </Paper>
);
