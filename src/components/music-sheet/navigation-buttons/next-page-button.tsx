import React from 'react';
import { Box } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { ActionButton } from '../action-button';
import { getMusicSheetThemeColors } from '../music-sheet-theme-colors';
import { useTranslation } from '@/hooks/use-translation';

/**
 * Navigation button for next page
 */
export const NextPageButton: React.FC<{
  onNext: () => void;
  musicSheetThemeId: string;
}> = ({ onNext, musicSheetThemeId }) => {
  const { t } = useTranslation('piano');
  
  return (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      left: '50%',
      marginLeft: theme => theme.spacing(4),
    }}
  >
    <ActionButton
      onClick={onNext}
      icon={<ChevronRightIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Next page"
      tooltip={t('nextPageTooltip')}
    />
  </Box>
);
}
