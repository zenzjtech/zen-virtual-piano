/**
 * Status chip component for displaying download state feedback
 */

import React from 'react';
import { Chip, Typography, Fade } from '@mui/material';
import { Check, ErrorOutline, Warning } from '@mui/icons-material';
import { DownloadStatus } from '../../../entrypoints/vp-download-ui/types';
import { getStatusMessage } from '../../../entrypoints/vp-download-ui/utils';

interface StatusChipProps {
  status: DownloadStatus;
  show: boolean;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, show }) => {
  if (!show || status === 'idle' || status === 'downloading') {
    return null;
  }

  const isSuccess = status === 'success';
  const isWarning = status === 'warning';
  const isError = status === 'error';

  return (
    <Fade in={true} timeout={300}>
      <Chip
        icon={
          isSuccess ? (
            <Check sx={{ fontSize: 16 }} />
          ) : isWarning ? (
            <Warning sx={{ fontSize: 16 }} />
          ) : (
            <ErrorOutline sx={{ fontSize: 16 }} />
          )
        }
        label={
          <Typography variant="caption" sx={{ fontSize: '12px' }}>
            {getStatusMessage(status)}
          </Typography>
        }
        size="small"
        sx={(theme) => ({
          height: 24,
          backgroundColor: isSuccess
            ? theme.palette.success.light
            : isWarning
            ? theme.palette.warning.light
            : theme.palette.error.light,
          color: isSuccess
            ? theme.palette.success.dark
            : isWarning
            ? theme.palette.warning.dark
            : theme.palette.error.dark,
          border: `1px solid ${
            isSuccess
              ? theme.palette.success.main
              : isWarning
              ? theme.palette.warning.main
              : theme.palette.error.main
          }`,
          opacity: 0.9,
          fontWeight: 500,
          '& .MuiChip-icon': {
            color: 'inherit',
          },
        })}
      />
    </Fade>
  );
};
