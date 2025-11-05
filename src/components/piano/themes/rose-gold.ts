import { PianoTheme } from './types';

export const roseGold: PianoTheme = {
  id: 'roseGold',
  name: 'Rose Gold Elegance',
  description: 'Elegant rose gold metallic finish',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#5D4E4A',
    secondary: '#8B7670',
    accent: '#E8B4A8',
    border: 'rgba(232, 180, 168, 0.3)',
    containerSolid: '#B88A7E', // Rose gold metallic
  },
  lighting: {
    ambientGlow: 'rgba(232, 180, 168, 0.2)',
    ambientOpacity: 0.65,
    specularHighlight: 'rgba(255, 230, 220, 0.7)',
    specularIntensity: 0.75,
    specularSize: '35%',
    shadowColor: 'rgba(139, 118, 112, 0.35)',
    shadowDepth: '5px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 240, 235, 0.4) 0%, rgba(232, 180, 168, 0.25) 30%, transparent 60%)',
    reflectionOpacity: 0.7,
    interactiveGlow: 'rgba(232, 180, 168, 0.6)',
    interactiveGlowSize: '18px',
    lightAngle: 140,
    materialFinish: 'metallic',
    glossiness: 0.7,
  },
  container: {
    background: 'linear-gradient(135deg, #E8B4A8 0%, #D4A094 35%, #B88A7E 70%, #9D7268 100%)',
    border: '2px solid #B88A7E',
    boxShadow: '0 8px 32px rgba(157, 114, 104, 0.35), inset 0 1px 0 rgba(232, 180, 168, 0.5)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.08) 2px,
        rgba(255, 255, 255, 0.08) 3px,
        transparent 3px,
        transparent 6px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 60px,
        rgba(139, 118, 112, 0.06) 60px,
        rgba(139, 118, 112, 0.06) 61px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 240, 235, 0.3) 0%, rgba(255, 240, 235, 0.15) 40%, transparent 70%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #F4D8CF 0%, #E8B4A8 50%, #D4A094 100%)',
    border: '1px solid #B88A7E',
    boxShadow: 'inset 0 1px 2px rgba(255, 240, 235, 0.5), 0 2px 4px rgba(157, 114, 104, 0.3)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #FFF8F5 0%, #F5EBE8 50%, #EBDDD8 100%)',
    border: '1px solid #D4C0B8',
    boxShadow: '0 2px 4px rgba(157, 114, 104, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    hoverBackground: 'linear-gradient(180deg, #FFFAF8 0%, #F8F0ED 50%, #EDE3E0 100%)',
    activeBackground: 'linear-gradient(180deg, #F0E0DC 0%, #E5D3CF 50%, #D8C3BD 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #5D4E4A 0%, #4A3D3A 50%, #3A2E2B 100%)',
    border: '1px solid #2A1E1B',
    boxShadow: '0 2px 4px rgba(58, 46, 43, 0.5), inset 0 1px 0 rgba(232, 180, 168, 0.2)',
    hoverBackground: 'linear-gradient(180deg, #6D5E5A 0%, #5A4D4A 50%, #4A3E3B 100%)',
    activeBackground: 'linear-gradient(180deg, #4A3D3A 0%, #3A2E2B 50%, #2A1E1B 100%)',
  },
};
