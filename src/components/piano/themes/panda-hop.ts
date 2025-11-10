import { PianoTheme } from './types';

export const panda: PianoTheme = {
  id: 'panda',
  name: 'Panda',
  description: 'Japanese-inspired theme with pandas and vibrant colors featuring pinks and cyans',
  category: 'cultural',
  isLight: false,
  colors: {
    primary: '#f3f3f3', // Panda foreground
    secondary: '#4b5362', // Panda comment
    accent: '#ff75b5', // Panda pink accent
    border: 'rgba(75, 83, 98, 0.3)', // Semi-transparent comment
    containerSolid: '#1f2430', // Panda background
  },
  lighting: {
    ambientGlow: 'rgba(31, 36, 48, 0.5)', // Dark panda glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(31, 36, 48, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(31, 36, 48, 0.6) 0%, rgba(51, 58, 72, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(255, 117, 181, 0.5)', // Panda pink glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #1f2430 0%, #333a48 50%, #191e26 100%)', // Panda gradient
    border: '2px solid #4b5362',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(31, 36, 48, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(75, 83, 98, 0.06) 40px,
        rgba(75, 83, 98, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(31, 36, 48, 0.9) 0%, rgba(31, 36, 48, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #333a48 0%, #1f2430 50%, #191e26 100%)',
    border: '1px solid #4b5362',
    boxShadow: 'inset 0 1px 2px rgba(31, 36, 48, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #1f2430 0%, #333a48 50%, #191e26 100%)',
    border: '1px solid #4b5362',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(31, 36, 48, 1)',
    hoverBackground: 'linear-gradient(180deg, #333a48 0%, #191e26 50%, #13161e 100%)',
    activeBackground: 'linear-gradient(180deg, #191e26 0%, #13161e 50%, #0d1016 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #4b5362 0%, #3d4554 50%, #2f3646 100%)', // Panda dark accents
    border: '1px solid #1f2430',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(75, 83, 98, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #3d4554 0%, #2f3646 50%, #222938 100%)',
    activeBackground: 'linear-gradient(180deg, #2f3646 0%, #222938 50%, #161b2a 100%)',
  },
};

export const hopLight: PianoTheme = {
  id: 'hop-light',
  name: 'Hop Light',
  description: 'Bright and refreshing light theme with vibrant orange, green, and pink accents',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#000000', // Hop Light foreground
    secondary: '#969896', // Hop Light secondary
    accent: '#fd971f', // Hop Light orange accent
    border: 'rgba(150, 152, 150, 0.3)', // Semi-transparent secondary
    containerSolid: '#ffffff', // Hop Light background
  },
  lighting: {
    ambientGlow: 'rgba(255, 255, 255, 0.4)', // Light hop glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(255, 255, 255, 0.6)', // Light highlight
    specularIntensity: 0.4,
    specularSize: '50%',
    shadowColor: 'rgba(240, 243, 246, 0.15)', // Subtle shadows
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.5) 0%, rgba(248, 250, 252, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(253, 151, 31, 0.4)', // Hop orange glow
    interactiveGlowSize: '16px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.25,
  },
  container: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)', // Hop Light gradient
    border: '2px solid #969896',
    boxShadow: '0 10px 40px rgba(240, 243, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(150, 152, 150, 0.03) 30px,
        rgba(150, 152, 150, 0.03) 31px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
    border: '1px solid #969896',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(240, 243, 246, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
    border: '1px solid #969896',
    boxShadow: '0 2px 4px rgba(240, 243, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
    hoverBackground: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e8ecf0 100%)',
    activeBackground: 'linear-gradient(180deg, #f1f5f9 0%, #e8ecf0 50%, #dee3e7 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #969896 0%, #7a7d7a 50%, #5e615e 100%)', // Hop Light accents
    border: '1px solid #ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(150, 152, 150, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #7a7d7a 0%, #5e615e 50%, #424542 100%)',
    activeBackground: 'linear-gradient(180deg, #5e615e 0%, #424542 50%, #262926 100%)',
  },
};
