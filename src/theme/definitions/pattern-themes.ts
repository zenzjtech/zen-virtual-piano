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

  // ========== DRACULA PATTERNS ==========
  {
    id: 'dracula-dark',
    name: 'Dracula Dark',
    description: 'Classic Dracula dark patterns with high contrast and vibrant syntax accents',
    category: 'cultural',
    beforePattern: [
      /* Dracula dark grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(68, 71, 90, 0.06) 40px, rgba(68, 71, 90, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(49, 50, 68, 0.05) 55px, rgba(49, 50, 68, 0.05) 56px)',
      /* Dracula syntax accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(255, 121, 198, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(80, 250, 123, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Dracula dark highlights */
      'linear-gradient(135deg, rgba(40, 42, 54, 0.2) 0%, rgba(33, 34, 44, 0.12) 40%, transparent 70%)',
      /* Dracula vibrant highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(255, 184, 108, 0.15) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(189, 147, 249, 0.12) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#282a36', '#ff79c6', '#50fa7b'],
  },

  // ========== GITHUB PATTERNS ==========
  {
    id: 'github-light',
    name: 'GitHub Light',
    description: 'GitHub\'s official light theme patterns with clean design and professional blue accents',
    category: 'cultural',
    beforePattern: [
      /* GitHub light grid */
      'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(209, 217, 224, 0.03) 30px, rgba(209, 217, 224, 0.03) 31px)',
      'repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(246, 248, 250, 0.02) 45px, rgba(246, 248, 250, 0.02) 46px)',
      /* GitHub light accents */
      'radial-gradient(circle 3px at 15% 20%, rgba(9, 105, 218, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 70% 40%, rgba(9, 105, 218, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* GitHub light highlights */
      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(246, 248, 250, 0.08) 40%, transparent 70%)',
      /* Clean blue accents */
      'radial-gradient(circle 3px at 25% 25%, rgba(9, 105, 218, 0.1) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 60%, rgba(9, 105, 218, 0.08) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#ffffff', '#0969da', '#24292f'],
  },

  {
    id: 'github-dark',
    name: 'GitHub Dark',
    description: 'GitHub\'s official dark theme patterns with professional blue accents and clean design',
    category: 'cultural',
    beforePattern: [
      /* GitHub dark grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(48, 54, 61, 0.06) 40px, rgba(48, 54, 61, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(22, 27, 34, 0.05) 55px, rgba(22, 27, 34, 0.05) 56px)',
      /* GitHub dark accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(88, 166, 255, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(88, 166, 255, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* GitHub dark highlights */
      'linear-gradient(135deg, rgba(13, 17, 23, 0.2) 0%, rgba(22, 27, 34, 0.12) 40%, transparent 70%)',
      /* Professional blue highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(88, 166, 255, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(88, 166, 255, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#0d1117', '#58a6ff', '#f0f6fc'],
  },

  // ========== ONE DARK PRO PATTERNS ==========
  {
    id: 'one-dark-pro',
    name: 'One Dark Pro',
    description: 'Popular dark theme patterns with Material Design influence and balanced colors',
    category: 'cultural',
    beforePattern: [
      /* One Dark Pro grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(62, 68, 81, 0.06) 40px, rgba(62, 68, 81, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(33, 37, 43, 0.05) 55px, rgba(33, 37, 43, 0.05) 56px)',
      /* One Dark Pro accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(97, 218, 251, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(152, 195, 121, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* One Dark Pro highlights */
      'linear-gradient(135deg, rgba(40, 44, 52, 0.2) 0%, rgba(33, 37, 43, 0.12) 40%, transparent 70%)',
      /* Professional blue highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(97, 218, 251, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(152, 195, 121, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#282c34', '#61dafb', '#98c379'],
  },

  // ========== AYU PATTERNS ==========
  {
    id: 'ayu-light',
    name: 'Ayu Light',
    description: 'Clean light theme patterns with soft colors and pleasant text readability',
    category: 'cultural',
    beforePattern: [
      /* Ayu light grid */
      'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(228, 232, 240, 0.03) 30px, rgba(228, 232, 240, 0.03) 31px)',
      'repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(242, 244, 247, 0.02) 45px, rgba(242, 244, 247, 0.02) 46px)',
      /* Ayu light accents */
      'radial-gradient(circle 3px at 15% 20%, rgba(255, 143, 64, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 70% 40%, rgba(255, 143, 64, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Ayu light highlights */
      'linear-gradient(135deg, rgba(250, 250, 250, 0.15) 0%, rgba(242, 244, 247, 0.08) 40%, transparent 70%)',
      /* Soft orange accents */
      'radial-gradient(circle 3px at 25% 25%, rgba(255, 143, 64, 0.1) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 60%, rgba(255, 143, 64, 0.08) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#fafafa', '#ff8f40', '#5c6773'],
  },

  {
    id: 'ayu-mirage',
    name: 'Ayu Mirage',
    description: 'Balanced theme patterns between light and dark with soft colors',
    category: 'cultural',
    beforePattern: [
      /* Ayu mirage grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(65, 72, 81, 0.06) 40px, rgba(65, 72, 81, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(43, 48, 59, 0.05) 55px, rgba(43, 48, 59, 0.05) 56px)',
      /* Ayu mirage accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(255, 204, 102, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(255, 204, 102, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Ayu mirage highlights */
      'linear-gradient(135deg, rgba(33, 39, 51, 0.2) 0%, rgba(43, 48, 59, 0.12) 40%, transparent 70%)',
      /* Balanced yellow highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(255, 204, 102, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(255, 204, 102, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#212733', '#ffcc66', '#d9d7ce'],
  },

  {
    id: 'ayu-dark',
    name: 'Ayu Dark',
    description: 'Modern dark theme patterns with high contrast and vibrant accents',
    category: 'cultural',
    beforePattern: [
      /* Ayu dark grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(43, 48, 59, 0.06) 40px, rgba(43, 48, 59, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(21, 25, 33, 0.05) 55px, rgba(21, 25, 33, 0.05) 56px)',
      /* Ayu dark accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(57, 186, 230, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(57, 186, 230, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Ayu dark highlights */
      'linear-gradient(135deg, rgba(10, 14, 20, 0.2) 0%, rgba(21, 25, 33, 0.12) 40%, transparent 70%)',
      /* Vibrant cyan highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(57, 186, 230, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(57, 186, 230, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#0a0e14', '#39bae6', '#e6e1cf'],
  },

  // ========== NIGHT OWL PATTERNS ==========
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Dark blue theme patterns perfect for late-night coding sessions',
    category: 'cultural',
    beforePattern: [
      /* Night Owl grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(42, 54, 67, 0.06) 40px, rgba(42, 54, 67, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(12, 32, 47, 0.05) 55px, rgba(12, 32, 47, 0.05) 56px)',
      /* Night Owl accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(130, 170, 255, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(130, 170, 255, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Night Owl highlights */
      'linear-gradient(135deg, rgba(1, 22, 39, 0.2) 0%, rgba(12, 32, 47, 0.12) 40%, transparent 70%)',
      /* Blue highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(130, 170, 255, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(130, 170, 255, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#011627', '#82aaff', '#d6deeb'],
  },

  // ========== TOKYO NIGHT PATTERNS ==========
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    description: 'Cyberpunk-inspired theme patterns with neon accents and glowing lights',
    category: 'cultural',
    beforePattern: [
      /* Tokyo Night grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(54, 61, 82, 0.06) 40px, rgba(54, 61, 82, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(37, 40, 54, 0.05) 55px, rgba(37, 40, 54, 0.05) 56px)',
      /* Tokyo Night accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(125, 207, 255, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(125, 207, 255, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Tokyo Night highlights */
      'linear-gradient(135deg, rgba(26, 27, 38, 0.2) 0%, rgba(37, 40, 54, 0.12) 40%, transparent 70%)',
      /* Neon cyan highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(125, 207, 255, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(125, 207, 255, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#1a1b26', '#7dcfff', '#c0caf5'],
  },

  // ========== SHADES OF PURPLE PATTERNS ==========
  {
    id: 'shades-of-purple',
    name: 'Shades of Purple',
    description: 'Bold purple color scheme patterns with elegant, sophisticated look',
    category: 'cultural',
    beforePattern: [
      /* Shades of Purple grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(77, 67, 134, 0.06) 40px, rgba(77, 67, 134, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(55, 52, 95, 0.05) 55px, rgba(55, 52, 95, 0.05) 56px)',
      /* Purple accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(250, 208, 0, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(250, 208, 0, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Purple highlights */
      'linear-gradient(135deg, rgba(45, 43, 85, 0.2) 0%, rgba(55, 52, 95, 0.12) 40%, transparent 70%)',
      /* Yellow highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(250, 208, 0, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(250, 208, 0, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#2d2b55', '#fad000', '#ffffff'],
  },

  // ========== MATERIAL THEME PATTERNS ==========
  {
    id: 'material',
    name: 'Material Theme',
    description: 'Google\'s Material Design patterns with modern dark aesthetics',
    category: 'cultural',
    beforePattern: [
      /* Material Theme grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(84, 110, 122, 0.06) 40px, rgba(84, 110, 122, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(55, 71, 79, 0.05) 55px, rgba(55, 71, 79, 0.05) 56px)',
      /* Material accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(128, 203, 196, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(128, 203, 196, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Material highlights */
      'linear-gradient(135deg, rgba(38, 50, 56, 0.2) 0%, rgba(55, 71, 79, 0.12) 40%, transparent 70%)',
      /* Teal highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(128, 203, 196, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(128, 203, 196, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#263238', '#80cbc4', '#eeffff'],
  },

  {
    id: 'community-material',
    name: 'Community Material',
    description: 'Enhanced Material theme patterns with more refined color variants',
    category: 'cultural',
    beforePattern: [
      /* Community Material grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(84, 110, 122, 0.06) 40px, rgba(84, 110, 122, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(55, 71, 79, 0.05) 55px, rgba(55, 71, 79, 0.05) 56px)',
      /* Community Material accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(130, 177, 255, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(130, 177, 255, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Community Material highlights */
      'linear-gradient(135deg, rgba(38, 50, 56, 0.2) 0%, rgba(55, 71, 79, 0.12) 40%, transparent 70%)',
      /* Blue highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(130, 177, 255, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(130, 177, 255, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#263238', '#82b1ff', '#eeffff'],
  },

  {
    id: 'bluloco-dark',
    name: 'Bluloco Dark',
    description: 'Sophisticated designer color scheme patterns with enhanced syntax highlighting',
    category: 'cultural',
    beforePattern: [
      /* Bluloco Dark grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(92, 99, 112, 0.06) 40px, rgba(92, 99, 112, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(33, 37, 43, 0.05) 55px, rgba(33, 37, 43, 0.05) 56px)',
      /* Bluloco accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(152, 195, 121, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(152, 195, 121, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Bluloco highlights */
      'linear-gradient(135deg, rgba(40, 44, 52, 0.2) 0%, rgba(33, 37, 43, 0.12) 40%, transparent 70%)',
      /* Green highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(152, 195, 121, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(152, 195, 121, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#282c34', '#98c379', '#abb2bf'],
  },

  {
    id: 'bluloco-light',
    name: 'Bluloco Light',
    description: 'Clean and sophisticated light designer color scheme patterns',
    category: 'cultural',
    beforePattern: [
      /* Bluloco Light grid */
      'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(160, 161, 167, 0.03) 30px, rgba(160, 161, 167, 0.03) 31px)',
      'repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(242, 244, 247, 0.02) 45px, rgba(242, 244, 247, 0.02) 46px)',
      /* Bluloco Light accents */
      'radial-gradient(circle 3px at 15% 20%, rgba(80, 161, 79, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 70% 40%, rgba(80, 161, 79, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Bluloco Light highlights */
      'linear-gradient(135deg, rgba(250, 250, 250, 0.15) 0%, rgba(242, 244, 247, 0.08) 40%, transparent 70%)',
      /* Green highlights */
      'radial-gradient(circle 3px at 25% 25%, rgba(80, 161, 79, 0.1) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 60%, rgba(80, 161, 79, 0.08) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#fafafa', '#50a14f', '#383a42'],
  },

  {
    id: 'rouge',
    name: 'Rouge',
    description: 'Material-inspired theme patterns with flushed color palette',
    category: 'cultural',
    beforePattern: [
      /* Rouge grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(107, 114, 128, 0.06) 40px, rgba(107, 114, 128, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(34, 47, 58, 0.05) 55px, rgba(34, 47, 58, 0.05) 56px)',
      /* Rouge accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(243, 139, 168, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(243, 139, 168, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Rouge highlights */
      'linear-gradient(135deg, rgba(23, 40, 49, 0.2) 0%, rgba(34, 47, 58, 0.12) 40%, transparent 70%)',
      /* Pink highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(243, 139, 168, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(243, 139, 168, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#172831', '#f38ba8', '#d1d5db'],
  },

  {
    id: 'sublime-material',
    name: 'Sublime Material',
    description: 'Material theme patterns inspired by Sublime Text with red-pink accents',
    category: 'cultural',
    beforePattern: [
      /* Sublime Material grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(84, 110, 122, 0.06) 40px, rgba(84, 110, 122, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(55, 71, 79, 0.05) 55px, rgba(55, 71, 79, 0.05) 56px)',
      /* Sublime Material accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(255, 83, 112, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(255, 83, 112, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Sublime Material highlights */
      'linear-gradient(135deg, rgba(38, 50, 56, 0.2) 0%, rgba(55, 71, 79, 0.12) 40%, transparent 70%)',
      /* Red-pink highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(255, 83, 112, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(255, 83, 112, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#263238', '#ff5370', '#eeffff'],
  },

  {
    id: 'nord',
    name: 'Nord',
    description: 'Soft, cold Nordic-inspired color patterns with arctic blue and green accents',
    category: 'cultural',
    beforePattern: [
      /* Nord grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(97, 110, 136, 0.06) 40px, rgba(97, 110, 136, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(59, 66, 82, 0.05) 55px, rgba(59, 66, 82, 0.05) 56px)',
      /* Nord accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(136, 192, 208, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(163, 190, 140, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Nord highlights */
      'linear-gradient(135deg, rgba(46, 52, 64, 0.2) 0%, rgba(59, 66, 82, 0.12) 40%, transparent 70%)',
      /* Frost highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(136, 192, 208, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(163, 190, 140, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#2e3440', '#88c0d0', '#d8dee9'],
  },

  {
    id: 'atom-one-dark',
    name: 'Atom One Dark',
    description: 'Clean theme patterns from the Atom editor with balanced grays and blue accents',
    category: 'cultural',
    beforePattern: [
      /* Atom One Dark grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(92, 99, 112, 0.06) 40px, rgba(92, 99, 112, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(43, 45, 51, 0.05) 55px, rgba(43, 45, 51, 0.05) 56px)',
      /* Atom One Dark accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(97, 175, 239, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(97, 175, 239, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Atom One Dark highlights */
      'linear-gradient(135deg, rgba(30, 33, 39, 0.2) 0%, rgba(43, 45, 51, 0.12) 40%, transparent 70%)',
      /* Blue highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(97, 175, 239, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(97, 175, 239, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#1e2127', '#61afef', '#abb2bf'],
  },

  // ========== VIBRANT THEMES PATTERNS ==========
  {
    id: 'synthwave84',
    name: 'SynthWave \'84',
    description: 'Retro 80s neon patterns with vibrant pinks, purples, and cyberpunk accents',
    category: 'cultural',
    beforePattern: [
      /* SynthWave grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(132, 139, 189, 0.06) 40px, rgba(132, 139, 189, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(74, 49, 89, 0.05) 55px, rgba(74, 49, 89, 0.05) 56px)',
      /* SynthWave neon accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(249, 42, 173, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(255, 203, 107, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* SynthWave highlights */
      'linear-gradient(135deg, rgba(42, 33, 57, 0.2) 0%, rgba(74, 49, 89, 0.12) 40%, transparent 70%)',
      /* Neon highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(249, 42, 173, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(255, 203, 107, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#2a2139', '#f92aad', '#ffeb95'],
  },

  {
    id: 'panda',
    name: 'Panda',
    description: 'Japanese-inspired patterns with pandas and vibrant pink and cyan accents',
    category: 'cultural',
    beforePattern: [
      /* Panda grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(75, 83, 98, 0.06) 40px, rgba(75, 83, 98, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(51, 58, 72, 0.05) 55px, rgba(51, 58, 72, 0.05) 56px)',
      /* Panda accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(255, 117, 181, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(25, 249, 216, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Panda highlights */
      'linear-gradient(135deg, rgba(31, 36, 48, 0.2) 0%, rgba(51, 58, 72, 0.12) 40%, transparent 70%)',
      /* Vibrant highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(255, 117, 181, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(25, 249, 216, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#1f2430', '#ff75b5', '#19f9d8'],
  },

  {
    id: 'hop-light',
    name: 'Hop Light',
    description: 'Bright and refreshing light patterns with vibrant orange, green, and pink accents',
    category: 'cultural',
    beforePattern: [
      /* Hop Light grid */
      'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(150, 152, 150, 0.03) 30px, rgba(150, 152, 150, 0.03) 31px)',
      'repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(248, 250, 252, 0.02) 45px, rgba(248, 250, 252, 0.02) 46px)',
      /* Hop Light accents */
      'radial-gradient(circle 3px at 15% 20%, rgba(253, 151, 31, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 70% 40%, rgba(166, 226, 46, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Hop Light highlights */
      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(248, 250, 252, 0.08) 40%, transparent 70%)',
      /* Bright highlights */
      'radial-gradient(circle 3px at 25% 25%, rgba(249, 38, 114, 0.1) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 60%, rgba(253, 151, 31, 0.08) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#ffffff', '#fd971f', '#a6e22e'],
  },

  {
    id: 'snazzy-light',
    name: 'Snazzy Light',
    description: 'Vibrant modern light patterns with orange, teal, and blue accents',
    category: 'cultural',
    beforePattern: [
      /* Snazzy Light grid */
      'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(139, 148, 158, 0.03) 30px, rgba(139, 148, 158, 0.03) 31px)',
      'repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(230, 232, 235, 0.02) 45px, rgba(230, 232, 235, 0.02) 46px)',
      /* Snazzy Light accents */
      'radial-gradient(circle 3px at 15% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 70% 40%, rgba(78, 205, 196, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Snazzy Light highlights */
      'linear-gradient(135deg, rgba(241, 241, 241, 0.15) 0%, rgba(230, 232, 235, 0.08) 40%, transparent 70%)',
      /* Colorful highlights */
      'radial-gradient(circle 3px at 25% 25%, rgba(69, 189, 209, 0.1) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 60%, rgba(255, 107, 53, 0.08) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#f1f1f1', '#ff6b35', '#4ecdc4'],
  },

  {
    id: 'one-monokai',
    name: 'One Monokai',
    description: 'Colorful Monokai variant patterns with vibrant red, green, and blue accents',
    category: 'cultural',
    beforePattern: [
      /* One Monokai grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(92, 99, 112, 0.06) 40px, rgba(92, 99, 112, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(33, 37, 43, 0.05) 55px, rgba(33, 37, 43, 0.05) 56px)',
      /* One Monokai accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(224, 108, 117, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(152, 195, 121, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* One Monokai highlights */
      'linear-gradient(135deg, rgba(40, 44, 52, 0.2) 0%, rgba(33, 37, 43, 0.12) 40%, transparent 70%)',
      /* Colorful highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(97, 175, 239, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(224, 108, 117, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#282c34', '#e06c75', '#98c379'],
  },

  {
    id: 'poimandres',
    name: 'Poimandres',
    description: 'Minimal dark patterns with semantic coloring and teal blue accents',
    category: 'cultural',
    beforePattern: [
      /* Poimandres grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(122, 129, 148, 0.06) 40px, rgba(122, 129, 148, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(37, 42, 56, 0.05) 55px, rgba(37, 42, 56, 0.05) 56px)',
      /* Poimandres accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(93, 228, 199, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(173, 215, 255, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Poimandres highlights */
      'linear-gradient(135deg, rgba(27, 30, 40, 0.2) 0%, rgba(37, 42, 56, 0.12) 40%, transparent 70%)',
      /* Semantic highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(93, 228, 199, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(145, 180, 213, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#1b1e28', '#5de4c7', '#add7ff'],
  },

  // ========== PROFESSIONAL & SPECIALTY THEMES PATTERNS ==========
  {
    id: 'slack',
    name: 'Slack Theme',
    description: 'Professional patterns matching Slack\'s UI with clean design and balanced colors',
    category: 'cultural',
    beforePattern: [
      /* Slack grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(97, 96, 97, 0.06) 40px, rgba(97, 96, 97, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(43, 47, 52, 0.05) 55px, rgba(43, 47, 52, 0.05) 56px)',
      /* Slack accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(54, 197, 240, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(54, 197, 240, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Slack highlights */
      'linear-gradient(135deg, rgba(26, 29, 33, 0.2) 0%, rgba(43, 47, 52, 0.12) 40%, transparent 70%)',
      /* Professional highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(54, 197, 240, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(54, 197, 240, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#1a1d21', '#36c5f0', '#ffffff'],
  },

  {
    id: 'brackets-light-pro',
    name: 'Brackets Light Pro',
    description: 'Clean, minimal patterns inspired by Brackets editor with professional styling',
    category: 'cultural',
    beforePattern: [
      /* Brackets Light grid */
      'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(139, 148, 158, 0.03) 30px, rgba(139, 148, 158, 0.03) 31px)',
      'repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(240, 243, 246, 0.02) 45px, rgba(240, 243, 246, 0.02) 46px)',
      /* Brackets Light accents */
      'radial-gradient(circle 3px at 15% 20%, rgba(0, 122, 204, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 70% 40%, rgba(0, 122, 204, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Brackets Light highlights */
      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(240, 243, 246, 0.08) 40%, transparent 70%)',
      /* Clean highlights */
      'radial-gradient(circle 3px at 25% 25%, rgba(0, 122, 204, 0.1) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 60%, rgba(0, 122, 204, 0.08) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#ffffff', '#007acc', '#000000'],
  },

  {
    id: 'min-dark',
    name: 'Min Dark',
    description: 'Ultra-minimal dark patterns with subtle grays and clean aesthetics',
    category: 'cultural',
    beforePattern: [
      /* Min Dark grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(51, 51, 51, 0.08) 40px, rgba(51, 51, 51, 0.08) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(16, 16, 16, 0.06) 55px, rgba(16, 16, 16, 0.06) 56px)',
      /* Min Dark subtle accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(136, 136, 136, 0.06) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(136, 136, 136, 0.05) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Min Dark subtle highlights */
      'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(16, 16, 16, 0.12) 40%, transparent 70%)',
      /* Minimal highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(136, 136, 136, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(136, 136, 136, 0.06) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#000000', '#888888', '#ffffff'],
  },

  {
    id: 'zenburn',
    name: 'Zenburn',
    description: 'Low-contrast patterns designed for reduced eye strain with warm, comfortable colors',
    category: 'cultural',
    beforePattern: [
      /* Zenburn grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(143, 178, 143, 0.06) 40px, rgba(143, 178, 143, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(79, 79, 79, 0.05) 55px, rgba(79, 79, 79, 0.05) 56px)',
      /* Zenburn warm accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(240, 223, 175, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(240, 223, 175, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Zenburn warm highlights */
      'linear-gradient(135deg, rgba(63, 63, 63, 0.2) 0%, rgba(79, 79, 79, 0.12) 40%, transparent 70%)',
      /* Comfortable highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(240, 223, 175, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(240, 223, 175, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#3f3f3f', '#f0dfaf', '#dcdccc'],
  },

  {
    id: 'base16',
    name: 'Base16',
    description: 'Comprehensive color scheme patterns with balanced, accessible colors',
    category: 'cultural',
    beforePattern: [
      /* Base16 grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(117, 113, 94, 0.06) 40px, rgba(117, 113, 94, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(30, 31, 27, 0.05) 55px, rgba(30, 31, 27, 0.05) 56px)',
      /* Base16 balanced accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(166, 226, 46, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(166, 226, 46, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Base16 balanced highlights */
      'linear-gradient(135deg, rgba(39, 40, 34, 0.2) 0%, rgba(30, 31, 27, 0.12) 40%, transparent 70%)',
      /* Accessible highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(166, 226, 46, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(166, 226, 46, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#272822', '#a6e22e', '#d8d8d2'],
  },

  {
    id: 'tomorrow',
    name: 'Tomorrow',
    description: 'Balanced patterns with clean design and comfortable color combinations',
    category: 'cultural',
    beforePattern: [
      /* Tomorrow grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(150, 152, 150, 0.06) 40px, rgba(150, 152, 150, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(43, 45, 47, 0.05) 55px, rgba(43, 45, 47, 0.05) 56px)',
      /* Tomorrow balanced accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(181, 189, 104, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(181, 189, 104, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Tomorrow comfortable highlights */
      'linear-gradient(135deg, rgba(29, 31, 33, 0.2) 0%, rgba(43, 45, 47, 0.12) 40%, transparent 70%)',
      /* Balanced highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(181, 189, 104, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(181, 189, 104, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#1d1f21', '#b5bd68', '#c5c8c6'],
  },

  {
    id: 'gruvbox',
    name: 'Gruvbox',
    description: 'Retro color scheme patterns inspired by old computers with warm, earthy tones',
    category: 'cultural',
    beforePattern: [
      /* Gruvbox grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(146, 131, 116, 0.06) 40px, rgba(146, 131, 116, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(60, 56, 54, 0.05) 55px, rgba(60, 56, 54, 0.05) 56px)',
      /* Gruvbox warm accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(251, 73, 52, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(251, 73, 52, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Gruvbox earthy highlights */
      'linear-gradient(135deg, rgba(40, 40, 40, 0.2) 0%, rgba(60, 56, 54, 0.12) 40%, transparent 70%)',
      /* Warm highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(251, 73, 52, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(251, 73, 52, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#282828', '#fb4934', '#ebdbb2'],
  },

  {
    id: 'iceberg',
    name: 'Iceberg',
    description: 'Cool blue patterns with Japanese design influence and icy aesthetics',
    category: 'cultural',
    beforePattern: [
      /* Iceberg grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(107, 112, 137, 0.06) 40px, rgba(107, 112, 137, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(33, 36, 44, 0.05) 55px, rgba(33, 36, 44, 0.05) 56px)',
      /* Iceberg cool accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(132, 160, 198, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(132, 160, 198, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Iceberg icy highlights */
      'linear-gradient(135deg, rgba(22, 24, 33, 0.2) 0%, rgba(33, 36, 44, 0.12) 40%, transparent 70%)',
      /* Cool highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(132, 160, 198, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(132, 160, 198, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#161821', '#84a0c6', '#c6c8d1'],
  },

  {
    id: 'forest-night',
    name: 'Forest Night',
    description: 'Nature-inspired dark patterns with deep greens and earthy forest tones',
    category: 'cultural',
    beforePattern: [
      /* Forest Night grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(127, 140, 141, 0.06) 40px, rgba(127, 140, 141, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(67, 76, 81, 0.05) 55px, rgba(67, 76, 81, 0.05) 56px)',
      /* Forest Night nature accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(126, 202, 156, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(126, 202, 156, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Forest Night natural highlights */
      'linear-gradient(135deg, rgba(50, 61, 67, 0.2) 0%, rgba(67, 76, 81, 0.12) 40%, transparent 70%)',
      /* Nature highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(126, 202, 156, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(126, 202, 156, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#323d43', '#7eca9c', '#e2e9e7'],
  },

  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    description: 'Warm, comfortable patterns with soft pinks and gentle greens',
    category: 'cultural',
    beforePattern: [
      /* Rosé Pine grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(110, 106, 134, 0.06) 40px, rgba(110, 106, 134, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(37, 35, 48, 0.05) 55px, rgba(37, 35, 48, 0.05) 56px)',
      /* Rosé Pine soft accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(235, 188, 186, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(235, 188, 186, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Rosé Pine comfortable highlights */
      'linear-gradient(135deg, rgba(25, 23, 36, 0.2) 0%, rgba(37, 35, 48, 0.12) 40%, transparent 70%)',
      /* Soft highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(235, 188, 186, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(235, 188, 186, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#191724', '#ebbcba', '#e0def4'],
  },

  {
    id: 'catppuccin',
    name: 'Catppuccin',
    description: 'Cozy pastel patterns with warm colors and multiple flavor variants',
    category: 'cultural',
    beforePattern: [
      /* Catppuccin grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(108, 112, 134, 0.06) 40px, rgba(108, 112, 134, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(41, 42, 56, 0.05) 55px, rgba(41, 42, 56, 0.05) 56px)',
      /* Catppuccin cozy accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(243, 139, 168, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(243, 139, 168, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Catppuccin warm highlights */
      'linear-gradient(135deg, rgba(30, 30, 46, 0.2) 0%, rgba(41, 42, 56, 0.12) 40%, transparent 70%)',
      /* Cozy highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(243, 139, 168, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(243, 139, 168, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#1e1e2e', '#f38ba8', '#cdd6f4'],
  },

  {
    id: 'everforest',
    name: 'Everforest',
    description: 'Warm green color scheme patterns with natural forest-inspired aesthetics',
    category: 'cultural',
    beforePattern: [
      /* Everforest grid */
      'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(133, 146, 137, 0.06) 40px, rgba(133, 146, 137, 0.06) 41px)',
      'repeating-linear-gradient(90deg, transparent, transparent 55px, rgba(61, 69, 75, 0.05) 55px, rgba(61, 69, 75, 0.05) 56px)',
      /* Everforest natural accents */
      'radial-gradient(circle 4px at 20% 25%, rgba(167, 192, 128, 0.08) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 75% 45%, rgba(167, 192, 128, 0.06) 0%, transparent 100%)',
    ].join(', '),
    afterPattern: [
      /* Everforest natural highlights */
      'linear-gradient(135deg, rgba(43, 51, 57, 0.2) 0%, rgba(61, 69, 75, 0.12) 40%, transparent 70%)',
      /* Forest highlights */
      'radial-gradient(circle 4px at 30% 30%, rgba(167, 192, 128, 0.12) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 70% 65%, rgba(167, 192, 128, 0.1) 0%, transparent 100%)',
    ].join(', '),
    previewColors: ['#2b3339', '#a7c080', '#d3c6aa'],
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
