/**
 * Download button component with ripple effect and state-based content
 */

import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Download, Check, Piano } from '@mui/icons-material';
import { RippleButton, RippleEffect } from '../../../entrypoints/vp-download-ui/styled';
import { DownloadStatus, Ripple } from '../../../entrypoints/vp-download-ui/types';
import type { PianoTheme } from '@/components/piano/themes';

interface DownloadButtonProps {
  status: DownloadStatus;
  ripples: Ripple[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  pianoTheme?: PianoTheme;
}

const getButtonContent = (status: DownloadStatus) => {
  switch (status) {
    case 'downloading':
      return (
        <>
          <CircularProgress size={20} color="inherit" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Downloading...
          </Typography>
        </>
      );
    case 'success':
      return (
        <>
          <Piano />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Go to Piano
          </Typography>
        </>
      );
    default:
      return (
        <>
          <Download />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Add Sheet
          </Typography>
        </>
      );
  }
};

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  status,
  ripples,
  onClick,
  disabled,
  pianoTheme,
}) => {
  // Handle navigation to piano page
  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const pianoUrl = chrome.runtime.getURL('piano.html');
    const timestamp = Date.now();
    const urlWithTimestamp = `${pianoUrl}?highlight=${timestamp}`;
    
    // Try to find existing tab with piano page
    chrome.tabs.query({ url: pianoUrl }, (tabs) => {
      if (tabs.length > 0) {
        // Focus existing tab and update URL with timestamp
        chrome.tabs.update(tabs[0].id!, { 
          active: true,
          url: urlWithTimestamp
        });
        chrome.windows.update(tabs[0].windowId!, { focused: true });
      } else {
        // Create new tab with timestamp
        chrome.tabs.create({ url: urlWithTimestamp });
      }
    });
  };

  // Create gradient based on piano theme colors
  const getButtonGradient = () => {
    if (!pianoTheme) return undefined;
    
    const baseColor = pianoTheme.colors.accent;
    const lighterColor = pianoTheme.isLight 
      ? `${baseColor}CC` // Add transparency for light themes
      : baseColor;
    
    return `linear-gradient(135deg, ${lighterColor} 0%, ${baseColor} 100%)`;
  };

  // Create box shadow from theme lighting properties
  const getMaterialShadow = () => {
    if (!pianoTheme) return undefined;
    const { shadowColor, shadowDepth, shadowSoftness } = pianoTheme.lighting;
    return `0 ${shadowDepth} ${shadowSoftness} ${shadowColor}`;
  };

  return (
    <RippleButton
      onClick={status === 'success' ? handleNavigation : onClick}
      disabled={disabled || status === 'downloading'}
      fullWidth
      sx={(theme) => ({
        maxWidth: '70%',
        px: 1,
        background: status === 'success'
          ? `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`
          : status === 'error'
          ? `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`
          : getButtonGradient(),
        boxShadow: status === 'success'
          ? `0 4px 20px ${theme.palette.success.main}5A`
          : status === 'error'
          ? `0 4px 20px ${theme.palette.error.main}5A`
          : getMaterialShadow(),
        color: pianoTheme?.colors.primary || theme.palette.secondary.contrastText,
        '&:hover': {
          boxShadow: status === 'success'
            ? `0 6px 28px ${theme.palette.success.main}80`
            : status === 'error'
            ? `0 6px 28px ${theme.palette.error.main}80`
            : pianoTheme?.lighting.interactiveGlow,
        },
      })}
    >
      {ripples.map((ripple) => (
        <RippleEffect
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      {getButtonContent(status)}
    </RippleButton>
  );
};
