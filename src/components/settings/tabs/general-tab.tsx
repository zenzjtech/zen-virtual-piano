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
} from '@/store/reducers/theme-slice';
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

export const GeneralTab = ({ theme: settingsTheme }: GeneralTabProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  return (
    <Box>
      <Typography variant="h6" sx={{ color: settingsTheme.textColor, mb: 3, fontWeight: 600 }}>
        General Settings
      </Typography>

      {/* Auto Theme Change Toggle */}
      <SettingSection theme={settingsTheme}>
        <SettingToggle
          label="Auto Theme Rotation"
          description="Automatically change to a random theme at specified intervals"
          checked={theme.autoThemeEnabled}
          onChange={(checked) => dispatch(setAutoThemeEnabled(checked))}
          theme={settingsTheme}
        />
      </SettingSection>

      {/* Theme Change Interval Setting */}
      {theme.autoThemeEnabled && (
        <>
          <SettingSection theme={settingsTheme}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: settingsTheme.secondaryTextColor,
                  '&.Mui-focused': { color: settingsTheme.textColor },
                }}
              >
                Theme Change Interval
              </InputLabel>
              <Select
                value={theme.autoThemeInterval}
                label="Theme Change Interval"
                onChange={(e) => dispatch(setAutoThemeInterval(e.target.value as ThemeChangeInterval))}
                sx={{
                  color: settingsTheme.textColor,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: settingsTheme.borderColor,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: settingsTheme.textColor,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: settingsTheme.textColor,
                  },
                  '& .MuiSvgIcon-root': {
                    color: settingsTheme.textColor,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: settingsTheme.dialogBg,
                      backgroundImage: 'none',
                      backdropFilter: 'blur(20px)',
                      '& .MuiMenuItem-root': {
                        color: settingsTheme.textColor,
                        '&:hover': {
                          bgcolor: settingsTheme.hoverBg,
                        },
                        '&.Mui-selected': {
                          bgcolor: settingsTheme.hoverBg,
                          '&:hover': {
                            bgcolor: settingsTheme.highlightBg,
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
              <Typography variant="caption" sx={{ color: settingsTheme.secondaryTextColor, mt: 1 }}>
                How often to automatically switch to a random theme preset
              </Typography>
            </FormControl>
          </SettingSection>

          <Divider sx={{ my: 3, borderColor: settingsTheme.borderColor }} />

          <Box sx={{ px: 2.5 }}>
            <Typography variant="body2" sx={{ color: settingsTheme.secondaryTextColor, fontStyle: 'italic' }}>
              💡 Tip: The theme will change automatically to keep your workspace fresh and inspiring!
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
