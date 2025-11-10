import { PianoTheme } from './types';

export const slack: PianoTheme = {
  id: 'slack',
  name: 'Slack Theme',
  description: 'Professional look matching Slack\'s UI with clean design and balanced colors',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#ffffff', // Slack foreground
    secondary: '#616061', // Slack secondary text
    accent: '#36c5f0', // Slack blue accent
    border: 'rgba(97, 96, 97, 0.3)', // Semi-transparent secondary
    containerSolid: '#1a1d21', // Slack background
  },
  lighting: {
    ambientGlow: 'rgba(26, 29, 33, 0.5)', // Dark slack glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(26, 29, 33, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(26, 29, 33, 0.6) 0%, rgba(43, 47, 52, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(54, 197, 240, 0.5)', // Slack blue glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #1a1d21 0%, #2b2f34 50%, #15181c 100%)', // Slack gradient
    border: '2px solid #616061',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(26, 29, 33, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(97, 96, 97, 0.06) 40px,
        rgba(97, 96, 97, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(26, 29, 33, 0.9) 0%, rgba(26, 29, 33, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #2b2f34 0%, #1a1d21 50%, #15181c 100%)',
    border: '1px solid #616061',
    boxShadow: 'inset 0 1px 2px rgba(26, 29, 33, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #1a1d21 0%, #2b2f34 50%, #15181c 100%)',
    border: '1px solid #616061',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(26, 29, 33, 1)',
    hoverBackground: 'linear-gradient(180deg, #2b2f34 0%, #15181c 50%, #101215 100%)',
    activeBackground: 'linear-gradient(180deg, #15181c 0%, #101215 50%, #0a0c0f 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #616061 0%, #4f5051 50%, #414243 100%)', // Slack secondary colors
    border: '1px solid #1a1d21',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(97, 96, 97, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #4f5051 0%, #414243 50%, #343536 100%)',
    activeBackground: 'linear-gradient(180deg, #414243 0%, #343536 50%, #272829 100%)',
  },
};
