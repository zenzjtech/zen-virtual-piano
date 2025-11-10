import { PianoTheme } from './types';

export const catppuccin: PianoTheme = {
  id: 'catppuccin',
  name: 'Catppuccin',
  description: 'Cozy pastel theme with warm colors and multiple flavor variants',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#cdd6f4', // Catppuccin foreground (mocha)
    secondary: '#6c7086', // Catppuccin overlay0
    accent: '#f38ba8', // Catppuccin red accent
    border: 'rgba(108, 112, 134, 0.3)', // Semi-transparent overlay0
    containerSolid: '#1e1e2e', // Catppuccin base
  },
  lighting: {
    ambientGlow: 'rgba(30, 30, 46, 0.5)', // Dark catppuccin glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(30, 30, 46, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(30, 30, 46, 0.6) 0%, rgba(41, 42, 56, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(243, 139, 168, 0.5)', // Catppuccin red glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #1e1e2e 0%, #292938 50%, #181825 100%)', // Catppuccin gradient
    border: '2px solid #6c7086',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(30, 30, 46, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(108, 112, 134, 0.06) 40px,
        rgba(108, 112, 134, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(30, 30, 46, 0.9) 0%, rgba(30, 30, 46, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #292938 0%, #1e1e2e 50%, #181825 100%)',
    border: '1px solid #6c7086',
    boxShadow: 'inset 0 1px 2px rgba(30, 30, 46, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #1e1e2e 0%, #292938 50%, #181825 100%)',
    border: '1px solid #6c7086',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(30, 30, 46, 1)',
    hoverBackground: 'linear-gradient(180deg, #292938 0%, #181825 50%, #12121d 100%)',
    activeBackground: 'linear-gradient(180deg, #181825 0%, #12121d 50%, #0c0c15 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #6c7086 0%, #565b70 50%, #40455a 100%)', // Catppuccin overlay tones
    border: '1px solid #1e1e2e',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(108, 112, 134, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #565b70 0%, #40455a 50%, #2a2f44 100%)',
    activeBackground: 'linear-gradient(180deg, #40455a 0%, #2a2f44 50%, #14192e 100%)',
  },
};

export const everforest: PianoTheme = {
  id: 'everforest',
  name: 'Everforest',
  description: 'Warm green color scheme with natural forest-inspired aesthetics',
  category: 'cultural',
  isLight: false,
  colors: {
    primary: '#d3c6aa', // Everforest foreground
    secondary: '#859289', // Everforest comment
    accent: '#a7c080', // Everforest green accent
    border: 'rgba(133, 146, 137, 0.3)', // Semi-transparent comment
    containerSolid: '#2b3339', // Everforest background
  },
  lighting: {
    ambientGlow: 'rgba(43, 51, 57, 0.5)', // Dark everforest glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(43, 51, 57, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(43, 51, 57, 0.6) 0%, rgba(61, 69, 75, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(167, 192, 128, 0.5)', // Everforest green glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #2b3339 0%, #3d454b 50%, #232a30 100%)', // Everforest gradient
    border: '2px solid #859289',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(43, 51, 57, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(133, 146, 137, 0.06) 40px,
        rgba(133, 146, 137, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(43, 51, 57, 0.9) 0%, rgba(43, 51, 57, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #3d454b 0%, #2b3339 50%, #232a30 100%)',
    border: '1px solid #859289',
    boxShadow: 'inset 0 1px 2px rgba(43, 51, 57, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #2b3339 0%, #3d454b 50%, #232a30 100%)',
    border: '1px solid #859289',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(43, 51, 57, 1)',
    hoverBackground: 'linear-gradient(180deg, #3d454b 0%, #232a30 50%, #1b2126 100%)',
    activeBackground: 'linear-gradient(180deg, #232a30 0%, #1b2126 50%, #13181c 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #859289 0%, #707b74 50%, #5b665f 100%)', // Everforest warm greens
    border: '1px solid #2b3339',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(133, 146, 137, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #707b74 0%, #5b665f 50%, #46524a 100%)',
    activeBackground: 'linear-gradient(180deg, #5b665f 0%, #46524a 50%, #313d35 100%)',
  },
};
