import { PianoTheme } from './types';

export const dracula: PianoTheme = {
  id: 'dracula',
  name: 'Dracula',
  description: 'Dark theme inspired by the popular Dracula color scheme with high contrast and vibrant accents',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#f8f8f2', // Dracula foreground
    secondary: '#6272a4', // Dracula comment
    accent: '#ff79c6', // Dracula pink
    border: 'rgba(98, 114, 164, 0.3)', // Semi-transparent comment
    containerSolid: '#282a36', // Dracula background
  },
  lighting: {
    ambientGlow: 'rgba(40, 42, 54, 0.5)', // Dark dracula glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(40, 42, 54, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(40, 42, 54, 0.6) 0%, rgba(33, 34, 44, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(255, 121, 198, 0.5)', // Dracula pink glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #282a36 0%, #2d303e 50%, #21222c 100%)', // Dracula dark gradient
    border: '2px solid #44475a',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(40, 42, 54, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(68, 71, 90, 0.06) 40px,
        rgba(68, 71, 90, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(40, 42, 54, 0.9) 0%, rgba(40, 42, 54, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #2d303e 0%, #282a36 50%, #21222c 100%)',
    border: '1px solid #44475a',
    boxShadow: 'inset 0 1px 2px rgba(40, 42, 54, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #282a36 0%, #2d303e 50%, #21222c 100%)',
    border: '1px solid #44475a',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(40, 42, 54, 1)',
    hoverBackground: 'linear-gradient(180deg, #2d303e 0%, #21222c 50%, #1a1b23 100%)',
    activeBackground: 'linear-gradient(180deg, #21222c 0%, #1a1b23 50%, #141519 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #44475a 0%, #3a3d4a 50%, #2e3038 100%)', // Dracula selection color
    border: '1px solid #282a36',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(68, 71, 90, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #3a3d4a 0%, #2e3038 50%, #25272f 100%)',
    activeBackground: 'linear-gradient(180deg, #2e3038 0%, #25272f 50%, #1c1d23 100%)',
  },
};
