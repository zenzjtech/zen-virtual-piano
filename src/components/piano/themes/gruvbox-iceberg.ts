import { PianoTheme } from './types';

export const gruvbox: PianoTheme = {
  id: 'gruvbox',
  name: 'Gruvbox',
  description: 'Retro color scheme inspired by old computers with warm, earthy tones',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#ebdbb2', // Gruvbox light foreground
    secondary: '#928374', // Gruvbox gray
    accent: '#fb4934', // Gruvbox red accent
    border: 'rgba(146, 131, 116, 0.3)', // Semi-transparent gray
    containerSolid: '#282828', // Gruvbox dark background
  },
  lighting: {
    ambientGlow: 'rgba(40, 40, 40, 0.5)', // Dark gruvbox glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(40, 40, 40, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(40, 40, 40, 0.6) 0%, rgba(60, 56, 54, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(251, 73, 52, 0.5)', // Gruvbox red glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #282828 0%, #3c3836 50%, #1d2021 100%)', // Gruvbox gradient
    border: '2px solid #928374',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(40, 40, 40, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(146, 131, 116, 0.06) 40px,
        rgba(146, 131, 116, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(40, 40, 40, 0.9) 0%, rgba(40, 40, 40, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #3c3836 0%, #282828 50%, #1d2021 100%)',
    border: '1px solid #928374',
    boxShadow: 'inset 0 1px 2px rgba(40, 40, 40, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #282828 0%, #3c3836 50%, #1d2021 100%)',
    border: '1px solid #928374',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(40, 40, 40, 1)',
    hoverBackground: 'linear-gradient(180deg, #3c3836 0%, #1d2021 50%, #161819 100%)',
    activeBackground: 'linear-gradient(180deg, #1d2021 0%, #161819 50%, #0f1011 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #928374 0%, #7c6f64 50%, #665c54 100%)', // Gruvbox warm grays
    border: '1px solid #282828',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(146, 131, 116, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #7c6f64 0%, #665c54 50%, #504945 100%)',
    activeBackground: 'linear-gradient(180deg, #665c54 0%, #504945 50%, #3a3635 100%)',
  },
};

export const iceberg: PianoTheme = {
  id: 'iceberg',
  name: 'Iceberg',
  description: 'Cool blue theme with Japanese design influence and icy aesthetics',
  category: 'modern',
  isLight: false,
  colors: {
    primary: '#c6c8d1', // Iceberg foreground
    secondary: '#6b7089', // Iceberg comment
    accent: '#84a0c6', // Iceberg blue accent
    border: 'rgba(107, 112, 137, 0.3)', // Semi-transparent comment
    containerSolid: '#161821', // Iceberg background
  },
  lighting: {
    ambientGlow: 'rgba(22, 24, 33, 0.5)', // Dark iceberg glow
    ambientOpacity: 0.7,
    specularHighlight: 'rgba(22, 24, 33, 0.7)', // Dark highlight
    specularIntensity: 0.5,
    specularSize: '55%',
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Deep shadows
    shadowDepth: '6px',
    shadowSoftness: '16px',
    reflectionGradient: 'linear-gradient(165deg, rgba(22, 24, 33, 0.6) 0%, rgba(33, 36, 44, 0.4) 35%, transparent 65%)',
    reflectionOpacity: 0.6,
    interactiveGlow: 'rgba(132, 160, 198, 0.5)', // Iceberg blue glow
    interactiveGlowSize: '18px',
    lightAngle: 135,
    materialFinish: 'matte',
    glossiness: 0.2,
  },
  container: {
    background: 'linear-gradient(135deg, #161821 0%, #21232c 50%, #101116 100%)', // Iceberg gradient
    border: '2px solid #6b7089',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(22, 24, 33, 1)',
    beforeBackground: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(107, 112, 137, 0.06) 40px,
        rgba(107, 112, 137, 0.06) 41px
      )
    `,
    afterBackground: 'linear-gradient(135deg, rgba(22, 24, 33, 0.9) 0%, rgba(22, 24, 33, 0.5) 30%, transparent 60%)',
  },
  cornerPlates: {
    background: 'linear-gradient(135deg, #21232c 0%, #161821 50%, #101116 100%)',
    border: '1px solid #6b7089',
    boxShadow: 'inset 0 1px 2px rgba(22, 24, 33, 0.9), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  whiteKey: {
    background: 'linear-gradient(180deg, #161821 0%, #21232c 50%, #101116 100%)',
    border: '1px solid #6b7089',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(22, 24, 33, 1)',
    hoverBackground: 'linear-gradient(180deg, #21232c 0%, #101116 50%, #0a0b0f 100%)',
    activeBackground: 'linear-gradient(180deg, #101116 0%, #0a0b0f 50%, #050608 100%)',
  },
  blackKey: {
    background: 'linear-gradient(180deg, #6b7089 0%, #565d75 50%, #414761 100%)', // Iceberg cool tones
    border: '1px solid #161821',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(107, 112, 137, 0.4)',
    hoverBackground: 'linear-gradient(180deg, #565d75 0%, #414761 50%, #2d334d 100%)',
    activeBackground: 'linear-gradient(180deg, #414761 0%, #2d334d 50%, #191d39 100%)',
  },
};
