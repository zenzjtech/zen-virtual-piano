/**
 * Main VirtualPiano Download UI Component
 * 
 * A refined glassmorphic download interface for scraping and saving
 * sheet music from VirtualPiano.net.
 */

import React from 'react';
import { Box, Fade } from '@mui/material';
import { GlassCard } from './styled';
import { Header, DownloadButton, StatusChip, SheetBanner, ToastNotification } from '../../components/global/components';
import { useDownloadState, useRippleEffect } from '../../components/global/hooks';
import { getTheme } from '@/components/piano/themes';
import { getBackgroundStyle } from '@/theme/definitions/background-themes';
import { useAppSelector } from '@/store/hook';

/**
 * Main download UI component
 */
export default function DownloadUI() {
  const { downloadState, showToast, setShowToast, initiateDownload, sheetInfo } = useDownloadState();
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
              pt: 2,
              pb: 1,
              px: 0,              
            }}
        >
          <Box
            sx={{
              height: '100%',              
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',                    
            }}
          >                        
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {sheetInfo && (
                <SheetBanner
                  title={sheetInfo.title}
                  artist={sheetInfo.artist}
                  backgroundThemeId={backgroundThemeId}
                />
              )}

              <DownloadButton
                status={downloadState.status}
                ripples={ripples}
                onClick={handleDownloadClick}
                pianoTheme={pianoTheme}
              />
            </Box>

            <Header />                      
          </Box>
        </GlassCard>
      </Fade>

      {/* Toast notification */}
      <ToastNotification
        showToast={showToast}
        setShowToast={setShowToast}
        downloadState={downloadState}
      />
    </Box>
  );
}
