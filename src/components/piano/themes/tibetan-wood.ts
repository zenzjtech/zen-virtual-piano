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
    beforeBackground: `
      /* Deep wood grain texture - vertical grain lines */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 4px,
        rgba(60, 32, 18, 0.2) 4px,
        rgba(60, 32, 18, 0.2) 4.5px,
        transparent 4.5px,
        transparent 10px,
        rgba(50, 28, 15, 0.15) 10px,
        rgba(50, 28, 15, 0.15) 11px,
        transparent 11px,
        transparent 18px,
        rgba(60, 32, 18, 0.12) 18px,
        rgba(60, 32, 18, 0.12) 19px,
        transparent 19px,
        transparent 30px,
        rgba(70, 40, 22, 0.22) 30px,
        rgba(70, 40, 22, 0.22) 31px,
        transparent 31px,
        transparent 50px,
        rgba(60, 32, 18, 0.14) 50px,
        rgba(60, 32, 18, 0.14) 51px
      ),
      /* Wood grain texture - horizontal subtle variations */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 70px,
        rgba(50, 28, 15, 0.1) 70px,
        rgba(50, 28, 15, 0.1) 73px,
        transparent 73px,
        transparent 140px,
        rgba(60, 32, 18, 0.08) 140px,
        rgba(60, 32, 18, 0.08) 144px
      ),
      /* Prayer wheel engravings - circular patterns */
      radial-gradient(
        circle 35px at 20% 30%,
        transparent 28px,
        rgba(200, 75, 49, 0.25) 28px,
        rgba(200, 75, 49, 0.25) 29px,
        transparent 29px,
        transparent 32px,
        rgba(166, 124, 82, 0.2) 32px,
        rgba(166, 124, 82, 0.2) 33px,
        transparent 33px
      ),
      radial-gradient(
        circle 35px at 80% 65%,
        transparent 28px,
        rgba(200, 75, 49, 0.22) 28px,
        rgba(200, 75, 49, 0.22) 29px,
        transparent 29px,
        transparent 32px,
        rgba(166, 124, 82, 0.18) 32px,
        rgba(166, 124, 82, 0.18) 33px,
        transparent 33px
      ),
      /* Sacred symbols - Om pattern hints */
      radial-gradient(
        ellipse 25px 30px at 50% 50%,
        transparent 18px,
        rgba(200, 75, 49, 0.15) 18px,
        rgba(200, 75, 49, 0.15) 19px,
        transparent 19px
      ),
      /* Wood knots with spiritual character */
      radial-gradient(
        ellipse 90px 70px at 25% 20%,
        rgba(50, 28, 15, 0.3) 0%,
        rgba(60, 32, 18, 0.18) 35%,
        transparent 55%
      ),
      radial-gradient(
        ellipse 110px 80px at 70% 75%,
        rgba(50, 28, 15, 0.25) 0%,
        rgba(60, 32, 18, 0.15) 40%,
        transparent 60%
      )
    `,
    afterBackground: `
      /* Sacred wood highlights with prayer wheel spoke patterns */
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 35%,
        transparent 65%
      ),
      /* Prayer wheel spokes - radial lines */
      repeating-conic-gradient(
        from 0deg at 20% 30%,
        transparent 0deg,
        transparent 43deg,
        rgba(166, 124, 82, 0.08) 43deg,
        rgba(166, 124, 82, 0.08) 45deg,
        transparent 45deg,
        transparent 88deg
      ),
      repeating-conic-gradient(
        from 22.5deg at 80% 65%,
        transparent 0deg,
        transparent 43deg,
        rgba(200, 75, 49, 0.06) 43deg,
        rgba(200, 75, 49, 0.06) 45deg,
        transparent 45deg,
        transparent 88deg
      ),
      /* Subtle wood growth rings with sacred geometry */
      repeating-radial-gradient(
        circle at 40% 50%,
        transparent 0px,
        transparent 100px,
        rgba(50, 28, 15, 0.04) 100px,
        rgba(50, 28, 15, 0.04) 103px,
        transparent 103px,
        transparent 200px,
        rgba(60, 32, 18, 0.05) 200px,
        rgba(60, 32, 18, 0.05) 204px
      )
    `,
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
