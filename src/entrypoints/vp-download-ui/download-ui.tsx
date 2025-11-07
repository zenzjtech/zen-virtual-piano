import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Fade,
  Alert,
  Snackbar,
  Paper,
  Chip,
} from '@mui/material';
import { Download, Check, MusicNote, ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 16,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
  padding: theme.spacing(2.5),
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
    transform: 'translateY(-2px)',
  },
}));

const RippleButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.secondary.contrastText,
  padding: theme.spacing(1.75, 3.5),
  borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius * 1.5 : 12,
  fontWeight: theme.typography.fontWeightBold as number,
  fontSize: '15px',
  textTransform: 'none',
  letterSpacing: '0.02em',
  boxShadow: `0 4px 20px ${theme.palette.secondary.main}5A`,
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  minHeight: 48,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    boxShadow: `0 6px 28px ${theme.palette.secondary.main}80`,
    transform: 'translateY(-2px) scale(1.02)',
  },
  '&:active': {
    transform: 'translateY(0) scale(0.98)',
  },
  '&.Mui-disabled': {
    color: theme.palette.secondary.contrastText,
    opacity: 0.85,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1.25),
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
        backgroundColor: 'transparent',
      }}
    >
      <Fade in={true} timeout={600}>
        <GlassCard elevation={0}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 0.5,
              }}
            >
              <MusicNote
                sx={{
                  color: 'secondary.main',
                  fontSize: 20,
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  letterSpacing: '0.01em',
                }}
              >
                Zen Virtual Piano
              </Typography>
            </Box>

            {/* Download Button */}
            <RippleButton
              onClick={handleDownloadClick}
              disabled={downloadState.status === 'downloading' || downloadState.status === 'success'}
              fullWidth
              sx={(theme) => ({
                background:
                  downloadState.status === 'success'
                    ? `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`
                    : downloadState.status === 'error'
                    ? `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`
                    : undefined,
                boxShadow:
                  downloadState.status === 'success'
                    ? `0 4px 20px ${theme.palette.success.main}5A`
                    : downloadState.status === 'error'
                    ? `0 4px 20px ${theme.palette.error.main}5A`
                    : undefined,
              })}
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

            {/* Status Chip */}
            {downloadState.message && (
              <Fade in={true} timeout={300}>
                <Chip
                  icon={
                    downloadState.status === 'success' ? (
                      <Check sx={{ fontSize: 16 }} />
                    ) : (
                      <ErrorOutline sx={{ fontSize: 16 }} />
                    )
                  }
                  label={
                    <Typography variant="caption" sx={{ fontSize: '12px' }}>
                      {downloadState.status === 'success' ? 'Saved to library' : 'Try again'}
                    </Typography>
                  }
                  size="small"
                  sx={(theme) => ({
                    height: 24,
                    backgroundColor:
                      downloadState.status === 'success'
                        ? theme.palette.success.light
                        : theme.palette.error.light,
                    color:
                      downloadState.status === 'success'
                        ? theme.palette.success.dark
                        : theme.palette.error.dark,
                    border: `1px solid ${
                      downloadState.status === 'success'
                        ? theme.palette.success.main
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
            )}
          </Box>
        </GlassCard>
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
