import React from 'react';
import { Box, Link } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { PianoTheme } from '../piano/themes';

interface SheetSearchFooterProps {
  searchQuery: string;
  pianoTheme: PianoTheme;
}

/**
 * Footer component with external search link
 */
export const SheetSearchFooter: React.FC<SheetSearchFooterProps> = ({ 
  searchQuery, 
  pianoTheme 
}) => {
  const handleSearchOnVirtualPiano = () => {
    const query = encodeURIComponent(searchQuery || 'popular songs');
    window.open(`https://virtualpiano.net/?s=${query}`, '_blank');
  };

  return (
    <Box
      sx={{
        borderTop: `1px solid ${pianoTheme.colors.border}`,
        px: 2,
        py: 1.5,
        background: pianoTheme.isLight
          ? 'rgba(0, 0, 0, 0.02)'
          : 'rgba(255, 255, 255, 0.02)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Link
        component="button"
        onClick={handleSearchOnVirtualPiano}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          textDecoration: 'none',
          color: pianoTheme.colors.accent,
          fontSize: '0.875rem',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            textDecoration: 'underline',
            filter: 'brightness(1.2)',
          },
        }}
      >
        <OpenInNewIcon fontSize="small" />
        Search more on VirtualPiano.net
      </Link>
    </Box>
  );
};
