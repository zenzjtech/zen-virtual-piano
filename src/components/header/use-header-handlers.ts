/**
 * Custom hook for header event handlers
 */

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setGoogleUser, logout, googleUserSelector, isAuthenticatedSelector } from '@/store/reducers/user-slice';
import { authenticateWithGoogle, signOutFromGoogle } from '@/utils/google-auth';
import { useNotification } from '@/contexts/notification-context';
import { useAppConfig } from '#imports';
import type { UseHeaderHandlersProps } from './types';

export const useHeaderHandlers = ({ onShowKeyboardShortcuts }: UseHeaderHandlersProps) => {
  const dispatch = useAppDispatch();
  const googleUser = useAppSelector(googleUserSelector);
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const { showNotification } = useNotification();
  const config = useAppConfig();
  
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const handleAccount = async (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthenticated) {
      // User is logged in, show menu
      setAnchorEl(event.currentTarget);
    } else {
      // User is not logged in, trigger OAuth
      setIsAuthenticating(true);
      try {
        const userInfo = await authenticateWithGoogle();
        dispatch(setGoogleUser(userInfo));
        showNotification(`Welcome, ${userInfo.name}! 🎹`, 'success');
      } catch (error) {
        console.error('Authentication error:', error);
        showNotification('Failed to sign in. Please try again.', 'error');
      } finally {
        setIsAuthenticating(false);
      }
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseMenu();
    try {
      await signOutFromGoogle();
      dispatch(logout());
      showNotification('Signed out successfully', 'info');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Failed to sign out. Please try again.', 'error');
    }
  };

  const handleHelp = () => {
    onShowKeyboardShortcuts();
  };

  const handleFullscreen = () => {
    console.log('Fullscreen clicked');
  };

  const handleLogoClick = () => {
    // Refresh page or navigate to home
    window.open(config.app.homeUrl, '_blank')
  };

  return {
    googleUser,
    isAuthenticated,
    isAuthenticating,
    anchorEl,
    menuOpen: Boolean(anchorEl),
    handleSettings,
    handleAccount,
    handleCloseMenu,
    handleLogout,
    handleHelp,
    handleFullscreen,
    handleLogoClick,
  };
};
