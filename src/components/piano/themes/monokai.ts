import { PianoTheme } from './types';

export const monokai: PianoTheme = {
  id: 'monokai',
  name: 'Monokai',
  description: 'Classic dark theme with vibrant syntax highlighting colors',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#f8f8f2', // Monokai foreground
    secondary: '#75715e', // Monokai comments
    accent: '#f92672', // Monokai pink
    border: 'rgba(117, 113, 94, 0.3)', // Semi-transparent comments
    containerSolid: '#272822', // Monokai background
  },
  lighting: {
    ambientGlow: 'rgba(39, 40, 34, 0.5)', // Dark monokai glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(39, 40, 34, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(39, 40, 34, 0.6) 0%, rgba(30, 31, 27, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(249, 38, 114, 0.5)', // Monokai pink glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #272822 0%, #2f2f29 50%, #1e1e1a 100%)', // Monokai dark gradient
    border: '2px solid #49483e',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(39, 40, 34, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        rgba(73, 72, 62, 0.05) 80px,
        rgba(73, 72, 62, 0.05) 81px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(39, 40, 34, 0.9) 0%, rgba(39, 40, 34, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #2f2f29 0%, #272822 50%, #1e1e1a 100%)',
    border: '1px solid #49483e',
    boxShadow: 'inset 0 1px 2px rgba(39, 40, 34, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #272822 0%, #2f2f29 50%, #1e1e1a 100%)',
    border: '1px solid #49483e',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(39, 40, 34, 1)',
    hoverBackground: 'linear-gradient(180deg, #2f2f29 0%, #1e1e1a 50%, #161613 100%)',
    activeBackground: 'linear-gradient(180deg, #1e1e1a 0%, #161613 50%, #0f0f0c 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #49483e 0%, #3c3a32 50%, #2a2820 100%)', // Monokai dark accents
    border: '1px solid #272822',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(73, 72, 62, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #3c3a32 0%, #2a2820 50%, #1f1d18 100%)',
    activeBackground: 'linear-gradient(180deg, #2a2820 0%, #1f1d18 50%, #14120e 100%)',
  },
};
