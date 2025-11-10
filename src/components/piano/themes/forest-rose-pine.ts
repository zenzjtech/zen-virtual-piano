import { PianoTheme } from './types';

export const forestNight: PianoTheme = {
  id: 'forest-night',
  name: 'Forest Night',
  description: 'Nature-inspired dark theme with deep greens and earthy forest tones',
  category: 'cultural',
  isLight: false,
  colors: {
    primary: '#e2e9e7', // Forest Night foreground
    secondary: '#7f8c8d', // Forest Night muted green
    accent: '#7eca9c', // Forest Night green accent
    border: 'rgba(127, 140, 141, 0.3)', // Semi-transparent muted green
    containerSolid: '#323d43', // Forest Night background
  },
  lighting: {
    ambientGlow: 'rgba(50, 61, 67, 0.5)', // Dark forest glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(50, 61, 67, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(50, 61, 67, 0.6) 0%, rgba(67, 76, 81, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(126, 202, 156, 0.5)', // Forest green glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #323d43 0%, #434f51 50%, #2a3438 100%)', // Forest gradient
    border: '2px solid #7f8c8d',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(50, 61, 67, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(127, 140, 141, 0.06) 40px,
        rgba(127, 140, 141, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(50, 61, 67, 0.9) 0%, rgba(50, 61, 67, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #434f51 0%, #323d43 50%, #2a3438 100%)',
    border: '1px solid #7f8c8d',
    boxShadow: 'inset 0 1px 2px rgba(50, 61, 67, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #323d43 0%, #434f51 50%, #2a3438 100%)',
    border: '1px solid #7f8c8d',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(50, 61, 67, 1)',
    hoverBackground: 'linear-gradient(180deg, #434f51 0%, #2a3438 50%, #212b2e 100%)',
    activeBackground: 'linear-gradient(180deg, #2a3438 0%, #212b2e 50%, #182024 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #7f8c8d 0%, #6a7779 50%, #556265 100%)', // Forest muted greens
    border: '1px solid #323d43',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(127, 140, 141, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #6a7779 0%, #556265 50%, #404d4f 100%)',
    activeBackground: 'linear-gradient(180deg, #556265 0%, #404d4f 50%, #2b3839 100%)',
  },
};

export const rosePine: PianoTheme = {
  id: 'rose-pine',
  name: 'Rosé Pine',
  description: 'Warm, comfortable color palette with soft pinks and gentle greens',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#e0def4', // Rosé Pine foreground
    secondary: '#6e6a86', // Rosé Pine muted
    accent: '#ebbcba', // Rosé Pine rose accent
    border: 'rgba(110, 106, 134, 0.3)', // Semi-transparent muted
    containerSolid: '#191724', // Rosé Pine background
  },
  lighting: {
    ambientGlow: 'rgba(25, 23, 36, 0.5)', // Dark rose pine glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(25, 23, 36, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(25, 23, 36, 0.6) 0%, rgba(37, 35, 48, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(235, 188, 186, 0.5)', // Rosé Pine rose glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #191724 0%, #252330 50%, #14131a 100%)', // Rosé Pine gradient
    border: '2px solid #6e6a86',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(25, 23, 36, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(110, 106, 134, 0.06) 40px,
        rgba(110, 106, 134, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(25, 23, 36, 0.9) 0%, rgba(25, 23, 36, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #252330 0%, #191724 50%, #14131a 100%)',
    border: '1px solid #6e6a86',
    boxShadow: 'inset 0 1px 2px rgba(25, 23, 36, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #191724 0%, #252330 50%, #14131a 100%)',
    border: '1px solid #6e6a86',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(25, 23, 36, 1)',
    hoverBackground: 'linear-gradient(180deg, #252330 0%, #14131a 50%, #0f0e15 100%)',
    activeBackground: 'linear-gradient(180deg, #14131a 0%, #0f0e15 50%, #0a0910 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #6e6a86 0%, #595670 50%, #44415a 100%)', // Rosé Pine muted purples
    border: '1px solid #191724',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(110, 106, 134, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #595670 0%, #44415a 50%, #2f2c44 100%)',
    activeBackground: 'linear-gradient(180deg, #44415a 0%, #2f2c44 50%, #1a172e 100%)',
  },
};
