import { useState, useCallback } from 'react';

/**
 * Hook for managing popup click-away behavior when select dropdowns are open.
 * Prevents popup closure when clicking on MUI select dropdowns or their menus.
 */
export const usePopupSelectHandler = (onClose: () => void) => {
  const [isAnySelectOpen, setIsAnySelectOpen] = useState(false);

  const handleSelectOpen = useCallback(() => {
    setIsAnySelectOpen(true);
  }, []);

  const handleSelectClose = useCallback(() => {
    setIsAnySelectOpen(false);
  }, []);

  const handleClickAway = useCallback((event: MouseEvent | TouchEvent) => {
    // Don't close if any select is open
    if (isAnySelectOpen) {
      return;
    }

    const target = event.target as HTMLElement;
    // Check if click is on a MUI menu (Select dropdown) or MUI backdrop
    if (
      target.closest('.MuiPopover-root') ||
      target.closest('.MuiModal-root') ||
      target.closest('.MuiMenu-root') ||
      target.closest('.MuiPaper-root') ||
      target.classList.contains('MuiBackdrop-root')
    ) {
      return;
    }
    onClose();
  }, [isAnySelectOpen, onClose]);

  return {
    handleClickAway,
    handleSelectOpen,
    handleSelectClose,
    isAnySelectOpen,
  };
};
