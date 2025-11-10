import { PianoTheme } from './types';

export const rouge: PianoTheme = {
  id: 'rouge',
  name: 'Rouge',
  description: 'Material-inspired theme with flushed color palette and sophisticated design',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#d1d5db', // Rouge foreground
    secondary: '#6b7280', // Rouge comment
    accent: '#f38ba8', // Rouge pink accent
    border: 'rgba(107, 114, 128, 0.3)', // Semi-transparent comment
    containerSolid: '#172831', // Rouge background
  },
  lighting: {
    ambientGlow: 'rgba(23, 40, 49, 0.5)', // Dark rouge glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(23, 40, 49, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(23, 40, 49, 0.6) 0%, rgba(34, 47, 58, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(243, 139, 168, 0.5)', // Rouge pink glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #172831 0%, #222f3a 50%, #131e27 100%)', // Rouge gradient
    border: '2px solid #6b7280',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(23, 40, 49, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(107, 114, 128, 0.06) 40px,
        rgba(107, 114, 128, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(23, 40, 49, 0.9) 0%, rgba(23, 40, 49, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #222f3a 0%, #172831 50%, #131e27 100%)',
    border: '1px solid #6b7280',
    boxShadow: 'inset 0 1px 2px rgba(23, 40, 49, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #172831 0%, #222f3a 50%, #131e27 100%)',
    border: '1px solid #6b7280',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(23, 40, 49, 1)',
    hoverBackground: 'linear-gradient(180deg, #222f3a 0%, #131e27 50%, #0e181f 100%)',
    activeBackground: 'linear-gradient(180deg, #131e27 0%, #0e181f 50%, #091217 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #6b7280 0%, #565d6a 50%, #474d56 100%)', // Rouge comment colors
    border: '1px solid #172831',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(107, 114, 128, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #565d6a 0%, #474d56 50%, #3a4048 100%)',
    activeBackground: 'linear-gradient(180deg, #474d56 0%, #3a4048 50%, #2e333a 100%)',
  },
};

export const sublimeMaterial: PianoTheme = {
  id: 'sublime-material',
  name: 'Sublime Material',
  description: 'Material theme inspired by Sublime Text with red-pink accents',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#eeffff', // Sublime Material foreground
    secondary: '#546e7a', // Sublime Material comment
    accent: '#ff5370', // Sublime Material red-pink accent
    border: 'rgba(84, 110, 122, 0.3)', // Semi-transparent comment
    containerSolid: '#263238', // Sublime Material background
  },
  lighting: {
    ambientGlow: 'rgba(38, 50, 56, 0.5)', // Dark sublime material glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(38, 50, 56, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(38, 50, 56, 0.6) 0%, rgba(55, 71, 79, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(255, 83, 112, 0.5)', // Sublime Material red-pink glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #263238 0%, #37474f 50%, #21272b 100%)', // Sublime Material gradient
    border: '2px solid #546e7a',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(38, 50, 56, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(84, 110, 122, 0.06) 40px,
        rgba(84, 110, 122, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(38, 50, 56, 0.9) 0%, rgba(38, 50, 56, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #37474f 0%, #263238 50%, #21272b 100%)',
    border: '1px solid #546e7a',
    boxShadow: 'inset 0 1px 2px rgba(38, 50, 56, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #263238 0%, #37474f 50%, #21272b 100%)',
    border: '1px solid #546e7a',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(38, 50, 56, 1)',
    hoverBackground: 'linear-gradient(180deg, #37474f 0%, #21272b 50%, #1a2125 100%)',
    activeBackground: 'linear-gradient(180deg, #21272b 0%, #1a2125 50%, #13181b 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #546e7a 0%, #455a64 50%, #37474f 100%)', // Sublime Material colors
    border: '1px solid #263238',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(84, 110, 122, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #455a64 0%, #37474f 50%, #2e4047 100%)',
    activeBackground: 'linear-gradient(180deg, #37474f 0%, #2e4047 50%, #24353b 100%)',
  },
};

export const blulocoLight: PianoTheme = {
  id: 'bluloco-light',
  name: 'Bluloco Light',
  description: 'Clean and sophisticated light version of the Bluloco designer color scheme',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#383a42', // Bluloco Light foreground
    secondary: '#a0a1a7', // Bluloco Light comment
    accent: '#50a14f', // Bluloco Light green accent
    border: 'rgba(160, 161, 167, 0.3)', // Semi-transparent comment
    containerSolid: '#fafafa', // Bluloco Light background
  },
  lighting: {
    ambientGlow: 'rgba(250, 250, 250, 0.4)', // Light bluloco glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(250, 250, 250, 0.6)', // Light highlight
    specularIntensity: 0.4,
    specularSize: '50%',
    shadowColor: 'rgba(228, 232, 240, 0.15)', // Subtle shadows
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(250, 250, 250, 0.5) 0%, rgba(242, 244, 247, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(80, 161, 79, 0.4)', // Bluloco green glow
    interactiveGlowSize: '16px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.25,
  },
  container: {
    background: 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 50%, #e8ecf0 100%)', // Bluloco Light gradient
    border: '2px solid #a0a1a7',
    boxShadow: '0 10px 40px rgba(228, 232, 240, 0.1), inset 0 1px 0 rgba(250, 250, 250, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(160, 161, 167, 0.03) 30px,
        rgba(160, 161, 167, 0.03) 31px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(250, 250, 250, 0.8) 0%, rgba(250, 250, 250, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #f3f4f6 0%, #fafafa 50%, #e8ecf0 100%)',
    border: '1px solid #a0a1a7',
    boxShadow: 'inset 0 1px 2px rgba(250, 250, 250, 0.8), 0 2px 4px rgba(228, 232, 240, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #fafafa 0%, #f3f4f6 50%, #e8ecf0 100%)',
    border: '1px solid #a0a1a7',
    boxShadow: '0 2px 4px rgba(228, 232, 240, 0.08), inset 0 1px 0 rgba(250, 250, 250, 1)',
    hoverBackground: 'linear-gradient(180deg, #f3f4f6 0%, #e8ecf0 50%, #dee3e9 100%)',
    activeBackground: 'linear-gradient(180deg, #e8ecf0 0%, #dee3e9 50%, #d4dbe3 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #a0a1a7 0%, #80828a 50%, #666870 100%)', // Bluloco Light borders
    border: '1px solid #fafafa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(160, 161, 167, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #80828a 0%, #666870 50%, #4d4f54 100%)',
    activeBackground: 'linear-gradient(180deg, #666870 0%, #4d4f54 50%, #35373a 100%)',
  },
};
