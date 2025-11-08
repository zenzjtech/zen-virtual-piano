/**
 * Quote action buttons component
 * Handles favorite and settings buttons for quotes
 */

import { Box, IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder, Settings as SettingsIcon } from '@mui/icons-material';
import { useAppDispatch } from '@/store/hook';
import { toggleFavoriteQuote } from '@/store/reducers/quote-settings-slice';
import type { Quote } from '@/lib/quote';

interface QuoteActionButtonsProps {
  currentQuote: Quote;
  isFavorited: boolean;
  canFavorite: boolean;
  isDarkBackground: boolean;
  textColor: string;
  containerBg: string;
  containerBlur: string;
  containerShadow: string;
  onOpenSettings?: (tab?: string) => void;
}

export const QuoteActionButtons = ({
  currentQuote,
  isFavorited,
  canFavorite,
  isDarkBackground,
  textColor,
  containerBg,
  containerBlur,
  containerShadow,
  onOpenSettings,
}: QuoteActionButtonsProps) => {
  const dispatch = useAppDispatch();

  // Handle favorite toggle
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentQuote?.id) {
      dispatch(toggleFavoriteQuote(currentQuote.id));
    }
  };

  // Handle open settings
  const handleOpenSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenSettings?.('quotes');
  };

  const buttonStyles = {
    color: textColor,
    bgcolor: containerBg,
    backdropFilter: containerBlur,
    WebkitBackdropFilter: containerBlur,
    boxShadow: containerShadow,
    transition: 'all 0.2s ease',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 0.5,
      }}
    >
      {/* Favorite Button */}
      <Tooltip
        title={
          canFavorite
            ? isFavorited
              ? 'Remove from favorites'
              : 'Add to favorites'
            : 'Quote ID required for favorites'
        }
      >
        <span>
          <IconButton
            onClick={handleToggleFavorite}
            disabled={!canFavorite}
            size="small"
            sx={{
              ...buttonStyles,
              opacity: canFavorite ? (isFavorited ? 1 : 0.6) : 0.3,
              '&:hover': canFavorite
                ? {
                    opacity: 1,
                    transform: 'scale(1.1)',
                    bgcolor: isDarkBackground
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.08)',
                  }
                : {},
              '&:disabled': {
                cursor: 'not-allowed',
              },
            }}
          >
            {isFavorited ? (
              <Favorite sx={{ fontSize: '1.1rem' }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: '1.1rem' }} />
            )}
          </IconButton>
        </span>
      </Tooltip>

      {/* Settings Button */}
      <Tooltip title="Quote settings">
        <IconButton
          onClick={handleOpenSettings}
          size="small"
          sx={{
            ...buttonStyles,
            opacity: 0.6,
            '&:hover': {
              opacity: 1,
              transform: 'scale(1.1)',
              bgcolor: isDarkBackground
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)',
            },
          }}
        >
          <SettingsIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
