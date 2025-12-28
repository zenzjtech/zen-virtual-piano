import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { MUSIC_SHEET_THEMES } from '@/theme/definitions/music-sheet-themes';
import { ThemePreviewCard } from './theme-preview-card';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setMusicSheetTheme } from '@/store/reducers/theme-slice';
import { useTranslation } from '@/hooks/use-translation';

interface ThemeGalleryDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Dialog showing a gallery of music sheet themes
 */
export const ThemeGalleryDialog: React.FC<ThemeGalleryDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const currentThemeId = useAppSelector((state) => state.theme.musicSheetTheme);

  const { t } = useTranslation('piano');

  const handleThemeSelect = (themeId: string) => {
    dispatch(setMusicSheetTheme(themeId));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box>
          <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
            {t('chooseSheetMusicTheme')}
          </Box>
          <Box
            component="p"
            sx={{
              m: 0,
              mt: 0.5,
              fontSize: '0.875rem',
              color: 'text.secondary',
              fontWeight: 'normal',
            }}
          >
            {t('selectPaperStyle')}
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {MUSIC_SHEET_THEMES.map((theme) => (
            <ThemePreviewCard
              key={theme.id}
              theme={theme}
              isSelected={currentThemeId === theme.id}
              onSelect={() => handleThemeSelect(theme.id)}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
