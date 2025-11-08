/**
 * General settings tab content
 */

import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import {
  setAutoThemeEnabled,
  setAutoThemeInterval,
  type ThemeChangeInterval,
} from '@/store/reducers/auto-theme-slice';
import { SettingSection } from '../components/setting-section';
import { SettingToggle } from '../components/setting-toggle';
import type { SettingsTheme } from '../types';

interface GeneralTabProps {
  theme: SettingsTheme;
}

const INTERVAL_LABELS: Record<ThemeChangeInterval, string> = {
  daily: 'Daily',
  hourly: 'Every Hour',
  '30min': 'Every 30 Minutes',
  '15min': 'Every 15 Minutes',
  '10min': 'Every 10 Minutes',
  '5min': 'Every 5 Minutes',
  '1min': 'Every 1 Minute',
};

export const GeneralTab = ({ theme }: GeneralTabProps) => {
  const dispatch = useAppDispatch();
  const autoTheme = useAppSelector((state) => state.autoTheme);

  return (
    <Box>
      <Typography variant="h6" sx={{ color: theme.textColor, mb: 3, fontWeight: 600 }}>
        General Settings
      </Typography>

      {/* Auto Theme Change Toggle */}
      <SettingSection theme={theme}>
        <SettingToggle
          label="Auto Theme Rotation"
          description="Automatically change to a random theme at specified intervals"
          checked={autoTheme.enabled}
          onChange={(checked) => dispatch(setAutoThemeEnabled(checked))}
          theme={theme}
        />
      </SettingSection>

      {/* Theme Change Interval Setting */}
      {autoTheme.enabled && (
        <>
          <SettingSection theme={theme}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: theme.secondaryTextColor,
                  '&.Mui-focused': { color: theme.textColor },
                }}
              >
                Theme Change Interval
              </InputLabel>
              <Select
                value={autoTheme.interval}
                label="Theme Change Interval"
                onChange={(e) => dispatch(setAutoThemeInterval(e.target.value as ThemeChangeInterval))}
                sx={{
                  color: theme.textColor,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.borderColor,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.textColor,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.textColor,
                  },
                  '& .MuiSvgIcon-root': {
                    color: theme.textColor,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: theme.dialogBg,
                      backgroundImage: 'none',
                      backdropFilter: 'blur(20px)',
                      '& .MuiMenuItem-root': {
                        color: theme.textColor,
                        '&:hover': {
                          bgcolor: theme.hoverBg,
                        },
                        '&.Mui-selected': {
                          bgcolor: theme.hoverBg,
                          '&:hover': {
                            bgcolor: theme.highlightBg,
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {(Object.keys(INTERVAL_LABELS) as ThemeChangeInterval[]).map((interval) => (
                  <MenuItem key={interval} value={interval}>
                    {INTERVAL_LABELS[interval]}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" sx={{ color: theme.secondaryTextColor, mt: 1 }}>
                How often to automatically switch to a random theme preset
              </Typography>
            </FormControl>
          </SettingSection>

          <Divider sx={{ my: 3, borderColor: theme.borderColor }} />

          <Box sx={{ px: 2.5 }}>
            <Typography variant="body2" sx={{ color: theme.secondaryTextColor, fontStyle: 'italic' }}>
              💡 Tip: The theme will change automatically to keep your workspace fresh and inspiring!
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
