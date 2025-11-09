/**
 * Shared types for settings components
 */


import type { HeaderThemeStyle, ThemePreset } from '../piano/theme-presets';

export interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  isDarkBackground: boolean;
  initialTab?: SettingsTab;
  headerThemeStyle?: HeaderThemeStyle;
  currentPreset?: ThemePreset;
}

export type SettingsTab = 'general' | 'quotes' | 'piano' | 'keyboard';

// Re-export DialogTheme as SettingsTheme for backwards compatibility
export type { DialogTheme as SettingsTheme } from '@/hooks/use-global-dialog-theme';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
