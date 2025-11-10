/**
 * Toast notification component for download status
 */

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { MusicNote } from '@mui/icons-material';
import { TIMING } from '../../../entrypoints/vp-download-ui/utils';
import { DownloadState } from '../../../entrypoints/vp-download-ui/types';

interface ToastNotificationProps {
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  downloadState: DownloadState;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  showToast,
  setShowToast,
  downloadState,
}) => {
  return (
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
  );
};
