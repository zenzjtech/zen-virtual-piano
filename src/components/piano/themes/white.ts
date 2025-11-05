import { PianoTheme } from './types';

export const white: PianoTheme = {
  id: 'white',
  name: 'Pure White',
  description: 'Clean and minimal white piano',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#333333',
    secondary: '#666666',
    accent: '#555555',
    border: 'rgba(0, 0, 0, 0.15)',
    containerSolid: '#F5F5F5', // Pure white-gray
  },
  lighting: {
    ambientGlow: 'rgba(255, 255, 255, 0.3)',
    ambientOpacity: 0.5,
    specularHighlight: 'rgba(255, 255, 255, 0.5)',
    specularIntensity: 0.35,
    specularSize: '45%',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowDepth: '3px',
    shadowSoftness: '8px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.4) 0%, rgba(250, 250, 250, 0.2) 35%, transparent 65%)',
    reflectionOpacity: 0.4,
    interactiveGlow: 'rgba(150, 150, 150, 0.3)',
    interactiveGlowSize: '14px',
    lightAngle: 160,
    materialFinish: 'matte',
    glossiness: 0.3,
  },
  container: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
    border: '2px solid #DDDDDD',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        rgba(0, 0, 0, 0.02) 80px,
        rgba(0, 0, 0, 0.02) 81px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #F0F0F0 0%, #FFFFFF 50%, #E0E0E0 100%)',
    border: '1px solid #CCCCCC',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 50%, #F5F5F5 100%)',
    border: '1px solid #E0E0E0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
    hoverBackground: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 50%, #F0F0F0 100%)',
    activeBackground: 'linear-gradient(180deg, #F0F0F0 0%, #EBEBEB 50%, #E5E5E5 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #505050 0%, #3A3A3A 50%, #2A2A2A 100%)',
    border: '1px solid #1A1A1A',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    hoverBackground: 'linear-gradient(180deg, #606060 0%, #4A4A4A 50%, #3A3A3A 100%)',
    activeBackground: 'linear-gradient(180deg, #3A3A3A 0%, #2A2A2A 50%, #1A1A1A 100%)',
  },
};
