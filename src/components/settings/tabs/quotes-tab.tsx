/**
 * Quote settings tab content
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
  setShowQuote,
  setQuoteInterval,
  setShowOnlyFavorites,
  type QuoteInterval,
} from '@/store/reducers/quote-settings-slice';
import { SettingSection } from '../components/setting-section';
import { SettingToggle } from '../components/setting-toggle';
import type { SettingsTheme } from '../types';
import { useTranslation } from '@/hooks/use-translation';

interface QuotesTabProps {
  theme: SettingsTheme;
}

const INTERVAL_LABELS: Record<QuoteInterval, string> = {
  daily: 'daily',
  hourly: 'everyHour',
  '30min': 'every30Min',
  '10min': 'every10Min',
  '5min': 'every5Min',
};

export const QuotesTab = ({ theme }: QuotesTabProps) => {
  const dispatch = useAppDispatch();
  const quoteSettings = useAppSelector((state) => state.quoteSettings);
  const { t } = useTranslation('settings');

  return (
    <Box id="quote-settings">
      <Typography variant="h6" sx={{ color: theme.textPrimary, mb: 3, fontWeight: 600 }}>
        {t('quoteDisplaySettings')}
      </Typography>

      {/* Show Quote Toggle */}
      <SettingSection theme={theme}>
        <SettingToggle
          label={t('showQuotes')}
          description={t('showQuotesDescription')}
          checked={quoteSettings.showQuote}
          onChange={(checked) => dispatch(setShowQuote(checked))}
          theme={theme}
        />
      </SettingSection>

      {/* Quote Interval Setting */}
      {quoteSettings.showQuote && (
        <>
          <SettingSection theme={theme}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: theme.textSecondary,
                  '&.Mui-focused': { color: theme.textPrimary },
                }}
              >
                {t('quoteChangeInterval')}
              </InputLabel>
              <Select
                value={quoteSettings.interval}
                label={t('quoteChangeInterval')}
                onChange={(e) => dispatch(setQuoteInterval(e.target.value as QuoteInterval))}
                sx={{
                  color: theme.textPrimary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.borderColor,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.textPrimary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.textPrimary,
                  },
                  '& .MuiSvgIcon-root': {
                    color: theme.textPrimary,
                  },
                }}
                MenuProps={{
                  slotProps: {
                    paper: {
                      sx: {
                        bgcolor: theme.dialogBg,
                        backgroundImage: 'none',
                        backdropFilter: 'blur(20px)',
                        '& .MuiMenuItem-root': {
                          color: theme.textPrimary,
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
                  },
                }}
              >
                {(Object.keys(INTERVAL_LABELS) as QuoteInterval[]).map((interval) => (
                  <MenuItem key={interval} value={interval}>
                    {t(INTERVAL_LABELS[interval])}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" sx={{ color: theme.textSecondary, mt: 1 }}>
                {t('quoteChangeIntervalDescription')}
              </Typography>
            </FormControl>
          </SettingSection>

          <Divider sx={{ my: 3, borderColor: theme.borderColor }} />

          {/* Show Only Favorites */}
          <SettingSection theme={theme}>
            <SettingToggle
              label={t('showOnlyFavorites')}
              description={
                quoteSettings.favoriteQuoteIds.length === 0
                  ? t('noFavorites')
                  : t('favoritesCount', { count: quoteSettings.favoriteQuoteIds.length })
              }
              checked={quoteSettings.showOnlyFavorites}
              disabled={quoteSettings.favoriteQuoteIds.length === 0}
              onChange={(checked) => dispatch(setShowOnlyFavorites(checked))}
              theme={theme}
            />
          </SettingSection>
        </>
      )}
    </Box>
  );
};
