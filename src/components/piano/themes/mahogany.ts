import { PianoTheme } from './types';

export const mahogany: PianoTheme = {
  id: 'mahogany',
  name: 'Mahogany Grand',
  description: 'Rich mahogany wood with burgundy undertones',
  category: 'classic',
  isLight: false,
  colors: {
    primary: '#E8D4C8',
    secondary: '#B88A70',
    accent: '#D4A880',
    border: 'rgba(184, 138, 112, 0.3)',
  },
  lighting: {
    ambientGlow: 'rgba(212, 168, 128, 0.18)',
    ambientOpacity: 0.65,
    specularHighlight: 'rgba(255, 230, 210, 0.45)',
    specularIntensity: 0.5,
    specularSize: '38%',
    shadowColor: 'rgba(90, 45, 35, 0.55)',
    shadowDepth: '7px',
    shadowSoftness: '14px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 235, 215, 0.25) 0%, rgba(212, 168, 128, 0.15) 28%, transparent 55%)',
    reflectionOpacity: 0.55,
    interactiveGlow: 'rgba(212, 168, 128, 0.65)',
    interactiveGlowSize: '17px',
    lightAngle: 135,
    materialFinish: 'wood',
    glossiness: 0.6,
  },
  container: {
    background: 'linear-gradient(135deg, #8B4545 0%, #6B3535 35%, #522828 70%, #3A1818 100%)',
    border: '2px solid #6B3535',
    boxShadow: '0 8px 32px rgba(58, 24, 24, 0.4), inset 0 1px 0 rgba(139, 69, 69, 0.45)',
    beforeBackground: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 4px,
        rgba(90, 45, 35, 0.2) 4px,
        rgba(90, 45, 35, 0.2) 4.5px,
        transparent 4.5px,
        transparent 10px,
        rgba(70, 35, 28, 0.15) 10px,
        rgba(70, 35, 28, 0.15) 11px,
        transparent 11px,
        transparent 18px,
        rgba(90, 45, 35, 0.12) 18px,
        rgba(90, 45, 35, 0.12) 19px,
        transparent 19px,
        transparent 35px,
        rgba(110, 55, 45, 0.22) 35px,
        rgba(110, 55, 45, 0.22) 36px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 70px,
        rgba(70, 35, 28, 0.1) 70px,
        rgba(70, 35, 28, 0.1) 72px,
        transparent 72px,
        transparent 140px,
        rgba(90, 45, 35, 0.08) 140px,
        rgba(90, 45, 35, 0.08) 143px
      ),
      radial-gradient(
        ellipse 120px 80px at 20% 30%,
        rgba(70, 30, 25, 0.3) 0%,
        rgba(90, 40, 32, 0.18) 35%,
        transparent 60%
      ),
      radial-gradient(
        ellipse 90px 65px at 70% 65%,
        rgba(70, 30, 25, 0.25) 0%,
        rgba(90, 40, 32, 0.15) 30%,
        transparent 55%
      )
    `,
    afterBackground: `
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 35%,
        transparent 65%
      ),
      repeating-radial-gradient(
        ellipse at 45% 35%,
        transparent 0px,
        transparent 90px,
        rgba(70, 30, 25, 0.04) 90px,
        rgba(70, 30, 25, 0.04) 92px,
        transparent 92px,
        transparent 180px
      )
    `,
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #D4A880 0%, #E8C4A0 50%, #C09870 100%)',
    border: '1px solid #A08060',
    boxShadow: 'inset 0 1px 2px rgba(255, 240, 220, 0.45), 0 2px 4px rgba(58, 24, 24, 0.35)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #FFFBF8 0%, #F8F3F0 50%, #F0EBE8 100%)',
    border: '1px solid #D8C8C0',
    boxShadow: '0 2px 4px rgba(58, 24, 24, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
    hoverBackground: 'linear-gradient(180deg, #FFFEFA 0%, #FAF5F2 50%, #F2EDE8 100%)',
    activeBackground: 'linear-gradient(180deg, #F0E8E0 0%, #E8DED8 50%, #DCD0C8 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #3A2820 0%, #2A1A15 50%, #1A0D08 100%)',
    border: '1px solid #0A0503',
    boxShadow: '0 2px 4px rgba(26, 13, 8, 0.6), inset 0 1px 0 rgba(139, 69, 69, 0.15)',
    hoverBackground: 'linear-gradient(180deg, #4A3830 0%, #3A2820 50%, #2A1A15 100%)',
    activeBackground: 'linear-gradient(180deg, #2A1A15 0%, #1A0D08 50%, #0A0503 100%)',
  },
};
