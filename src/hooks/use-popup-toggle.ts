import { useCallback } from 'react';

/**
 * Hook for creating toggle handlers for popups
 */
export const usePopupToggle = (
  isOpen: boolean,
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onClose: () => void
) => {
  const handleToggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      onClose();
    } else {
      onOpen(event);
    }
  }, [isOpen, onOpen, onClose]);

  return {
    handleToggle,
    handleClose: onClose,
  };
};
