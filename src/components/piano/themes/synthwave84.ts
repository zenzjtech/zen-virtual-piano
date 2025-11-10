import { PianoTheme } from './types';

export const synthwave84: PianoTheme = {
  id: 'synthwave84',
  name: 'SynthWave \'84',
  description: 'Retro 80s neon theme with vibrant pinks, purples, and cyberpunk aesthetics',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#ffffff', // SynthWave white
    secondary: '#848bbd', // SynthWave purple-gray
    accent: '#f92aad', // SynthWave neon pink
    border: 'rgba(132, 139, 189, 0.3)', // Semi-transparent purple-gray
    containerSolid: '#2a2139', // SynthWave dark purple
  },
  lighting: {
    ambientGlow: 'rgba(42, 33, 57, 0.5)', // Dark synthwave glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(42, 33, 57, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(42, 33, 57, 0.6) 0%, rgba(74, 49, 89, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(249, 42, 173, 0.5)', // SynthWave neon pink glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #2a2139 0%, #4a3159 50%, #1f1829 100%)', // SynthWave gradient
    border: '2px solid #848bbd',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(42, 33, 57, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(132, 139, 189, 0.06) 40px,
        rgba(132, 139, 189, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(42, 33, 57, 0.9) 0%, rgba(42, 33, 57, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #4a3159 0%, #2a2139 50%, #1f1829 100%)',
    border: '1px solid #848bbd',
    boxShadow: 'inset 0 1px 2px rgba(42, 33, 57, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #2a2139 0%, #4a3159 50%, #1f1829 100%)',
    border: '1px solid #848bbd',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(42, 33, 57, 1)',
    hoverBackground: 'linear-gradient(180deg, #4a3159 0%, #1f1829 50%, #161027 100%)',
    activeBackground: 'linear-gradient(180deg, #1f1829 0%, #161027 50%, #0e0a1a 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #848bbd 0%, #6b6ea3 50%, #5a5e89 100%)', // SynthWave purple accents
    border: '1px solid #2a2139',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(132, 139, 189, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #6b6ea3 0%, #5a5e89 50%, #484d73 100%)',
    activeBackground: 'linear-gradient(180deg, #5a5e89 0%, #484d73 50%, #363b5d 100%)',
  },
};
