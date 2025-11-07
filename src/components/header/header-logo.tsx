/**
 * Header logo component
 */

import { Box, Typography } from '@mui/material';
import { getPianoIcon, getTextColor } from './header-utils';
import { logoContainerStyles, logoImageStyles } from './header-styles';
import { getHeaderTypographyStyle, getCategoryDefaultStyle } from './header-typography';
import type { HeaderTypographyStyle } from './header-typography';

interface HeaderLogoProps {
  backgroundThemeId: string;
  isDarkBackground: boolean;
  headerStyle?: HeaderTypographyStyle;
  category?: string;
  onLogoClick: () => void;
}

export const HeaderLogo = ({ 
  backgroundThemeId, 
  isDarkBackground, 
  headerStyle,
  category,
  onLogoClick 
}: HeaderLogoProps) => {
  const pianoIcon = getPianoIcon(backgroundThemeId, isDarkBackground);
  const textColor = getTextColor(isDarkBackground);
  
  // Use provided headerStyle, or fall back to category default, or use modern-sans
  const finalStyle = headerStyle || (category ? getCategoryDefaultStyle(category) : 'modern-sans');
  const titleStyles = getHeaderTypographyStyle(finalStyle, textColor);

  return (
    <Box onClick={onLogoClick} sx={logoContainerStyles}>
      <Box
        component="img"
        src={pianoIcon}
        alt="Piano Icon"
        sx={logoImageStyles}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          ...titleStyles,
          transition: 'all 0.3s ease',
        }}
      >
        Zen Virtual Piano
      </Typography>
    </Box>
  );
};
