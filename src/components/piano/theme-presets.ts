/**
 * Harmonious theme preset combinations
 * Curated combinations of piano theme, background, and music sheet for optimal visual harmony
 */

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  pianoTheme: string;
  backgroundTheme: string;
  musicSheetTheme: string;
  category: 'classic' | 'modern' | 'cultural' | 'nature' | 'artistic';
}

export type ThemePresetCategory = ThemePreset['category'];

export const THEME_PRESETS: ThemePreset[] = [
  // Classic Presets
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Timeless wooden piano with warm vintage tones',
    pianoTheme: 'wooden',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-1',
    category: 'classic',
  },
  {
    id: 'vintage-scholar',
    name: 'Vintage Scholar',
    description: 'Traditional study atmosphere with aged paper',
    pianoTheme: 'wooden',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-3',
    category: 'classic',
  },
  {
    id: 'mahogany-warmth',
    name: 'Mahogany Warmth',
    description: 'Rich mahogany with classic parchment',
    pianoTheme: 'mahogany',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-4',
    category: 'classic',
  },
  {
    id: 'dark-symphony',
    name: 'Dark Symphony',
    description: 'Dramatic black piano in dark ambiance',
    pianoTheme: 'black',
    backgroundTheme: 'dark',
    musicSheetTheme: 'paper-3',
    category: 'classic',
  },
  
  // Modern Presets
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Clean white piano with contemporary paper',
    pianoTheme: 'white',
    backgroundTheme: 'white',
    musicSheetTheme: 'paper-2',
    category: 'modern',
  },
  {
    id: 'nordic-serenity',
    name: 'Nordic Serenity',
    description: 'Cool Nordic ice with morning sky gradient',
    pianoTheme: 'nordicIce',
    backgroundTheme: 'morning-sky',
    musicSheetTheme: 'paper-6',
    category: 'modern',
  },
  {
    id: 'metal-cool',
    name: 'Metal Cool',
    description: 'Industrial metal with cool marble finish',
    pianoTheme: 'metal',
    backgroundTheme: 'cool',
    musicSheetTheme: 'paper-12',
    category: 'modern',
  },
  {
    id: 'rose-romance',
    name: 'Rose Romance',
    description: 'Elegant rose gold with soft cream tones',
    pianoTheme: 'roseGold',
    backgroundTheme: 'zen-sakura-dawn',
    musicSheetTheme: 'paper-5',
    category: 'modern',
  },
  
  // Cultural Presets
  {
    id: 'japanese-zen',
    name: 'Japanese Zen',
    description: 'Tranquil bamboo garden with watercolor aesthetic',
    pianoTheme: 'wooden',
    backgroundTheme: 'zen-bamboo-stone',
    musicSheetTheme: 'paper-8',
    category: 'cultural',
  },
  {
    id: 'chinese-imperial',
    name: 'Chinese Imperial',
    description: 'Palace vermillion gold with ancient scroll',
    pianoTheme: 'mahogany',
    backgroundTheme: 'gufeng-vermillion-gold',
    musicSheetTheme: 'paper-10',
    category: 'cultural',
  },
  {
    id: 'ink-jade',
    name: 'Ink & Jade',
    description: 'Traditional Chinese ink painting with kraft paper',
    pianoTheme: 'black',
    backgroundTheme: 'gufeng-ink-jade',
    musicSheetTheme: 'paper-11',
    category: 'cultural',
  },
  {
    id: 'hindu-sacred',
    name: 'Hindu Sacred',
    description: 'Saffron and marigold with delicate vellum',
    pianoTheme: 'roseGold',
    backgroundTheme: 'leela-saffron-marigold',
    musicSheetTheme: 'paper-13',
    category: 'cultural',
  },
  {
    id: 'peacock-divine',
    name: 'Peacock Divine',
    description: 'Krishna\'s celestial hues with modern elegance',
    pianoTheme: 'metal',
    backgroundTheme: 'leela-peacock-divine',
    musicSheetTheme: 'paper-2',
    category: 'cultural',
  },
  {
    id: 'earth-mystic',
    name: 'Earth Mystic',
    description: 'Spiritual earthy path with weathered paper',
    pianoTheme: 'mahogany',
    backgroundTheme: 'isha-earth-mystic',
    musicSheetTheme: 'paper-3',
    category: 'cultural',
  },
  {
    id: 'divine-glory',
    name: 'Divine Glory',
    description: 'Sacred radiance with leather-bound elegance',
    pianoTheme: 'white',
    backgroundTheme: 'sacred-light-glory',
    musicSheetTheme: 'paper-14',
    category: 'cultural',
  },
  {
    id: 'islamic-elegance',
    name: 'Islamic Elegance',
    description: 'Emerald and gold with marble sophistication',
    pianoTheme: 'metal',
    backgroundTheme: 'islamic-emerald-gold',
    musicSheetTheme: 'paper-12',
    category: 'cultural',
  },
  
  // Nature Presets
  {
    id: 'forest-peace',
    name: 'Forest Peace',
    description: 'Natural forest with eco-friendly recycled paper',
    pianoTheme: 'wooden',
    backgroundTheme: 'gradient-forest',
    musicSheetTheme: 'paper-7',
    category: 'nature',
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Deep ocean gradient with notebook simplicity',
    pianoTheme: 'black',
    backgroundTheme: 'gradient-ocean',
    musicSheetTheme: 'paper-9',
    category: 'nature',
  },
  
  // Artistic Presets
  {
    id: 'sunset-dreams',
    name: 'Sunset Dreams',
    description: 'Warm sunset with artistic canvas texture',
    pianoTheme: 'roseGold',
    backgroundTheme: 'gradient-sunset',
    musicSheetTheme: 'paper-15',
    category: 'artistic',
  },
  {
    id: 'morning-light',
    name: 'Morning Light',
    description: 'Peaceful morning with textured linen',
    pianoTheme: 'white',
    backgroundTheme: 'morning-sky',
    musicSheetTheme: 'paper-6',
    category: 'artistic',
  },
];

/**
 * Get preset by ID
 */
export function getPresetById(presetId: string): ThemePreset | undefined {
  return THEME_PRESETS.find(preset => preset.id === presetId);
}

/**
 * Get presets by category
 */
export function getPresetsByCategory(category: ThemePresetCategory): ThemePreset[] {
  return THEME_PRESETS.filter(preset => preset.category === category);
}

/**
 * Get all preset categories with metadata
 */
export function getPresetCategories(): Array<{ id: ThemePresetCategory; name: string; description: string }> {
  return [
    { id: 'classic', name: 'Classic', description: 'Timeless traditional combinations' },
    { id: 'modern', name: 'Modern', description: 'Contemporary minimalist styles' },
    { id: 'cultural', name: 'Cultural', description: 'Traditional and spiritual themes' },
    { id: 'nature', name: 'Nature', description: 'Natural and organic themes' },
    { id: 'artistic', name: 'Artistic', description: 'Creative and expressive combinations' },
  ];
}

/**
 * Get random preset from a category
 */
export function getRandomPreset(category?: ThemePresetCategory): ThemePreset {
  const presets = category ? getPresetsByCategory(category) : THEME_PRESETS;
  return presets[Math.floor(Math.random() * presets.length)];
}

/**
 * Get all presets count by category
 */
export function getPresetCounts(): Record<ThemePresetCategory, number> {
  return THEME_PRESETS.reduce((acc, preset) => {
    acc[preset.category] = (acc[preset.category] || 0) + 1;
    return acc;
  }, {} as Record<ThemePresetCategory, number>);
}
