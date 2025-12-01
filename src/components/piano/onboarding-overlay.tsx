import React, { useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Paper, styled, alpha, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { PianoTheme } from './themes';
import { useTranslation } from '@/hooks/use-translation';

/**
 * Styled overlay that dims the background
 */
const Overlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: pianoTheme.isLight
    ? alpha('#000000', 0.6)
    : alpha('#000000', 0.75),
  backdropFilter: 'blur(3px)',
  zIndex: theme.zIndex.modal, // 1300
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'fadeIn 0.3s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

/**
 * Spotlight effect that highlights specific elements
 */
const Spotlight = styled(Box)<{ top: number; left: number; width: number; height: number }>(({ theme, top, left, width, height }) => ({
  position: 'absolute',
  top: `${top}px`,
  left: `${left}px`,
  width: `${width}px`,
  height: `${height}px`,
  border: '3px solid',
  borderColor: '#4CAF50',
  borderRadius: '8px',
  boxShadow: `
    0 0 0 4px rgba(76, 175, 80, 0.3),
    0 0 20px rgba(76, 175, 80, 0.6),
    inset 0 0 20px rgba(76, 175, 80, 0.1)
  `,
  background: 'transparent',
  pointerEvents: 'none',
  zIndex: theme.zIndex.modal + 2, // Above the sheet button (1302)
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': {
      boxShadow: `
        0 0 0 4px rgba(76, 175, 80, 0.3),
        0 0 20px rgba(76, 175, 80, 0.6),
        inset 0 0 20px rgba(76, 175, 80, 0.1)
      `,
    },
    '50%': {
      boxShadow: `
        0 0 0 4px rgba(76, 175, 80, 0.5),
        0 0 30px rgba(76, 175, 80, 0.8),
        inset 0 0 30px rgba(76, 175, 80, 0.2)
      `,
    },
  },
}));

/**
 * Tooltip/guide message box
 */
const GuideMessage = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  position: 'absolute',
  maxWidth: '400px',
  padding: theme.spacing(3),
  background: pianoTheme.isLight
    ? alpha('#ffffff', 0.98)
    : alpha('#1a1a1a', 0.98),
  border: `2px solid ${pianoTheme.colors.border}`,
  borderRadius: theme.spacing(1.5),
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 ${alpha('#ffffff', pianoTheme.isLight ? 0.6 : 0.1)}
  `,
  color: pianoTheme.colors.primary,
  zIndex: theme.zIndex.modal + 3, // Above spotlight (1303)
  animation: 'slideIn 0.4s ease-out',
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const CloseButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: pianoTheme.colors.secondary,
  '&:hover': {
    color: pianoTheme.colors.accent,
    background: pianoTheme.isLight
      ? alpha('#000000', 0.05)
      : alpha('#ffffff', 0.05),
  },
}));

interface OnboardingOverlayProps {
  pianoTheme: PianoTheme;
  onClose: () => void;
}

export const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({
  pianoTheme,
  onClose,
}) => {
  const [sheetButtonRect, setSheetButtonRect] = React.useState<DOMRect | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { t } = useTranslation('piano');

  // Get the position and size of the sheet button
  useEffect(() => {
    const sheetButton = document.getElementById('sheet-search-button');
    
    // Store original z-index to restore later
    const originalZIndex = sheetButton?.style.zIndex || '';
    
    const updatePosition = () => {
      if (sheetButton) {
        const rect = sheetButton.getBoundingClientRect();
        setSheetButtonRect(rect);
        // Set high z-index during onboarding to make button clickable
        sheetButton.style.zIndex = String(theme.zIndex.modal + 3);
      }
    };

    // Initial position
    updatePosition();

    // Update on resize
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      // Reset z-index when onboarding closes
      if (sheetButton) {
        sheetButton.style.zIndex = originalZIndex;
      }
    };
  }, []);

  // Calculate guide message position
  const getGuidePosition = () => {
    if (!sheetButtonRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    
    // Position the guide message below the sheet button
    const top = sheetButtonRect.bottom + 30;
    const left = sheetButtonRect.left + sheetButtonRect.width / 2;
    
    return {
      top: `${top}px`,
      left: `${left}px`,
      transform: 'translateX(-50%)',
    };
  };

  return (
    <Overlay ref={overlayRef} pianoTheme={pianoTheme} onClick={onClose}>
      {/* Spotlight on Sheet Button */}
      {sheetButtonRect && (
        <Spotlight
          top={sheetButtonRect.top - 8}
          left={sheetButtonRect.left - 8}
          width={sheetButtonRect.width + 16}
          height={sheetButtonRect.height + 16}
        />
      )}

      {/* Guide Message */}
      <GuideMessage
        pianoTheme={pianoTheme}
        elevation={8}
        sx={getGuidePosition()}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          pianoTheme={pianoTheme}
          size="small"
          onClick={onClose}
          aria-label="Close guide"
        >
          <CloseIcon fontSize="small" />
        </CloseButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            color: pianoTheme.colors.primary,
            pr: 4, // Make room for close button
          }}
        >
          {t('welcomeToSheetMusicMode')}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: pianoTheme.colors.secondary,
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {t('sampleSongLoaded')}{' '}
          <Box
            component="span"
            sx={{
              fontWeight: 600,
              color: '#4CAF50',
              textShadow: '0 0 8px rgba(76, 175, 80, 0.3)',
            }}
          >
            {t('sheetsButton')}
          </Box>{' '}
          {t('sampleSongLoadedEnd')}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: pianoTheme.colors.secondary,
            lineHeight: 1.6,
          }}
        >
          {t('preferManualPlay')}
        </Typography>
      </GuideMessage>
    </Overlay>
  );
};
