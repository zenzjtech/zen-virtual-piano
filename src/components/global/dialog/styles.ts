/**
 * Shared dialog style utilities
 * Provides consistent styling functions for dialog components
 */

import type { DialogTheme } from '@/hooks/use-global-dialog-theme';
import type { SxProps, Theme } from '@mui/material';

/**
 * Responsive scaling for smaller screens
 * Scales down dialog content on laptops/smaller displays
 */
export const responsiveDialogScaleSx: SxProps<Theme> = {
  '@media (max-width: 1400px) and (max-height: 900px)': {
    transform: 'scale(0.7)',
    transformOrigin: 'top center',
  },
};

/**
 * Get standard dialog Paper props with theme-aware styling
 */
export const getDialogStyles = (theme: DialogTheme): SxProps<Theme> => ({
  background: theme.dialogBg,
  backdropFilter: theme.backdropBlur,
  border: `1px solid ${theme.borderColor}`,
  borderRadius: '16px',
  boxShadow: `
    ${theme.boxShadow},
    inset 0 1px 0 rgba(255, 255, 255, ${theme.isDarkBackground ? 0.1 : 0.3}),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2)
  `,
  maxHeight: '85vh',
  overflow: 'hidden',
  // Responsive scaling for smaller screens
  ...responsiveDialogScaleSx,
});

/**
 * Get standard TextField styles for dialogs
 */
export const getTextFieldStyles = (theme: DialogTheme): SxProps<Theme> => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.isDarkBackground
      ? 'rgba(0, 0, 0, 0.3)'
      : 'rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    fontSize: '0.875rem',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    color: theme.textPrimary,
    '& fieldset': {
      borderColor: theme.borderColor,
      transition: 'all 0.25s ease',
    },
    '&:hover fieldset': {
      borderColor: theme.textSecondary,
    },
    '&.Mui-focused': {
      backgroundColor: theme.isDarkBackground
        ? 'rgba(0, 0, 0, 0.4)'
        : 'rgba(255, 255, 255, 0.9)',
      '& fieldset': {
        borderColor: theme.accentPrimary,
        borderWidth: '2px',
        boxShadow: `0 0 0 3px ${theme.accentPrimary}20`,
      },
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.textPrimary,
    fontWeight: 400,
    '&::placeholder': {
      color: theme.textSecondary,
      opacity: 0.7,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.textSecondary,
    '&.Mui-focused': {
      color: theme.accentPrimary,
    },
  },
});

/**
 * Get standard button styles for dialog actions
 */
export const getDialogButtonStyles = (theme: DialogTheme, variant: 'cancel' | 'primary') => {
  if (variant === 'cancel') {
    return {
      px: 3,
      borderColor: theme.borderColor,
      color: theme.textPrimary,
      '&:hover': {
        borderColor: theme.textSecondary,
        backgroundColor: theme.hoverBg,
      },
    };
  }

  return {
    px: 3,
    backgroundColor: theme.accentPrimary,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.accentPrimary,
      opacity: 0.9,
    },
    '&:disabled': {
      backgroundColor: theme.textSecondary,
      color: theme.isDarkBackground ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
    },
  };
};

/**
 * Get scrollbar styles for dialog content
 */
export const getScrollbarStyles = (theme: DialogTheme): SxProps<Theme> => ({
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.isDarkBackground
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    '&:hover': {
      background: theme.isDarkBackground
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(0, 0, 0, 0.3)',
    },
  },
});
