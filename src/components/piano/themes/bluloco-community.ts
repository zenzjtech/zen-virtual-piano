import { PianoTheme } from './types';

export const blulocoDark: PianoTheme = {
  id: 'bluloco-dark',
  name: 'Bluloco Dark',
  description: 'Sophisticated designer color scheme with enhanced syntax highlighting',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#abb2bf', // Bluloco foreground
    secondary: '#5c6370', // Bluloco comment
    accent: '#98c379', // Bluloco green accent
    border: 'rgba(92, 99, 112, 0.3)', // Semi-transparent comment
    containerSolid: '#282c34', // Bluloco background
  },
  lighting: {
    ambientGlow: 'rgba(40, 44, 52, 0.5)', // Dark bluloco glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(40, 44, 52, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(40, 44, 52, 0.6) 0%, rgba(33, 37, 43, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(152, 195, 121, 0.5)', // Bluloco green glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #282c34 0%, #21252b 50%, #1e2227 100%)', // Bluloco gradient
    border: '2px solid #5c6370',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(40, 44, 52, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(92, 99, 112, 0.06) 40px,
        rgba(92, 99, 112, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(40, 44, 52, 0.9) 0%, rgba(40, 44, 52, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #21252b 0%, #282c34 50%, #1e2227 100%)',
    border: '1px solid #5c6370',
    boxShadow: 'inset 0 1px 2px rgba(40, 44, 52, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #282c34 0%, #21252b 50%, #1e2227 100%)',
    border: '1px solid #5c6370',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(40, 44, 52, 1)',
    hoverBackground: 'linear-gradient(180deg, #21252b 0%, #1e2227 50%, #181c21 100%)',
    activeBackground: 'linear-gradient(180deg, #1e2227 0%, #181c21 50%, #13161a 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #5c6370 0%, #4b5360 50%, #3e4551 100%)', // Bluloco comment colors
    border: '1px solid #282c34',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(92, 99, 112, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #4b5360 0%, #3e4551 50%, #323942 100%)',
    activeBackground: 'linear-gradient(180deg, #3e4551 0%, #323942 50%, #272d33 100%)',
  },
};

export const communityMaterial: PianoTheme = {
  id: 'community-material',
  name: 'Community Material',
  description: 'Enhanced Material theme with more color variants and refined aesthetics',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#eeffff', // Community Material foreground
    secondary: '#546e7a', // Community Material comment
    accent: '#82b1ff', // Community Material blue accent
    border: 'rgba(84, 110, 122, 0.3)', // Semi-transparent comment
    containerSolid: '#263238', // Community Material background
  },
  lighting: {
    ambientGlow: 'rgba(38, 50, 56, 0.5)', // Dark community material glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(38, 50, 56, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(38, 50, 56, 0.6) 0%, rgba(55, 71, 79, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(130, 177, 255, 0.5)', // Community Material blue glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #263238 0%, #37474f 50%, #21272b 100%)', // Community Material gradient
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
    background: 'linear-gradient(180deg, #546e7a 0%, #455a64 50%, #37474f 100%)', // Community Material colors
    border: '1px solid #263238',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(84, 110, 122, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #455a64 0%, #37474f 50%, #2e4047 100%)',
    activeBackground: 'linear-gradient(180deg, #37474f 0%, #2e4047 50%, #24353b 100%)',
  },
};
