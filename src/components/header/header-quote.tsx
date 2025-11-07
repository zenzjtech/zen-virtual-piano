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

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '500px',
        px: 3,
        textAlign: 'center',
        opacity: textOpacity,
        transition: 'opacity 0.3s ease',
        '&:hover': {
          opacity: 1,
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
