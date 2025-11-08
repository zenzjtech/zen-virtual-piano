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

interface QuotesTabProps {
  theme: SettingsTheme;
}

const INTERVAL_LABELS: Record<QuoteInterval, string> = {
  daily: 'Daily',
  hourly: 'Every Hour',
  '30min': 'Every 30 Minutes',
  '10min': 'Every 10 Minutes',
  '5min': 'Every 5 Minutes',
};

export const QuotesTab = ({ theme }: QuotesTabProps) => {
  const dispatch = useAppDispatch();
  const quoteSettings = useAppSelector((state) => state.quoteSettings);

  return (
    <Box id="quote-settings">
      <Typography variant="h6" sx={{ color: theme.textColor, mb: 3, fontWeight: 600 }}>
        Quote Display Settings
      </Typography>

      {/* Show Quote Toggle */}
      <SettingSection theme={theme}>
        <SettingToggle
          label="Show Inspirational Quotes"
          description="Display quotes in the header when not playing recordings"
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
                  color: theme.secondaryTextColor,
                  '&.Mui-focused': { color: theme.textColor },
                }}
              >
                Quote Change Interval
              </InputLabel>
              <Select
                value={quoteSettings.interval}
                label="Quote Change Interval"
                onChange={(e) => dispatch(setQuoteInterval(e.target.value as QuoteInterval))}
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
                {(Object.keys(INTERVAL_LABELS) as QuoteInterval[]).map((interval) => (
                  <MenuItem key={interval} value={interval}>
                    {INTERVAL_LABELS[interval]}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" sx={{ color: theme.secondaryTextColor, mt: 1 }}>
                How often quotes should change automatically
              </Typography>
            </FormControl>
          </SettingSection>

          <Divider sx={{ my: 3, borderColor: theme.borderColor }} />

          {/* Show Only Favorites */}
          <SettingSection theme={theme}>
            <SettingToggle
              label="Show Only Favorite Quotes"
              description={
                quoteSettings.favoriteQuoteIds.length === 0
                  ? 'No favorites yet. Mark quotes as favorites to enable this option.'
                  : `Display only your ${quoteSettings.favoriteQuoteIds.length} favorite quote${
                      quoteSettings.favoriteQuoteIds.length === 1 ? '' : 's'
                    }`
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
