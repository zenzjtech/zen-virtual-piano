import { PianoTheme } from './types';

export const tibetanWood: PianoTheme = {
  id: 'tibetanWood',
  name: 'Tibetan Sanctuary',
  description: 'Sacred wood with prayer wheel engravings',
  category: 'cultural',
  isLight: false,
  colors: {
    primary: '#E8D8C5',        // Warm parchment
    secondary: '#A67C52',      // Aged bronze
    accent: '#C84B31',         // Sacred maroon
    border: 'rgba(166, 124, 82, 0.4)',
    containerSolid: '#5D3A1A', // Deep rosewood
  },
  lighting: {
    // Warm, spiritual lighting with subtle sacred glow
    ambientGlow: 'rgba(200, 75, 49, 0.12)',
    ambientOpacity: 0.5,
    
    // Soft specular highlights for polished sacred wood
    specularHighlight: 'rgba(255, 230, 200, 0.35)',
    specularIntensity: 0.35,
    specularSize: '45%',
    
    // Deep, warm shadows with spiritual depth
    shadowColor: 'rgba(60, 32, 18, 0.6)',
    shadowDepth: '8px',
    shadowSoftness: '14px',
    
    // Sacred wood reflections with maroon tint
    reflectionGradient: 'linear-gradient(155deg, rgba(232, 216, 197, 0.2) 0%, rgba(200, 75, 49, 0.1) 30%, transparent 60%)',
    reflectionOpacity: 0.45,
    
    // Sacred maroon glow for interactions
    interactiveGlow: 'rgba(200, 75, 49, 0.7)',
    interactiveGlowSize: '18px',
    
    // Soft temple lighting from above
    lightAngle: 120,
    
    // Polished sacred wood material
    materialFinish: 'wood',
    glossiness: 0.45,
  },
  container: {
    background: 'linear-gradient(135deg, #7A4A2A 0%, #5D3A1A 50%, #3E2614 100%)',
    border: '3px solid #4A2E1A',
    boxShadow: '0 10px 36px rgba(60, 32, 18, 0.4), inset 0 2px 0 rgba(122, 74, 42, 0.5)',
    // Pattern textures now applied via pattern themes
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #A67C52 0%, #D4A574 50%, #8B6F47 100%)',
    border: '2px solid #6B5238',
    boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.3), 0 3px 6px rgba(0, 0, 0, 0.4), 0 0 20px rgba(200, 75, 49, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #FFFEF8 0%, #F5F4ED 50%, #EBE9E0 100%)',
    border: '1px solid #D0CBBA',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    hoverBackground: 'linear-gradient(180deg, #F8F7F0 0%, #F0EEE5 50%, #E6E3D8 100%)',
    activeBackground: 'linear-gradient(180deg, #E5E3D8 0%, #DDD9CC 50%, #D3CFC0 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #3E2614 0%, #2C1A0E 50%, #1A0F08 100%)',
    border: '1px solid #0F0705',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(122, 74, 42, 0.15)',
    hoverBackground: 'linear-gradient(180deg, #4A2E1A 0%, #352015 50%, #20120A 100%)',
    activeBackground: 'linear-gradient(180deg, #2C1A0E 0%, #1F1109 50%, #120905 100%)',
  },
};
