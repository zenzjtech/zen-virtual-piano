import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook to manage popup state and focus management
 * Handles anchor element, open/close state, and focus restoration
 */
export function usePopupManager() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    buttonRef.current = event.currentTarget;
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    // Return focus to trigger button after a short delay
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 100);
  }, []);

  return {
    anchorEl,
    isOpen,
    handleOpen,
    handleClose,
    buttonRef,
  };
}
