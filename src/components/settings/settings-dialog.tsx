/**
 * Main application settings dialog (Refactored)
 * Modular architecture with split components
 */

import { Dialog, DialogContent, Box, Tabs, Tab, Fade } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState, useEffect } from 'react';
import { useDialogTheme } from '@/hooks/use-global-dialog-theme';
import { getDialogStyles } from '@/components/global/dialog/styles';
import { SettingsHeader } from './components/settings-header';
import { TabPanel } from './components/tab-panel';
import { GeneralTab, QuotesTab, PianoTab, KeyboardTab } from './tabs';
import type { SettingsDialogProps, SettingsTab } from './types';
import { useAppDispatch } from '@/store/hook';
import { useDialogPianoControl } from '@/hooks/use-dialog-piano-control';
import { useTranslation } from '@/hooks/use-translation';

// Subtle fade transition component
const SubtleTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Fade ref={ref} {...props} timeout={{ enter: 250, exit: 200 }}>
      {props.children}
    </Fade>
  );
});

const TAB_MAP: Record<SettingsTab, number> = {
  general: 0,
  quotes: 1,
  piano: 2,
  keyboard: 3,
};

export const SettingsDialog = ({
  open,
  onClose,
  isDarkBackground,
  initialTab = 'general',
  headerThemeStyle,
  currentPreset,
}: SettingsDialogProps) => {
  const [tabValue, setTabValue] = useState(TAB_MAP[initialTab] || 0);
  const theme = useDialogTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('settings');

  // Disable piano when dialog opens, re-enable when it closes
  useDialogPianoControl(open);

  // Update tab when initialTab changes
  useEffect(() => {
    if (open && initialTab) {
      setTabValue(TAB_MAP[initialTab] || 0);
    }
  }, [open, initialTab]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={SubtleTransition}
      slotProps={{
        paper: { sx: getDialogStyles(theme) },
      }}
    >
      {/* Header with theme/instrument info */}
      <SettingsHeader
        open={open}
        onClose={onClose}
        currentPreset={currentPreset}
        theme={theme}
      />

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: `1px solid ${theme.borderColor}` }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          sx={{
            px: 3,
            '& .MuiTab-root': {
              color: theme.textSecondary,
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              minHeight: 48,
              '&.Mui-selected': {
                color: theme.textPrimary,
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: theme.accentPrimary,
            },
          }}
        >
          <Tab label={t('general')} id="settings-tab-0" />
          <Tab label={t('quotes')} id="settings-tab-1" />
          <Tab label={t('piano')} id="settings-tab-2" />
          <Tab label={t('keyboard')} id="settings-tab-3" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <DialogContent sx={{ px: 4, py: 0 }}>
        <TabPanel value={tabValue} index={0}>
          <GeneralTab theme={theme} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <QuotesTab theme={theme} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <PianoTab theme={theme} />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <KeyboardTab theme={theme} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
