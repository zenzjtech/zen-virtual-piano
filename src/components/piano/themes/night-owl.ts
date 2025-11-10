import { PianoTheme } from './types';

export const nightOwl: PianoTheme = {
  id: 'night-owl',
  name: 'Night Owl',
  description: 'Dark blue theme perfect for late-night coding with high contrast text',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#d6deeb', // Night Owl foreground
    secondary: '#637777', // Night Owl secondary text
    accent: '#82aaff', // Night Owl blue accent
    border: 'rgba(42, 54, 67, 0.3)', // Semi-transparent border
    containerSolid: '#011627', // Night Owl background
  },
  lighting: {
    ambientGlow: 'rgba(1, 22, 39, 0.5)', // Dark Night Owl glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(1, 22, 39, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(1, 22, 39, 0.6) 0%, rgba(12, 32, 47, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(130, 170, 255, 0.5)', // Night Owl blue glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #011627 0%, #0c202f 50%, #010e1a 100%)', // Night Owl gradient
    border: '2px solid #2a3643',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(1, 22, 39, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(42, 54, 67, 0.06) 40px,
        rgba(42, 54, 67, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(1, 22, 39, 0.9) 0%, rgba(1, 22, 39, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #0c202f 0%, #011627 50%, #010e1a 100%)',
    border: '1px solid #2a3643',
    boxShadow: 'inset 0 1px 2px rgba(1, 22, 39, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #011627 0%, #0c202f 50%, #010e1a 100%)',
    border: '1px solid #2a3643',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(1, 22, 39, 1)',
    hoverBackground: 'linear-gradient(180deg, #0c202f 0%, #010e1a 50%, #010814 100%)',
    activeBackground: 'linear-gradient(180deg, #010e1a 0%, #010814 50%, #00060e 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #2a3643 0%, #1e2934 50%, #121c25 100%)', // Night Owl borders
    border: '1px solid #011627',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(42, 54, 67, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #1e2934 0%, #121c25 50%, #0a1119 100%)',
    activeBackground: 'linear-gradient(180deg, #121c25 0%, #0a1119 50%, #02060d 100%)',
  },
};
