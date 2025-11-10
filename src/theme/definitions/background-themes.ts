/**
 * Background theme configuration
 * Contains theme IDs, dark theme checks, and style mappings
 */

export interface BackgroundTheme {
  id: BackgroundThemeId;
  name: string;
  description: string;
  category: 'basics' | 'gradients' | 'cultural';
}

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
  | 'vajrayana-sky-temple'
  | 'cosmic-deep-space'
  | 'cyberpunk-neon'
  | 'solarized-light'
  | 'solarized-dark'
  | 'monokai-light'
  | 'monokai-dark'
  | 'dracula-dark'
  | 'github-light'
  | 'github-dark'
  | 'one-dark-pro'
  | 'ayu-light'
  | 'ayu-mirage'
  | 'ayu-dark'
  | 'night-owl'
  | 'tokyo-night'
  | 'shades-of-purple'
  | 'cobalt2'
  | 'winter-is-coming'
  | 'noctis';

export const BACKGROUND_THEME_CATEGORIES: Record<BackgroundTheme['category'], { name: string; description: string }> = {
  basics: {
    name: 'Basics',
    description: 'Simple, solid color backgrounds',
  },
  gradients: {
    name: 'Gradients',
    description: 'Smooth, blended color transitions',
  },
  cultural: {
    name: 'Cultural & Themed',
    description: 'Backgrounds inspired by cultures and concepts',
  },
};


export const BACKGROUND_THEMES: BackgroundTheme[] = [
  // Basics
  { id: 'white', name: 'White', description: 'Clean and simple white', category: 'basics' },
  { id: 'light-gray', name: 'Light Gray', description: 'A touch of modern gray', category: 'basics' },
  { id: 'warm', name: 'Warm', description: 'Soft, warm off-white', category: 'basics' },
  { id: 'cool', name: 'Cool', description: 'Subtle, cool off-white', category: 'basics' },
  { id: 'dark', name: 'Dark', description: 'Deep, dark gray for focus', category: 'basics' },
  // Gradients
  { id: 'gradient-sunset', name: 'Sunset', description: 'Warm sunset tones', category: 'gradients' },
  { id: 'gradient-ocean', name: 'Ocean', description: 'Deep ocean blues', category: 'gradients' },
  { id: 'gradient-forest', name: 'Forest', description: 'Lush forest greens', category: 'gradients' },
  { id: 'morning-sky', name: 'Morning Sky', description: 'Clear morning sky', category: 'gradients' },
  // Cultural & Themed
  { id: 'gufeng-ink-jade', name: 'Ink & Jade', description: 'Chinese ink wash painting', category: 'cultural' },
  { id: 'gufeng-vermillion-gold', name: 'Vermillion Gold', description: 'Imperial Chinese colors', category: 'cultural' },
  { id: 'zen-sakura-dawn', name: 'Sakura Dawn', description: 'Japanese cherry blossoms', category: 'cultural' },
  { id: 'zen-bamboo-stone', name: 'Bamboo Stone', description: 'Zen garden atmosphere', category: 'cultural' },
  { id: 'leela-saffron-marigold', name: 'Saffron Marigold', description: 'Hindu sacred colors', category: 'cultural' },
  { id: 'leela-peacock-divine', name: 'Peacock Divine', description: 'Colors of the divine peacock', category: 'cultural' },
  { id: 'isha-earth-mystic', name: 'Earth Mystic', description: 'Earthy, spiritual tones', category: 'cultural' },
  { id: 'sacred-light-glory', name: 'Sacred Glory', description: 'Radiant divine light', category: 'cultural' },
  { id: 'islamic-emerald-gold', name: 'Emerald & Gold', description: 'Islamic geometric art colors', category: 'cultural' },
  { id: 'bodhisattva-gardens', name: 'Bodhisattva Gardens', description: 'Peaceful garden greens', category: 'cultural' },
  { id: 'vajrayana-sky-temple', name: 'Vajrayana Sky', description: 'Himalayan sky temple colors', category: 'cultural' },
  { id: 'cosmic-deep-space', name: 'Deep Space', description: 'The vastness of the cosmos', category: 'cultural' },
  { id: 'cyberpunk-neon', name: 'Cyberpunk Neon', description: 'Futuristic neon cityscape', category: 'cultural' },
  { id: 'solarized-light', name: 'Solarized Light', description: 'Carefully calibrated light theme for optimal readability', category: 'cultural' },
  { id: 'solarized-dark', name: 'Solarized Dark', description: 'Precisely balanced dark theme for reduced eye strain', category: 'cultural' },
  { id: 'monokai-light', name: 'Monokai Light', description: 'Bright Monokai-inspired theme with vibrant colors', category: 'cultural' },
  { id: 'monokai-dark', name: 'Monokai Dark', description: 'Classic Monokai dark theme with syntax highlighting colors', category: 'cultural' },
  { id: 'dracula-dark', name: 'Dracula Dark', description: 'Classic Dracula dark theme with high contrast and vibrant accents', category: 'cultural' },
  { id: 'github-light', name: 'GitHub Light', description: 'GitHub\'s official light theme with clean design and professional styling', category: 'cultural' },
  { id: 'github-dark', name: 'GitHub Dark', description: 'GitHub\'s official dark theme with professional blue accents', category: 'cultural' },
  { id: 'one-dark-pro', name: 'One Dark Pro', description: 'Popular dark theme with Material Design influence and balanced colors', category: 'cultural' },
  { id: 'ayu-light', name: 'Ayu Light', description: 'Clean light theme with soft colors and pleasant text', category: 'cultural' },
  { id: 'ayu-mirage', name: 'Ayu Mirage', description: 'Balanced theme between light and dark with soft colors', category: 'cultural' },
  { id: 'ayu-dark', name: 'Ayu Dark', description: 'Modern dark theme with high contrast and vibrant accents', category: 'cultural' },
  { id: 'night-owl', name: 'Night Owl', description: 'Dark blue theme perfect for late-night coding sessions', category: 'cultural' },
  { id: 'tokyo-night', name: 'Tokyo Night', description: 'Cyberpunk-inspired theme with neon accents and glowing lights', category: 'cultural' },
  { id: 'shades-of-purple', name: 'Shades of Purple', description: 'Bold purple color scheme with elegant, sophisticated look', category: 'cultural' },
  { id: 'cobalt2', name: 'Cobalt2', description: 'High contrast theme with almost fluorescent colors', category: 'cultural' },
  { id: 'winter-is-coming', name: 'Winter is Coming', description: 'Cool blue theme inspired by Game of Thrones', category: 'cultural' },
  { id: 'noctis', name: 'Noctis', description: 'Green-based theme with modern design and multiple variants', category: 'cultural' },
];


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
  'cosmic-deep-space',
  'cyberpunk-neon',
  'solarized-dark',
  'monokai-dark',
  'dracula-dark',
  'github-dark',
  'one-dark-pro',
  'ayu-mirage',
  'ayu-dark',
  'night-owl',
  'tokyo-night',
  'shades-of-purple',
  'cobalt2',
  'winter-is-coming',
  'noctis',
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
    case 'cosmic-deep-space':
      return { background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' };
    case 'cyberpunk-neon':
      return { background: 'linear-gradient(135deg, #0D0221 0%, #0C0032 25%, #240046 50%, #3C096C 75%, #5A189A 100%)' };
    case 'solarized-light':
      return { backgroundColor: '#fdf6e3' }; // Solarized base3
    case 'solarized-dark':
      return { backgroundColor: '#002b36' }; // Solarized base03
    case 'monokai-light':
      return { backgroundColor: '#f8f8f2' }; // Monokai foreground (light)
    case 'monokai-dark':
      return { backgroundColor: '#272822' }; // Monokai background
    case 'dracula-dark':
      return { backgroundColor: '#282a36' }; // Dracula background
    case 'github-light':
      return { backgroundColor: '#ffffff' }; // GitHub light background
    case 'github-dark':
      return { backgroundColor: '#0d1117' }; // GitHub dark background
    case 'one-dark-pro':
      return { backgroundColor: '#282c34' }; // One Dark Pro background
    case 'ayu-light':
      return { backgroundColor: '#fafafa' }; // Ayu light background
    case 'ayu-mirage':
      return { backgroundColor: '#212733' }; // Ayu mirage background
    case 'ayu-dark':
      return { backgroundColor: '#0a0e14' }; // Ayu dark background
    case 'night-owl':
      return { backgroundColor: '#011627' }; // Night Owl background
    case 'tokyo-night':
      return { backgroundColor: '#1a1b26' }; // Tokyo Night background
    case 'shades-of-purple':
      return { backgroundColor: '#2d2b55' }; // Shades of Purple background
    case 'cobalt2':
      return { backgroundColor: '#193549' }; // Cobalt2 background
    case 'winter-is-coming':
      return { backgroundColor: '#0e1419' }; // Winter is Coming background
    case 'noctis':
      return { backgroundColor: '#0c0a14' }; // Noctis background
    default:
      return { backgroundColor: '#FFFFFF' };
  }
}
