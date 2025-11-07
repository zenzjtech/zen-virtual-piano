/**
 * Header quote component - displays random inspirational quotes
 */

import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { quotes } from '@/lib/quote';
import { getTextColor } from './header-utils';
import { getHeaderTypographyStyle, getCategoryDefaultStyle } from './header-typography';
import type { HeaderTypographyStyle } from './header-typography';
import type { QuoteStyle } from '../piano/quote-styles';

interface HeaderQuoteProps {
  isDarkBackground: boolean;
  headerStyle?: HeaderTypographyStyle;
  category?: string;
  quoteStyle?: QuoteStyle;
}

export const HeaderQuote = ({ 
  isDarkBackground, 
  headerStyle,
  category,
  quoteStyle,
}: HeaderQuoteProps) => {
  const [currentQuote, setCurrentQuote] = useState(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  });

  // Randomly change quote periodically (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
        maxWidth: '500px',
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
  );
};
