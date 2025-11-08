/**
 * Main application settings dialog
 * Contains all extension settings including quote preferences
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Tabs,
  Tab,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Paper,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import {
  setShowQuote,
  setQuoteInterval,
  setShowOnlyFavorites,
  type QuoteInterval,
} from '@/store/reducers/quote-settings-slice';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  isDarkBackground: boolean;
  initialTab?: 'general' | 'quotes' | 'piano' | 'keyboard';
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`settings-tabpanel-${index}`}
    aria-labelledby={`settings-tab-${index}`}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

export const SettingsDialog = ({
  open,
  onClose,
  isDarkBackground,
  initialTab = 'general',
}: SettingsDialogProps) => {
  const dispatch = useAppDispatch();
  const quoteSettings = useAppSelector((state) => state.quoteSettings);
  
  const tabMap: Record<string, number> = {
    general: 0,
    quotes: 1,
    piano: 2,
    keyboard: 3,
  };

  const [tabValue, setTabValue] = useState(tabMap[initialTab] || 0);

  useEffect(() => {
    if (open && initialTab) {
      setTabValue(tabMap[initialTab] || 0);
    }
  }, [open, initialTab]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Theme-aware colors
  const dialogBg = isDarkBackground ? 'rgba(30, 30, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)';
  const textColor = isDarkBackground ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)';
  const secondaryTextColor = isDarkBackground ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
  const borderColor = isDarkBackground ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  const paperBg = isDarkBackground ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)';
  const hoverBg = isDarkBackground ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';

  const intervalLabels: Record<QuoteInterval, string> = {
    daily: 'Daily',
    hourly: 'Every Hour',
    '30min': 'Every 30 Minutes',
    '10min': 'Every 10 Minutes',
    '5min': 'Every 5 Minutes',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: dialogBg,
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 2,
          boxShadow: isDarkBackground
            ? '0 8px 32px rgba(0, 0, 0, 0.5)'
            : '0 8px 32px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${borderColor}`,
          color: textColor,
          pb: 2,
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: textColor,
            '&:hover': {
              bgcolor: hoverBg,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: `1px solid ${borderColor}` }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          sx={{
            px: 3,
            '& .MuiTab-root': {
              color: secondaryTextColor,
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              minHeight: 48,
              '&.Mui-selected': {
                color: textColor,
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: textColor,
            },
          }}
        >
          <Tab label="General" id="settings-tab-0" />
          <Tab label="Quotes" id="settings-tab-1" />
          <Tab label="Piano" id="settings-tab-2" />
          <Tab label="Keyboard" id="settings-tab-3" />
        </Tabs>
      </Box>

      {/* Dialog Content */}
      <DialogContent sx={{ px: 4, py: 0 }}>
        {/* General Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography sx={{ color: secondaryTextColor, mb: 2 }}>
            General extension settings coming soon...
          </Typography>
        </TabPanel>

        {/* Quotes Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box id="quote-settings">
            <Typography variant="h6" sx={{ color: textColor, mb: 3, fontWeight: 600 }}>
              Quote Display Settings
            </Typography>

            {/* Show Quote Toggle */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                mb: 2.5,
                bgcolor: paperBg,
                borderRadius: 2,
                border: `1px solid ${borderColor}`,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={quoteSettings.showQuote}
                    onChange={(e) => dispatch(setShowQuote(e.target.checked))}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: textColor,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        bgcolor: isDarkBackground ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ color: textColor, fontWeight: 500 }}>
                      Show Inspirational Quotes
                    </Typography>
                    <Typography variant="caption" sx={{ color: secondaryTextColor }}>
                      Display quotes in the header when not playing recordings
                    </Typography>
                  </Box>
                }
                sx={{ m: 0, alignItems: 'flex-start' }}
              />
            </Paper>

            {/* Quote Interval Setting */}
            {quoteSettings.showQuote && (
              <>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    mb: 2.5,
                    bgcolor: paperBg,
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: secondaryTextColor,
                        '&.Mui-focused': { color: textColor },
                      }}
                    >
                      Quote Change Interval
                    </InputLabel>
                    <Select
                      value={quoteSettings.interval}
                      label="Quote Change Interval"
                      onChange={(e) => dispatch(setQuoteInterval(e.target.value as QuoteInterval))}
                      sx={{
                        color: textColor,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: borderColor,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: textColor,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: textColor,
                        },
                        '& .MuiSvgIcon-root': {
                          color: textColor,
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: dialogBg,
                            backgroundImage: 'none',
                            backdropFilter: 'blur(20px)',
                            '& .MuiMenuItem-root': {
                              color: textColor,
                              '&:hover': {
                                bgcolor: hoverBg,
                              },
                              '&.Mui-selected': {
                                bgcolor: hoverBg,
                                '&:hover': {
                                  bgcolor: isDarkBackground
                                    ? 'rgba(255, 255, 255, 0.12)'
                                    : 'rgba(0, 0, 0, 0.08)',
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      {(Object.keys(intervalLabels) as QuoteInterval[]).map((interval) => (
                        <MenuItem key={interval} value={interval}>
                          {intervalLabels[interval]}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 1 }}>
                      How often quotes should change automatically
                    </Typography>
                  </FormControl>
                </Paper>

                <Divider sx={{ my: 3, borderColor }} />

                {/* Show Only Favorites */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    bgcolor: paperBg,
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={quoteSettings.showOnlyFavorites}
                        onChange={(e) => dispatch(setShowOnlyFavorites(e.target.checked))}
                        disabled={quoteSettings.favoriteQuoteIds.length === 0}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: textColor,
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            bgcolor: isDarkBackground
                              ? 'rgba(255, 255, 255, 0.3)'
                              : 'rgba(0, 0, 0, 0.3)',
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography sx={{ color: textColor, fontWeight: 500 }}>
                          Show Only Favorite Quotes
                        </Typography>
                        <Typography variant="caption" sx={{ color: secondaryTextColor }}>
                          {quoteSettings.favoriteQuoteIds.length === 0
                            ? 'No favorites yet. Mark quotes as favorites to enable this option.'
                            : `Display only your ${quoteSettings.favoriteQuoteIds.length} favorite quote${
                                quoteSettings.favoriteQuoteIds.length === 1 ? '' : 's'
                              }`}
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0, alignItems: 'flex-start' }}
                  />
                </Paper>
              </>
            )}
          </Box>
        </TabPanel>

        {/* Piano Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography sx={{ color: secondaryTextColor, mb: 2 }}>
            Piano settings coming soon...
          </Typography>
        </TabPanel>

        {/* Keyboard Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography sx={{ color: secondaryTextColor, mb: 2 }}>
            Keyboard shortcut settings coming soon...
          </Typography>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
