import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Fade,
  Alert,
  Snackbar,
} from '@mui/material';
import { Download, Check, MusicNote } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const RippleButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px',
  },
}));

const RippleEffect = styled('span')({
  position: 'absolute',
  borderRadius: '50%',
  transform: 'scale(0)',
  animation: 'ripple 600ms ease-out',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  '@keyframes ripple': {
    to: {
      transform: 'scale(4)',
      opacity: 0,
    },
  },
});

interface DownloadState {
  status: 'idle' | 'downloading' | 'success' | 'error';
  message?: string;
}

export default function DownloadUI() {
  const [downloadState, setDownloadState] = useState<DownloadState>({ status: 'idle' });
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [showToast, setShowToast] = useState(false);

  // Listen for messages from content script
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'DOWNLOAD_SUCCESS') {
        setDownloadState({
          status: 'success',
          message: `"${event.data.sheet.title}" added to library & copied to clipboard!`,
        });
        setShowToast(true);

        // Reset to idle after 3 seconds
        setTimeout(() => {
          setDownloadState({ status: 'idle' });
        }, 3000);
      } else if (event.data.type === 'DOWNLOAD_ERROR') {
        setDownloadState({
          status: 'error',
          message: event.data.error || 'Failed to download sheet',
        });
        setShowToast(true);

        // Reset to idle after 3 seconds
        setTimeout(() => {
          setDownloadState({ status: 'idle' });
        }, 3000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (downloadState.status === 'downloading') return;

    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    // Send message to content script
    setDownloadState({ status: 'downloading' });
    window.parent.postMessage({ type: 'SCRAPE_AND_DOWNLOAD' }, '*');
  };

  const getButtonContent = () => {
    switch (downloadState.status) {
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 2,
        backgroundColor: 'transparent',
      }}
    >
      <Fade in={true} timeout={500}>
        <RippleButton
          onClick={handleDownloadClick}
          disabled={downloadState.status === 'downloading' || downloadState.status === 'success'}
          fullWidth
          sx={{
            bgcolor:
              downloadState.status === 'success'
                ? '#10b981'
                : downloadState.status === 'error'
                ? '#ef4444'
                : undefined,
          }}
        >
          {ripples.map(ripple => (
            <RippleEffect
              key={ripple.id}
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
            />
          ))}
          {getButtonContent()}
        </RippleButton>
      </Fade>

      {/* Toast notification */}
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity={downloadState.status === 'success' ? 'success' : 'error'}
          sx={{ width: '100%' }}
          icon={downloadState.status === 'success' ? <MusicNote /> : undefined}
        >
          {downloadState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
