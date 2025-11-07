/**
 * Main Header component
 */

import { AppBar, Toolbar, Box } from '@mui/material';
import { useAppSelector } from '@/store/hook';
import { HeaderLogo } from './header-logo';
import { HeaderQuote } from './header-quote';
import { HeaderActions } from './header-actions';
import { UserMenu } from './user-menu';
import { RecordingPlaybackBar } from '../piano/recording-playback-bar';
import { useHeaderHandlers } from './use-header-handlers';
import { getAppBarStyles, toolbarStyles } from './header-styles';
import { THEME_PRESETS } from '../piano/theme-presets';
import type { HeaderProps } from './types';

export const Header = ({ backgroundThemeId, isDarkBackground, onShowKeyboardShortcuts, recordingPlayback }: HeaderProps) => {
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
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <HeaderLogo
            backgroundThemeId={backgroundThemeId}
            isDarkBackground={isDarkBackground}
            headerStyle={currentPreset?.headerStyle}
            category={currentPreset?.category}
            onLogoClick={handleLogoClick}
          />
        </Box>

        {/* Center: Recording Playback Bar or Inspirational Quote */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {recordingPlayback?.hasRecording ? (
            <Box sx={{ maxWidth: '700px', width: '100%' }}>
              <RecordingPlaybackBar
                isPlaying={recordingPlayback.isPlaying}
                currentPosition={recordingPlayback.currentPosition}
                totalDuration={recordingPlayback.totalDuration}
                playbackSpeed={recordingPlayback.playbackSpeed}
                loop={recordingPlayback.loop}
                hasRecording={recordingPlayback.hasRecording}
                currentPositionFormatted={recordingPlayback.currentPositionFormatted}
                totalDurationFormatted={recordingPlayback.totalDurationFormatted}
                pianoTheme={recordingPlayback.pianoTheme}
                playbackBarStyle={recordingPlayback.playbackBarStyle}
                isDarkBackground={isDarkBackground}
                compact
                onTogglePlayback={recordingPlayback.onTogglePlayback}
                onStop={recordingPlayback.onStop}
                onToggleLoop={recordingPlayback.onToggleLoop}
                onSpeedChange={recordingPlayback.onSpeedChange}
                onClear={recordingPlayback.onClear}
                onDownload={recordingPlayback.onDownload}
              />
            </Box>
          ) : (
            <HeaderQuote
              isDarkBackground={isDarkBackground}
              headerStyle={currentPreset?.headerStyle}
              category={currentPreset?.category}
              quoteStyle={currentPreset?.quoteStyle}
            />
          )}
        </Box>

        {/* Right: Action Buttons */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <HeaderActions
            isDarkBackground={isDarkBackground}
            isAuthenticated={isAuthenticated}
            isAuthenticating={isAuthenticating}
            googleUser={googleUser}
            onHelp={handleHelp}
            onAccount={handleAccount}
          />
        </Box>

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
