/**
 * Header quote component - displays random inspirational quotes
 */

import { Box, Typography } from '@mui/material';
import { getTextColor } from '../header-utils';
import { getHeaderTypographyStyle, getCategoryDefaultStyle } from '../header-typography';
import { useQuoteSelector } from './use-quote-selector';
import { QuoteActionButtons } from './quote-action-buttons';
import type { HeaderQuoteProps } from './types';

export const HeaderQuote = ({
  isDarkBackground,
  headerStyle,
  category,
  quoteStyle,
  onOpenSettings,
}: HeaderQuoteProps) => {
  const { currentQuote, showQuote, favoriteQuoteIds } = useQuoteSelector();

  if (!showQuote || !currentQuote) {
    return null;
  }

  const isFavorited = currentQuote.id ? favoriteQuoteIds.includes(currentQuote.id) : false;
  const canFavorite = Boolean(currentQuote.id);

  const textColor = getTextColor(isDarkBackground);
  const finalStyle = headerStyle || (category ? getCategoryDefaultStyle(category) : 'modern-sans');
  const typographyStyles = getHeaderTypographyStyle(finalStyle, textColor);

  // Use quoteStyle if provided, otherwise use defaults
  const textFontSize = quoteStyle?.textFontSize || { md: '0.75rem', lg: '0.85rem' };
  const textFontWeight = quoteStyle?.textFontWeight || 400;
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
        gap: 1        
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
            maxHeight: '38px',
            overflowY: 'auto',
            overflowX: 'hidden',
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
      <QuoteActionButtons
        currentQuote={currentQuote}
        isFavorited={isFavorited}
        canFavorite={canFavorite}
        isDarkBackground={isDarkBackground}
        textColor={textColor}
        containerBg={containerBg}
        containerBlur={containerBlur}
        containerShadow={containerShadow}
        onOpenSettings={onOpenSettings}
      />
    </Box>
  );
};
