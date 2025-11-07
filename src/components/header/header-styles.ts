/**
 * Header component styles
 */

import type { SxProps, Theme } from '@mui/material';

/**
 * AppBar styles
 */
export const getAppBarStyles = (isDarkBackground: boolean): SxProps<Theme> => ({
  background: 'transparent',
  backdropFilter: isDarkBackground ? 'blur(20px)' : 'blur(16px)',
  WebkitBackdropFilter: isDarkBackground ? 'blur(20px)' : 'blur(16px)',
  backgroundColor: isDarkBackground 
    ? 'rgba(0, 0, 0, 0.15)' 
    : 'rgba(255, 255, 255, 0.75)',
  borderBottom: '1px solid',
  borderColor: isDarkBackground 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.06)',
  boxShadow: isDarkBackground
    ? '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
    : '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
});

/**
 * Toolbar styles
 */
export const toolbarStyles: SxProps<Theme> = {
  minHeight: { xs: 48, sm: 52, md: 56 },
  px: { xs: 2, sm: 3, md: 4 },
};

/**
 * Logo container styles
 */
export const logoContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: { xs: 1, sm: 1.5 },
  flex: 1,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8,
  },
  '&:active': {
    opacity: 0.6,
  },
};

/**
 * Logo image styles
 */
export const logoImageStyles: SxProps<Theme> = {
  height: { xs: 28, sm: 32, md: 36 },
  width: 'auto',
  objectFit: 'contain',
};

/**
 * Title text styles
 */
export const getTitleStyles = (textColor: string): SxProps<Theme> => ({
  color: textColor,
  fontWeight: 600,
  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
  letterSpacing: '0.01em',
});

/**
 * Icon button styles
 */
export const getIconButtonStyles = (
  iconColor: string,
  isDarkBackground: boolean
): SxProps<Theme> => ({
  color: iconColor,
  '&:hover': {
    backgroundColor: isDarkBackground 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)',
  },
});

/**
 * Icon size styles
 */
export const iconSizeStyles: SxProps<Theme> = {
  fontSize: { xs: 20, sm: 22, md: 24 },
};

/**
 * Avatar size styles
 */
export const avatarSizeStyles: SxProps<Theme> = {
  width: { xs: 24, sm: 26, md: 28 }, 
  height: { xs: 24, sm: 26, md: 28 },
};

/**
 * Action buttons container styles
 */
export const actionButtonsContainerStyles: SxProps<Theme> = {
  direction: 'row',
  spacing: { xs: 0, sm: 0.5 },
};
