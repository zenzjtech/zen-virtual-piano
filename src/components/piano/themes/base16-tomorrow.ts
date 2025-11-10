import { PianoTheme } from './types';

export const base16: PianoTheme = {
  id: 'base16',
  name: 'Base16',
  description: 'Comprehensive color scheme collection with balanced, accessible colors',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#d8d8d2', // Base16 foreground
    secondary: '#75715e', // Base16 comment
    accent: '#a6e22e', // Base16 green accent
    border: 'rgba(117, 113, 94, 0.3)', // Semi-transparent comment
    containerSolid: '#272822', // Base16 background
  },
  lighting: {
    ambientGlow: 'rgba(39, 40, 34, 0.5)', // Dark base16 glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(39, 40, 34, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(39, 40, 34, 0.6) 0%, rgba(30, 31, 27, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(166, 226, 46, 0.5)', // Base16 green glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #272822 0%, #2f2f29 50%, #1e1e1a 100%)', // Base16 gradient
    border: '2px solid #75715e',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(39, 40, 34, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(117, 113, 94, 0.06) 40px,
        rgba(117, 113, 94, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(39, 40, 34, 0.9) 0%, rgba(39, 40, 34, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #2f2f29 0%, #272822 50%, #1e1e1a 100%)',
    border: '1px solid #75715e',
    boxShadow: 'inset 0 1px 2px rgba(39, 40, 34, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #272822 0%, #2f2f29 50%, #1e1e1a 100%)',
    border: '1px solid #75715e',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(39, 40, 34, 1)',
    hoverBackground: 'linear-gradient(180deg, #2f2f29 0%, #1e1e1a 50%, #161613 100%)',
    activeBackground: 'linear-gradient(180deg, #1e1e1a 0%, #161613 50%, #0f0f0c 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #75715e 0%, #5f5b4e 50%, #49463e 100%)', // Base16 comment colors
    border: '1px solid #272822',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(117, 113, 94, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #5f5b4e 0%, #49463e 50%, #33302e 100%)',
    activeBackground: 'linear-gradient(180deg, #49463e 0%, #33302e 50%, #1d1b1a 100%)',
  },
};

export const tomorrow: PianoTheme = {
  id: 'tomorrow',
  name: 'Tomorrow',
  description: 'Balanced theme with clean design and comfortable color combinations',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#c5c8c6', // Tomorrow foreground
    secondary: '#969896', // Tomorrow secondary
    accent: '#b5bd68', // Tomorrow green accent
    border: 'rgba(150, 152, 150, 0.3)', // Semi-transparent secondary
    containerSolid: '#1d1f21', // Tomorrow background
  },
  lighting: {
    ambientGlow: 'rgba(29, 31, 33, 0.5)', // Dark tomorrow glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(29, 31, 33, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(29, 31, 33, 0.6) 0%, rgba(43, 45, 47, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(181, 189, 104, 0.5)', // Tomorrow green glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #1d1f21 0%, #2b2d2f 50%, #16181a 100%)', // Tomorrow gradient
    border: '2px solid #969896',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(29, 31, 33, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(150, 152, 150, 0.06) 40px,
        rgba(150, 152, 150, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(29, 31, 33, 0.9) 0%, rgba(29, 31, 33, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #2b2d2f 0%, #1d1f21 50%, #16181a 100%)',
    border: '1px solid #969896',
    boxShadow: 'inset 0 1px 2px rgba(29, 31, 33, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #1d1f21 0%, #2b2d2f 50%, #16181a 100%)',
    border: '1px solid #969896',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(29, 31, 33, 1)',
    hoverBackground: 'linear-gradient(180deg, #2b2d2f 0%, #16181a 50%, #101113 100%)',
    activeBackground: 'linear-gradient(180deg, #16181a 0%, #101113 50%, #0a0b0c 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #969896 0%, #7a7d7a 50%, #5e615e 100%)', // Tomorrow secondary colors
    border: '1px solid #1d1f21',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(150, 152, 150, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #7a7d7a 0%, #5e615e 50%, #424542 100%)',
    activeBackground: 'linear-gradient(180deg, #5e615e 0%, #424542 50%, #262926 100%)',
  },
};
