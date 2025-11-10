import { PianoTheme } from './types';

export const shadesOfPurple: PianoTheme = {
  id: 'shades-of-purple',
  name: 'Shades of Purple',
  description: 'Bold purple color scheme with elegant, sophisticated look',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#ffffff', // Shades of Purple foreground
    secondary: '#a599e9', // Shades of Purple secondary text
    accent: '#fad000', // Shades of Purple yellow accent
    border: 'rgba(77, 67, 134, 0.3)', // Semi-transparent border
    containerSolid: '#2d2b55', // Shades of Purple background
  },
  lighting: {
    ambientGlow: 'rgba(45, 43, 85, 0.5)', // Dark purple glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(45, 43, 85, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(45, 43, 85, 0.6) 0%, rgba(55, 52, 95, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(250, 208, 0, 0.5)', // Yellow glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #2d2b55 0%, #37345f 50%, #252348 100%)', // Purple gradient
    border: '2px solid #4d4386',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(45, 43, 85, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(77, 67, 134, 0.06) 40px,
        rgba(77, 67, 134, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(45, 43, 85, 0.9) 0%, rgba(45, 43, 85, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #37345f 0%, #2d2b55 50%, #252348 100%)',
    border: '1px solid #4d4386',
    boxShadow: 'inset 0 1px 2px rgba(45, 43, 85, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #2d2b55 0%, #37345f 50%, #252348 100%)',
    border: '1px solid #4d4386',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(45, 43, 85, 1)',
    hoverBackground: 'linear-gradient(180deg, #37345f 0%, #252348 50%, #1e1c3e 100%)',
    activeBackground: 'linear-gradient(180deg, #252348 0%, #1e1c3e 50%, #171534 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #4d4386 0%, #3f3770 50%, #31295a 100%)', // Purple borders
    border: '1px solid #2d2b55',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(77, 67, 134, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #3f3770 0%, #31295a 50%, #241f44 100%)',
    activeBackground: 'linear-gradient(180deg, #31295a 0%, #241f44 50%, #17112e 100%)',
  },
};
