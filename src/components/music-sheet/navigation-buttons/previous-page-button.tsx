import React from 'react';
import { Box } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { ActionButton } from '../action-button';
import { getMusicSheetThemeColors } from '../music-sheet-theme-colors';
import { useTranslation } from '@/hooks/use-translation';

/**
 * Navigation button for previous page
 */
export const PreviousPageButton: React.FC<{
  onPrevious: () => void;
  musicSheetThemeId: string;
}> = ({ onPrevious, musicSheetThemeId }) => {
  const { t } = useTranslation('piano');
  
  return (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      left: '50%',
      transform: 'translateX(-50%)',
      marginLeft: theme => theme.spacing(-5),
    }}
  >
    <ActionButton
      onClick={onPrevious}
      icon={<ChevronLeftIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Previous page"
      tooltip={t('previousPageTooltip')}
    />
  </Box>
);
}
