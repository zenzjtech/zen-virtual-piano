/**
 * Header logo component
 */

import { Box, Typography } from '@mui/material';
import { getPianoIcon, getTextColor } from './header-utils';
import { logoContainerStyles, logoImageStyles, getTitleStyles } from './header-styles';

interface HeaderLogoProps {
  backgroundThemeId: string;
  isDarkBackground: boolean;
  onLogoClick: () => void;
}

export const HeaderLogo = ({ backgroundThemeId, isDarkBackground, onLogoClick }: HeaderLogoProps) => {
  const pianoIcon = getPianoIcon(backgroundThemeId, isDarkBackground);
  const textColor = getTextColor(isDarkBackground);

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
        sx={getTitleStyles(textColor)}
      >
        Zen Virtual Piano
      </Typography>
    </Box>
  );
};
