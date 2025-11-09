import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useDialogTheme } from '@/hooks/use-global-dialog-theme';
import { getDialogStyles, getTextFieldStyles } from '@/components/global/dialog/styles';
import { useDialogPianoControl } from '@/hooks/use-dialog-piano-control';

interface GoToPageDialogProps {
  open: boolean;
  onClose: () => void;
  pageInput: string;
  onPageInputChange: (value: string) => void;
  totalPages: number;
  onGoToPage: () => void;
}

/**
 * Dialog for navigating to a specific page in the music sheet
 */
export const GoToPageDialog: React.FC<GoToPageDialogProps> = ({
  open,
  onClose,
  pageInput,
  onPageInputChange,
  totalPages,
  onGoToPage,
}) => {
  const theme = useDialogTheme();

  // Disable piano when dialog opens, re-enable when it closes
  useDialogPianoControl(open);

  const isValidInput = pageInput &&
    !isNaN(parseInt(pageInput)) &&
    parseInt(pageInput) >= 1 &&
    parseInt(pageInput) <= totalPages;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidInput) {
      onGoToPage();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: getDialogStyles(theme),
      }}
    >
      <DialogTitle sx={{ color: theme.textPrimary }}>
        Go to Page
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Page Number"
          type="number"
          fullWidth
          variant="outlined"
          value={pageInput}
          onChange={(e) => onPageInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          helperText={`Enter page number (1-${totalPages})`}
          inputProps={{
            min: 1,
            max: totalPages,
          }}
          sx={getTextFieldStyles(theme)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, borderTop: `1px solid ${theme.borderColor}` }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            px: 3,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
            '&:hover': {
              borderColor: theme.textSecondary,
              backgroundColor: theme.hoverBg,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onGoToPage}
          variant="contained"
          disabled={!isValidInput}
          sx={{
            px: 3,
            backgroundColor: theme.accentPrimary,
            color: '#ffffff',
            '&:hover': {
              backgroundColor: theme.accentPrimary,
              opacity: 0.9,
            },
            '&:disabled': {
              backgroundColor: theme.textSecondary,
              color: theme.isDarkBackground ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            },
          }}
        >
          Go to Page
        </Button>
      </DialogActions>
    </Dialog>
  );
};
