import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

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
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: 'background.paper',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        Delete Sheet?
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {isCustomSheet ? (
            <>
              This will permanently remove <strong>{sheetTitle}</strong> by{' '}
              <strong>{sheetArtist}</strong> from your library.
            </>
          ) : (
            <>
              This will hide <strong>{sheetTitle}</strong> by{' '}
              <strong>{sheetArtist}</strong> from your library. The built-in sheet can be restored later.
            </>
          )}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
