import { PianoTheme } from './types';

export const ayuLight: PianoTheme = {
  id: 'ayu-light',
  name: 'Ayu Light',
  description: 'Clean light theme with soft colors and pleasant text readability',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#5c6773', // Ayu light foreground
    secondary: '#acb0bd', // Ayu light secondary text
    accent: '#ff8f40', // Ayu light orange accent
    border: 'rgba(228, 232, 240, 0.3)', // Semi-transparent border
    containerSolid: '#fafafa', // Ayu light background
  },
  lighting: {
    ambientGlow: 'rgba(250, 250, 250, 0.4)', // Light Ayu glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(250, 250, 250, 0.6)', // Light highlight
    specularIntensity: 0.4,
    specularSize: '50%',
    shadowColor: 'rgba(228, 232, 240, 0.15)', // Subtle shadows
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(250, 250, 250, 0.5) 0%, rgba(242, 244, 247, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(255, 143, 64, 0.4)', // Ayu orange glow
    interactiveGlowSize: '16px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.25,
  },
  container: {
    background: 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 50%, #e8ecf0 100%)', // Ayu light gradient
    border: '2px solid #e4e8f0',
    boxShadow: '0 10px 40px rgba(228, 232, 240, 0.1), inset 0 1px 0 rgba(250, 250, 250, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(228, 232, 240, 0.03) 30px,
        rgba(228, 232, 240, 0.03) 31px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(250, 250, 250, 0.8) 0%, rgba(250, 250, 250, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #f3f4f6 0%, #fafafa 50%, #e8ecf0 100%)',
    border: '1px solid #e4e8f0',
    boxShadow: 'inset 0 1px 2px rgba(250, 250, 250, 0.8), 0 2px 4px rgba(228, 232, 240, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #fafafa 0%, #f3f4f6 50%, #e8ecf0 100%)',
    border: '1px solid #e4e8f0',
    boxShadow: '0 2px 4px rgba(228, 232, 240, 0.08), inset 0 1px 0 rgba(250, 250, 250, 1)',
    hoverBackground: 'linear-gradient(180deg, #f3f4f6 0%, #e8ecf0 50%, #dee3e9 100%)',
    activeBackground: 'linear-gradient(180deg, #e8ecf0 0%, #dee3e9 50%, #d4dbe3 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #e4e8f0 0%, #c9d0db 50%, #acb4c1 100%)', // Ayu light borders
    border: '1px solid #fafafa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(228, 232, 240, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #c9d0db 0%, #acb4c1 50%, #8f99a7 100%)',
    activeBackground: 'linear-gradient(180deg, #acb4c1 0%, #8f99a7 50%, #727e8d 100%)',
  },
};
