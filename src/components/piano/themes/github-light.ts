import { PianoTheme } from './types';

export const githubLight: PianoTheme = {
  id: 'github-light',
  name: 'GitHub Light',
  description: 'GitHub\'s official light theme with clean design and professional blue accents',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#24292f', // GitHub light foreground
    secondary: '#57606a', // GitHub light secondary text
    accent: '#0969da', // GitHub light blue accent
    border: 'rgba(209, 217, 224, 0.3)', // Semi-transparent border
    containerSolid: '#ffffff', // GitHub light background
  },
  lighting: {
    ambientGlow: 'rgba(255, 255, 255, 0.4)', // Light GitHub glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(255, 255, 255, 0.6)', // Light highlight
    specularIntensity: 0.4,
    specularSize: '50%',
    shadowColor: 'rgba(209, 217, 224, 0.15)', // Subtle shadows
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.5) 0%, rgba(246, 248, 250, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(9, 105, 218, 0.4)', // GitHub blue glow
    interactiveGlowSize: '16px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.25,
  },
  container: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f6f8fa 50%, #f1f3f4 100%)', // GitHub light gradient
    border: '2px solid #d1d9e0',
    boxShadow: '0 10px 40px rgba(209, 217, 224, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(209, 217, 224, 0.03) 30px,
        rgba(209, 217, 224, 0.03) 31px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #f6f8fa 0%, #ffffff 50%, #f1f3f4 100%)',
    border: '1px solid #d1d9e0',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(209, 217, 224, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #ffffff 0%, #f6f8fa 50%, #f1f3f4 100%)',
    border: '1px solid #d1d9e0',
    boxShadow: '0 2px 4px rgba(209, 217, 224, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
    hoverBackground: 'linear-gradient(180deg, #f6f8fa 0%, #f1f3f4 50%, #eceff1 100%)',
    activeBackground: 'linear-gradient(180deg, #f1f3f4 0%, #eceff1 50%, #e8eaed 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #d1d9e0 0%, #b1bac4 50%, #8b949e 100%)', // GitHub light borders
    border: '1px solid #ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(209, 217, 224, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #b1bac4 0%, #8b949e 50%, #6e7681 100%)',
    activeBackground: 'linear-gradient(180deg, #8b949e 0%, #6e7681 50%, #586069 100%)',
  },
};
