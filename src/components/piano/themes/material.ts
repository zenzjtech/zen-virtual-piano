import { PianoTheme } from './types';

export const material: PianoTheme = {
  id: 'material',
  name: 'Material Theme',
  description: 'Google\'s Material Design colors with modern dark theme aesthetics',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#eeffff', // Material foreground
    secondary: '#546e7a', // Material comments
    accent: '#80cbc4', // Material teal accent
    border: 'rgba(84, 110, 122, 0.3)', // Semi-transparent comments
    containerSolid: '#263238', // Material background
  },
  lighting: {
    ambientGlow: 'rgba(38, 50, 56, 0.5)', // Dark material glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(38, 50, 56, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(38, 50, 56, 0.6) 0%, rgba(55, 71, 79, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(128, 203, 196, 0.5)', // Material teal glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #263238 0%, #37474f 50%, #21272b 100%)', // Material gradient
    border: '2px solid #546e7a',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(38, 50, 56, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(84, 110, 122, 0.06) 40px,
        rgba(84, 110, 122, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(38, 50, 56, 0.9) 0%, rgba(38, 50, 56, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #37474f 0%, #263238 50%, #21272b 100%)',
    border: '1px solid #546e7a',
    boxShadow: 'inset 0 1px 2px rgba(38, 50, 56, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #263238 0%, #37474f 50%, #21272b 100%)',
    border: '1px solid #546e7a',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(38, 50, 56, 1)',
    hoverBackground: 'linear-gradient(180deg, #37474f 0%, #21272b 50%, #1a2125 100%)',
    activeBackground: 'linear-gradient(180deg, #21272b 0%, #1a2125 50%, #13181b 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #546e7a 0%, #455a64 50%, #37474f 100%)', // Material comments colors
    border: '1px solid #263238',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(84, 110, 122, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #455a64 0%, #37474f 50%, #2e4047 100%)',
    activeBackground: 'linear-gradient(180deg, #37474f 0%, #2e4047 50%, #24353b 100%)',
  },
};
