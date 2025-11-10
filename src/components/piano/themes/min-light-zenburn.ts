import { PianoTheme } from './types';

export const minLight: PianoTheme = {
  id: 'min-light',
  name: 'Min Light',
  description: 'Ultra-minimal light theme with subtle grays and clean aesthetics',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#000000', // Min Light foreground
    secondary: '#888888', // Min Light secondary
    accent: '#000000', // Min Light black accent (minimal)
    border: 'rgba(136, 136, 136, 0.3)', // Semi-transparent secondary
    containerSolid: '#ffffff', // Min Light pure white background
  },
  lighting: {
    ambientGlow: 'rgba(255, 255, 255, 0.4)', // Light min glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(255, 255, 255, 0.6)', // Light highlight
    specularIntensity: 0.3,
    specularSize: '50%',
    shadowColor: 'rgba(240, 243, 246, 0.2)', // Subtle shadows
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.5) 0%, rgba(248, 250, 252, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.4,
    interactiveGlow: 'rgba(0, 0, 0, 0.2)', // Min black glow
    interactiveGlowSize: '14px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.1,
  },
  container: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #f5f5f5 100%)', // Min Light gradient
    border: '2px solid #cccccc',
    boxShadow: '0 10px 40px rgba(240, 243, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(204, 204, 204, 0.04) 30px,
        rgba(204, 204, 204, 0.04) 31px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #f8f8f8 0%, #ffffff 50%, #f5f5f5 100%)',
    border: '1px solid #cccccc',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(240, 243, 246, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #ffffff 0%, #f8f8f8 50%, #f5f5f5 100%)',
    border: '1px solid #cccccc',
    boxShadow: '0 2px 4px rgba(240, 243, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
    hoverBackground: 'linear-gradient(180deg, #f8f8f8 0%, #f5f5f5 50%, #f0f0f0 100%)',
    activeBackground: 'linear-gradient(180deg, #f5f5f5 0%, #f0f0f0 50%, #ebebeb 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #cccccc 0%, #aaaaaa 50%, #888888 100%)', // Min Light grays
    border: '1px solid #ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(204, 204, 204, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #aaaaaa 0%, #888888 50%, #666666 100%)',
    activeBackground: 'linear-gradient(180deg, #888888 0%, #666666 50%, #444444 100%)',
  },
};

export const zenburn: PianoTheme = {
  id: 'zenburn',
  name: 'Zenburn',
  description: 'Low-contrast theme designed for reduced eye strain with warm, comfortable colors',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#dcdccc', // Zenburn foreground
    secondary: '#8fb28f', // Zenburn green secondary
    accent: '#f0dfaf', // Zenburn yellow accent
    border: 'rgba(143, 178, 143, 0.3)', // Semi-transparent green
    containerSolid: '#3f3f3f', // Zenburn background
  },
  lighting: {
    ambientGlow: 'rgba(63, 63, 63, 0.5)', // Dark zenburn glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(63, 63, 63, 0.7)', // Dark highlight
    specularIntensity: 0.4,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '18px',
    reflectionGradient: 'linear-gradient(165deg, rgba(63, 63, 63, 0.6) 0%, rgba(79, 79, 79, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(240, 223, 175, 0.4)', // Zenburn yellow glow
    interactiveGlowSize: '16px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.15,
  },
  container: {
    background: 'linear-gradient(135deg, #3f3f3f 0%, #4f4f4f 50%, #353535 100%)', // Zenburn gradient
    border: '2px solid #8fb28f',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(63, 63, 63, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(143, 178, 143, 0.06) 40px,
        rgba(143, 178, 143, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(63, 63, 63, 0.9) 0%, rgba(63, 63, 63, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #4f4f4f 0%, #3f3f3f 50%, #353535 100%)',
    border: '1px solid #8fb28f',
    boxShadow: 'inset 0 1px 2px rgba(63, 63, 63, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #3f3f3f 0%, #4f4f4f 50%, #353535 100%)',
    border: '1px solid #8fb28f',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(63, 63, 63, 1)',
    hoverBackground: 'linear-gradient(180deg, #4f4f4f 0%, #353535 50%, #2b2b2b 100%)',
    activeBackground: 'linear-gradient(180deg, #353535 0%, #2b2b2b 50%, #212121 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #8fb28f 0%, #7a9d7a 50%, #658866 100%)', // Zenburn green tones
    border: '1px solid #3f3f3f',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(143, 178, 143, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #7a9d7a 0%, #658866 50%, #506f52 100%)',
    activeBackground: 'linear-gradient(180deg, #658866 0%, #506f52 50%, #3b563e 100%)',
  },
};
