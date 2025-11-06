import React from 'react';
import { Box, Card, CardContent, Typography, alpha } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { MusicSheetTheme } from '../music-sheet-themes';
import { getMusicSheetThemeColors } from './music-sheet-theme-colors';
import bookImage1 from '@/assets/image/music-sheet/1.png';
import bookImage2 from '@/assets/image/music-sheet/2.png';
import bookImage3 from '@/assets/image/music-sheet/3.png';

interface ThemePreviewCardProps {
  theme: MusicSheetTheme;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * Preview card showing a music sheet theme
 */
export const ThemePreviewCard: React.FC<ThemePreviewCardProps> = ({
  theme,
  isSelected,
  onSelect,
}) => {
  const themeColors = getMusicSheetThemeColors(theme.id);
  
  // Get background image based on theme
  const getBackgroundImage = () => {
    switch (theme.id) {
      case 'paper-2':
        return bookImage2;
      case 'paper-3':
        return bookImage3;
      default:
        return bookImage1;
    }
  };

  return (
    <Card
      onClick={onSelect}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: isSelected ? `3px solid ${themeColors.accent}` : '2px solid transparent',
        boxShadow: isSelected
          ? `0 0 20px rgba(${themeColors.shadow}, 0.4)`
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 4px 16px rgba(${themeColors.shadow}, 0.3)`,
          borderColor: themeColors.accent,
        },
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: themeColors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CheckIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
        </Box>
      )}

      <CardContent sx={{ p: 0 }}>
        {/* Theme preview with background */}
        <Box
          sx={{
            height: 180,
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            p: 2,
          }}
        >
          {/* Sample content overlay */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: themeColors.titleFont,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: themeColors.primary,
                mb: 0.5,
              }}
            >
              Moonlight Sonata
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: themeColors.bodyFont,
                fontSize: '0.7rem',
                color: themeColors.primary,
                opacity: 0.7,
                display: 'block',
                mb: 1.5,
              }}
            >
              Beethoven
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: themeColors.notationFont,
                fontSize: '0.75rem',
                color: themeColors.primary,
                lineHeight: 1.6,
              }}
            >
              C# D E F# | G A B C# |
            </Typography>
          </Box>
        </Box>

        {/* Theme info */}
        <Box
          sx={{
            p: 2,
            backgroundColor: alpha(themeColors.background, 0.95),
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: themeColors.primary,
              mb: 0.5,
            }}
          >
            {theme.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: themeColors.primary,
              opacity: 0.7,
            }}
          >
            {theme.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
