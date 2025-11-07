/**
 * Main Header component
 */

import { AppBar, Toolbar } from '@mui/material';
import { HeaderLogo } from './header-logo';
import { HeaderActions } from './header-actions';
import { UserMenu } from './user-menu';
import { useHeaderHandlers } from './use-header-handlers';
import { getAppBarStyles, toolbarStyles } from './header-styles';
import type { HeaderProps } from './types';

export const Header = ({ backgroundThemeId, isDarkBackground, onShowKeyboardShortcuts }: HeaderProps) => {
  const {
    googleUser,
    isAuthenticated,
    isAuthenticating,
    anchorEl,
    menuOpen,
    handleAccount,
    handleCloseMenu,
    handleLogout,
    handleHelp,
    handleLogoClick,
  } = useHeaderHandlers({ onShowKeyboardShortcuts });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={getAppBarStyles(isDarkBackground)}
    >
      <Toolbar sx={toolbarStyles}>
        {/* Left: Logo and Title */}
        <HeaderLogo
          backgroundThemeId={backgroundThemeId}
          isDarkBackground={isDarkBackground}
          onLogoClick={handleLogoClick}
        />

        {/* Right: Action Buttons */}
        <HeaderActions
          isDarkBackground={isDarkBackground}
          isAuthenticated={isAuthenticated}
          isAuthenticating={isAuthenticating}
          googleUser={googleUser}
          onHelp={handleHelp}
          onAccount={handleAccount}
        />

        {/* User Menu */}
        <UserMenu
          anchorEl={anchorEl}
          open={menuOpen}
          isDarkBackground={isDarkBackground}
          googleUser={googleUser}
          onClose={handleCloseMenu}
          onLogout={handleLogout}
        />
      </Toolbar>
    </AppBar>
  );
};
