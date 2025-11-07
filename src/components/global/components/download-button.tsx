/**
 * Download button component with ripple effect and state-based content
 */

import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Download, Check } from '@mui/icons-material';
import { RippleButton, RippleEffect } from '../../../entrypoints/vp-download-ui/styled';
import { DownloadStatus, Ripple } from '../../../entrypoints/vp-download-ui/types';

interface DownloadButtonProps {
  status: DownloadStatus;
  ripples: Ripple[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
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
          <Check />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Downloaded!
          </Typography>
        </>
      );
    default:
      return (
        <>
          <Download />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Download Sheet
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
}) => {
  return (
    <RippleButton
      onClick={onClick}
      disabled={disabled || status === 'downloading' || status === 'success'}
      fullWidth
      sx={(theme) => ({
        background:
          status === 'success'
            ? `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`
            : status === 'error'
            ? `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`
            : undefined,
        boxShadow:
          status === 'success'
            ? `0 4px 20px ${theme.palette.success.main}5A`
            : status === 'error'
            ? `0 4px 20px ${theme.palette.error.main}5A`
            : undefined,
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
