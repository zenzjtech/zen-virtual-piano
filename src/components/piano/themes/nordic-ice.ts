import { PianoTheme } from './types';

export const nordicIce: PianoTheme = {
  id: 'nordicIce',
  name: 'Nordic Ice',
  description: 'Cool Scandinavian-inspired icy white-blue',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#2C3E50',
    secondary: '#5D6E7E',
    accent: '#7F9CAF',
    border: 'rgba(127, 156, 175, 0.25)',
    containerSolid: '#DCE8F0', // Icy white-blue
  },
  lighting: {
    ambientGlow: 'rgba(200, 220, 235, 0.25)',
    ambientOpacity: 0.55,
    specularHighlight: 'rgba(240, 250, 255, 0.6)',
    specularIntensity: 0.5,
    specularSize: '42%',
    shadowColor: 'rgba(127, 156, 175, 0.2)',
    shadowDepth: '4px',
    shadowSoftness: '10px',
    reflectionGradient: 'linear-gradient(165deg, rgba(240, 250, 255, 0.35) 0%, rgba(200, 220, 235, 0.2) 40%, transparent 70%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(200, 220, 235, 0.45)',
    interactiveGlowSize: '15px',
    lightAngle: 170,
    materialFinish: 'matte',
    glossiness: 0.35,
  },
  container: {
    background: 'linear-gradient(135deg, #F0F8FF 0%, #E8F4FB 35%, #DCE8F0 70%, #CDD8E3 100%)',
    border: '2px solid #C8D8E5',
    boxShadow: '0 8px 32px rgba(127, 156, 175, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    beforeBackground: `
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 3px,
        rgba(200, 220, 235, 0.08) 3px,
        rgba(200, 220, 235, 0.08) 4px,
        transparent 4px,
        transparent 8px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 3px,
        rgba(200, 220, 235, 0.06) 3px,
        rgba(200, 220, 235, 0.06) 4px,
        transparent 4px,
        transparent 8px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 100px,
        rgba(127, 156, 175, 0.03) 100px,
        rgba(127, 156, 175, 0.03) 102px
      )
    `,
    afterBackground: `
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(240, 250, 255, 0.35) 40%,
        transparent 75%
      ),
      radial-gradient(
        circle at 25% 25%,
        rgba(200, 220, 235, 0.12) 0%,
        transparent 30%
      ),
      radial-gradient(
        circle at 75% 60%,
        rgba(200, 220, 235, 0.1) 0%,
        transparent 25%
      )
    `,
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #E8F0F8 0%, #F8FCFF 50%, #DCE8F0 100%)',
    border: '1px solid #B8C8D5',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(127, 156, 175, 0.15)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FCFF 50%, #F0F8FF 100%)',
    border: '1px solid #D8E8F0',
    boxShadow: '0 2px 4px rgba(127, 156, 175, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)',
    hoverBackground: 'linear-gradient(180deg, #FAFCFF 0%, #F0F8FF 50%, #E8F4FB 100%)',
    activeBackground: 'linear-gradient(180deg, #E8F4FB 0%, #DCE8F0 50%, #D0DCE8 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #5D6E7E 0%, #4A5968 50%, #3A4858 100%)',
    border: '1px solid #2C3E50',
    boxShadow: '0 2px 4px rgba(44, 62, 80, 0.35), inset 0 1px 0 rgba(200, 220, 235, 0.2)',
    hoverBackground: 'linear-gradient(180deg, #6D7E8E 0%, #5A6978 50%, #4A5868 100%)',
    activeBackground: 'linear-gradient(180deg, #4A5968 0%, #3A4858 50%, #2C3E50 100%)',
  },
};
