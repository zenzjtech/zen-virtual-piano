// Background theme options
export interface BackgroundTheme {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient?: string;
  category: string;
}

export type BackgroundThemeCategory = 'basics' | 'cultural' | 'gradients';

export const BACKGROUND_THEME_CATEGORIES: Record<BackgroundThemeCategory, { name: string; description: string }> = {
  basics: {
    name: 'Basics',
    description: 'Simple solid colors',
  },
  cultural: {
    name: 'Cultural & Spiritual',
    description: 'Traditional and spiritual themes',
  },
  gradients: {
    name: 'Gradients',
    description: 'Beautiful gradient backgrounds',
  },
}

export const BACKGROUND_THEMES: BackgroundTheme[] = [
  // Basics
  {
    id: 'cool',
    name: 'Cool Blue',
    description: 'Cool blue-gray tone',
    color: '#F0F4F8',
    category: 'basics',
  },
  {
    id: 'white',
    name: 'Pure White',
    description: 'Clean white background',
    color: '#FFFFFF',
    category: 'basics',
  },
  {
    id: 'light-gray',
    name: 'Light Gray',
    description: 'Soft light gray background',
    color: '#F5F5F5',
    category: 'basics',
  },
  {
    id: 'warm',
    name: 'Warm Beige',
    description: 'Warm beige tone',
    color: '#FFF8F0',
    category: 'basics',
  },
  {
    id: 'dark',
    name: 'Dark Gray',
    description: 'Dark charcoal background',
    color: '#2C2C2C',
    category: 'basics',
  },
  // Cultural & Spiritual Themes
  {
    id: 'gufeng-ink-jade',
    name: 'Ink & Jade (墨玉)',
    description: 'Traditional Chinese ink and jade',
    color: '#3C4F5C',
    gradient: 'linear-gradient(135deg, #2C3E50 0%, #3C5A4E 50%, #4A6B5A 100%)',
    category: 'cultural',
  },
  {
    id: 'gufeng-vermillion-gold',
    name: 'Vermillion & Gold (朱金)',
    description: 'Imperial palace colors',
    color: '#C84B31',
    gradient: 'linear-gradient(135deg, #8B3A3A 0%, #C84B31 35%, #D4AF37 70%, #F4E5A1 100%)',
    category: 'cultural',
  },
  {
    id: 'zen-sakura-dawn',
    name: 'Sakura Dawn (桜の夜明け)',
    description: 'Cherry blossom at sunrise',
    color: '#FFB7C5',
    gradient: 'linear-gradient(135deg, #FFF5F7 0%, #FFE5EC 25%, #FFB7C5 60%, #FFA8B8 100%)',
    category: 'cultural',
  },
  {
    id: 'zen-bamboo-stone',
    name: 'Bamboo & Stone (竹石)',
    description: 'Zen garden tranquility',
    color: '#8B9D83',
    gradient: 'linear-gradient(135deg, #D4D9D4 0%, #B4C4B4 35%, #8B9D83 70%, #6B7B68 100%)',
    category: 'cultural',
  },
  {
    id: 'leela-saffron-marigold',
    name: 'Saffron & Marigold (केसर)',
    description: 'Sacred Hindu temple colors',
    color: '#FF9933',
    gradient: 'linear-gradient(135deg, #FFE5CC 0%, #FFB366 30%, #FF9933 60%, #CC6600 100%)',
    category: 'cultural',
  },
  {
    id: 'leela-peacock-divine',
    name: 'Peacock Divine (मयूर)',
    description: 'Krishna\'s celestial hues',
    color: '#4A90E2',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #4A90E2 25%, #2E5F8F 60%, #1A3A5C 100%)',
    category: 'cultural',
  },
  {
    id: 'isha-earth-mystic',
    name: 'Isha Earth Mystic (ईशा)',
    description: 'Sadhguru\'s earthy spiritual path',
    color: '#8B6F47',
    gradient: 'linear-gradient(135deg, #D4A574 0%, #B8956A 25%, #8B6F47 55%, #6B5B4A 80%, #4A4458 100%)',
    category: 'cultural',
  },
  {
    id: 'sacred-light-glory',
    name: 'Sacred Light & Glory',
    description: 'Divine radiance of stained glass',
    color: '#8B7355',
    gradient: 'linear-gradient(135deg, #FFF8E7 0%, #FFD700 20%, #E6B800 40%, #4169E1 70%, #2F4F7F 100%)',
    category: 'cultural',
  },
  {
    id: 'islamic-emerald-gold',
    name: 'Emerald & Gold (الزمرد)',
    description: 'Sacred Islamic art & calligraphy',
    color: '#00704A',
    gradient: 'linear-gradient(135deg, #F0E68C 0%, #DAA520 25%, #00704A 60%, #004D40 100%)',
    category: 'cultural',
  },
  {
    id: 'tibet-sacred-mountains',
    name: 'Sacred Mountains (གངས་རི)',
    description: 'Tibetan Buddhism meditation and enlightenment',
    color: '#8B2D3A',
    gradient: 'linear-gradient(135deg, #F4E5B8 0%, #D4A574 15%, #C84B31 35%, #8B2D3A 60%, #4A6FA5 85%, #2B4F6F 100%)',
    category: 'cultural',
  },
  // Gradients
  {
    id: 'gradient-sunset',
    name: 'Sunset Gradient',
    description: 'Warm sunset gradient',
    color: '#FF9A8B',
    gradient: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
    category: 'gradients',
  },
  {
    id: 'gradient-ocean',
    name: 'Ocean Gradient',
    description: 'Cool ocean gradient',
    color: '#667EEA',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    category: 'gradients',
  },
  {
    id: 'gradient-forest',
    name: 'Forest Gradient',
    description: 'Natural forest gradient',
    color: '#56AB2F',
    gradient: 'linear-gradient(135deg, #56AB2F 0%, #A8E063 100%)',
    category: 'gradients',
  },
  {
    id: 'morning-sky',
    name: 'Morning Sky',
    description: 'Peaceful morning sky gradient',
    color: '#B8E8F5',
    gradient: 'linear-gradient(135deg, #B8E8F5 0%, #D4F1F9 40%, #FFFFFF 100%)',
    category: 'gradients',
  },
];
