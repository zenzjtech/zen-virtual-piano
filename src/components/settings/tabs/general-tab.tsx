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
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import {
  setAutoThemeEnabled,
  setAutoThemeInterval,
  type ThemeChangeInterval,
} from '@/store/reducers/theme-slice';
import { setLocale, type SupportedLocale } from '@/store/reducers/i18n-slice';
import { SettingSection } from '../components/setting-section';
import { SettingToggle } from '../components/setting-toggle';
import type { SettingsTheme } from '../types';
import { useTranslation } from '@/hooks/use-translation';
import i18n from '@/lib/i18n';

interface GeneralTabProps {
  theme: SettingsTheme;
}

const INTERVAL_LABELS: Record<ThemeChangeInterval, string> = {
  daily: 'daily',
  hourly: 'everyHour',
  '30min': 'every30Min',
  '15min': 'every15Min',
  '10min': 'every10Min',
  '5min': 'every5Min',
  '1min': 'every1Min',
};

const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'english',
  ja: 'japanese',
  vi: 'vietnamese',
};

export const GeneralTab = ({ theme: settingsTheme }: GeneralTabProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const i18nState = useAppSelector((state) => state.i18n);
  const { t } = useTranslation('settings');

  // Sync i18n language when locale changes
  useEffect(() => {
    i18n.changeLanguage(i18nState.locale);
  }, [i18nState.locale]);

  return (
    <Box>
      <Typography variant="h6" sx={{ color: settingsTheme.textPrimary, mb: 3, fontWeight: 600 }}>
        {t('generalSettings')}
      </Typography>

      {/* Auto Theme Change Toggle */}
      <SettingSection theme={settingsTheme}>
        <SettingToggle
          label={t('autoThemeRotation')}
          description={t('autoThemeDescription')}
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
                  color: settingsTheme.textSecondary,
                  '&.Mui-focused': { color: settingsTheme.textPrimary },
                }}
              >
                {t('themeChangeInterval')}
              </InputLabel>
              <Select
                value={theme.autoThemeInterval}
                label={t('themeChangeInterval')}
                onChange={(e) => dispatch(setAutoThemeInterval(e.target.value as ThemeChangeInterval))}
                sx={{
                  color: settingsTheme.textPrimary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: settingsTheme.borderColor,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: settingsTheme.textPrimary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: settingsTheme.textPrimary,
                  },
                  '& .MuiSvgIcon-root': {
                    color: settingsTheme.textPrimary,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: settingsTheme.dialogBg,
                      backgroundImage: 'none',
                      backdropFilter: 'blur(20px)',
                      '& .MuiMenuItem-root': {
                        color: settingsTheme.textPrimary,
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
                    {t(INTERVAL_LABELS[interval])}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" sx={{ color: settingsTheme.textSecondary, mt: 1 }}>
                {t('autoThemeIntervalDescription')}
              </Typography>
            </FormControl>
          </SettingSection>

          <Divider sx={{ my: 3, borderColor: settingsTheme.borderColor }} />

          <Box sx={{ px: 2.5 }}>
            <Typography variant="body2" sx={{ color: settingsTheme.textSecondary, fontStyle: 'italic' }}>
              {t('autoThemeTip')}
            </Typography>
          </Box>
        </>
      )}

      {/* Language Selector */}
      <Divider sx={{ my: 3, borderColor: settingsTheme.borderColor }} />

      <SettingSection theme={settingsTheme}>
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: settingsTheme.textSecondary,
              '&.Mui-focused': { color: settingsTheme.textPrimary },
            }}
          >
            {t('language')}
          </InputLabel>
          <Select
            value={i18nState.locale}
            label={t('language')}
            onChange={(e) => dispatch(setLocale(e.target.value as SupportedLocale))}
            sx={{
              color: settingsTheme.textPrimary,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: settingsTheme.borderColor,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: settingsTheme.textPrimary,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: settingsTheme.textPrimary,
              },
              '& .MuiSvgIcon-root': {
                color: settingsTheme.textPrimary,
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: settingsTheme.dialogBg,
                  backgroundImage: 'none',
                  backdropFilter: 'blur(20px)',
                  '& .MuiMenuItem-root': {
                    color: settingsTheme.textPrimary,
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
            {(Object.keys(LOCALE_LABELS) as SupportedLocale[]).map((locale) => (
              <MenuItem key={locale} value={locale}>
                {t(LOCALE_LABELS[locale])}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" sx={{ color: settingsTheme.textSecondary, mt: 1 }}>
            {t('languageDescription')}
          </Typography>
        </FormControl>
      </SettingSection>
    </Box>
  );
};
