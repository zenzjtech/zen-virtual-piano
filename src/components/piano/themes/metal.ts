import { PianoTheme } from './types';

export const metal: PianoTheme = {
  id: 'metal',
  name: 'Metallic Silver',
  description: 'Futuristic metal finish piano',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#2C3E50',
    secondary: '#5D6E81',
    accent: '#34495E',
    border: 'rgba(45, 62, 80, 0.2)',
    containerSolid: '#8A9BAE', // Metallic silver-blue
  },
  lighting: {
    ambientGlow: 'rgba(184, 198, 212, 0.25)',
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(255, 255, 255, 0.8)',
    specularIntensity: 0.8,
    specularSize: '30%',
    shadowColor: 'rgba(45, 62, 80, 0.4)',
    shadowDepth: '5px',
    shadowSoftness: '10px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.35) 0%, rgba(240, 245, 250, 0.2) 30%, transparent 60%)',
    reflectionOpacity: 0.75,
    interactiveGlow: 'rgba(184, 198, 212, 0.7)',
    interactiveGlowSize: '18px',
    lightAngle: 145,
    materialFinish: 'metallic',
    glossiness: 0.75,
  },
  container: {
    background: 'linear-gradient(135deg, #B8C6D4 0%, #8A9BAE 50%, #6B7C8F 100%)',
    border: '2px solid #5D6E81',
    boxShadow: '0 8px 32px rgba(107, 124, 143, 0.4), inset 0 1px 0 rgba(184, 198, 212, 0.6)',
    beforeBackground: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        rgba(0, 0, 0, 0.05) 80px,
        rgba(0, 0, 0, 0.05) 81px
      ),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.03) 2px,
        rgba(255, 255, 255, 0.03) 4px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A8A8A8 100%)',
    border: '1px solid #888888',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #FAFAFA 0%, #F0F0F0 50%, #E5E5E5 100%)',
    border: '1px solid #BEBEBE',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    hoverBackground: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
    activeBackground: 'linear-gradient(180deg, #E8E8E8 0%, #DEDEDE 50%, #D4D4D4 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #404040 0%, #2A2A2A 50%, #1A1A1A 100%)',
    border: '1px solid #0A0A0A',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    hoverBackground: 'linear-gradient(180deg, #505050 0%, #353535 50%, #252525 100%)',
    activeBackground: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%)',
  },
};
