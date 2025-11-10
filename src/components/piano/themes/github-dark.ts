import { PianoTheme } from './types';

export const githubDark: PianoTheme = {
  id: 'github-dark',
  name: 'GitHub Dark',
  description: 'GitHub\'s official dark theme with professional blue accents and clean design',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#f0f6fc', // GitHub dark foreground
    secondary: '#c9d1d9', // GitHub dark secondary text
    accent: '#58a6ff', // GitHub dark blue accent
    border: 'rgba(48, 54, 61, 0.3)', // Semi-transparent border
    containerSolid: '#0d1117', // GitHub dark background
  },
  lighting: {
    ambientGlow: 'rgba(13, 17, 23, 0.5)', // Dark GitHub glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(13, 17, 23, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(13, 17, 23, 0.6) 0%, rgba(22, 27, 34, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(88, 166, 255, 0.5)', // GitHub blue glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0a0c10 100%)', // GitHub dark gradient
    border: '2px solid #30363d',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(13, 17, 23, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(48, 54, 61, 0.06) 40px,
        rgba(48, 54, 61, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(13, 17, 23, 0.9) 0%, rgba(13, 17, 23, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #161b22 0%, #0d1117 50%, #0a0c10 100%)',
    border: '1px solid #30363d',
    boxShadow: 'inset 0 1px 2px rgba(13, 17, 23, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0a0c10 100%)',
    border: '1px solid #30363d',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(13, 17, 23, 1)',
    hoverBackground: 'linear-gradient(180deg, #161b22 0%, #0a0c10 50%, #060708 100%)',
    activeBackground: 'linear-gradient(180deg, #0a0c10 0%, #060708 50%, #030304 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #30363d 0%, #21262d 50%, #1a1e23 100%)', // GitHub dark borders
    border: '1px solid #0d1117',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(48, 54, 61, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #21262d 0%, #1a1e23 50%, #13161a 100%)',
    activeBackground: 'linear-gradient(180deg, #1a1e23 0%, #13161a 50%, #0c0e11 100%)',
  },
};
