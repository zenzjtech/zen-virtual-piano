/**
 * Hook to manage piano control during dialog interactions
 * Automatically disables piano when dialog opens and re-enables when it closes
 */

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';
import { disablePianoForDialog, enablePianoAfterDialog } from '@/store/reducers/piano-settings-slice';

/**
 * Hook that disables piano when dialog opens and re-enables when it closes
 * @param open - Whether the dialog is open
 */
export const useDialogPianoControl = (open: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      dispatch(disablePianoForDialog());
    } else {
      dispatch(enablePianoAfterDialog());
    }
  }, [open, dispatch]);
};
