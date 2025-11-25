import React from 'react';
import { Box } from '@mui/material';
import { FormatListNumbered as FormatListNumberedIcon } from '@mui/icons-material';
import { ActionButton } from '../action-button';
import { getMusicSheetThemeColors } from '../music-sheet-theme-colors';
import { useTranslation } from '@/hooks/use-translation';

/**
 * Navigation button for going to a specific page
 */
export const GoToPageButton: React.FC<{
  onGoToPage: () => void;
  musicSheetThemeId: string;
}> = ({ onGoToPage, musicSheetThemeId }) => {
  const { t } = useTranslation('piano');
  
  return (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      left: '50%',
      marginLeft: theme => theme.spacing(8),
    }}
  >
    <ActionButton
      onClick={onGoToPage}
      icon={<FormatListNumberedIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Go to page"
      tooltip={t('goToPageTooltip')}
    />
  </Box>
);
}
