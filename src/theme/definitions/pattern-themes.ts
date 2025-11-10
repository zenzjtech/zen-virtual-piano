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
} from './texture-generators';

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
  /** Optional CSS animation to apply to the pattern */
  animation?: {
    keyframes: string;
    duration: string;
    timingFunction: string;
    iterationCount: string;
  };
}

export type PatternThemeCategory = 
  | 'wood' 
  | 'metal' 
  | 'stone' 
  | 'cultural' 
  | 'geometric' 
  | 'natural'
  | 'sci-fi'
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
  'sci-fi': {
    name: 'Sci-Fi & Cyberpunk',
    description: 'Futuristic and digital patterns',
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
      'radial-gradient(ellipse 25px 30px at 50% 50%, transparent 18px, rgba(255, 153, 51, 0.35) 18px, rgba(255, 153, 51, 0.35) 19px, transparent 19px)',
      'radial-gradient(circle 40px at 25% 35%, transparent 30px, rgba(255, 176, 0, 0.28) 30px, rgba(255, 176, 0, 0.28) 31px, transparent 31px, transparent 35px, rgba(255, 153, 51, 0.24) 35px, rgba(255, 153, 51, 0.24) 36px, transparent 36px)',
      'radial-gradient(circle 40px at 75% 70%, transparent 30px, rgba(255, 176, 0, 0.24) 30px, rgba(255, 176, 0, 0.24) 31px, transparent 31px, transparent 35px, rgba(255, 153, 51, 0.20) 35px, rgba(255, 153, 51, 0.20) 36px, transparent 36px)'
    ].join(', '),
    afterPattern: [
      'repeating-conic-gradient(from 0deg at 25% 35%, transparent 0deg, transparent 35deg, rgba(255, 176, 0, 0.16) 35deg, rgba(255, 176, 0, 0.16) 37deg, transparent 37deg, transparent 72deg)',
      'repeating-conic-gradient(from 18deg at 75% 70%, transparent 0deg, transparent 35deg, rgba(255, 153, 51, 0.14) 35deg, rgba(255, 153, 51, 0.14) 37deg, transparent 37deg, transparent 72deg)',
      'radial-gradient(circle at 50% 50%, rgba(255, 176, 0, 0.12) 0%, transparent 60%)'
    ].join(', '),
    previewColors: ['#FF9933', '#FFB000', '#FFCC66'],
  },

  {
    id: 'lotus-scroll',
    name: 'Lotus Scroll',
    description: 'Elegant lotus flowers on a tranquil scroll',
    category: 'cultural',
    beforePattern: [
      /* Lotus Petal Base - larger, softer */
      'radial-gradient(ellipse 50% 30% at 50% 70%, rgba(255, 215, 230, 0.15) 0%, transparent 80%)',
      /* Lotus Petal Inner - smaller, brighter */
      'radial-gradient(ellipse 40% 25% at 50% 65%, rgba(255, 230, 240, 0.2) 0%, transparent 70%)',
      /* Scattered smaller lotus blooms */
      'radial-gradient(ellipse 20% 15% at 20% 30%, rgba(255, 230, 240, 0.18) 0%, transparent 70%)',
      'radial-gradient(ellipse 25% 18% at 80% 45%, rgba(255, 220, 235, 0.16) 0%, transparent 70%)',
    ].join(', '),
    afterPattern: [
      /* Scroll edges - subtle vertical lines */
      'linear-gradient(90deg, rgba(139, 115, 100, 0.1) 0%, transparent 2%, transparent 98%, rgba(139, 115, 100, 0.1) 100%)',
      /* Unfurled scroll texture - very faint horizontal lines */
      'repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(245, 235, 220, 0.03) 100px, rgba(245, 235, 220, 0.03) 101px)',
    ].join(', '),
    previewColors: ['#FFDDE5', '#F5EBDC', '#8B7364'],
  },

  {
    id: 'vajrayana-diamond',
    name: 'Vajrayana Diamond',
    description: 'Diamond vehicle patterns with thunderbolt energy',
    category: 'cultural',
    beforePattern: [
      /* Intersecting diamond shapes */
      'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(138, 43, 226, 0.04) 35px, rgba(138, 43, 226, 0.04) 36px)',
      'repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(75, 0, 130, 0.035) 35px, rgba(75, 0, 130, 0.035) 36px)',
      /* Center points of the vajra */
      'radial-gradient(circle 2px at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Energy rays from the center */
      'repeating-conic-gradient(from 45deg at 50% 50%, transparent 0deg, transparent 44deg, rgba(255, 215, 0, 0.05) 44deg, rgba(255, 215, 0, 0.05) 46deg, transparent 46deg, transparent 90deg)',
      /* Soft central glow */
      'radial-gradient(ellipse 120px 120px at 50% 50%, rgba(147, 112, 219, 0.06) 0%, transparent 70%)',
    ].join(', '),
    previewColors: ['#8A2BE2', '#FFD700', '#4B0082'],
  },

  {
    id: 'tatami-mat',
    name: 'Tatami Mat',
    description: 'Simple, clean lines of a traditional tatami mat',
    category: 'cultural',
    beforePattern: `
      repeating-linear-gradient(
        90deg,
        rgba(100, 110, 90, 0.08) 0,
        rgba(100, 110, 90, 0.08) 1px,
        transparent 1px,
        transparent 100px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(100, 110, 90, 0.05) 0,
        rgba(100, 110, 90, 0.05) 1px,
        transparent 1px,
        transparent 200px
      )
    `,
    afterPattern: '',
    previewColors: ['#B4C4B4', '#A4B4A4'],
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

  {
    id: 'starfield',
    name: 'Starfield',
    description: 'A subtle scattering of distant stars',
    category: 'natural',
    beforePattern: `
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4) 0.5px, transparent 1.5px),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0.5px, transparent 1.5px),
      radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.4) 1px, transparent 2px),
      radial-gradient(circle at 10% 80%, rgba(255, 255, 255, 0.3) 0.5px, transparent 1.5px),
      radial-gradient(circle at 90% 70%, rgba(255, 255, 255, 0.4) 0.5px, transparent 1.5px)
    `,
    afterPattern: '',
    previewColors: ['#FFFFFF', '#E0E0E0'],
    animation: {
      keyframes: `
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.2; }
      `,
      duration: '10s',
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
    },
  },

  {
    id: 'nebula',
    name: 'Nebula',
    description: 'Swirling cosmic gases and interstellar clouds',
    category: 'natural',
    beforePattern: `
      radial-gradient(ellipse 40% 50% at 20% 25%, rgba(180, 120, 220, 0.1), transparent 70%),
      radial-gradient(ellipse 50% 60% at 80% 75%, rgba(80, 150, 220, 0.1), transparent 70%),
      radial-gradient(ellipse 30% 40% at 50% 50%, rgba(220, 100, 150, 0.08), transparent 70%)
    `,
    afterPattern: '',
    previewColors: ['#B478DC', '#5096DC', '#DC6496'],
    animation: {
      keyframes: `
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.2; }
      `,
      duration: '10s',
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
    },
  },

  {
    id: 'cosmic-galaxy',
    name: 'Cosmic Galaxy',
    description: 'A rich tapestry of swirling nebulas and twinkling stars.',
    category: 'natural',
    beforePattern: `
      radial-gradient(ellipse 40% 50% at 20% 25%, rgba(180, 120, 220, 0.1), transparent 70%),
      radial-gradient(ellipse 50% 60% at 80% 75%, rgba(80, 150, 220, 0.1), transparent 70%),
      radial-gradient(ellipse 30% 40% at 50% 50%, rgba(220, 100, 150, 0.08), transparent 70%),
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4) 0.5px, transparent 1.5px),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0.5px, transparent 1.5px),
      radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.4) 1px, transparent 2px),
      radial-gradient(circle at 10% 80%, rgba(255, 255, 255, 0.3) 0.5px, transparent 1.5px),
      radial-gradient(circle at 90% 70%, rgba(255, 255, 255, 0.4) 0.5px, transparent 1.5px)
    `,
    afterPattern: '',
    previewColors: ['#B478DC', '#5096DC', '#FFFFFF'],
    animation: {
      keyframes: `
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.2; }
      `,
      duration: '10s',
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
    },
  },

  // ========== SCI-FI & CYBERPUNK PATTERNS ==========
  {
    id: 'glitch-grid',
    name: 'Glitch Grid',
    description: 'A glitchy, digital grid with neon highlights',
    category: 'sci-fi',
    beforePattern: `
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.05) 2px, rgba(0, 255, 255, 0.05) 4px),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 0, 255, 0.05) 2px, rgba(255, 0, 255, 0.05) 4px)
    `,
    afterPattern: `
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0, 255, 255, 0.1) 40px, rgba(0, 255, 255, 0.1) 41px),
      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255, 0, 255, 0.1) 40px, rgba(255, 0, 255, 0.1) 41px)
    `,
    previewColors: ['#00FFFF', '#FF00FF'],
    animation: {
      keyframes: `
        0% { transform: translate(0, 0); }
        10% { transform: translate(-2px, 2px); }
        20% { transform: translate(2px, -2px); }
        30% { transform: translate(0, 0); }
        100% { transform: translate(0, 0); }
      `,
      duration: '5s',
      timingFunction: 'steps(10, end)',
      iterationCount: 'infinite',
    },
  },

  // ========== NEW AGE SPIRITUAL PATTERNS ==========
  {
    id: 'crystal-energy',
    name: 'Crystal Energy',
    description: 'Sacred geometry with crystalline energy fields',
    category: 'cultural',
    beforePattern: [
      /* Sacred geometry hexagons */
      'repeating-linear-gradient(60deg, transparent, transparent 45px, rgba(147, 112, 219, 0.025) 45px, rgba(147, 112, 219, 0.025) 46px)',
      'repeating-linear-gradient(-60deg, transparent, transparent 45px, rgba(138, 43, 226, 0.02) 45px, rgba(138, 43, 226, 0.02) 46px)',
      'repeating-linear-gradient(0deg, transparent, transparent 45px, rgba(186, 85, 211, 0.015) 45px, rgba(186, 85, 211, 0.015) 46px)',
      /* Crystal nodes */
      'radial-gradient(circle 3px at 22% 28%, rgba(216, 191, 216, 0.15) 0%, rgba(216, 191, 216, 0.15) 100%, transparent 100%)',
      'radial-gradient(circle 2px at 68% 42%, rgba(221, 160, 221, 0.12) 0%, rgba(221, 160, 221, 0.12) 100%, transparent 100%)',
      'radial-gradient(circle 3px at 45% 65%, rgba(230, 230, 250, 0.10) 0%, rgba(230, 230, 250, 0.10) 100%, transparent 100%)',
      'radial-gradient(circle 2px at 78% 75%, rgba(218, 112, 214, 0.13) 0%, rgba(218, 112, 214, 0.13) 100%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Energy field glow */
      'radial-gradient(ellipse 180px 140px at 30% 35%, rgba(147, 112, 219, 0.04) 0%, transparent 60%)',
      'radial-gradient(ellipse 160px 120px at 70% 60%, rgba(186, 85, 211, 0.03) 0%, transparent 55%)',
      /* Sacred light rays */
      'repeating-conic-gradient(from 15deg at 30% 35%, transparent 0deg, transparent 28deg, rgba(221, 160, 221, 0.02) 28deg, rgba(221, 160, 221, 0.02) 30deg, transparent 30deg, transparent 60deg)',
    ].join(', '),
    previewColors: ['#9370DB', '#BA55D3', '#DDA0DD'],
  },

  {
    id: 'cosmic-mandala',
    name: 'Cosmic Mandala',
    description: 'Celestial mandala with universal consciousness patterns',
    category: 'cultural',
    beforePattern: [
      /* Mandala circles */
      'repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 55px, rgba(75, 0, 130, 0.025) 55px, rgba(75, 0, 130, 0.025) 57px, transparent 57px, transparent 110px)',
      'repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 80px, rgba(138, 43, 226, 0.02) 80px, rgba(138, 43, 226, 0.02) 81px, transparent 81px, transparent 160px)',
      /* Cosmic dots */
      'radial-gradient(circle 1.5px at 25% 25%, rgba(255, 215, 0, 0.18) 0%, rgba(255, 215, 0, 0.18) 100%, transparent 100%)',
      'radial-gradient(circle 1px at 75% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 100%, transparent 100%)',
      'radial-gradient(circle 1.5px at 35% 70%, rgba(255, 223, 186, 0.16) 0%, rgba(255, 223, 186, 0.16) 100%, transparent 100%)',
      'radial-gradient(circle 1px at 80% 65%, rgba(250, 250, 210, 0.14) 0%, rgba(250, 250, 210, 0.14) 100%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Cosmic rays */
      'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 22deg, rgba(138, 43, 226, 0.03) 22deg, rgba(138, 43, 226, 0.03) 23deg, transparent 23deg, transparent 45deg)',
      /* Universal glow */
      'radial-gradient(circle at 50% 50%, rgba(147, 112, 219, 0.05) 0%, rgba(138, 43, 226, 0.025) 30%, transparent 65%)',
      /* Star points */
      'repeating-conic-gradient(from 11.25deg at 50% 50%, transparent 0deg, transparent 21deg, rgba(255, 215, 0, 0.04) 21deg, rgba(255, 215, 0, 0.04) 24deg, transparent 24deg, transparent 45deg)',
    ].join(', '),
    previewColors: ['#9370DB', '#8A2BE2', '#FFD700'],
  },

  {
    id: 'chakra-flow',
    name: 'Chakra Flow',
    description: 'Energy centers with flowing spiritual light',
    category: 'cultural',
    beforePattern: [
      /* Chakra gradient bands */
      'linear-gradient(180deg, rgba(148, 0, 211, 0.015) 0%, transparent 14%, rgba(75, 0, 130, 0.015) 14%, transparent 28%, rgba(0, 0, 255, 0.015) 28%, transparent 42%, rgba(0, 255, 0, 0.015) 42%, transparent 56%, rgba(255, 255, 0, 0.015) 56%, transparent 70%, rgba(255, 127, 0, 0.015) 70%, transparent 84%, rgba(255, 0, 0, 0.015) 84%, transparent 100%)',
      /* Energy nodes */
      'radial-gradient(circle 4px at 50% 7%, rgba(148, 0, 211, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 50% 21%, rgba(75, 0, 130, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 50% 35%, rgba(0, 0, 255, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 50% 49%, rgba(0, 255, 0, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 50% 63%, rgba(255, 255, 0, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 50% 77%, rgba(255, 127, 0, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 50% 91%, rgba(255, 0, 0, 0.12) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Flowing energy */
      'radial-gradient(ellipse 100px 180px at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
      /* Subtle spiral */
      'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 85deg, rgba(255, 255, 255, 0.012) 85deg, rgba(255, 255, 255, 0.012) 95deg, transparent 95deg, transparent 180deg)',
    ].join(', '),
    previewColors: ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'],
  },

  // ========== SOLARIZED PATTERNS ==========
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    description: 'Subtle mathematical patterns using Solarized color ratios',
    category: 'cultural',
    beforePattern: `
      /* Solarized proportional rectangles */
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(101, 123, 131, 0.03) 40px, rgba(101, 123, 131, 0.03) 41px),
      repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(88, 110, 117, 0.025) 60px, rgba(88, 110, 117, 0.025) 61px),
      /* Golden ratio spirals */
      radial-gradient(ellipse 80px 50px at 20% 30%, rgba(38, 139, 210, 0.02) 0%, transparent 70%),
      radial-gradient(ellipse 60px 40px at 80% 70%, rgba(203, 75, 22, 0.02) 0%, transparent 70%)
    `,
    afterPattern: `
      /* Solarized accent highlights */
      linear-gradient(135deg, rgba(253, 246, 227, 0.1) 0%, rgba(238, 232, 213, 0.05) 40%, transparent 70%),
      /* Subtle Fibonacci sequence dots */
      radial-gradient(circle 2px at 25% 25%, rgba(42, 161, 152, 0.08) 0%, transparent 100%),
      radial-gradient(circle 2px at 75% 50%, rgba(108, 113, 196, 0.06) 0%, transparent 100%)
    `,
    previewColors: ['#fdf6e3', '#657b83', '#268bd2'],
  },

  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    description: 'Balanced dark patterns with Solarized color harmony',
    category: 'cultural',
    beforePattern: `
      /* Dark solarized grid */
      repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(131, 148, 150, 0.04) 50px, rgba(131, 148, 150, 0.04) 51px),
      repeating-linear-gradient(90deg, transparent, transparent 70px, rgba(147, 161, 161, 0.035) 70px, rgba(147, 161, 161, 0.035) 71px),
      /* Inverse golden ratio shapes */
      radial-gradient(ellipse 90px 60px at 25% 35%, rgba(38, 139, 210, 0.03) 0%, transparent 70%),
      radial-gradient(ellipse 70px 50px at 75% 65%, rgba(181, 137, 0, 0.03) 0%, transparent 70%)
    `,
    afterPattern: `
      /* Dark solarized highlights */
      linear-gradient(135deg, rgba(7, 54, 66, 0.15) 0%, rgba(0, 43, 54, 0.08) 40%, transparent 70%),
      /* Fibonacci dots in dark */
      radial-gradient(circle 2px at 30% 30%, rgba(42, 161, 152, 0.12) 0%, transparent 100%),
      radial-gradient(circle 2px at 70% 55%, rgba(211, 54, 130, 0.1) 0%, transparent 100%)
    `,
    previewColors: ['#002b36', '#839496', '#268bd2'],
  },

  // ========== MONOKAI PATTERNS ==========
  {
    id: 'monokai-light',
    name: 'Monokai Light',
    description: 'Bright Monokai-inspired patterns with vibrant syntax colors',
    category: 'cultural',
    beforePattern: `
      /* Monokai color grid */
      repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(249, 38, 114, 0.04) 30px, rgba(249, 38, 114, 0.04) 31px),
      repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(166, 226, 46, 0.03) 45px, rgba(166, 226, 46, 0.03) 46px),
      /* Syntax highlight dots */
      radial-gradient(circle 3px at 15% 20%, rgba(230, 219, 116, 0.1) 0%, transparent 100%),
      radial-gradient(circle 2px at 70% 40%, rgba(174, 129, 255, 0.08) 0%, transparent 100%)
    `,
    afterPattern: `
      /* Monokai accent highlights */
      linear-gradient(135deg, rgba(248, 248, 242, 0.15) 0%, rgba(230, 219, 116, 0.08) 40%, transparent 70%),
      /* Vibrant syntax dots */
      radial-gradient(circle 3px at 25% 25%, rgba(249, 38, 114, 0.12) 0%, transparent 100%),
      radial-gradient(circle 3px at 75% 60%, rgba(166, 226, 46, 0.1) 0%, transparent 100%)
    `,
    previewColors: ['#f8f8f2', '#f92672', '#a6e22e'],
  },

  {
    id: 'monokai-dark',
    name: 'Monokai Dark',
    description: 'Classic Monokai dark patterns with syntax highlighting accents',
    category: 'cultural',
    beforePattern: `
      /* Dark Monokai grid */
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(117, 113, 94, 0.06) 40px, rgba(117, 113, 94, 0.06) 41px),
      repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(73, 72, 62, 0.05) 55px, rgba(73, 72, 62, 0.05) 56px),
      /* Dark syntax accents */
      radial-gradient(circle 4px at 20% 25%, rgba(249, 38, 114, 0.08) 0%, transparent 100%),
      radial-gradient(circle 3px at 75% 45%, rgba(166, 226, 46, 0.06) 0%, transparent 100%)
    `,
    afterPattern: `
      /* Monokai dark highlights */
      linear-gradient(135deg, rgba(39, 40, 34, 0.2) 0%, rgba(30, 31, 27, 0.12) 40%, transparent 70%),
      /* Dark syntax highlights */
      radial-gradient(circle 4px at 30% 30%, rgba(230, 219, 116, 0.15) 0%, transparent 100%),
      radial-gradient(circle 4px at 70% 65%, rgba(174, 129, 255, 0.12) 0%, transparent 100%)
    `,
    previewColors: ['#272822', '#f92672', '#a6e22e'],
  },

  // ========== JAPANESE TEA CEREMONY PATTERNS ==========
  {
    id: 'tea-ceremony-wooden',
    name: 'Tea Ceremony (Wooden)',
    description: 'Japanese tea house tatami and bamboo leaf shadows for wooden pianos',
    category: 'cultural',
    beforePattern: [
      /* Tatami mat weave texture (horizontal) */
      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(85, 107, 47, 0.12) 3px, rgba(85, 107, 47, 0.12) 4px, transparent 4px, transparent 8px)',
      /* Tatami mat weave texture (vertical) */
      'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(80, 100, 45, 0.10) 2px, rgba(80, 100, 45, 0.10) 3px, transparent 3px, transparent 6px)',
      
      /* Bamboo leaf shadows - scattered naturally */
      'radial-gradient(ellipse 12px 28px at 18% 22%, rgba(75, 95, 40, 0.20) 0%, rgba(75, 95, 40, 0.12) 50%, transparent 80%)',
      'radial-gradient(ellipse 10px 24px at 35% 58%, rgba(70, 90, 38, 0.18) 0%, rgba(70, 90, 38, 0.10) 50%, transparent 78%)',
      'radial-gradient(ellipse 14px 30px at 68% 35%, rgba(78, 98, 42, 0.19) 0%, rgba(78, 98, 42, 0.11) 50%, transparent 82%)',
      'radial-gradient(ellipse 11px 26px at 82% 72%, rgba(72, 92, 39, 0.17) 0%, rgba(72, 92, 39, 0.09) 50%, transparent 75%)',
      
      /* Matcha tea swirl */
      'radial-gradient(ellipse 45px 45px at 25% 75%, rgba(100, 120, 60, 0.10) 0%, transparent 65%)',
      'conic-gradient(from 30deg at 25% 75%, transparent 0deg, rgba(95, 115, 58, 0.08) 90deg, transparent 180deg, rgba(90, 110, 55, 0.06) 270deg, transparent 360deg)',
    ].join(', '),
    afterPattern: [
      /* Wood grain enhancement for wooden piano */
      'linear-gradient(90deg, transparent 0%, rgba(74, 47, 26, 0.04) 25%, transparent 50%, rgba(70, 45, 24, 0.035) 75%, transparent 100%)',
      /* Zen circular harmony rings */
      'repeating-radial-gradient(circle at 75% 25%, transparent 0px, transparent 68px, rgba(100, 100, 100, 0.045) 68px, rgba(100, 100, 100, 0.045) 70px, transparent 70px, transparent 138px)',
      /* Warm wooden tea house glow */
      'radial-gradient(ellipse 140px 100px at 50% 50%, rgba(139, 90, 60, 0.05) 0%, transparent 70%)',
      /* Paper screen texture hint */
      'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(200, 200, 180, 0.025) 1px, rgba(200, 200, 180, 0.025) 2px)',
    ].join(', '),
    previewColors: ['#8B5A3C', '#6B8E23', '#556B2F'],
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
