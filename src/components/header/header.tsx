/**
 * Main Header component
 */

import { AppBar, Toolbar } from '@mui/material';
import { useAppSelector } from '@/store/hook';
import { HeaderLogo } from './header-logo';
import { HeaderActions } from './header-actions';
import { UserMenu } from './user-menu';
import { useHeaderHandlers } from './use-header-handlers';
import { getAppBarStyles, toolbarStyles } from './header-styles';
import { THEME_PRESETS } from '../piano/theme-presets';
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

  // Get current theme settings to find matching preset
  const pianoTheme = useAppSelector((state) => state.pianoSettings.theme);
  const musicSheetTheme = useAppSelector((state) => state.pianoSettings.musicSheetTheme);

  // Find current preset based on all three theme attributes
  const currentPreset = THEME_PRESETS.find(
    (preset) =>
      preset.pianoTheme === pianoTheme &&
      preset.backgroundTheme === backgroundThemeId &&
      preset.musicSheetTheme === musicSheetTheme
  );

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
          headerStyle={currentPreset?.headerStyle}
          category={currentPreset?.category}
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
