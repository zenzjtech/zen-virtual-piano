/**
 * Piano themes module
 * Centralizes all theme exports and utilities
 */

// Export types
export type { PianoTheme } from './types';

// Export texture generators (low-level utilities)
export {
  generateWoodGrain,
  generateWoodKnots,
  generateSacredPatterns,
  generateWoodHighlights,
  generateWoodRings,
  generatePrayerWheelSpokes,
} from '@/theme/definitions/texture-generators';
export type {
  WoodGrainConfig,
  WoodKnotConfig,
  SacredPatternConfig,
} from '@/theme/definitions/texture-generators';

// NOTE: Pattern Themes are now exported from ../pattern-themes.ts
// Pattern themes are an independent 4th theme component equal to piano/background/sheet themes

// Export individual themes
export { wooden } from './wooden';
export { black } from './black';
export { metal } from './metal';
export { white } from './white';
export { roseGold } from './rose-gold';
export { mahogany } from './mahogany';
export { nordicIce } from './nordic-ice';
export { tibetanWood } from './tibetan-wood';
export { solarized } from './solarized';
export { monokai } from './monokai';
export { dracula } from './dracula';
export { githubLight } from './github-light';
export { githubDark } from './github-dark';
export { oneDarkPro } from './one-dark-pro';
export { ayuLight } from './ayu-light';
export { ayuMirage } from './ayu-mirage';
export { ayuDark } from './ayu-dark';
export { nightOwl } from './night-owl';
export { tokyoNight } from './tokyo-night';
export { shadesOfPurple } from './shades-of-purple';
export { cobalt2, winterIsComing, noctis } from './cobalt2-winter-noctis';
export { material } from './material';
export { blulocoDark, communityMaterial } from './bluloco-community';
export { rouge, sublimeMaterial, blulocoLight } from './rouge-sublime-bluloco-light';
export { nord, atomOneDark } from './nord-atom';

// Import themes for aggregation
import { wooden } from './wooden';
import { black } from './black';
import { metal } from './metal';
import { white } from './white';
import { roseGold } from './rose-gold';
import { mahogany } from './mahogany';
import { nordicIce } from './nordic-ice';
import { tibetanWood } from './tibetan-wood';
import { solarized } from './solarized';
import { monokai } from './monokai';
import { dracula } from './dracula';
import { githubLight } from './github-light';
import { githubDark } from './github-dark';
import { oneDarkPro } from './one-dark-pro';
import { ayuLight } from './ayu-light';
import { ayuMirage } from './ayu-mirage';
import { ayuDark } from './ayu-dark';
import { nightOwl } from './night-owl';
import { tokyoNight } from './tokyo-night';
import { shadesOfPurple } from './shades-of-purple';
import { cobalt2, winterIsComing, noctis } from './cobalt2-winter-noctis';
import { material } from './material';
import { blulocoDark, communityMaterial } from './bluloco-community';
import { rouge, sublimeMaterial, blulocoLight } from './rouge-sublime-bluloco-light';
import { nord, atomOneDark } from './nord-atom';
import { PianoTheme } from './types';

// Aggregate themes into a single object
export const PIANO_THEMES: Record<string, PianoTheme> = {
  wooden,
  black,
  metal,
  white,
  roseGold,
  mahogany,
  nordicIce,
  tibetanWood,
  solarized,
  monokai,
  dracula,
  githubLight,
  githubDark,
  oneDarkPro,
  ayuLight,
  ayuMirage,
  ayuDark,
  nightOwl,
  tokyoNight,
  shadesOfPurple,
  cobalt2,
  winterIsComing,
  noctis,
  material,
  communityMaterial,
  blulocoDark,
  blulocoLight,
  rouge,
  sublimeMaterial,
  nord,
  atomOneDark,
};

// Helper to get theme by id with fallback
export function getTheme(themeId: string): PianoTheme {
  return PIANO_THEMES[themeId] || PIANO_THEMES.wooden;
}

// Get list of all available themes
export function getAllThemes(): PianoTheme[] {
  return Object.values(PIANO_THEMES);
}

// Generate theme-specific lighting CSS properties
export function getLightingStyles(theme: PianoTheme) {
  const { lighting } = theme;
  
  return {
    // Ambient lighting overlay
    ambientLightOverlay: {
      background: lighting.ambientGlow,
      opacity: lighting.ambientOpacity,
      pointerEvents: 'none' as const,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    
    // Specular highlight overlay
    specularHighlightOverlay: {
      background: `radial-gradient(ellipse at ${getSpecularPosition(lighting.lightAngle)}, ${lighting.specularHighlight} 0%, transparent ${lighting.specularSize})`,
      opacity: lighting.specularIntensity,
      pointerEvents: 'none' as const,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      mixBlendMode: 'overlay' as const,
    },
    
    // Reflection overlay
    reflectionOverlay: {
      background: lighting.reflectionGradient,
      opacity: lighting.reflectionOpacity,
      pointerEvents: 'none' as const,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3,
      mixBlendMode: 'soft-light' as const,
    },
    
    // Interactive glow for hover effects
    interactiveGlow: `0 0 ${lighting.interactiveGlowSize} ${lighting.interactiveGlow}`,
    
    // Material-specific box shadow
    materialShadow: `0 ${lighting.shadowDepth} ${lighting.shadowSoftness} ${lighting.shadowColor}`,
  };
}

// Calculate specular highlight position based on light angle
function getSpecularPosition(angle: number): string {
  // Convert angle to position (0° = top, 90° = right, 180° = bottom, 270° = left)
  const x = 50 + 30 * Math.cos((angle - 90) * Math.PI / 180);
  const y = 50 + 30 * Math.sin((angle - 90) * Math.PI / 180);
  return `${x}% ${y}%`;
}
