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
  | 'noctis'
  | 'material'
  | 'community-material'
  | 'bluloco-dark'
  | 'bluloco-light'
  | 'rouge'
  | 'sublime-material'
  | 'atom-one-dark'
  | 'nord'
  | 'synthwave84'
  | 'panda'
  | 'hop-light'
  | 'snazzy-light'
  | 'one-monokai'
  | 'poimandres'
  | 'slack'
  | 'brackets-light-pro'
  | 'min-dark'
  | 'min-light'
  | 'zenburn'
  | 'base16'
  | 'tomorrow'
  | 'gruvbox'
  | 'iceberg'
  | 'forest-night'
  | 'rose-pine'
  | 'catppuccin'
  | 'everforest';

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
  { id: 'material', name: 'Material Theme', description: 'Google\'s Material Design colors with modern aesthetics', category: 'cultural' },
  { id: 'community-material', name: 'Community Material', description: 'Enhanced Material theme with more color variants', category: 'cultural' },
  { id: 'bluloco-dark', name: 'Bluloco Dark', description: 'Sophisticated designer color scheme with enhanced syntax', category: 'cultural' },
  { id: 'bluloco-light', name: 'Bluloco Light', description: 'Clean and sophisticated light designer color scheme', category: 'cultural' },
  { id: 'rouge', name: 'Rouge', description: 'Material-inspired theme with flushed color palette', category: 'cultural' },
  { id: 'sublime-material', name: 'Sublime Material', description: 'Material theme inspired by Sublime Text', category: 'cultural' },
  { id: 'atom-one-dark', name: 'Atom One Dark', description: 'Clean theme from the Atom editor with balanced grays', category: 'cultural' },
  { id: 'nord', name: 'Nord', description: 'Soft, cold Nordic-inspired colors with arctic aesthetics', category: 'cultural' },
  { id: 'synthwave84', name: 'SynthWave \'84', description: 'Retro 80s neon theme with vibrant pinks and purples', category: 'cultural' },
  { id: 'panda', name: 'Panda', description: 'Japanese-inspired theme with pandas and vibrant colors', category: 'cultural' },
  { id: 'hop-light', name: 'Hop Light', description: 'Bright and refreshing light theme with vibrant accents', category: 'cultural' },
  { id: 'snazzy-light', name: 'Snazzy Light', description: 'Vibrant modern light theme with colorful accents', category: 'cultural' },
  { id: 'one-monokai', name: 'One Monokai', description: 'Colorful Monokai variant with vibrant syntax colors', category: 'cultural' },
  { id: 'poimandres', name: 'Poimandres', description: 'Minimal dark theme with semantic coloring and teal accents', category: 'cultural' },
  { id: 'slack', name: 'Slack Theme', description: 'Professional look matching Slack\'s UI with clean design', category: 'cultural' },
  { id: 'brackets-light-pro', name: 'Brackets Light Pro', description: 'Clean, minimal theme inspired by Brackets editor', category: 'cultural' },
  { id: 'min-dark', name: 'Min Dark', description: 'Ultra-minimal dark theme with subtle grays', category: 'cultural' },
  { id: 'min-light', name: 'Min Light', description: 'Ultra-minimal light theme with subtle grays', category: 'cultural' },
  { id: 'zenburn', name: 'Zenburn', description: 'Low-contrast theme designed for reduced eye strain', category: 'cultural' },
  { id: 'base16', name: 'Base16', description: 'Comprehensive color scheme collection with balanced colors', category: 'cultural' },
  { id: 'tomorrow', name: 'Tomorrow', description: 'Balanced theme with clean design and comfortable colors', category: 'cultural' },
  { id: 'gruvbox', name: 'Gruvbox', description: 'Retro color scheme inspired by old computers with warm tones', category: 'cultural' },
  { id: 'iceberg', name: 'Iceberg', description: 'Cool blue theme with Japanese design influence', category: 'cultural' },
  { id: 'forest-night', name: 'Forest Night', description: 'Nature-inspired dark theme with deep greens', category: 'cultural' },
  { id: 'rose-pine', name: 'Rosé Pine', description: 'Warm, comfortable color palette with soft pinks', category: 'cultural' },
  { id: 'catppuccin', name: 'Catppuccin', description: 'Cozy pastel theme with warm colors and multiple flavors', category: 'cultural' },
  { id: 'everforest', name: 'Everforest', description: 'Warm green color scheme with natural forest aesthetics', category: 'cultural' },
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
  'material',
  'community-material',
  'bluloco-dark',
  'rouge',
  'sublime-material',
  'atom-one-dark',
  'nord',
  'synthwave84',
  'panda',
  'one-monokai',
  'poimandres',
  'slack',
  'min-dark',
  'zenburn',
  'base16',
  'tomorrow',
  'gruvbox',
  'iceberg',
  'forest-night',
  'rose-pine',
  'catppuccin',
  'everforest',
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
    case 'material':
      return { backgroundColor: '#263238' }; // Material Theme background
    case 'community-material':
      return { backgroundColor: '#263238' }; // Community Material background
    case 'bluloco-dark':
      return { backgroundColor: '#282c34' }; // Bluloco Dark background
    case 'bluloco-light':
      return { backgroundColor: '#fafafa' }; // Bluloco Light background
    case 'rouge':
      return { backgroundColor: '#172831' }; // Rouge background
    case 'sublime-material':
      return { backgroundColor: '#263238' }; // Sublime Material background
    case 'atom-one-dark':
      return { backgroundColor: '#1e2127' }; // Atom One Dark background
    case 'nord':
      return { backgroundColor: '#2e3440' }; // Nord background
    case 'synthwave84':
      return { backgroundColor: '#2a2139' }; // SynthWave '84 background
    case 'panda':
      return { backgroundColor: '#1f2430' }; // Panda background
    case 'hop-light':
      return { backgroundColor: '#ffffff' }; // Hop Light background
    case 'snazzy-light':
      return { backgroundColor: '#f1f1f1' }; // Snazzy Light background
    case 'one-monokai':
      return { backgroundColor: '#282c34' }; // One Monokai background
    case 'poimandres':
      return { backgroundColor: '#1b1e28' }; // Poimandres background
    case 'slack':
      return { backgroundColor: '#1a1d21' }; // Slack background
    case 'brackets-light-pro':
      return { backgroundColor: '#ffffff' }; // Brackets Light Pro background
    case 'min-dark':
      return { backgroundColor: '#000000' }; // Min Dark background
    case 'min-light':
      return { backgroundColor: '#ffffff' }; // Min Light background
    case 'zenburn':
      return { backgroundColor: '#3f3f3f' }; // Zenburn background
    case 'base16':
      return { backgroundColor: '#272822' }; // Base16 background
    case 'tomorrow':
      return { backgroundColor: '#1d1f21' }; // Tomorrow background
    case 'gruvbox':
      return { backgroundColor: '#282828' }; // Gruvbox background
    case 'iceberg':
      return { backgroundColor: '#161821' }; // Iceberg background
    case 'forest-night':
      return { backgroundColor: '#323d43' }; // Forest Night background
    case 'rose-pine':
      return { backgroundColor: '#191724' }; // Rosé Pine background
    case 'catppuccin':
      return { backgroundColor: '#1e1e2e' }; // Catppuccin background
    case 'everforest':
      return { backgroundColor: '#2b3339' }; // Everforest background
    default:
      return { backgroundColor: '#FFFFFF' };
  }
}
