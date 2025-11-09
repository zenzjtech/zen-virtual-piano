/**
 * Reusable toggle switch setting component
 */

import { FormControlLabel, Switch, Typography, Box } from '@mui/material';
import type { SettingsTheme } from '../types';

interface SettingToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  theme: SettingsTheme;
}

export const SettingToggle = ({
  label,
  description,
  checked,
  disabled = false,
  onChange,
  theme,
}: SettingToggleProps) => (
  <FormControlLabel
    control={
      <Switch
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: theme.textPrimary,
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            bgcolor: theme.highlightBg,
          },
        }}
      />
    }
    label={
      <Box>
        <Typography sx={{ color: theme.textPrimary, fontWeight: 500 }}>
          {label}
        </Typography>
        {description && (
          <Typography variant="caption" sx={{ color: theme.textSecondary }}>
            {description}
          </Typography>
        )}
      </Box>
    }
    sx={{ m: 0, alignItems: 'flex-start' }}
  />
);
