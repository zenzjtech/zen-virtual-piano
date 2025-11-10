import { PianoTheme } from './types';

export const oneDarkPro: PianoTheme = {
  id: 'one-dark-pro',
  name: 'One Dark Pro',
  description: 'Popular dark theme with Material Design influence and carefully balanced colors',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#abb2bf', // One Dark Pro foreground
    secondary: '#5c6370', // One Dark Pro comment
    accent: '#61dafb', // One Dark Pro accent (React blue)
    border: 'rgba(62, 68, 81, 0.3)', // Semi-transparent selection
    containerSolid: '#282c34', // One Dark Pro background
  },
  lighting: {
    ambientGlow: 'rgba(40, 44, 52, 0.5)', // Dark One Dark Pro glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(40, 44, 52, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(40, 44, 52, 0.6) 0%, rgba(33, 37, 43, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(97, 218, 251, 0.5)', // One Dark Pro accent glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #282c34 0%, #21252b 50%, #1e2227 100%)', // One Dark Pro gradient
    border: '2px solid #3e4451',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(40, 44, 52, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(62, 68, 81, 0.06) 40px,
        rgba(62, 68, 81, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(40, 44, 52, 0.9) 0%, rgba(40, 44, 52, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #21252b 0%, #282c34 50%, #1e2227 100%)',
    border: '1px solid #3e4451',
    boxShadow: 'inset 0 1px 2px rgba(40, 44, 52, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #282c34 0%, #21252b 50%, #1e2227 100%)',
    border: '1px solid #3e4451',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(40, 44, 52, 1)',
    hoverBackground: 'linear-gradient(180deg, #21252b 0%, #1e2227 50%, #181c21 100%)',
    activeBackground: 'linear-gradient(180deg, #1e2227 0%, #181c21 50%, #13161a 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #3e4451 0%, #2c3037 50%, #21252b 100%)', // One Dark Pro selection colors
    border: '1px solid #282c34',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(62, 68, 81, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #2c3037 0%, #21252b 50%, #181c21 100%)',
    activeBackground: 'linear-gradient(180deg, #21252b 0%, #181c21 50%, #0f1317 100%)',
  },
};
