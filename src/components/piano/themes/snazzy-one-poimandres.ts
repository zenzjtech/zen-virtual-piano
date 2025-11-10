import { PianoTheme } from './types';

export const snazzyLight: PianoTheme = {
  id: 'snazzy-light',
  name: 'Snazzy Light',
  description: 'Vibrant modern light theme with orange, teal, and blue accents',
  category: 'modern',
  isLight: true,
  colors: {
    primary: '#000000', // Snazzy Light foreground
    secondary: '#8b949e', // Snazzy Light secondary
    accent: '#ff6b35', // Snazzy Light orange accent
    border: 'rgba(139, 148, 158, 0.3)', // Semi-transparent secondary
    containerSolid: '#f1f1f1', // Snazzy Light background
  },
  lighting: {
    ambientGlow: 'rgba(241, 241, 241, 0.4)', // Light snazzy glow
    ambientOpacity: 0.6,
    specularHighlight: 'rgba(241, 241, 241, 0.6)', // Light highlight
    specularIntensity: 0.4,
    specularSize: '50%',
    shadowColor: 'rgba(218, 222, 226, 0.15)', // Subtle shadows
    shadowDepth: '4px',
    shadowSoftness: '12px',
    reflectionGradient: 'linear-gradient(165deg, rgba(241, 241, 241, 0.5) 0%, rgba(230, 232, 235, 0.3) 35%, transparent 65%)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(255, 107, 53, 0.4)', // Snazzy orange glow
    interactiveGlowSize: '16px',
    lightAngle: 150,
    materialFinish: 'matte',
    glossiness: 0.25,
  },
  container: {
    background: 'linear-gradient(135deg, #f1f1f1 0%, #e6e8eb 50%, #dadde0 100%)', // Snazzy Light gradient
    border: '2px solid #8b949e',
    boxShadow: '0 10px 40px rgba(218, 222, 226, 0.1), inset 0 1px 0 rgba(241, 241, 241, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(139, 148, 158, 0.03) 30px,
        rgba(139, 148, 158, 0.03) 31px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(241, 241, 241, 0.8) 0%, rgba(241, 241, 241, 0.4) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #e6e8eb 0%, #f1f1f1 50%, #dadde0 100%)',
    border: '1px solid #8b949e',
    boxShadow: 'inset 0 1px 2px rgba(241, 241, 241, 0.8), 0 2px 4px rgba(218, 222, 226, 0.1)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #f1f1f1 0%, #e6e8eb 50%, #dadde0 100%)',
    border: '1px solid #8b949e',
    boxShadow: '0 2px 4px rgba(218, 222, 226, 0.08), inset 0 1px 0 rgba(241, 241, 241, 1)',
    hoverBackground: 'linear-gradient(180deg, #e6e8eb 0%, #dadde0 50%, #ced2d6 100%)',
    activeBackground: 'linear-gradient(180deg, #dadde0 0%, #ced2d6 50%, #c2c7cc 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #8b949e 0%, #6f7880 50%, #535c62 100%)', // Snazzy Light accents
    border: '1px solid #f1f1f1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(139, 148, 158, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #6f7880 0%, #535c62 50%, #374044 100%)',
    activeBackground: 'linear-gradient(180deg, #535c62 0%, #374044 50%, #1b2426 100%)',
  },
};

export const oneMonokai: PianoTheme = {
  id: 'one-monokai',
  name: 'One Monokai',
  description: 'Colorful Monokai variant with vibrant red, green, and blue accents',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#abb2bf', // One Monokai foreground
    secondary: '#5c6370', // One Monokai comment
    accent: '#e06c75', // One Monokai red accent
    border: 'rgba(92, 99, 112, 0.3)', // Semi-transparent comment
    containerSolid: '#282c34', // One Monokai background
  },
  lighting: {
    ambientGlow: 'rgba(40, 44, 52, 0.5)', // Dark one monokai glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(40, 44, 52, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(40, 44, 52, 0.6) 0%, rgba(33, 37, 43, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(224, 108, 117, 0.5)', // One Monokai red glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #282c34 0%, #21252b 50%, #1e2227 100%)', // One Monokai gradient
    border: '2px solid #5c6370',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(40, 44, 52, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(92, 99, 112, 0.06) 40px,
        rgba(92, 99, 112, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(40, 44, 52, 0.9) 0%, rgba(40, 44, 52, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #21252b 0%, #282c34 50%, #1e2227 100%)',
    border: '1px solid #5c6370',
    boxShadow: 'inset 0 1px 2px rgba(40, 44, 52, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #282c34 0%, #21252b 50%, #1e2227 100%)',
    border: '1px solid #5c6370',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(40, 44, 52, 1)',
    hoverBackground: 'linear-gradient(180deg, #21252b 0%, #1e2227 50%, #181c21 100%)',
    activeBackground: 'linear-gradient(180deg, #1e2227 0%, #181c21 50%, #13161a 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #5c6370 0%, #4b5360 50%, #3e4551 100%)', // One Monokai comment colors
    border: '1px solid #282c34',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(92, 99, 112, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #4b5360 0%, #3e4551 50%, #323942 100%)',
    activeBackground: 'linear-gradient(180deg, #3e4551 0%, #323942 50%, #272d33 100%)',
  },
};

export const poimandres: PianoTheme = {
  id: 'poimandres',
  name: 'Poimandres',
  description: 'Minimal dark theme with semantic coloring and teal blue accents',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#a6b3cc', // Poimandres foreground
    secondary: '#7a8194', // Poimandres secondary
    accent: '#5de4c7', // Poimandres teal accent
    border: 'rgba(122, 129, 148, 0.3)', // Semi-transparent secondary
    containerSolid: '#1b1e28', // Poimandres background
  },
  lighting: {
    ambientGlow: 'rgba(27, 30, 40, 0.5)', // Dark poimandres glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(27, 30, 40, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(27, 30, 40, 0.6) 0%, rgba(37, 42, 56, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(93, 228, 199, 0.5)', // Poimandres teal glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #1b1e28 0%, #252a38 50%, #15181e 100%)', // Poimandres gradient
    border: '2px solid #7a8194',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(27, 30, 40, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(122, 129, 148, 0.06) 40px,
        rgba(122, 129, 148, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(27, 30, 40, 0.9) 0%, rgba(27, 30, 40, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #252a38 0%, #1b1e28 50%, #15181e 100%)',
    border: '1px solid #7a8194',
    boxShadow: 'inset 0 1px 2px rgba(27, 30, 40, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #1b1e28 0%, #252a38 50%, #15181e 100%)',
    border: '1px solid #7a8194',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(27, 30, 40, 1)',
    hoverBackground: 'linear-gradient(180deg, #252a38 0%, #15181e 50%, #101216 100%)',
    activeBackground: 'linear-gradient(180deg, #15181e 0%, #101216 50%, #0b0c0e 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #7a8194 0%, #636a7d 50%, #4c5266 100%)', // Poimandres semantic colors
    border: '1px solid #1b1e28',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(122, 129, 148, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #636a7d 0%, #4c5266 50%, #353a4f 100%)',
    activeBackground: 'linear-gradient(180deg, #4c5266 0%, #353a4f 50%, #1e2238 100%)',
  },
};
