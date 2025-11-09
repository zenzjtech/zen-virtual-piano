import { SheetSearchDialog } from '@/components/music-sheet/sheet-search-dialog';
import { OnboardingOverlay } from '@/components/piano/onboarding-overlay';
import { KeyboardShortcutsDialog } from '@/components/piano/keyboard-shortcuts-dialog';
import { SettingsDialog } from '@/components/settings';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { completeOnboarding } from '@/store/reducers/onboarding-slice';
import { getTheme } from '@/components/piano/themes';
import { THEME_PRESETS, ThemePreset } from '@/components/piano/theme-presets';
import { isDarkBackgroundTheme } from '@/theme/background-themes';

interface AppDialogsProps {
  /** Whether settings dialog is open */
  settingsOpen: boolean;
  /** Current settings tab */
  settingsTab: 'general' | 'quotes' | 'piano' | 'keyboard';
  /** Whether keyboard shortcuts dialog is open */
  isKeyboardShortcutsOpen: boolean;
  /** Handler to close settings dialog */
  onCloseSettings: () => void;
  /** Handler to close keyboard shortcuts dialog */
  onCloseKeyboardShortcuts: () => void;
  /** Anchor element for sheet search dialog */
  sheetSearchAnchorEl: HTMLElement | null;
  /** Handler to close sheet search dialog */
  onSheetSearchClose: () => void;
}

/**
 * AppDialogs - Container for all app-level dialog components
 * Manages dialogs that appear on top of the main app content
 */
export const AppDialogs: React.FC<AppDialogsProps> = ({
  settingsOpen,
  settingsTab,
  isKeyboardShortcutsOpen,
  onCloseSettings,
  onCloseKeyboardShortcuts,
  sheetSearchAnchorEl,
  onSheetSearchClose,
}) => {
  const dispatch = useAppDispatch();
  
  // Redux state
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const backgroundThemeId = useAppSelector((state) => state.theme.backgroundTheme);
  const musicSheetThemeId = useAppSelector((state) => state.theme.musicSheetTheme);
  const isOnboardingVisible = useAppSelector((state) => state.onboarding.isOnboardingVisible);
  const isSheetSearchOpen = useAppSelector((state) => state.musicSheet.isSearchDialogOpen);
  
  // Get theme objects
  const pianoTheme = getTheme(pianoThemeId);
  const isDarkBackground = isDarkBackgroundTheme(backgroundThemeId);
  
  // Find current preset
  const currentPreset = THEME_PRESETS.find(
    (preset) =>
      preset.pianoTheme === pianoThemeId &&
      preset.backgroundTheme === backgroundThemeId &&
      preset.musicSheetTheme === musicSheetThemeId
  );

  return (
    <>
      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onClose={onCloseSettings}
        isDarkBackground={isDarkBackground}
        initialTab={settingsTab}
        headerThemeStyle={currentPreset?.headerThemeStyle}
        currentPreset={currentPreset}
      />

      {/* Sheet Search Dialog */}
      <SheetSearchDialog
        open={isSheetSearchOpen}
        anchorEl={sheetSearchAnchorEl}
        onClose={onSheetSearchClose}
        pianoTheme={pianoTheme}
      />

      {/* Onboarding Overlay */}
      {isOnboardingVisible && (
        <OnboardingOverlay
          pianoTheme={pianoTheme}
          onClose={() => dispatch(completeOnboarding())}
        />
      )}

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsDialog
        open={isKeyboardShortcutsOpen}
        onClose={onCloseKeyboardShortcuts}
        pianoTheme={pianoTheme}
        isDarkBackground={isDarkBackground}
      />
    </>
  );
};
