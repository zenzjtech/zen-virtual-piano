import { styled, Paper, Box, Chip, ListItem, ListItemButton, TextField, InputAdornment } from '@mui/material';
import { PianoTheme } from './themes';

/**
 * Shared styled components for popup UI elements
 * Used across instrument selector and sound settings popups
 * 
 * @see theme-presets.ts for theme combination presets
 */

export const StyledPopupPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  minWidth: '320px',
  maxWidth: '420px',
  maxHeight: '500px',
  overflow: 'auto',
  background: pianoTheme.container.background,
  border: pianoTheme.container.border,
  borderRadius: '8px',
  // Enhanced realistic box shadow with depth
  boxShadow: `
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.3 : 0.1}),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2)
  `,
  position: 'relative',
  // Subtle texture overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.beforeBackground || 'transparent',
    pointerEvents: 'none',
    opacity: 0.3,
    zIndex: 1,
    borderRadius: '8px',
  },
  // Smooth scrollbar styling
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: pianoTheme.colors.border,
    borderRadius: '4px',
    '&:hover': {
      background: pianoTheme.colors.accent,
    },
  },
}));

export const PopupHeaderBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  padding: theme.spacing(2, 2.5),
  borderBottom: `1px solid ${pianoTheme.colors.border}`,
  background: pianoTheme.isLight
    ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.02) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  // Enhanced depth
  boxShadow: `
    inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.2 : 0.08}),
    0 2px 4px rgba(0, 0, 0, 0.1)
  `,
}));

export const PopupContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  padding: theme.spacing(2, 2.5),
  position: 'relative',
  zIndex: 2,
}));

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  borderBottom: `1px solid ${pianoTheme.colors.border}`,
  position: 'relative',
  zIndex: 2,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme' && prop !== 'isSelected',
})<{ pianoTheme: PianoTheme; isSelected?: boolean }>(({ theme, pianoTheme, isSelected = false }) => ({
  padding: theme.spacing(2),
  position: 'relative',
  zIndex: 2,
  transition: 'all 0.2s ease',
  background: isSelected
    ? pianoTheme.isLight
      ? 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.08) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)'
    : 'transparent',
  // Button depth and lighting
  boxShadow: isSelected
    ? `
      inset 0 2px 4px rgba(0, 0, 0, 0.2),
      inset 0 -1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.2 : 0.05})
    `
    : 'none',
  '&:hover': {
    background: pianoTheme.isLight
      ? 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
    boxShadow: `
      0 0 12px ${pianoTheme.colors.accent}33,
      inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.15 : 0.08})
    `,
  },
  '&:active': {
    boxShadow: `
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05)
    `,
  },
}));

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  fontSize: '0.65rem',
  height: '22px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderColor: pianoTheme.colors.border,
  color: pianoTheme.colors.secondary,
  // Subtle chip depth
  boxShadow: `
    0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.2 : 0.05})
  `,
  '&:hover': {
    borderColor: pianoTheme.colors.accent,
    color: pianoTheme.colors.accent,
  },
}));

export const CharacteristicChips = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  flexWrap: 'wrap',
}));

export const SearchBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  padding: theme.spacing(1.5, 2.5),
  borderBottom: `1px solid ${pianoTheme.colors.border}`,
  background: pianoTheme.isLight
    ? 'rgba(0, 0, 0, 0.02)'
    : 'rgba(255, 255, 255, 0.02)',
  position: 'sticky',
  top: 0,
  zIndex: 9,
  backdropFilter: 'blur(8px)',
}));

export const SearchInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: pianoTheme.isLight
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    color: pianoTheme.colors.primary,
    '& fieldset': {
      borderColor: pianoTheme.colors.border,
    },
    '&:hover fieldset': {
      borderColor: pianoTheme.colors.accent,
    },
    '&.Mui-focused fieldset': {
      borderColor: pianoTheme.colors.accent,
      boxShadow: `0 0 8px ${pianoTheme.colors.accent}44`,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1.5),
    color: pianoTheme.colors.primary,
    fontWeight: 400,
    '&::placeholder': {
      color: pianoTheme.colors.secondary,
      opacity: 0.7,
    },
  },
  '& .MuiInputAdornment-root': {
    color: pianoTheme.colors.secondary,
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: pianoTheme.colors.secondary,
  },
}));
