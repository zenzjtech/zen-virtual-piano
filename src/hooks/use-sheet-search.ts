import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openSearchDialog, closeSearchDialog } from '@/store/reducers/music-sheet-slice';
import { usePopupManager } from './use-popup-manager';

/**
 * Custom hook to manage sheet search dialog state and handlers
 */
export const useSheetSearch = () => {
  const dispatch = useAppDispatch();
  const sheetSearchPopup = usePopupManager();
  const isSheetSearchOpen = useAppSelector((state) => state.musicSheet.isSearchDialogOpen);

  const handleSheetSearchOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    sheetSearchPopup.handleOpen(event);
    dispatch(openSearchDialog());
  }, [sheetSearchPopup, dispatch]);

  const handleSheetSearchClose = useCallback(() => {
    sheetSearchPopup.handleClose();
    dispatch(closeSearchDialog());
  }, [sheetSearchPopup, dispatch]);

  return {
    isSheetSearchOpen,
    anchorEl: sheetSearchPopup.anchorEl,
    handleSheetSearchOpen,
    handleSheetSearchClose,
  };
};
