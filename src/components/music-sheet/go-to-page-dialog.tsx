import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { FormatListNumbered as FormatListNumberedIcon } from '@mui/icons-material';
import { useDialogTheme } from '@/hooks/use-global-dialog-theme';
import { DialogHeader } from '@/components/global/dialog/global-dialog-header';
import { getDialogStyles, getTextFieldStyles, getDialogButtonStyles } from '@/components/global/dialog/styles';
import { useDialogPianoControl } from '@/hooks/use-dialog-piano-control';
import { useTranslation } from '@/hooks/use-translation';

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
  const { t: tSheet } = useTranslation('sheet');
  const { t: tCommon } = useTranslation('common');

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
      slotProps={{
        paper: { sx: getDialogStyles(theme) },
      }}
    >
      {/* Header */}
      <DialogHeader
        title={tSheet('goToPageTitle')}
        subtitle={tSheet('goToPageSubtitle', { total: totalPages })}
        icon={<FormatListNumberedIcon />}
        onClose={onClose}
      />

      {/* Content */}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={tSheet('pageNumber')}
          type="number"
          fullWidth
          variant="outlined"
          value={pageInput}
          onChange={(e) => onPageInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          helperText={tSheet('enterPageNumber', { total: totalPages })}
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
          sx={getDialogButtonStyles(theme, 'cancel')}
        >
          {tCommon('cancel')}
        </Button>
        <Button
          onClick={onGoToPage}
          variant="contained"
          disabled={!isValidInput}
          sx={getDialogButtonStyles(theme, 'primary')}
        >
          {tSheet('goToPage')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
