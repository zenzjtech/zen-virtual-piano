import { PianoTheme } from './types';

export const cobalt2: PianoTheme = {
  id: 'cobalt2',
  name: 'Cobalt2',
  description: 'High contrast theme with almost fluorescent colors',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#ffffff', // Cobalt2 foreground
    secondary: '#0088ff', // Cobalt2 blue
    accent: '#ffc600', // Cobalt2 yellow accent
    border: 'rgba(37, 46, 62, 0.3)', // Semi-transparent border
    containerSolid: '#193549', // Cobalt2 background
  },
  lighting: {
    ambientGlow: 'rgba(25, 53, 73, 0.5)', // Dark cobalt glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(25, 53, 73, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(25, 53, 73, 0.6) 0%, rgba(35, 63, 83, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(255, 198, 0, 0.5)', // Yellow glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #193549 0%, #233f53 50%, #152b3d 100%)', // Cobalt gradient
    border: '2px solid #252e3e',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(25, 53, 73, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(37, 46, 62, 0.06) 40px,
        rgba(37, 46, 62, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(25, 53, 73, 0.9) 0%, rgba(25, 53, 73, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #233f53 0%, #193549 50%, #152b3d 100%)',
    border: '1px solid #252e3e',
    boxShadow: 'inset 0 1px 2px rgba(25, 53, 73, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #193549 0%, #233f53 50%, #152b3d 100%)',
    border: '1px solid #252e3e',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(25, 53, 73, 1)',
    hoverBackground: 'linear-gradient(180deg, #233f53 0%, #152b3d 50%, #0f2029 100%)',
    activeBackground: 'linear-gradient(180deg, #152b3d 0%, #0f2029 50%, #09151d 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #252e3e 0%, #1d2533 50%, #141b28 100%)', // Cobalt borders
    border: '1px solid #193549',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(37, 46, 62, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #1d2533 0%, #141b28 50%, #0b111d 100%)',
    activeBackground: 'linear-gradient(180deg, #141b28 0%, #0b111d 50%, #020712 100%)',
  },
};

export const winterIsComing: PianoTheme = {
  id: 'winter-is-coming',
  name: 'Winter is Coming',
  description: 'Cool blue theme inspired by Game of Thrones',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#f8f8f2', // Winter foreground
    secondary: '#6272a4', // Winter secondary
    accent: '#8be9fd', // Winter cyan accent
    border: 'rgba(30, 33, 40, 0.3)', // Semi-transparent border
    containerSolid: '#0e1419', // Winter background
  },
  lighting: {
    ambientGlow: 'rgba(14, 20, 25, 0.5)', // Dark winter glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(14, 20, 25, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(14, 20, 25, 0.6) 0%, rgba(24, 30, 35, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(139, 233, 253, 0.5)', // Winter cyan glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #0e1419 0%, #181e23 50%, #0a0f13 100%)', // Winter gradient
    border: '2px solid #1e2128',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(14, 20, 25, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(30, 33, 40, 0.06) 40px,
        rgba(30, 33, 40, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(14, 20, 25, 0.9) 0%, rgba(14, 20, 25, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #181e23 0%, #0e1419 50%, #0a0f13 100%)',
    border: '1px solid #1e2128',
    boxShadow: 'inset 0 1px 2px rgba(14, 20, 25, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #0e1419 0%, #181e23 50%, #0a0f13 100%)',
    border: '1px solid #1e2128',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(14, 20, 25, 1)',
    hoverBackground: 'linear-gradient(180deg, #181e23 0%, #0a0f13 50%, #06090d 100%)',
    activeBackground: 'linear-gradient(180deg, #0a0f13 0%, #06090d 50%, #000307 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #1e2128 0%, #16191f 50%, #0e1116 100%)', // Winter borders
    border: '1px solid #0e1419',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(30, 33, 40, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #16191f 0%, #0e1116 50%, #06080b 100%)',
    activeBackground: 'linear-gradient(180deg, #0e1116 0%, #06080b 50%, #000000 100%)',
  },
};

export const noctis: PianoTheme = {
  id: 'noctis',
  name: 'Noctis',
  description: 'Green-based theme with modern design and multiple variants',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#f7f7f7', // Noctis foreground
    secondary: '#a0a0a0', // Noctis secondary
    accent: '#72c05b', // Noctis green accent
    border: 'rgba(19, 25, 33, 0.3)', // Semi-transparent border
    containerSolid: '#0c0a14', // Noctis background
  },
  lighting: {
    ambientGlow: 'rgba(12, 10, 20, 0.5)', // Dark noctis glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(12, 10, 20, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(12, 10, 20, 0.6) 0%, rgba(22, 20, 30, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(114, 192, 91, 0.5)', // Green glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #0c0a14 0%, #16141e 50%, #08060e 100%)', // Noctis gradient
    border: '2px solid #131921',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(12, 10, 20, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(19, 25, 33, 0.06) 40px,
        rgba(19, 25, 33, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(12, 10, 20, 0.9) 0%, rgba(12, 10, 20, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #16141e 0%, #0c0a14 50%, #08060e 100%)',
    border: '1px solid #131921',
    boxShadow: 'inset 0 1px 2px rgba(12, 10, 20, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #0c0a14 0%, #16141e 50%, #08060e 100%)',
    border: '1px solid #131921',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(12, 10, 20, 1)',
    hoverBackground: 'linear-gradient(180deg, #16141e 0%, #08060e 50%, #04030a 100%)',
    activeBackground: 'linear-gradient(180deg, #08060e 0%, #04030a 50%, #000006 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #131921 0%, #0f151b 50%, #0a0f15 100%)', // Noctis borders
    border: '1px solid #0c0a14',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(19, 25, 33, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #0f151b 0%, #0a0f15 50%, #050a0f 100%)',
    activeBackground: 'linear-gradient(180deg, #0a0f15 0%, #050a0f 50%, #000309 100%)',
  },
};
