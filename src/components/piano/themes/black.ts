import { PianoTheme } from './types';

export const black: PianoTheme = {
  id: 'black',
  name: 'Midnight Black',
  description: 'Sleek modern black piano',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#E8E8E8',        // Light gray
    secondary: '#999999',      // Medium gray
    accent: '#CCCCCC',         // Bright gray
    border: 'rgba(255, 255, 255, 0.2)',
    containerSolid: '#0a0a0a', // Deep black
  },
  lighting: {
    // Cool, subtle ambient glow
    ambientGlow: 'rgba(100, 120, 140, 0.1)',
    ambientOpacity: 0.3,
    
    // Sharp, bright specular highlights for glossy finish
    specularHighlight: 'rgba(255, 255, 255, 0.6)',
    specularIntensity: 0.7,
    specularSize: '25%',
    
    // Deep, sharp black shadows
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowDepth: '8px',
    shadowSoftness: '16px',
    
    // Sharp, mirror-like reflections
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.15) 0%, rgba(200, 220, 240, 0.08) 20%, transparent 40%)',
    reflectionOpacity: 0.6,
    
    // Cool blue-white glow
    interactiveGlow: 'rgba(200, 220, 240, 0.5)',
    interactiveGlowSize: '20px',
    
    // Direct overhead lighting
    lightAngle: 180,
    
    // High-gloss glossy finish
    materialFinish: 'glossy',
    glossiness: 0.85,
  },
  container: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
    border: '2px solid #333333',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    beforeBackground: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        rgba(255, 255, 255, 0.02) 80px,
        rgba(255, 255, 255, 0.02) 81px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #4A4A4A 0%, #6A6A6A 50%, #3A3A3A 100%)',
    border: '1px solid #222222',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.5)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #E8E8E8 0%, #D8D8D8 50%, #C8C8C8 100%)',
    border: '1px solid #999999',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    hoverBackground: 'linear-gradient(180deg, #F0F0F0 0%, #E0E0E0 50%, #D0D0D0 100%)',
    activeBackground: 'linear-gradient(180deg, #D0D0D0 0%, #C0C0C0 50%, #B0B0B0 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 50%, #050505 100%)',
    border: '1px solid #000000',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
    hoverBackground: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%)',
    activeBackground: 'linear-gradient(180deg, #0A0A0A 0%, #050505 50%, #000000 100%)',
  },
};
