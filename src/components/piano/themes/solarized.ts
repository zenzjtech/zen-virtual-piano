import { PianoTheme } from './types';

export const solarized: PianoTheme = {
  id: 'solarized',
  name: 'Solarized',
  description: 'Carefully calibrated colors for optimal readability and reduced eye strain',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#657b83', // Solarized base1
    secondary: '#93a1a1', // Solarized base0
    accent: '#268bd2', // Solarized blue
    border: 'rgba(101, 123, 131, 0.2)', // Semi-transparent base1
    containerSolid: '#fdf6e3', // Solarized base3 (cream background)
  },
  lighting: {
    ambientGlow: 'rgba(253, 246, 227, 0.4)', // Soft cream glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(253, 246, 227, 0.6)', // Cream highlight
    specularIntensity: 0.4,
    specularSize: '50%',
    shadowColor: 'rgba(101, 123, 131, 0.15)', // Subtle base1 shadow
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(253, 246, 227, 0.5) 0%, rgba(238, 232, 213, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(38, 139, 210, 0.4)', // Solarized blue glow
    interactiveGlowSize: '16px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.25,
  },
  container: {
    background: 'linear-gradient(135deg, #fdf6e3 0%, #f5efd8 50%, #eee8cd 100%)', // Solarized cream gradient
    border: '2px solid #d0c4b0',
    boxShadow: '0 10px 40px rgba(101, 123, 131, 0.1), inset 0 1px 0 rgba(253, 246, 227, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        rgba(101, 123, 131, 0.03) 80px,
        rgba(101, 123, 131, 0.03) 81px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(253, 246, 227, 0.8) 0%, rgba(253, 246, 227, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #f5efd8 0%, #fdf6e3 50%, #eee8cd 100%)',
    border: '1px solid #d0c4b0',
    boxShadow: 'inset 0 1px 2px rgba(253, 246, 227, 0.8), 0 2px 4px rgba(101, 123, 131, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #fdf6e3 0%, #f5efd8 50%, #eee8cd 100%)',
    border: '1px solid #d0c4b0',
    boxShadow: '0 2px 4px rgba(101, 123, 131, 0.08), inset 0 1px 0 rgba(253, 246, 227, 1)',
    hoverBackground: 'linear-gradient(180deg, #f5efd8 0%, #eee8cd 50%, #e8e2c1 100%)',
    activeBackground: 'linear-gradient(180deg, #eee8cd 0%, #e8e2c1 50%, #e2dcb5 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #073642 0%, #002b36 50%, #001f29 100%)', // Solarized base03, base02, base01
    border: '1px solid #586e75', // Solarized base01
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(7, 54, 66, 0.3)', // base02
    hoverBackground: 'linear-gradient(180deg, #002b36 0%, #001f29 50%, #00141d 100%)',
    activeBackground: 'linear-gradient(180deg, #001f29 0%, #00141d 50%, #000a11 100%)',
  },
};
