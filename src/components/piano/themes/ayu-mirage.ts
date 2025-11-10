import { PianoTheme } from './types';

export const ayuMirage: PianoTheme = {
  id: 'ayu-mirage',
  name: 'Ayu Mirage',
  description: 'Balanced theme between light and dark with soft colors and high contrast',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#d9d7ce', // Ayu mirage foreground
    secondary: '#5c6773', // Ayu mirage secondary text
    accent: '#ffcc66', // Ayu mirage yellow accent
    border: 'rgba(65, 72, 81, 0.3)', // Semi-transparent border
    containerSolid: '#212733', // Ayu mirage background
  },
  lighting: {
    ambientGlow: 'rgba(33, 39, 51, 0.5)', // Dark Ayu mirage glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(33, 39, 51, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(33, 39, 51, 0.6) 0%, rgba(43, 48, 59, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(255, 204, 102, 0.5)', // Ayu yellow glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #212733 0%, #2b303b 50%, #1a1e29 100%)', // Ayu mirage gradient
    border: '2px solid #414851',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(33, 39, 51, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(65, 72, 81, 0.06) 40px,
        rgba(65, 72, 81, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(33, 39, 51, 0.9) 0%, rgba(33, 39, 51, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #2b303b 0%, #212733 50%, #1a1e29 100%)',
    border: '1px solid #414851',
    boxShadow: 'inset 0 1px 2px rgba(33, 39, 51, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #212733 0%, #2b303b 50%, #1a1e29 100%)',
    border: '1px solid #414851',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(33, 39, 51, 1)',
    hoverBackground: 'linear-gradient(180deg, #2b303b 0%, #1a1e29 50%, #13161f 100%)',
    activeBackground: 'linear-gradient(180deg, #1a1e29 0%, #13161f 50%, #0c0f15 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #414851 0%, #343942 50%, #262b33 100%)', // Ayu mirage borders
    border: '1px solid #212733',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(65, 72, 81, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #343942 0%, #262b33 50%, #1a1f26 100%)',
    activeBackground: 'linear-gradient(180deg, #262b33 0%, #1a1f26 50%, #0f1319 100%)',
  },
};
