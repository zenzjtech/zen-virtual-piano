import { PianoTheme } from './types';

export const wooden: PianoTheme = {
  id: 'wooden',
  name: 'Wooden Classic',
  description: 'Traditional wooden piano with brass accents',
  category: 'classic',
  isLight: false,
  colors: {
    primary: '#E8D4B8',        // Warm cream
    secondary: '#B8941E',      // Golden brass
    accent: '#D4AF37',         // Bright gold
    border: 'rgba(184, 148, 30, 0.3)',
  },
  lighting: {
    // Warm, natural wood lighting with subtle glow
    ambientGlow: 'rgba(212, 175, 55, 0.15)',
    ambientOpacity: 0.6,
    
    // Soft specular highlights for polished wood
    specularHighlight: 'rgba(255, 235, 200, 0.4)',
    specularIntensity: 0.4,
    specularSize: '40%',
    
    // Deep, warm shadows
    shadowColor: 'rgba(74, 47, 26, 0.5)',
    shadowDepth: '6px',
    shadowSoftness: '12px',
    
    // Natural wood reflections
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 245, 220, 0.2) 0%, rgba(255, 235, 200, 0.1) 25%, transparent 50%)',
    reflectionOpacity: 0.5,
    
    // Golden glow for interactions
    interactiveGlow: 'rgba(212, 175, 55, 0.6)',
    interactiveGlowSize: '16px',
    
    // Top-left light source (natural lighting)
    lightAngle: 135,
    
    // Polished wood material
    materialFinish: 'wood',
    glossiness: 0.5,
  },
  container: {
    background: 'linear-gradient(135deg, #8B5A3C 0%, #6B4423 50%, #4A2F1A 100%)',
    border: '2px solid #5D3A1A',
    boxShadow: '0 8px 32px rgba(74, 47, 26, 0.3), inset 0 1px 0 rgba(139, 90, 60, 0.4)',
    beforeBackground: `
      /* Wood grain texture - vertical grain lines */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 3px,
        rgba(74, 47, 26, 0.15) 3px,
        rgba(74, 47, 26, 0.15) 3.5px,
        transparent 3.5px,
        transparent 8px,
        rgba(60, 38, 21, 0.12) 8px,
        rgba(60, 38, 21, 0.12) 9px,
        transparent 9px,
        transparent 15px,
        rgba(74, 47, 26, 0.08) 15px,
        rgba(74, 47, 26, 0.08) 16px,
        transparent 16px,
        transparent 25px,
        rgba(90, 56, 35, 0.18) 25px,
        rgba(90, 56, 35, 0.18) 26px,
        transparent 26px,
        transparent 40px,
        rgba(74, 47, 26, 0.1) 40px,
        rgba(74, 47, 26, 0.1) 41px
      ),
      /* Wood grain texture - horizontal subtle variations */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 60px,
        rgba(60, 38, 21, 0.08) 60px,
        rgba(60, 38, 21, 0.08) 62px,
        transparent 62px,
        transparent 120px,
        rgba(74, 47, 26, 0.06) 120px,
        rgba(74, 47, 26, 0.06) 123px
      ),
      /* Wood knots and imperfections */
      radial-gradient(
        ellipse 80px 60px at 15% 25%,
        rgba(60, 38, 21, 0.25) 0%,
        rgba(74, 47, 26, 0.15) 30%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 100px 70px at 75% 60%,
        rgba(60, 38, 21, 0.2) 0%,
        rgba(74, 47, 26, 0.12) 35%,
        transparent 55%
      ),
      radial-gradient(
        ellipse 60px 50px at 40% 80%,
        rgba(50, 32, 18, 0.22) 0%,
        rgba(70, 45, 25, 0.14) 30%,
        transparent 50%
      )
    `,
    afterBackground: `
      /* Natural wood color variations and highlights */
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(255, 255, 255, 0.06) 30%,
        transparent 60%
      ),
      /* Subtle wood growth rings */
      repeating-radial-gradient(
        circle at 30% 40%,
        transparent 0px,
        transparent 80px,
        rgba(60, 38, 21, 0.03) 80px,
        rgba(60, 38, 21, 0.03) 82px,
        transparent 82px,
        transparent 160px,
        rgba(74, 47, 26, 0.04) 160px,
        rgba(74, 47, 26, 0.04) 163px
      )
    `,
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #B8941E 100%)',
    border: '1px solid #8B7355',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
    border: '1px solid #CCCCCC',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    hoverBackground: 'linear-gradient(180deg, #F8F8F8 0%, #F0F0F0 50%, #E8E8E8 100%)',
    activeBackground: 'linear-gradient(180deg, #E0E0E0 0%, #D8D8D8 50%, #D0D0D0 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 50%, #0A0A0A 100%)',
    border: '1px solid #000000',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    hoverBackground: 'linear-gradient(180deg, #3A3A3A 0%, #252525 50%, #151515 100%)',
    activeBackground: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 50%, #050505 100%)',
  },
};
