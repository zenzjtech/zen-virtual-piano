import { PianoTheme } from './types';

export const ayuDark: PianoTheme = {
  id: 'ayu-dark',
  name: 'Ayu Dark',
  description: 'Modern dark theme with high contrast and vibrant accents',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#e6e1cf', // Ayu dark foreground
    secondary: '#5c6773', // Ayu dark secondary text
    accent: '#39bae6', // Ayu dark cyan accent
    border: 'rgba(43, 48, 59, 0.3)', // Semi-transparent border
    containerSolid: '#0a0e14', // Ayu dark background
  },
  lighting: {
    ambientGlow: 'rgba(10, 14, 20, 0.5)', // Dark Ayu glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(10, 14, 20, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(10, 14, 20, 0.6) 0%, rgba(21, 25, 33, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(57, 186, 230, 0.5)', // Ayu cyan glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #0a0e14 0%, #151921 50%, #06080c 100%)', // Ayu dark gradient
    border: '2px solid #2b303b',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(10, 14, 20, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(43, 48, 59, 0.06) 40px,
        rgba(43, 48, 59, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(10, 14, 20, 0.9) 0%, rgba(10, 14, 20, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #151921 0%, #0a0e14 50%, #06080c 100%)',
    border: '1px solid #2b303b',
    boxShadow: 'inset 0 1px 2px rgba(10, 14, 20, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #0a0e14 0%, #151921 50%, #06080c 100%)',
    border: '1px solid #2b303b',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(10, 14, 20, 1)',
    hoverBackground: 'linear-gradient(180deg, #151921 0%, #06080c 50%, #030406 100%)',
    activeBackground: 'linear-gradient(180deg, #06080c 0%, #030406 50%, #000000 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #2b303b 0%, #20252f 50%, #151923 100%)', // Ayu dark borders
    border: '1px solid #0a0e14',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(43, 48, 59, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #20252f 0%, #151923 50%, #0a0f17 100%)',
    activeBackground: 'linear-gradient(180deg, #151923 0%, #0a0f17 50%, #00030b 100%)',
  },
};
