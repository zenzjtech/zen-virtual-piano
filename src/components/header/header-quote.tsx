/**
 * Header quote component - displays random inspirational quotes
 */

import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder, Settings as SettingsIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { quotes, type Quote } from '@/lib/quote';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import {
  toggleFavoriteQuote,
  setLastQuoteChangeDate,
  setCurrentQuoteId,
} from '@/store/reducers/quote-settings-slice';
import { getTextColor } from './header-utils';
import { getHeaderTypographyStyle, getCategoryDefaultStyle } from './header-typography';
import type { HeaderTypographyStyle } from './header-typography';
import type { QuoteStyle } from '../piano/quote-styles';

interface HeaderQuoteProps {
  isDarkBackground: boolean;
  headerStyle?: HeaderTypographyStyle;
  category?: string;
  quoteStyle?: QuoteStyle;
  onOpenSettings?: (tab?: string) => void;
}

export const HeaderQuote = ({ 
  isDarkBackground, 
  headerStyle,
  category,
  quoteStyle,
  onOpenSettings,
}: HeaderQuoteProps) => {
  const dispatch = useAppDispatch();
  const quoteSettings = useAppSelector((state) => state.quoteSettings);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  // Get available quotes based on settings
  const getAvailableQuotes = (): Quote[] => {
    if (quoteSettings.showOnlyFavorites && quoteSettings.favoriteQuoteIds.length > 0) {
      return quotes.filter((q) => q.id && quoteSettings.favoriteQuoteIds.includes(q.id));
    }
    return quotes;
  };

  // Select a new random quote
  const selectNewQuote = () => {
    const availableQuotes = getAvailableQuotes();
    if (availableQuotes.length === 0) return null;
    
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    return randomQuote;
  };

  // Check if quote should change based on interval
  const shouldChangeQuote = (): boolean => {
    const now = new Date();
    const lastChangeDate = new Date(quoteSettings.lastQuoteChangeDate);
    
    switch (quoteSettings.interval) {
      case 'daily': {
        const today = now.toISOString().split('T')[0];
        const lastChange = lastChangeDate.toISOString().split('T')[0];
        return today !== lastChange;
      }
      case 'hourly': {
        const hoursDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 36e5;
        return hoursDiff >= 1;
      }
      case '30min': {
        const minutesDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
        return minutesDiff >= 30;
      }
      case '10min': {
        const minutesDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
        return minutesDiff >= 10;
      }
      case '5min': {
        const minutesDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
        return minutesDiff >= 5;
      }
      default:
        return false;
    }
  };

  // Initialize and handle quote changes
  useEffect(() => {
    if (!quoteSettings.showQuote) return;

    // Initialize quote if not set
    if (!currentQuote) {
      const newQuote = selectNewQuote();
      setCurrentQuote(newQuote);
      if (newQuote?.id) {
        dispatch(setCurrentQuoteId(newQuote.id));
      }
      return;
    }

    // Check if quote should change based on interval
    const checkInterval = setInterval(() => {
      if (shouldChangeQuote()) {
        const newQuote = selectNewQuote();
        if (newQuote) {
          setCurrentQuote(newQuote);
          dispatch(setLastQuoteChangeDate(new Date().toISOString()));
          if (newQuote.id) {
            dispatch(setCurrentQuoteId(newQuote.id));
          }
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(checkInterval);
  }, [quoteSettings.showQuote, quoteSettings.interval, quoteSettings.showOnlyFavorites, quoteSettings.favoriteQuoteIds, currentQuote]);

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

  if (!quoteSettings.showQuote || !currentQuote) {
    return null;
  }

  const isFavorited = currentQuote.id ? quoteSettings.favoriteQuoteIds.includes(currentQuote.id) : false;
  const canFavorite = Boolean(currentQuote.id);

  const textColor = getTextColor(isDarkBackground);
  const finalStyle = headerStyle || (category ? getCategoryDefaultStyle(category) : 'modern-sans');
  const typographyStyles = getHeaderTypographyStyle(finalStyle, textColor);

  // Use quoteStyle if provided, otherwise use defaults
  const textFontSize = quoteStyle?.textFontSize || { md: '0.75rem', lg: '0.85rem' };
  const textFontWeight = quoteStyle?.textFontWeight || 400;
  const textOpacity = quoteStyle?.textOpacity || 0.85;
  const textLetterSpacing = quoteStyle?.textLetterSpacing || '0em';
  const authorFontSize = quoteStyle?.authorFontSize || { md: '0.65rem', lg: '0.7rem' };
  const authorFontWeight = quoteStyle?.authorFontWeight || 400;
  const authorOpacity = quoteStyle?.authorOpacity || 0.7;
  const fontStyle = quoteStyle?.fontStyle || 'normal';
  const textTransform = quoteStyle?.textTransform;
  
  // Visual enhancement properties
  const containerBg = isDarkBackground 
    ? quoteStyle?.containerBackground?.dark || 'rgba(255, 255, 255, 0.04)' 
    : quoteStyle?.containerBackground?.light || 'rgba(0, 0, 0, 0.03)';
  const containerShadow = isDarkBackground 
    ? quoteStyle?.containerShadow?.dark || '0 2px 8px rgba(0, 0, 0, 0.15)' 
    : quoteStyle?.containerShadow?.light || '0 2px 8px rgba(0, 0, 0, 0.06)';
  const containerBlur = quoteStyle?.containerBlur || 'blur(8px)';
  const containerPadding = quoteStyle?.containerPadding || { md: 1.5, lg: 2 };
  const containerBorderRadius = quoteStyle?.containerBorderRadius || '12px';

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        maxWidth: '800px',
      }}
    >
      {/* Quote Container */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: containerPadding,
          py: { md: containerPadding.md - 0.5, lg: containerPadding.lg - 0.5 },
          textAlign: 'center',
          backgroundColor: containerBg,
          borderRadius: containerBorderRadius,
          boxShadow: containerShadow,
          backdropFilter: containerBlur,
          WebkitBackdropFilter: containerBlur,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: isDarkBackground 
              ? '0 4px 12px rgba(0, 0, 0, 0.25)' 
              : '0 4px 12px rgba(0, 0, 0, 0.10)',
          },
        }}
      >
        <Typography
          sx={{
            ...typographyStyles,
            fontSize: textFontSize,
            fontWeight: textFontWeight,
            letterSpacing: textLetterSpacing,
            lineHeight: 1.4,
            fontStyle: fontStyle,
            textTransform: textTransform,
          }}
        >
          "{currentQuote.text}"
          <Typography
            component="span"
            sx={{
              ...typographyStyles,
              fontSize: authorFontSize,
              fontWeight: authorFontWeight,
              opacity: authorOpacity,
              ml: 1,
            }}
          >
            — {currentQuote.author}
          </Typography>
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 0.5,
        }}
      >
        {/* Favorite Button */}
        <Tooltip title={canFavorite ? (isFavorited ? 'Remove from favorites' : 'Add to favorites') : 'Quote ID required for favorites'}>
          <span>
            <IconButton
              onClick={handleToggleFavorite}
              disabled={!canFavorite}
              size="small"
              sx={{
                color: textColor,
                opacity: canFavorite ? (isFavorited ? 1 : 0.6) : 0.3,
                bgcolor: containerBg,
                backdropFilter: containerBlur,
                WebkitBackdropFilter: containerBlur,
                boxShadow: containerShadow,
                transition: 'all 0.2s ease',
                '&:hover': canFavorite ? {
                  opacity: 1,
                  transform: 'scale(1.1)',
                  bgcolor: isDarkBackground ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                } : {},
                '&:disabled': {
                  cursor: 'not-allowed',
                },
              }}
            >
              {isFavorited ? <Favorite sx={{ fontSize: '1.1rem' }} /> : <FavoriteBorder sx={{ fontSize: '1.1rem' }} />}
            </IconButton>
          </span>
        </Tooltip>

        {/* Settings Button */}
        <Tooltip title="Quote settings">
          <IconButton
            onClick={handleOpenSettings}
            size="small"
            sx={{
              color: textColor,
              opacity: 0.6,
              bgcolor: containerBg,
              backdropFilter: containerBlur,
              WebkitBackdropFilter: containerBlur,
              boxShadow: containerShadow,
              transition: 'all 0.2s ease',
              '&:hover': {
                opacity: 1,
                transform: 'scale(1.1)',
                bgcolor: isDarkBackground ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
