import React from 'react';
import { Button, styled } from '@mui/material';
import { LibraryMusic as SheetMusicIcon } from '@mui/icons-material';
import { PianoTheme } from './themes';

const StyledSheetButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  color: pianoTheme.colors.secondary,
  borderColor: pianoTheme.colors.border,
  minWidth: '100px',
  padding: theme.spacing(0.75, 1.5),
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  position: 'relative',  
  background: pianoTheme.isLight 
    ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)',
  boxShadow: `
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2)
  `,
  textShadow: `
    0 1px 1px rgba(0, 0, 0, 0.3),
    0 -1px 0 rgba(255, 255, 255, 0.05)
  `,
  '&:hover': {
    borderColor: pianoTheme.colors.accent,
    background: pianoTheme.isLight 
      ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.08) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.15) 100%)',
    color: pianoTheme.colors.accent,
    boxShadow: `
      0 0 12px rgba(212, 175, 55, 0.3),
      0 2px 6px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(0, 0, 0, 0.25)
    `,
    transform: 'translateY(-1px)',
    textShadow: `
      0 0 8px rgba(212, 175, 55, 0.4),
      0 1px 2px rgba(0, 0, 0, 0.4)
    `,
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: `
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05)
    `,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(0.5),
    filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))',
  },
}));

interface SheetButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  pianoTheme: PianoTheme;
}

export const SheetButton: React.FC<SheetButtonProps> = ({ onClick, pianoTheme }) => {
  return (
    <StyledSheetButton
      id="sheet-search-button"
      variant="outlined"
      startIcon={<SheetMusicIcon sx={{ fontSize: '1rem' }} />}
      onClick={onClick}
      pianoTheme={pianoTheme}
    >
      Sheets
    </StyledSheetButton>
  );
};
