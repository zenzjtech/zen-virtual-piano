/**
 * Pattern Themes - The 4th Theme Component
 * 
 * Pattern themes define decorative surface textures and patterns that can be
 * applied to piano containers, backgrounds, or other UI elements.
 * 
 * This is an independent theme component equal to:
 * - Piano Themes
 * - Background Themes  
 * - Music Sheet Themes
 */

import {
  generateWoodGrain,
  generateWoodKnots,
  generateSacredPatterns,
  generateWoodHighlights,
  generateWoodRings,
  generatePrayerWheelSpokes,
  type WoodGrainConfig,
  type WoodKnotConfig,
  type SacredPatternConfig,
} from './themes/texture-generators';

export interface PatternTheme {
  id: string;
  name: string;
  description: string;
  category: PatternThemeCategory;
  /** Pattern to apply before main background */
  beforePattern: string;
  /** Pattern to apply after main background (overlays/highlights) */
  afterPattern: string;
  /** Optional preview colors for UI display */
  previewColors?: string[];
}

export type PatternThemeCategory = 
  | 'wood' 
  | 'metal' 
  | 'stone' 
  | 'cultural' 
  | 'geometric' 
  | 'natural'
  | 'none';

export const PATTERN_THEME_CATEGORIES: Record<PatternThemeCategory, { name: string; description: string }> = {
  none: {
    name: 'None',
    description: 'No decorative patterns',
  },
  wood: {
    name: 'Wood Textures',
    description: 'Natural wood grain and knot patterns',
  },
  metal: {
    name: 'Metal Finishes',
    description: 'Metallic textures and brushed finishes',
  },
  stone: {
    name: 'Stone & Marble',
    description: 'Natural stone and marble patterns',
  },
  cultural: {
    name: 'Cultural Patterns',
    description: 'Traditional and spiritual decorative patterns',
  },
  geometric: {
    name: 'Geometric',
    description: 'Abstract geometric patterns',
  },
  natural: {
    name: 'Natural Elements',
    description: 'Nature-inspired organic patterns',
  },
};

// ============================================================================
// PATTERN THEME DEFINITIONS
// ============================================================================

export const PATTERN_THEMES: PatternTheme[] = [
  // None
  {
    id: 'none',
    name: 'No Pattern',
    description: 'Clean surface without decorative patterns',
    category: 'none',
    beforePattern: '',
    afterPattern: '',
  },

  // ========== WOOD PATTERNS ==========
  {
    id: 'classic-wood',
    name: 'Classic Wood',
    description: 'Traditional wood grain with natural knots',
    category: 'wood',
    beforePattern: [
      generateWoodGrain({
        darkWood: 'rgba(74, 47, 26, 0.15)',
        mediumWood: 'rgba(60, 38, 21, 0.12)',
        lightWood: 'rgba(74, 47, 26, 0.08)',
        intensity: 0.9,
      }),
      generateWoodKnots({
        knots: [
          { color: 'rgba(60, 38, 21, 1)', width: 80, height: 60, x: 15, y: 25, opacity: 0.25 },
          { color: 'rgba(60, 38, 21, 1)', width: 100, height: 70, x: 75, y: 60, opacity: 0.2 },
          { color: 'rgba(50, 32, 18, 1)', width: 60, height: 50, x: 40, y: 80, opacity: 0.22 },
        ],
      }),
    ].join(','),
    afterPattern: [
      generateWoodHighlights(135),
      generateWoodRings({
        color: 'rgba(60, 38, 21, 1)',
        centerX: 30,
        centerY: 40,
      }),
    ].join(','),
    previewColors: ['#8B5A3C', '#6B4423', '#4A2F1A'],
  },

  {
    id: 'dark-mahogany',
    name: 'Dark Mahogany',
    description: 'Rich mahogany with deep grain patterns',
    category: 'wood',
    beforePattern: [
      generateWoodGrain({
        darkWood: 'rgba(60, 20, 15, 0.25)',
        mediumWood: 'rgba(45, 15, 10, 0.18)',
        lightWood: 'rgba(55, 18, 12, 0.15)',
        intensity: 1.1,
      }),
      generateWoodKnots({
        knots: [
          { color: 'rgba(40, 12, 8, 1)', width: 95, height: 75, x: 20, y: 30, opacity: 0.35 },
          { color: 'rgba(45, 15, 10, 1)', width: 85, height: 65, x: 70, y: 65, opacity: 0.3 },
        ],
      }),
    ].join(','),
    afterPattern: [
      generateWoodHighlights(140),
      generateWoodRings({
        color: 'rgba(40, 12, 8, 1)',
        centerX: 35,
        centerY: 45,
      }),
    ].join(','),
    previewColors: ['#6B2C1A', '#4A1F0E', '#3E1508'],
  },

  {
    id: 'light-oak',
    name: 'Light Oak',
    description: 'Bright oak with subtle grain',
    category: 'wood',
    beforePattern: [
      generateWoodGrain({
        darkWood: 'rgba(120, 90, 60, 0.12)',
        mediumWood: 'rgba(140, 110, 80, 0.09)',
        lightWood: 'rgba(130, 100, 70, 0.07)',
        intensity: 0.7,
      }),
      generateWoodKnots({
        knots: [
          { color: 'rgba(110, 80, 50, 1)', width: 70, height: 55, x: 18, y: 28, opacity: 0.18 },
          { color: 'rgba(100, 75, 45, 1)', width: 65, height: 50, x: 78, y: 68, opacity: 0.15 },
        ],
      }),
    ].join(','),
    afterPattern: [
      generateWoodHighlights(130),
      generateWoodRings({
        color: 'rgba(110, 80, 50, 1)',
        centerX: 32,
        centerY: 42,
      }),
    ].join(','),
    previewColors: ['#C8A882', '#B89968', '#A88A52'],
  },

  {
    id: 'bamboo-grain',
    name: 'Bamboo',
    description: 'Vertical bamboo grain texture',
    category: 'wood',
    beforePattern: [
      generateWoodGrain({
        darkWood: 'rgba(85, 107, 47, 0.16)',
        mediumWood: 'rgba(100, 125, 60, 0.12)',
        lightWood: 'rgba(90, 115, 52, 0.10)',
        intensity: 0.8,
      }),
      generateWoodKnots({
        knots: [
          { color: 'rgba(75, 95, 40, 1)', width: 50, height: 90, x: 25, y: 20, opacity: 0.2 },
          { color: 'rgba(70, 90, 38, 1)', width: 55, height: 95, x: 75, y: 60, opacity: 0.18 },
        ],
      }),
    ].join(','),
    afterPattern: generateWoodHighlights(125),
    previewColors: ['#8FBC8F', '#6B8E23', '#556B2F'],
  },

  // ========== CULTURAL/SACRED PATTERNS ==========
  {
    id: 'tibetan-sacred',
    name: 'Tibetan Sacred Wood',
    description: 'Prayer wheel engravings and sacred symbols',
    category: 'cultural',
    beforePattern: [
      generateWoodGrain({
        darkWood: 'rgba(60, 32, 18, 0.2)',
        mediumWood: 'rgba(50, 28, 15, 0.15)',
        lightWood: 'rgba(60, 32, 18, 0.12)',
      }),
      generateSacredPatterns({
        primary: 'rgba(200, 75, 49, 1)',
        secondary: 'rgba(166, 124, 82, 1)',
        prayerWheels: true,
        sacredSymbols: true,
      }),
      generateWoodKnots({
        knots: [
          { color: 'rgba(50, 28, 15, 1)', width: 90, height: 70, x: 25, y: 20, opacity: 0.3 },
          { color: 'rgba(50, 28, 15, 1)', width: 110, height: 80, x: 70, y: 75, opacity: 0.25 },
        ],
      }),
    ].join(','),
    afterPattern: [
      generateWoodHighlights(135),
      generatePrayerWheelSpokes({
        primary: 'rgba(200, 75, 49, 1)',
        secondary: 'rgba(166, 124, 82, 1)',
      }),
      generateWoodRings({
        color: 'rgba(50, 28, 15, 1)',
        centerX: 40,
        centerY: 50,
      }),
    ].join(','),
    previewColors: ['#C84B31', '#A67C52', '#7A4A2A'],
  },

  {
    id: 'prayer-wheels',
    name: 'Prayer Wheels',
    description: 'Sacred circular patterns without wood texture',
    category: 'cultural',
    beforePattern: generateSacredPatterns({
      primary: 'rgba(200, 75, 49, 1)',
      secondary: 'rgba(166, 124, 82, 1)',
      prayerWheels: true,
      sacredSymbols: true,
    }),
    afterPattern: generatePrayerWheelSpokes({
      primary: 'rgba(200, 75, 49, 1)',
      secondary: 'rgba(166, 124, 82, 1)',
    }),
    previewColors: ['#C84B31', '#A67C52'],
  },

  {
    id: 'om-symbols',
    name: 'Om Symbols',
    description: 'Sacred Om pattern hints',
    category: 'cultural',
    beforePattern: generateSacredPatterns({
      primary: 'rgba(255, 140, 0, 1)',
      secondary: 'rgba(218, 165, 32, 1)',
      prayerWheels: false,
      sacredSymbols: true,
    }),
    afterPattern: '',
    previewColors: ['#FF8C00', '#DAA520'],
  },

  {
    id: 'saffron-marigold',
    name: 'Saffron & Marigold',
    description: 'Hindu sacred colors with divine radial patterns',
    category: 'cultural',
    beforePattern: [
      'radial-gradient(ellipse 25px 30px at 50% 50%, transparent 18px, rgba(255, 153, 51, 0.15) 18px, rgba(255, 153, 51, 0.15) 19px, transparent 19px)',
      'radial-gradient(circle 40px at 25% 35%, transparent 30px, rgba(255, 176, 0, 0.12) 30px, rgba(255, 176, 0, 0.12) 31px, transparent 31px, transparent 35px, rgba(255, 153, 51, 0.1) 35px, rgba(255, 153, 51, 0.1) 36px, transparent 36px)',
      'radial-gradient(circle 40px at 75% 70%, transparent 30px, rgba(255, 176, 0, 0.1) 30px, rgba(255, 176, 0, 0.1) 31px, transparent 31px, transparent 35px, rgba(255, 153, 51, 0.08) 35px, rgba(255, 153, 51, 0.08) 36px, transparent 36px)'
    ].join(', '),
    afterPattern: [
      'repeating-conic-gradient(from 0deg at 25% 35%, transparent 0deg, transparent 35deg, rgba(255, 176, 0, 0.06) 35deg, rgba(255, 176, 0, 0.06) 37deg, transparent 37deg, transparent 72deg)',
      'repeating-conic-gradient(from 18deg at 75% 70%, transparent 0deg, transparent 35deg, rgba(255, 153, 51, 0.05) 35deg, rgba(255, 153, 51, 0.05) 37deg, transparent 37deg, transparent 72deg)',
      'radial-gradient(circle at 50% 50%, rgba(255, 176, 0, 0.04) 0%, transparent 60%)'
    ].join(', '),
    previewColors: ['#FF9933', '#FFB000', '#FFCC66'],
  },

  // ========== METAL PATTERNS ==========
  {
    id: 'brushed-metal',
    name: 'Brushed Metal',
    description: 'Brushed metallic finish',
    category: 'metal',
    beforePattern: `
      /* Brushed metal lines */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 1px,
        rgba(255, 255, 255, 0.03) 1px,
        rgba(255, 255, 255, 0.03) 2px,
        transparent 2px,
        transparent 4px
      )
    `,
    afterPattern: `
      /* Metallic highlights */
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 40%,
        transparent 70%
      )
    `,
    previewColors: ['#C0C0C0', '#A8A8A8', '#909090'],
  },

  {
    id: 'polished-chrome',
    name: 'Polished Chrome',
    description: 'Highly reflective chrome surface',
    category: 'metal',
    beforePattern: `
      /* Chrome reflections */
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.08) 20px,
        rgba(255, 255, 255, 0.08) 40px,
        transparent 40px,
        transparent 60px,
        rgba(0, 0, 0, 0.05) 60px,
        rgba(0, 0, 0, 0.05) 80px
      )
    `,
    afterPattern: `
      /* Chrome shine */
      linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        transparent 50%,
        rgba(0, 0, 0, 0.08) 70%,
        transparent 100%
      )
    `,
    previewColors: ['#E8E8E8', '#D0D0D0', '#B8B8B8'],
  },

  // ========== STONE PATTERNS ==========
  {
    id: 'marble-veins',
    name: 'Marble Veins',
    description: 'Natural marble vein patterns',
    category: 'stone',
    beforePattern: `
      /* Marble veins */
      repeating-radial-gradient(
        ellipse at 30% 40%,
        transparent 0px,
        transparent 150px,
        rgba(100, 100, 100, 0.06) 150px,
        rgba(100, 100, 100, 0.06) 155px,
        transparent 155px,
        transparent 300px
      ),
      repeating-radial-gradient(
        ellipse at 70% 60%,
        transparent 0px,
        transparent 120px,
        rgba(120, 120, 120, 0.04) 120px,
        rgba(120, 120, 120, 0.04) 124px,
        transparent 124px,
        transparent 250px
      )
    `,
    afterPattern: `
      /* Marble polish */
      linear-gradient(
        150deg,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        transparent 100%
      )
    `,
    previewColors: ['#F5F5F5', '#E0E0E0', '#D5D5D5'],
  },

  {
    id: 'granite-speckle',
    name: 'Granite Speckle',
    description: 'Speckled granite texture',
    category: 'stone',
    beforePattern: `
      /* Granite speckles */
      radial-gradient(circle at 15% 20%, rgba(80, 80, 80, 0.08) 0%, rgba(80, 80, 80, 0.08) 2px, transparent 2px),
      radial-gradient(circle at 35% 45%, rgba(60, 60, 60, 0.06) 0%, rgba(60, 60, 60, 0.06) 1.5px, transparent 1.5px),
      radial-gradient(circle at 65% 30%, rgba(90, 90, 90, 0.07) 0%, rgba(90, 90, 90, 0.07) 2.5px, transparent 2.5px),
      radial-gradient(circle at 80% 70%, rgba(70, 70, 70, 0.05) 0%, rgba(70, 70, 70, 0.05) 1.8px, transparent 1.8px),
      radial-gradient(circle at 50% 80%, rgba(85, 85, 85, 0.06) 0%, rgba(85, 85, 85, 0.06) 2.2px, transparent 2.2px)
    `,
    afterPattern: '',
    previewColors: ['#787878', '#656565', '#525252'],
  },

  // ========== GEOMETRIC PATTERNS ==========
  {
    id: 'hexagon-grid',
    name: 'Hexagon Grid',
    description: 'Subtle hexagonal pattern',
    category: 'geometric',
    beforePattern: `
      /* Hexagon pattern */
      repeating-linear-gradient(
        60deg,
        transparent,
        transparent 50px,
        rgba(128, 128, 128, 0.04) 50px,
        rgba(128, 128, 128, 0.04) 51px
      ),
      repeating-linear-gradient(
        -60deg,
        transparent,
        transparent 50px,
        rgba(128, 128, 128, 0.04) 50px,
        rgba(128, 128, 128, 0.04) 51px
      )
    `,
    afterPattern: '',
    previewColors: ['#E0E0E0', '#C8C8C8', '#B0B0B0'],
  },

  {
    id: 'diagonal-lines',
    name: 'Diagonal Lines',
    description: 'Clean diagonal line pattern',
    category: 'geometric',
    beforePattern: `
      /* Diagonal lines */
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 30px,
        rgba(128, 128, 128, 0.05) 30px,
        rgba(128, 128, 128, 0.05) 31px
      )
    `,
    afterPattern: '',
    previewColors: ['#D8D8D8', '#C0C0C0'],
  },

  // ========== NATURAL PATTERNS ==========
  {
    id: 'cloud-wisps',
    name: 'Cloud Wisps',
    description: 'Soft wispy cloud-like patterns',
    category: 'natural',
    beforePattern: `
      /* Cloud wisps */
      radial-gradient(
        ellipse 200px 100px at 20% 30%,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.04) 40%,
        transparent 70%
      ),
      radial-gradient(
        ellipse 250px 120px at 75% 60%,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.03) 45%,
        transparent 75%
      )
    `,
    afterPattern: '',
    previewColors: ['#F8F8F8', '#F0F0F0'],
  },

  {
    id: 'water-ripple',
    name: 'Water Ripple',
    description: 'Concentric ripple patterns',
    category: 'natural',
    beforePattern: `
      /* Water ripples */
      repeating-radial-gradient(
        circle at 50% 50%,
        transparent 0px,
        transparent 80px,
        rgba(100, 150, 200, 0.03) 80px,
        rgba(100, 150, 200, 0.03) 82px,
        transparent 82px,
        transparent 160px
      )
    `,
    afterPattern: '',
    previewColors: ['#B0D0E8', '#90B8D8'],
  },
];

// Helper function to get pattern theme by ID
export function getPatternTheme(id: string): PatternTheme {
  return PATTERN_THEMES.find(theme => theme.id === id) || PATTERN_THEMES[0];
}

// Get all pattern themes by category
export function getPatternThemesByCategory(category: PatternThemeCategory): PatternTheme[] {
  return PATTERN_THEMES.filter(theme => theme.category === category);
}

// Get all pattern themes
export function getAllPatternThemes(): PatternTheme[] {
  return PATTERN_THEMES;
}
