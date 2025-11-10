import { PianoTheme } from './types';

export const bracketsLightPro: PianoTheme = {
  id: 'brackets-light-pro',
  name: 'Brackets Light Pro',
  description: 'Clean, minimal theme inspired by Brackets editor with professional styling',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#000000', // Brackets Light Pro foreground
    secondary: '#8b949e', // Brackets Light Pro secondary
    accent: '#007acc', // Brackets Light Pro blue accent
    border: 'rgba(139, 148, 158, 0.3)', // Semi-transparent secondary
    containerSolid: '#ffffff', // Brackets Light Pro background
  },
  lighting: {
    ambientGlow: 'rgba(255, 255, 255, 0.4)', // Light brackets glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(255, 255, 255, 0.6)', // Light highlight
    specularIntensity: 0.4,
    specularSize: '50%',
    shadowColor: 'rgba(240, 243, 246, 0.15)', // Subtle shadows
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.5) 0%, rgba(248, 250, 252, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(0, 122, 204, 0.4)', // Brackets blue glow
    interactiveGlowSize: '16px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.25,
  },
  container: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)', // Brackets Light gradient
    border: '2px solid #8b949e',
    boxShadow: '0 10px 40px rgba(240, 243, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(139, 148, 158, 0.03) 30px,
        rgba(139, 148, 158, 0.03) 31px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
    border: '1px solid #8b949e',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(240, 243, 246, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
    border: '1px solid #8b949e',
    boxShadow: '0 2px 4px rgba(240, 243, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
    hoverBackground: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e8ecf0 100%)',
    activeBackground: 'linear-gradient(180deg, #f1f5f9 0%, #e8ecf0 50%, #dee3e7 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #8b949e 0%, #6f7880 50%, #535c62 100%)', // Brackets Light accents
    border: '1px solid #ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(139, 148, 158, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #6f7880 0%, #535c62 50%, #374044 100%)',
    activeBackground: 'linear-gradient(180deg, #535c62 0%, #374044 50%, #1b2426 100%)',
  },
};

export const minDark: PianoTheme = {
  id: 'min-dark',
  name: 'Min Dark',
  description: 'Ultra-minimal dark theme with subtle grays and clean aesthetics',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#ffffff', // Min Dark foreground
    secondary: '#888888', // Min Dark secondary
    accent: '#ffffff', // Min Dark white accent (minimal)
    border: 'rgba(136, 136, 136, 0.3)', // Semi-transparent secondary
    containerSolid: '#000000', // Min Dark pure black background
  },
  lighting: {
    ambientGlow: 'rgba(0, 0, 0, 0.5)', // Dark min glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(0, 0, 0, 0.7)', // Dark highlight
    specularIntensity: 0.3,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.6)', // Deep shadows
    shadowDepth: '8px',
    shadowSoftness: '20px',
    reflectionGradient: 'linear-gradient(165deg, rgba(0, 0, 0, 0.6) 0%, rgba(16, 16, 16, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.4,
    interactiveGlow: 'rgba(255, 255, 255, 0.3)', // Min white glow
    interactiveGlowSize: '16px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.1,
  },
  container: {
    background: 'linear-gradient(135deg, #000000 0%, #101010 50%, #050505 100%)', // Min Dark gradient
    border: '2px solid #333333',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(0, 0, 0, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(51, 51, 51, 0.08) 40px,
        rgba(51, 51, 51, 0.08) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #101010 0%, #000000 50%, #050505 100%)',
    border: '1px solid #333333',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.9), 0 3px 6px rgba(0, 0, 0, 0.3)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #000000 0%, #101010 50%, #050505 100%)',
    border: '1px solid #333333',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(0, 0, 0, 1)',
    hoverBackground: 'linear-gradient(180deg, #101010 0%, #050505 50%, #020202 100%)',
    activeBackground: 'linear-gradient(180deg, #050505 0%, #020202 50%, #000000 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #333333 0%, #262626 50%, #1a1a1a 100%)', // Min Dark grays
    border: '1px solid #000000',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(51, 51, 51, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #262626 0%, #1a1a1a 50%, #0f0f0f 100%)',
    activeBackground: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 50%, #050505 100%)',
  },
};
