import React from 'react';
import { Typography, Box } from '@mui/material';
import { PianoTheme } from './themes';

interface CategoryHeaderProps {
  category: string;
  categoryInfo?: {
    name: string;
    description: string;
  };
  pianoTheme: PianoTheme;
  index: number;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  categoryInfo,
  pianoTheme,
  index,
}) => {
  const displayName = categoryInfo?.name || category;
  const description = categoryInfo?.description;

  return (
    <Box
      sx={{
        mt: index > 0 ? 2 : 0,
        mb: 1,
        opacity: 0,
        animation: 'fadeInSlideDown 0.4s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        '@keyframes fadeInSlideDown': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          color: pianoTheme.colors.accent,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          fontSize: '0.7rem',
          mb: description ? 0.3 : 0,
          textShadow: `0 1px 2px rgba(0, 0, 0, 0.2)`,
        }}
      >
        {displayName}
      </Typography>
      {description && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            color: pianoTheme.colors.secondary,
            fontSize: '0.65rem',
            opacity: 0.75,
            fontStyle: 'italic',
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};
