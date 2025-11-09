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
    containerSolid: '#6B4423', // Mid-tone brown wood
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
    // Pattern textures now applied via pattern themes
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
