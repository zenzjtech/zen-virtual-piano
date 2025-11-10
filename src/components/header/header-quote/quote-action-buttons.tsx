/**
 * Quote action buttons component
 * Handles favorite and settings buttons for quotes
 */

import { Box, IconButton, Theme, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder, Settings as SettingsIcon } from '@mui/icons-material';
import { useAppDispatch } from '@/store/hook';
import { toggleFavoriteQuote } from '@/store/reducers/quote-settings-slice';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();

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

  const buttonStyles = (theme: Theme) => ({
    color: textColor,
    bgcolor: containerBg,
    backdropFilter: containerBlur,
    WebkitBackdropFilter: containerBlur,
    boxShadow: containerShadow,
    transition: 'all 0.2s ease',
    width: theme.spacing(4),
    height: theme.spacing(4),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',        
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
            sx={{
              ...buttonStyles(theme),
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
              <Favorite sx={{ fontSize: '0.88rem' }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: '0.88rem' }} />
            )}
          </IconButton>
        </span>
      </Tooltip>

      {/* Settings Button */}
      <Tooltip title="Quote settings">
        <IconButton
          onClick={handleOpenSettings}
          sx={{
            ...buttonStyles(theme),
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
          <SettingsIcon sx={{ fontSize: '0.88rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
