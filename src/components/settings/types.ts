/**
 * Shared types for settings components
 */

import type { HeaderThemeStyle } from '../header/header-theme-styles';
import type { ThemePreset } from '../piano/theme-presets';

export interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  isDarkBackground: boolean;
  initialTab?: SettingsTab;
  headerThemeStyle?: HeaderThemeStyle;
  currentPreset?: ThemePreset;
}

export type SettingsTab = 'general' | 'quotes' | 'piano' | 'keyboard';

export interface SettingsTheme {
  backdropBlur: string;
  dialogBg: string;
  borderColor: string;
  boxShadow: string;
  hoverBg: string;
  textColor: string;
  secondaryTextColor: string;
  paperBg: string;
  highlightBg: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
