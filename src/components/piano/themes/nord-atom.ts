import { PianoTheme } from './types';

export const nord: PianoTheme = {
  id: 'nord',
  name: 'Nord',
  description: 'Soft, cold Nordic-inspired colors with arctic blue and green accents',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#d8dee9', // Nord foreground (snow storm)
    secondary: '#616e88', // Nord comment (dark gray)
    accent: '#88c0d0', // Nord frost blue accent
    border: 'rgba(97, 110, 136, 0.3)', // Semi-transparent comment
    containerSolid: '#2e3440', // Nord background (polar night)
  },
  lighting: {
    ambientGlow: 'rgba(46, 52, 64, 0.5)', // Dark nord glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(46, 52, 64, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(46, 52, 64, 0.6) 0%, rgba(59, 66, 82, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(136, 192, 208, 0.5)', // Nord frost blue glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #2e3440 0%, #3b4252 50%, #272c36 100%)', // Nord gradient
    border: '2px solid #616e88',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(46, 52, 64, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(97, 110, 136, 0.06) 40px,
        rgba(97, 110, 136, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(46, 52, 64, 0.9) 0%, rgba(46, 52, 64, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #3b4252 0%, #2e3440 50%, #272c36 100%)',
    border: '1px solid #616e88',
    boxShadow: 'inset 0 1px 2px rgba(46, 52, 64, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #2e3440 0%, #3b4252 50%, #272c36 100%)',
    border: '1px solid #616e88',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(46, 52, 64, 1)',
    hoverBackground: 'linear-gradient(180deg, #3b4252 0%, #272c36 50%, #21262e 100%)',
    activeBackground: 'linear-gradient(180deg, #272c36 0%, #21262e 50%, #1a1e24 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #616e88 0%, #4c566a 50%, #434c5e 100%)', // Nord comment colors
    border: '1px solid #2e3440',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(97, 110, 136, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #4c566a 0%, #434c5e 50%, #3a4154 100%)',
    activeBackground: 'linear-gradient(180deg, #434c5e 0%, #3a4154 50%, #313846 100%)',
  },
};

export const atomOneDark: PianoTheme = {
  id: 'atom-one-dark',
  name: 'Atom One Dark',
  description: 'Clean theme from the Atom editor with balanced grays and blue accents',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#abb2bf', // Atom One Dark foreground
    secondary: '#5c6370', // Atom One Dark comment
    accent: '#61afef', // Atom One Dark blue accent
    border: 'rgba(92, 99, 112, 0.3)', // Semi-transparent comment
    containerSolid: '#1e2127', // Atom One Dark background
  },
  lighting: {
    ambientGlow: 'rgba(30, 33, 39, 0.5)', // Dark atom glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(30, 33, 39, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(30, 33, 39, 0.6) 0%, rgba(43, 45, 51, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(97, 175, 239, 0.5)', // Atom blue glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #1e2127 0%, #2b2d33 50%, #181a1f 100%)', // Atom One Dark gradient
    border: '2px solid #5c6370',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(30, 33, 39, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(92, 99, 112, 0.06) 40px,
        rgba(92, 99, 112, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(30, 33, 39, 0.9) 0%, rgba(30, 33, 39, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #2b2d33 0%, #1e2127 50%, #181a1f 100%)',
    border: '1px solid #5c6370',
    boxShadow: 'inset 0 1px 2px rgba(30, 33, 39, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #1e2127 0%, #2b2d33 50%, #181a1f 100%)',
    border: '1px solid #5c6370',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(30, 33, 39, 1)',
    hoverBackground: 'linear-gradient(180deg, #2b2d33 0%, #181a1f 50%, #131519 100%)',
    activeBackground: 'linear-gradient(180deg, #181a1f 0%, #131519 50%, #0e1013 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #5c6370 0%, #4b5360 50%, #3e4551 100%)', // Atom One Dark comment colors
    border: '1px solid #1e2127',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(92, 99, 112, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #4b5360 0%, #3e4551 50%, #323942 100%)',
    activeBackground: 'linear-gradient(180deg, #3e4551 0%, #323942 50%, #272d33 100%)',
  },
};
