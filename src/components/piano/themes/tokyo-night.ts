import { PianoTheme } from './types';

export const tokyoNight: PianoTheme = {
  id: 'tokyo-night',
  name: 'Tokyo Night',
  description: 'Cyberpunk-inspired theme with neon accents and glowing lights',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#c0caf5', // Tokyo Night foreground
    secondary: '#565f89', // Tokyo Night secondary text
    accent: '#7dcfff', // Tokyo Night cyan accent
    border: 'rgba(54, 61, 82, 0.3)', // Semi-transparent border
    containerSolid: '#1a1b26', // Tokyo Night background
  },
  lighting: {
    ambientGlow: 'rgba(26, 27, 38, 0.5)', // Dark Tokyo Night glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(26, 27, 38, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(26, 27, 38, 0.6) 0%, rgba(37, 40, 54, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(125, 207, 255, 0.5)', // Tokyo Night cyan glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #1a1b26 0%, #252836 50%, #16161e 100%)', // Tokyo Night gradient
    border: '2px solid #363d52',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(26, 27, 38, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(54, 61, 82, 0.06) 40px,
        rgba(54, 61, 82, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(26, 27, 38, 0.9) 0%, rgba(26, 27, 38, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #252836 0%, #1a1b26 50%, #16161e 100%)',
    border: '1px solid #363d52',
    boxShadow: 'inset 0 1px 2px rgba(26, 27, 38, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #1a1b26 0%, #252836 50%, #16161e 100%)',
    border: '1px solid #363d52',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(26, 27, 38, 1)',
    hoverBackground: 'linear-gradient(180deg, #252836 0%, #16161e 50%, #111118 100%)',
    activeBackground: 'linear-gradient(180deg, #16161e 0%, #111118 50%, #0a0a0e 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #363d52 0%, #2a3142 50%, #1e2432 100%)', // Tokyo Night borders
    border: '1px solid #1a1b26',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(54, 61, 82, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #2a3142 0%, #1e2432 50%, #131926 100%)',
    activeBackground: 'linear-gradient(180deg, #1e2432 0%, #131926 50%, #080c1a 100%)',
  },
};
