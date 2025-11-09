/**
 * Background theme configuration
 * Contains theme IDs, dark theme checks, and style mappings
 */

export type BackgroundThemeId = 
  | 'white'
  | 'light-gray'
  | 'warm'
  | 'cool'
  | 'dark'
  | 'gradient-sunset'
  | 'gradient-ocean'
  | 'gradient-forest'
  | 'morning-sky'
  | 'gufeng-ink-jade'
  | 'gufeng-vermillion-gold'
  | 'zen-sakura-dawn'
  | 'zen-bamboo-stone'
  | 'leela-saffron-marigold'
  | 'leela-peacock-divine'
  | 'isha-earth-mystic'
  | 'sacred-light-glory'
  | 'islamic-emerald-gold'
  | 'bodhisattva-gardens'
  | 'vajrayana-sky-temple';

/**
 * List of background theme IDs that should use dark text/icons
 */
export const DARK_BACKGROUND_THEMES: BackgroundThemeId[] = [
  'dark',
  'gradient-ocean',
  'gufeng-ink-jade',
  'leela-peacock-divine',
  'isha-earth-mystic',
  'sacred-light-glory',
  'islamic-emerald-gold',
  'vajrayana-sky-temple',
];

/**
 * Check if a background theme should use dark styling
 */
export function isDarkBackgroundTheme(themeId: string): boolean {
  return DARK_BACKGROUND_THEMES.includes(themeId as BackgroundThemeId);
}

/**
 * Get the CSS style object for a background theme
 */
export function getBackgroundStyle(themeId: string): React.CSSProperties {
  switch (themeId) {
    case 'white':
      return { backgroundColor: '#FFFFFF' };
    case 'light-gray':
      return { backgroundColor: '#F5F5F5' };
    case 'warm':
      return { backgroundColor: '#FFF8F0' };
    case 'cool':
      return { backgroundColor: '#F0F4F8' };
    case 'dark':
      return { backgroundColor: '#2C2C2C' };
    case 'gradient-sunset':
      return { background: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)' };
    case 'gradient-ocean':
      return { background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' };
    case 'gradient-forest':
      return { background: 'linear-gradient(135deg, #56AB2F 0%, #A8E063 100%)' };
    case 'morning-sky':
      return { background: 'linear-gradient(135deg, #B8E8F5 0%, #D4F1F9 40%, #FFFFFF 100%)' };
    case 'gufeng-ink-jade':
      return { background: 'linear-gradient(135deg, #2C3E50 0%, #3C5A4E 50%, #4A6B5A 100%)' };
    case 'gufeng-vermillion-gold':
      return { background: 'linear-gradient(135deg, #8B3A3A 0%, #C84B31 35%, #D4AF37 70%, #F4E5A1 100%)' };
    case 'zen-sakura-dawn':
      return { background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE5EC 25%, #FFB7C5 60%, #FFA8B8 100%)' };
    case 'zen-bamboo-stone':
      return { background: 'linear-gradient(135deg, #D4D9D4 0%, #B4C4B4 35%, #8B9D83 70%, #6B7B68 100%)' };
    case 'leela-saffron-marigold':
      return { background: 'linear-gradient(135deg, #FFE5CC 0%, #FFB366 30%, #FF9933 60%, #CC6600 100%)' };
    case 'leela-peacock-divine':
      return { background: 'linear-gradient(135deg, #667EEA 0%, #4A90E2 25%, #2E5F8F 60%, #1A3A5C 100%)' };
    case 'isha-earth-mystic':
      return { background: 'linear-gradient(135deg, #D4A574 0%, #B8956A 25%, #8B6F47 55%, #6B5B4A 80%, #4A4458 100%)' };
    case 'sacred-light-glory':
      return { background: 'linear-gradient(135deg, #FFF8E7 0%, #FFD700 20%, #E6B800 40%, #4169E1 70%, #2F4F7F 100%)' };
    case 'islamic-emerald-gold':
      return { background: 'linear-gradient(135deg, #F0E68C 0%, #DAA520 25%, #00704A 60%, #004D40 100%)' };
    case 'bodhisattva-gardens':
      return { background: 'linear-gradient(135deg, #B4E0B4 0%, #D4F1F9 70%, #E0EAFC 100%)' };
    case 'vajrayana-sky-temple':
      return { background: 'linear-gradient(135deg, #1A2942 0%, #3E2F6B 50%, #8A4E78 100%)' };
    default:
      return { backgroundColor: '#FFFFFF' };
  }
}
