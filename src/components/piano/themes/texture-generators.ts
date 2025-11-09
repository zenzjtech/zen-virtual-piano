/**
 * Texture Generators
 * 
 * Reusable texture pattern generators for piano themes.
 * These functions create complex CSS background patterns that can be
 * customized with different colors and configurations.
 */

export interface WoodGrainConfig {
  /** Primary dark wood color for grain lines */
  darkWood: string;
  /** Secondary wood tone for variation */
  mediumWood: string;
  /** Lightest wood tone for subtle details */
  lightWood: string;
  /** Grain intensity (0-1) */
  intensity?: number;
}

export interface WoodKnotConfig {
  /** Wood knot colors and positions */
  knots: Array<{
    color: string;
    width: number;
    height: number;
    x: number; // percentage
    y: number; // percentage
    opacity: number;
  }>;
}

export interface SacredPatternConfig {
  /** Primary sacred color (e.g., maroon for Tibetan) */
  primary: string;
  /** Secondary accent color (e.g., bronze) */
  secondary: string;
  /** Enable prayer wheel patterns */
  prayerWheels?: boolean;
  /** Enable sacred symbols */
  sacredSymbols?: boolean;
}

/**
 * Generates vertical and horizontal wood grain texture patterns
 */
export function generateWoodGrain(config: WoodGrainConfig): string {
  const intensity = config.intensity ?? 1.0;
  
  return `
    /* Wood grain texture - vertical grain lines */
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 4px,
      ${config.darkWood} 4px,
      ${config.darkWood} 4.5px,
      transparent 4.5px,
      transparent 10px,
      ${config.mediumWood} 10px,
      ${config.mediumWood} 11px,
      transparent 11px,
      transparent 18px,
      ${config.lightWood} 18px,
      ${config.lightWood} 19px,
      transparent 19px,
      transparent 30px,
      ${adjustOpacity(config.darkWood, intensity * 1.1)} 30px,
      ${adjustOpacity(config.darkWood, intensity * 1.1)} 31px,
      transparent 31px,
      transparent 50px,
      ${adjustOpacity(config.lightWood, intensity * 0.9)} 50px,
      ${adjustOpacity(config.lightWood, intensity * 0.9)} 51px
    ),
    /* Wood grain texture - horizontal subtle variations */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 70px,
      ${adjustOpacity(config.mediumWood, intensity * 0.5)} 70px,
      ${adjustOpacity(config.mediumWood, intensity * 0.5)} 73px,
      transparent 73px,
      transparent 140px,
      ${adjustOpacity(config.lightWood, intensity * 0.4)} 140px,
      ${adjustOpacity(config.lightWood, intensity * 0.4)} 144px
    )`;
}

/**
 * Generates wood knot patterns with customizable positions and colors
 */
export function generateWoodKnots(config: WoodKnotConfig): string {
  return config.knots
    .map(
      (knot) => `
    radial-gradient(
      ellipse ${knot.width}px ${knot.height}px at ${knot.x}% ${knot.y}%,
      ${adjustOpacity(knot.color, knot.opacity)} 0%,
      ${adjustOpacity(knot.color, knot.opacity * 0.6)} 35%,
      transparent 55%
    )`
    )
    .join(',');
}

/**
 * Generates sacred/decorative patterns for cultural themes
 */
export function generateSacredPatterns(config: SacredPatternConfig): string {
  const patterns: string[] = [];

  if (config.prayerWheels) {
    patterns.push(
      `/* Prayer wheel engravings - circular patterns */
      radial-gradient(
        circle 35px at 20% 30%,
        transparent 28px,
        ${adjustOpacity(config.primary, 0.25)} 28px,
        ${adjustOpacity(config.primary, 0.25)} 29px,
        transparent 29px,
        transparent 32px,
        ${adjustOpacity(config.secondary, 0.2)} 32px,
        ${adjustOpacity(config.secondary, 0.2)} 33px,
        transparent 33px
      )`,
      `radial-gradient(
        circle 35px at 80% 65%,
        transparent 28px,
        ${adjustOpacity(config.primary, 0.22)} 28px,
        ${adjustOpacity(config.primary, 0.22)} 29px,
        transparent 29px,
        transparent 32px,
        ${adjustOpacity(config.secondary, 0.18)} 32px,
        ${adjustOpacity(config.secondary, 0.18)} 33px,
        transparent 33px
      )`
    );
  }

  if (config.sacredSymbols) {
    patterns.push(
      `/* Sacred symbols - Om pattern hints */
      radial-gradient(
        ellipse 25px 30px at 50% 50%,
        transparent 18px,
        ${adjustOpacity(config.primary, 0.15)} 18px,
        ${adjustOpacity(config.primary, 0.15)} 19px,
        transparent 19px
      )`
    );
  }

  return patterns.join(',');
}

/**
 * Generates wood highlight and shine effects
 */
export function generateWoodHighlights(angle: number = 135): string {
  return `
    /* Natural wood highlights */
    linear-gradient(
      ${angle}deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 35%,
      transparent 65%
    )`;
}

/**
 * Generates wood growth ring patterns
 */
export function generateWoodRings(config: {
  color: string;
  centerX?: number;
  centerY?: number;
}): string {
  const x = config.centerX ?? 40;
  const y = config.centerY ?? 50;

  return `
    /* Subtle wood growth rings */
    repeating-radial-gradient(
      circle at ${x}% ${y}%,
      transparent 0px,
      transparent 100px,
      ${adjustOpacity(config.color, 0.04)} 100px,
      ${adjustOpacity(config.color, 0.04)} 103px,
      transparent 103px,
      transparent 200px,
      ${adjustOpacity(config.color, 0.05)} 200px,
      ${adjustOpacity(config.color, 0.05)} 204px
    )`;
}

/**
 * Generates prayer wheel spoke patterns (for Tibetan theme)
 */
export function generatePrayerWheelSpokes(config: {
  primary: string;
  secondary: string;
}): string {
  return `
    /* Prayer wheel spokes - radial lines */
    repeating-conic-gradient(
      from 0deg at 20% 30%,
      transparent 0deg,
      transparent 43deg,
      ${adjustOpacity(config.secondary, 0.08)} 43deg,
      ${adjustOpacity(config.secondary, 0.08)} 45deg,
      transparent 45deg,
      transparent 88deg
    ),
    repeating-conic-gradient(
      from 22.5deg at 80% 65%,
      transparent 0deg,
      transparent 43deg,
      ${adjustOpacity(config.primary, 0.06)} 43deg,
      ${adjustOpacity(config.primary, 0.06)} 45deg,
      transparent 45deg,
      transparent 88deg
    )`;
}

/**
 * Helper function to adjust opacity of rgba colors
 */
function adjustOpacity(color: string, multiplier: number): string {
  // If color is already in rgba format, adjust its opacity
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  
  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    const currentOpacity = a ? parseFloat(a) : 1;
    const newOpacity = Math.min(1, Math.max(0, currentOpacity * multiplier));
    return `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
  }
  
  // If it's a hex color, convert to rgba
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    const r = parseInt(hexMatch[1], 16);
    const g = parseInt(hexMatch[2], 16);
    const b = parseInt(hexMatch[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${Math.min(1, multiplier)})`;
  }
  
  // Return original if format not recognized
  return color;
}
