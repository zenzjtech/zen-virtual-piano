/**
 * Header component types and interfaces
 */

export interface HeaderProps {
  backgroundThemeId: string;
  isDarkBackground: boolean;
  onShowKeyboardShortcuts: () => void;
}

export interface HeaderStyleProps {
  isDarkBackground: boolean;
}

export interface UseHeaderHandlersProps {
  onShowKeyboardShortcuts: () => void;
}
