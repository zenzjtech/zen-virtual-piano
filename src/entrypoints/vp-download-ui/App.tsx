/**
 * Main VirtualPiano Download UI Component
 * 
 * A refined glassmorphic download interface for scraping and saving
 * sheet music from VirtualPiano.net.
 */

import React from 'react';
import { Box, Fade, Alert, Snackbar } from '@mui/material';
import { MusicNote } from '@mui/icons-material';
import { GlassCard } from './styled';
import { Header, DownloadButton, StatusChip } from '../../components/global/components';
import { useDownloadState, useRippleEffect } from '../../components/global/hooks';
import { TIMING } from './utils';
import { getTheme } from '@/components/piano/themes';
import { getBackgroundStyle } from '@/theme/definitions/background-themes';
import { useAppSelector } from '@/store/hook';

/**
 * Main download UI component
 */
export default function DownloadUI() {
  const { downloadState, showToast, setShowToast, initiateDownload } = useDownloadState();
  const { ripples, addRipple } = useRippleEffect();

  // Get theme state from redux
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const backgroundThemeId = useAppSelector((state) => state.theme.backgroundTheme);
  const pianoTheme = getTheme(pianoThemeId);

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (downloadState.status === 'downloading') return;
    addRipple(e);
    initiateDownload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        
      }}
    >
      <Fade in timeout={600}>
        <GlassCard 
            elevation={0}
            sx={{
              width: '100%',
              height: '100%',
              ...getBackgroundStyle(backgroundThemeId),              
            }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Header />
            
            <DownloadButton
              status={downloadState.status}
              ripples={ripples}
              onClick={handleDownloadClick}
              pianoTheme={pianoTheme}
            />

            <StatusChip
              status={downloadState.status}
              show={!!downloadState.message}
            />
          </Box>
        </GlassCard>
      </Fade>

      {/* Toast notification */}
      <Snackbar
        open={showToast}
        autoHideDuration={TIMING.TOAST_AUTO_HIDE_DURATION}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity={
            downloadState.status === 'success' ? 'success' 
            : downloadState.status === 'warning' ? 'warning' 
            : 'error'
          }
          sx={{ width: '100%' }}
          icon={downloadState.status === 'success' || downloadState.status === 'warning' ? <MusicNote /> : undefined}
        >
          {downloadState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
