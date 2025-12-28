import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useTranslation } from '@/hooks/use-translation';
import { Trans } from 'react-i18next';

interface DeleteSheetDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sheetTitle: string;
  sheetArtist: string;
  isCustomSheet: boolean;
}

/**
 * Confirmation dialog for deleting a music sheet
 */
export const DeleteSheetDialog: React.FC<DeleteSheetDialogProps> = ({
  open,
  onClose,
  onConfirm,
  sheetTitle,
  sheetArtist,
  isCustomSheet,
}) => {
  const { t: tSheet } = useTranslation('sheet');
  const { t: tCommon } = useTranslation('common');

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
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
      <DialogTitle sx={{ fontWeight: 600 }}>
        {tSheet('confirmDeleteTitle')}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {isCustomSheet ? (
            <Trans
              i18nKey="sheet:deleteCustomSheetMessage"
              values={{ title: sheetTitle, artist: sheetArtist }}
              components={{ strong: <strong /> }}
            />
          ) : (
            <Trans
              i18nKey="sheet:deleteBuiltInSheetMessage"
              values={{ title: sheetTitle, artist: sheetArtist }}
              components={{ strong: <strong /> }}
            />
          )}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
        >
          {tCommon('cancel')}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
        >
          {tCommon('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
