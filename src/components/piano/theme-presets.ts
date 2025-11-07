/**
 * Harmonious theme preset combinations
 * Curated combinations of piano theme, background, and music sheet for optimal visual harmony
 */

import type { HeaderTypographyStyle } from '../header/header-typography';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  pianoTheme: string;
  backgroundTheme: string;
  musicSheetTheme: string;
  category: 'classic' | 'modern' | 'cultural' | 'nature' | 'artistic' | 'vintage' | 'professional' | 'romantic' | 'energetic' | 'minimalist' | 'luxurious';
  headerStyle: HeaderTypographyStyle;
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
    headerStyle: 'classic-serif',
  },
  {
    id: 'vintage-scholar',
    name: 'Vintage Scholar',
    description: 'Traditional study atmosphere with aged paper',
    pianoTheme: 'wooden',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-3',
    category: 'classic',
    headerStyle: 'classic-serif',
  },
  {
    id: 'mahogany-warmth',
    name: 'Mahogany Warmth',
    description: 'Rich mahogany with classic parchment',
    pianoTheme: 'mahogany',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-4',
    category: 'classic',
    headerStyle: 'classic-serif',
  },
  {
    id: 'dark-symphony',
    name: 'Dark Symphony',
    description: 'Dramatic black piano in dark ambiance',
    pianoTheme: 'black',
    backgroundTheme: 'dark',
    musicSheetTheme: 'paper-3',
    category: 'classic',
    headerStyle: 'classic-serif',
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
    headerStyle: 'modern-sans',

  },
  {
    id: 'nordic-serenity',
    name: 'Nordic Serenity',
    description: 'Cool Nordic ice with morning sky gradient',
    pianoTheme: 'nordicIce',
    backgroundTheme: 'morning-sky',
    musicSheetTheme: 'paper-6',
    category: 'modern',
    headerStyle: 'modern-sans',
  },
  {
    id: 'metal-cool',
    name: 'Metal Cool',
    description: 'Industrial metal with cool marble finish',
    pianoTheme: 'metal',
    backgroundTheme: 'cool',
    musicSheetTheme: 'paper-12',
    category: 'modern',
    headerStyle: 'modern-sans',
  },
  {
    id: 'rose-romance',
    name: 'Rose Romance',
    description: 'Elegant rose gold with soft cream tones',
    pianoTheme: 'roseGold',
    backgroundTheme: 'zen-sakura-dawn',
    musicSheetTheme: 'paper-5',
    category: 'modern',
    headerStyle: 'modern-sans',
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
    headerStyle: 'cultural-serif',

  },
  {
    id: 'chinese-imperial',
    name: 'Chinese Imperial',
    description: 'Palace vermillion gold with ancient scroll',
    pianoTheme: 'mahogany',
    backgroundTheme: 'gufeng-vermillion-gold',
    musicSheetTheme: 'paper-10',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  {
    id: 'ink-jade',
    name: 'Ink & Jade',
    description: 'Traditional Chinese ink painting with kraft paper',
    pianoTheme: 'black',
    backgroundTheme: 'gufeng-ink-jade',
    musicSheetTheme: 'paper-11',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  {
    id: 'hindu-sacred',
    name: 'Hindu Sacred',
    description: 'Saffron and marigold with delicate vellum',
    pianoTheme: 'roseGold',
    backgroundTheme: 'leela-saffron-marigold',
    musicSheetTheme: 'paper-13',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  {
    id: 'peacock-divine',
    name: 'Peacock Divine',
    description: 'Krishna\'s celestial hues with modern elegance',
    pianoTheme: 'metal',
    backgroundTheme: 'leela-peacock-divine',
    musicSheetTheme: 'paper-2',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  {
    id: 'earth-mystic',
    name: 'Earth Mystic',
    description: 'Spiritual earthy path with weathered paper',
    pianoTheme: 'mahogany',
    backgroundTheme: 'isha-earth-mystic',
    musicSheetTheme: 'paper-3',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  {
    id: 'divine-glory',
    name: 'Divine Glory',
    description: 'Sacred radiance with leather-bound elegance',
    pianoTheme: 'white',
    backgroundTheme: 'sacred-light-glory',
    musicSheetTheme: 'paper-14',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  {
    id: 'islamic-elegance',
    name: 'Islamic Elegance',
    description: 'Emerald and gold with marble sophistication',
    pianoTheme: 'metal',
    backgroundTheme: 'islamic-emerald-gold',
    musicSheetTheme: 'paper-12',
    category: 'cultural',
    headerStyle: 'cultural-serif',
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
    headerStyle: 'nature-serif',

  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Deep ocean gradient with notebook simplicity',
    pianoTheme: 'black',
    backgroundTheme: 'gradient-ocean',
    musicSheetTheme: 'paper-9',
    category: 'nature',
    headerStyle: 'nature-serif',
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
    headerStyle: 'artistic-italic',

  },
  {
    id: 'morning-light',
    name: 'Morning Light',
    description: 'Peaceful morning with textured linen',
    pianoTheme: 'white',
    backgroundTheme: 'morning-sky',
    musicSheetTheme: 'paper-6',
    category: 'artistic',
    headerStyle: 'artistic-italic',
  },
  
  // Vintage Presets
  {
    id: 'vintage-parlor',
    name: 'Vintage Parlor',
    description: 'Classic parlor piano with aged scroll',
    pianoTheme: 'mahogany',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-10',
    category: 'vintage',
    headerStyle: 'classic-serif',

  },
  {
    id: 'vintage-library',
    name: 'Vintage Library',
    description: 'Scholarly atmosphere with leather-bound notes',
    pianoTheme: 'wooden',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-14',
    category: 'vintage',
    headerStyle: 'classic-serif',
  },
  {
    id: 'vintage-attic',
    name: 'Vintage Attic',
    description: 'Dusty attic piano with kraft paper',
    pianoTheme: 'wooden',
    backgroundTheme: 'light-gray',
    musicSheetTheme: 'paper-11',
    category: 'vintage',
    headerStyle: 'classic-serif',
  },
  {
    id: 'vintage-salon',
    name: 'Vintage Salon',
    description: 'European salon with parchment elegance',
    pianoTheme: 'mahogany',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-4',
    category: 'vintage',
    headerStyle: 'classic-serif',
  },
  {
    id: 'vintage-conservatory',
    name: 'Vintage Conservatory',
    description: 'Music conservatory with classic vellum',
    pianoTheme: 'black',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-13',
    category: 'vintage',
    headerStyle: 'classic-serif',
  },
  
  // Professional Presets
  {
    id: 'concert-hall',
    name: 'Concert Hall',
    description: 'Grand concert hall with pristine modern paper',
    pianoTheme: 'black',
    backgroundTheme: 'white',
    musicSheetTheme: 'paper-2',
    category: 'professional',
    headerStyle: 'modern-sans',

  },
  {
    id: 'recording-studio',
    name: 'Recording Studio',
    description: 'Professional studio with clean white setup',
    pianoTheme: 'black',
    backgroundTheme: 'cool',
    musicSheetTheme: 'paper-2',
    category: 'professional',
    headerStyle: 'modern-sans',
  },
  {
    id: 'music-school',
    name: 'Music School',
    description: 'Educational environment with notebook paper',
    pianoTheme: 'white',
    backgroundTheme: 'light-gray',
    musicSheetTheme: 'paper-9',
    category: 'professional',
    headerStyle: 'modern-sans',
  },
  {
    id: 'office-piano',
    name: 'Office Piano',
    description: 'Corporate elegance with marble sophistication',
    pianoTheme: 'metal',
    backgroundTheme: 'light-gray',
    musicSheetTheme: 'paper-12',
    category: 'professional',
    headerStyle: 'modern-sans',
  },
  {
    id: 'theater-stage',
    name: 'Theater Stage',
    description: 'Theatrical black with dramatic aged paper',
    pianoTheme: 'black',
    backgroundTheme: 'dark',
    musicSheetTheme: 'paper-3',
    category: 'professional',
    headerStyle: 'modern-sans',
  },
  {
    id: 'jazz-club',
    name: 'Jazz Club',
    description: 'Moody jazz atmosphere with kraft paper',
    pianoTheme: 'black',
    backgroundTheme: 'dark',
    musicSheetTheme: 'paper-11',
    category: 'professional',
    headerStyle: 'modern-sans',
  },
  
  // Romantic Presets
  {
    id: 'romantic-serenade',
    name: 'Romantic Serenade',
    description: 'Rose gold elegance with cream romance',
    pianoTheme: 'roseGold',
    backgroundTheme: 'gradient-sunset',
    musicSheetTheme: 'paper-5',
    category: 'romantic',
    headerStyle: 'artistic-italic',

  },
  {
    id: 'moonlight-sonata',
    name: 'Moonlight Sonata',
    description: 'Ethereal white with soft linen',
    pianoTheme: 'white',
    backgroundTheme: 'morning-sky',
    musicSheetTheme: 'paper-6',
    category: 'romantic',
    headerStyle: 'artistic-italic',
  },
  {
    id: 'love-letters',
    name: 'Love Letters',
    description: 'Intimate rose gold with delicate vellum',
    pianoTheme: 'roseGold',
    backgroundTheme: 'zen-sakura-dawn',
    musicSheetTheme: 'paper-13',
    category: 'romantic',
    headerStyle: 'artistic-italic',
  },
  {
    id: 'sunset-piano',
    name: 'Sunset Piano',
    description: 'Golden hour warmth with vintage paper',
    pianoTheme: 'wooden',
    backgroundTheme: 'gradient-sunset',
    musicSheetTheme: 'paper-1',
    category: 'romantic',
    headerStyle: 'artistic-italic',
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    description: 'Sakura dreams with watercolor artistry',
    pianoTheme: 'white',
    backgroundTheme: 'zen-sakura-dawn',
    musicSheetTheme: 'paper-8',
    category: 'romantic',
    headerStyle: 'artistic-italic',
  },
  {
    id: 'candlelight',
    name: 'Candlelight',
    description: 'Warm candlelit evening with aged charm',
    pianoTheme: 'mahogany',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-3',
    category: 'romantic',
    headerStyle: 'artistic-italic',
  },
  
  // Energetic Presets
  {
    id: 'electric-burst',
    name: 'Electric Burst',
    description: 'Vibrant metal with notebook energy',
    pianoTheme: 'metal',
    backgroundTheme: 'gradient-forest',
    musicSheetTheme: 'paper-9',
    category: 'energetic',
    headerStyle: 'energetic-bold',

  },
  {
    id: 'tropical-vibes',
    name: 'Tropical Vibes',
    description: 'Bright white with forest freshness',
    pianoTheme: 'white',
    backgroundTheme: 'gradient-forest',
    musicSheetTheme: 'paper-7',
    category: 'energetic',
    headerStyle: 'energetic-bold',
  },
  {
    id: 'sunrise-energy',
    name: 'Sunrise Energy',
    description: 'Morning burst with canvas creativity',
    pianoTheme: 'roseGold',
    backgroundTheme: 'morning-sky',
    musicSheetTheme: 'paper-15',
    category: 'energetic',
    headerStyle: 'energetic-bold',
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    description: 'Dynamic ocean with watercolor flow',
    pianoTheme: 'white',
    backgroundTheme: 'gradient-ocean',
    musicSheetTheme: 'paper-8',
    category: 'energetic',
    headerStyle: 'energetic-bold',
  },
  {
    id: 'festival-lights',
    name: 'Festival Lights',
    description: 'Celebratory colors with modern sheets',
    pianoTheme: 'metal',
    backgroundTheme: 'gradient-sunset',
    musicSheetTheme: 'paper-2',
    category: 'energetic',
    headerStyle: 'energetic-bold',
  },
  {
    id: 'spring-bloom',
    name: 'Spring Bloom',
    description: 'Fresh spring with recycled eco paper',
    pianoTheme: 'white',
    backgroundTheme: 'gradient-forest',
    musicSheetTheme: 'paper-7',
    category: 'energetic',
    headerStyle: 'energetic-bold',
  },
  
  // Minimalist Presets
  {
    id: 'pure-white',
    name: 'Pure White',
    description: 'Ultimate minimalism with modern clarity',
    pianoTheme: 'white',
    backgroundTheme: 'white',
    musicSheetTheme: 'paper-2',
    category: 'minimalist',
    headerStyle: 'modern-sans',

  },
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    description: 'Fresh start with light gray simplicity',
    pianoTheme: 'white',
    backgroundTheme: 'light-gray',
    musicSheetTheme: 'paper-2',
    category: 'minimalist',
    headerStyle: 'modern-sans',
  },
  {
    id: 'zen-minimal',
    name: 'Zen Minimal',
    description: 'Peaceful simplicity with linen texture',
    pianoTheme: 'white',
    backgroundTheme: 'cool',
    musicSheetTheme: 'paper-6',
    category: 'minimalist',
    headerStyle: 'modern-sans',
  },
  {
    id: 'arctic-minimal',
    name: 'Arctic Minimal',
    description: 'Nordic ice with pristine morning sky',
    pianoTheme: 'nordicIce',
    backgroundTheme: 'white',
    musicSheetTheme: 'paper-2',
    category: 'minimalist',
    headerStyle: 'modern-sans',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Black and white with marble elegance',
    pianoTheme: 'black',
    backgroundTheme: 'light-gray',
    musicSheetTheme: 'paper-12',
    category: 'minimalist',
    headerStyle: 'modern-sans',
  },
  {
    id: 'simple-beauty',
    name: 'Simple Beauty',
    description: 'Understated white with cream warmth',
    pianoTheme: 'white',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-5',
    category: 'minimalist',
    headerStyle: 'modern-sans',
  },
  
  // Luxurious Presets
  {
    id: 'gold-standard',
    name: 'Gold Standard',
    description: 'Opulent rose gold with leather luxury',
    pianoTheme: 'roseGold',
    backgroundTheme: 'gufeng-vermillion-gold',
    musicSheetTheme: 'paper-14',
    category: 'luxurious',
    headerStyle: 'luxurious-light',

  },
  {
    id: 'royal-court',
    name: 'Royal Court',
    description: 'Regal mahogany with imperial vermillion',
    pianoTheme: 'mahogany',
    backgroundTheme: 'gufeng-vermillion-gold',
    musicSheetTheme: 'paper-10',
    category: 'luxurious',
    headerStyle: 'luxurious-light',
  },
  {
    id: 'diamond-nights',
    name: 'Diamond Nights',
    description: 'Sophisticated black with divine radiance',
    pianoTheme: 'black',
    backgroundTheme: 'sacred-light-glory',
    musicSheetTheme: 'paper-12',
    category: 'luxurious',
    headerStyle: 'luxurious-light',
  },
  {
    id: 'emerald-palace',
    name: 'Emerald Palace',
    description: 'Majestic metal with emerald gold',
    pianoTheme: 'metal',
    backgroundTheme: 'islamic-emerald-gold',
    musicSheetTheme: 'paper-12',
    category: 'luxurious',
    headerStyle: 'luxurious-light',
  },
  {
    id: 'platinum-suite',
    name: 'Platinum Suite',
    description: 'Premium metal with marble refinement',
    pianoTheme: 'metal',
    backgroundTheme: 'cool',
    musicSheetTheme: 'paper-12',
    category: 'luxurious',
    headerStyle: 'luxurious-light',
  },
  {
    id: 'velvet-lounge',
    name: 'Velvet Lounge',
    description: 'Plush mahogany with peacock divine',
    pianoTheme: 'mahogany',
    backgroundTheme: 'leela-peacock-divine',
    musicSheetTheme: 'paper-14',
    category: 'luxurious',
    headerStyle: 'luxurious-light',
  },
  {
    id: 'crystal-ballroom',
    name: 'Crystal Ballroom',
    description: 'Sparkling white with sacred glory',
    pianoTheme: 'white',
    backgroundTheme: 'sacred-light-glory',
    musicSheetTheme: 'paper-2',
    category: 'luxurious',
    headerStyle: 'luxurious-light',
  },
  
  // Additional Classic Presets
  {
    id: 'classical-concert',
    name: 'Classical Concert',
    description: 'Traditional concert with vintage paper',
    pianoTheme: 'black',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-1',
    category: 'classic',
    headerStyle: 'classic-serif',
  },
  {
    id: 'beethoven-legacy',
    name: 'Beethoven Legacy',
    description: 'Historic mahogany with parchment scroll',
    pianoTheme: 'mahogany',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-10',
    category: 'classic',
    headerStyle: 'classic-serif',
  },
  {
    id: 'mozart-chamber',
    name: 'Mozart Chamber',
    description: 'Chamber music with aged elegance',
    pianoTheme: 'wooden',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-3',
    category: 'classic',
    headerStyle: 'classic-serif',
  },
  
  // Additional Modern Presets
  {
    id: 'contemporary-studio',
    name: 'Contemporary Studio',
    description: 'Modern studio with sleek design',
    pianoTheme: 'metal',
    backgroundTheme: 'light-gray',
    musicSheetTheme: 'paper-2',
    category: 'modern',
    headerStyle: 'modern-sans',

  },
  {
    id: 'urban-loft',
    name: 'Urban Loft',
    description: 'Industrial loft with recycled paper',
    pianoTheme: 'metal',
    backgroundTheme: 'cool',
    musicSheetTheme: 'paper-7',
    category: 'modern',
    headerStyle: 'modern-sans',
  },
  {
    id: 'scandinavian-design',
    name: 'Scandinavian Design',
    description: 'Nordic minimalism with clean lines',
    pianoTheme: 'nordicIce',
    backgroundTheme: 'light-gray',
    musicSheetTheme: 'paper-2',
    category: 'modern',
    headerStyle: 'modern-sans',
  },
  
  // Additional Cultural Presets
  {
    id: 'tea-ceremony',
    name: 'Tea Ceremony',
    description: 'Japanese tea house with bamboo serenity',
    pianoTheme: 'wooden',
    backgroundTheme: 'zen-bamboo-stone',
    musicSheetTheme: 'paper-7',
    category: 'cultural',
    headerStyle: 'cultural-serif',

  },
  {
    id: 'temple-bells',
    name: 'Temple Bells',
    description: 'Sacred temple with saffron marigold',
    pianoTheme: 'wooden',
    backgroundTheme: 'leela-saffron-marigold',
    musicSheetTheme: 'paper-10',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  {
    id: 'silk-road',
    name: 'Silk Road',
    description: 'Ancient trade route with scroll wisdom',
    pianoTheme: 'mahogany',
    backgroundTheme: 'isha-earth-mystic',
    musicSheetTheme: 'paper-10',
    category: 'cultural',
    headerStyle: 'cultural-serif',
  },
  
  // Additional Nature Presets
  {
    id: 'mountain-mist',
    name: 'Mountain Mist',
    description: 'Misty mountains with bamboo stone',
    pianoTheme: 'wooden',
    backgroundTheme: 'zen-bamboo-stone',
    musicSheetTheme: 'paper-6',
    category: 'nature',
    headerStyle: 'nature-serif',

  },
  {
    id: 'rainforest',
    name: 'Rainforest',
    description: 'Lush rainforest with recycled eco paper',
    pianoTheme: 'wooden',
    backgroundTheme: 'gradient-forest',
    musicSheetTheme: 'paper-7',
    category: 'nature',
    headerStyle: 'nature-serif',
  },
  {
    id: 'desert-dunes',
    name: 'Desert Dunes',
    description: 'Sandy dunes with kraft texture',
    pianoTheme: 'wooden',
    backgroundTheme: 'isha-earth-mystic',
    musicSheetTheme: 'paper-11',
    category: 'nature',
    headerStyle: 'nature-serif',
  },
  {
    id: 'autumn-leaves',
    name: 'Autumn Leaves',
    description: 'Fall colors with canvas warmth',
    pianoTheme: 'mahogany',
    backgroundTheme: 'warm',
    musicSheetTheme: 'paper-15',
    category: 'nature',
    headerStyle: 'nature-serif',
  },
  
  // Additional Artistic Presets
  {
    id: 'impressionist',
    name: 'Impressionist',
    description: 'Monet-inspired with watercolor paper',
    pianoTheme: 'white',
    backgroundTheme: 'gradient-sunset',
    musicSheetTheme: 'paper-8',
    category: 'artistic',
    headerStyle: 'artistic-italic',

  },
  {
    id: 'abstract-expression',
    name: 'Abstract Expression',
    description: 'Bold colors with canvas texture',
    pianoTheme: 'roseGold',
    backgroundTheme: 'gradient-ocean',
    musicSheetTheme: 'paper-15',
    category: 'artistic',
    headerStyle: 'artistic-italic',
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    description: 'Geometric elegance with marble sophistication',
    pianoTheme: 'black',
    backgroundTheme: 'cool',
    musicSheetTheme: 'paper-12',
    category: 'artistic',
    headerStyle: 'artistic-italic',
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
    { id: 'vintage', name: 'Vintage', description: 'Old-world charm and nostalgia' },
    { id: 'professional', name: 'Professional', description: 'Concert halls and studios' },
    { id: 'romantic', name: 'Romantic', description: 'Soft, dreamy, and intimate' },
    { id: 'energetic', name: 'Energetic', description: 'Vibrant and lively combinations' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple aesthetics' },
    { id: 'luxurious', name: 'Luxurious', description: 'Premium and opulent styles' },
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
