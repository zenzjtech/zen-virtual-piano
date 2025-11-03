/**
 * Piano visual themes
 * Each theme defines the visual appearance of the piano container and keys
 */

export interface PianoTheme {
  id: string;
  name: string;
  description: string;
  category: string;
  
  // Theme brightness for text contrast
  isLight: boolean;
  
  // Color palette for text and UI elements
  colors: {
    primary: string;      // Main text color
    secondary: string;    // Secondary text/labels
    accent: string;       // Accent color
    border: string;       // Border/divider color
  };
  
  // Theme-specific lighting configuration
  lighting: {
    // Ambient light properties
    ambientGlow: string;           // Overall glow color and intensity
    ambientOpacity: number;        // Opacity of ambient lighting (0-1)
    
    // Specular highlights (glossy reflections)
    specularHighlight: string;     // Highlight color for glossy surfaces
    specularIntensity: number;     // Intensity of specular highlights (0-1)
    specularSize: string;          // Size of highlight (e.g., '30%', '50px')
    
    // Shadow configuration
    shadowColor: string;           // Color of shadows
    shadowDepth: string;           // Shadow depth (e.g., '4px', '8px')
    shadowSoftness: string;        // Shadow blur radius
    
    // Reflections and refractions
    reflectionGradient: string;    // Reflection overlay gradient
    reflectionOpacity: number;     // Opacity of reflections (0-1)
    
    // Glow effects for interactive elements
    interactiveGlow: string;       // Glow color for hover/active states
    interactiveGlowSize: string;   // Size of interactive glow
    
    // Light direction (for creating depth)
    lightAngle: number;            // Angle of light source in degrees
    
    // Material properties
    materialFinish: 'matte' | 'glossy' | 'metallic' | 'wood';
    glossiness: number;            // Overall glossiness (0-1)
  };
  
  // Container styling
  container: {
    background: string;
    border: string;
    boxShadow: string;
    // Pseudo-element effects
    beforeBackground?: string;
    afterBackground?: string;
  };
  
  // Corner plates styling (brass decorations)
  cornerPlates?: {
    background: string;
    border: string;
    boxShadow: string;
  };
  
  // White keys styling
  whiteKey: {
    background: string;
    border: string;
    boxShadow: string;
    hoverBackground: string;
    activeBackground: string;
  };
  
  // Black keys styling
  blackKey: {
    background: string;
    border: string;
    boxShadow: string;
    hoverBackground: string;
    activeBackground: string;
  };
}

export const PIANO_THEMES: Record<string, PianoTheme> = {
  wooden: {
    id: 'wooden',
    name: 'Wooden Classic',
    description: 'Traditional wooden piano with brass accents',
    category: 'classic',
    isLight: false,
    colors: {
      primary: '#E8D4B8',        // Warm cream
      secondary: '#B8941E',      // Golden brass
      accent: '#D4AF37',         // Bright gold
      border: 'rgba(184, 148, 30, 0.3)',
    },
    lighting: {
      // Warm, natural wood lighting with subtle glow
      ambientGlow: 'rgba(212, 175, 55, 0.15)',
      ambientOpacity: 0.6,
      
      // Soft specular highlights for polished wood
      specularHighlight: 'rgba(255, 235, 200, 0.4)',
      specularIntensity: 0.4,
      specularSize: '40%',
      
      // Deep, warm shadows
      shadowColor: 'rgba(74, 47, 26, 0.5)',
      shadowDepth: '6px',
      shadowSoftness: '12px',
      
      // Natural wood reflections
      reflectionGradient: 'linear-gradient(165deg, rgba(255, 245, 220, 0.2) 0%, rgba(255, 235, 200, 0.1) 25%, transparent 50%)',
      reflectionOpacity: 0.5,
      
      // Golden glow for interactions
      interactiveGlow: 'rgba(212, 175, 55, 0.6)',
      interactiveGlowSize: '16px',
      
      // Top-left light source (natural lighting)
      lightAngle: 135,
      
      // Polished wood material
      materialFinish: 'wood',
      glossiness: 0.5,
    },
    container: {
      background: 'linear-gradient(135deg, #8B5A3C 0%, #6B4423 50%, #4A2F1A 100%)',
      border: '2px solid #5D3A1A',
      boxShadow: '0 8px 32px rgba(74, 47, 26, 0.3), inset 0 1px 0 rgba(139, 90, 60, 0.4)',
      beforeBackground: `
        /* Wood grain texture - vertical grain lines */
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 3px,
          rgba(74, 47, 26, 0.15) 3px,
          rgba(74, 47, 26, 0.15) 3.5px,
          transparent 3.5px,
          transparent 8px,
          rgba(60, 38, 21, 0.12) 8px,
          rgba(60, 38, 21, 0.12) 9px,
          transparent 9px,
          transparent 15px,
          rgba(74, 47, 26, 0.08) 15px,
          rgba(74, 47, 26, 0.08) 16px,
          transparent 16px,
          transparent 25px,
          rgba(90, 56, 35, 0.18) 25px,
          rgba(90, 56, 35, 0.18) 26px,
          transparent 26px,
          transparent 40px,
          rgba(74, 47, 26, 0.1) 40px,
          rgba(74, 47, 26, 0.1) 41px
        ),
        /* Wood grain texture - horizontal subtle variations */
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 60px,
          rgba(60, 38, 21, 0.08) 60px,
          rgba(60, 38, 21, 0.08) 62px,
          transparent 62px,
          transparent 120px,
          rgba(74, 47, 26, 0.06) 120px,
          rgba(74, 47, 26, 0.06) 123px
        ),
        /* Wood knots and imperfections */
        radial-gradient(
          ellipse 80px 60px at 15% 25%,
          rgba(60, 38, 21, 0.25) 0%,
          rgba(74, 47, 26, 0.15) 30%,
          transparent 50%
        ),
        radial-gradient(
          ellipse 100px 70px at 75% 60%,
          rgba(60, 38, 21, 0.2) 0%,
          rgba(74, 47, 26, 0.12) 35%,
          transparent 55%
        ),
        radial-gradient(
          ellipse 60px 50px at 40% 80%,
          rgba(50, 32, 18, 0.22) 0%,
          rgba(70, 45, 25, 0.14) 30%,
          transparent 50%
        )
      `,
      afterBackground: `
        /* Natural wood color variations and highlights */
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.06) 30%,
          transparent 60%
        ),
        /* Subtle wood growth rings */
        repeating-radial-gradient(
          circle at 30% 40%,
          transparent 0px,
          transparent 80px,
          rgba(60, 38, 21, 0.03) 80px,
          rgba(60, 38, 21, 0.03) 82px,
          transparent 82px,
          transparent 160px,
          rgba(74, 47, 26, 0.04) 160px,
          rgba(74, 47, 26, 0.04) 163px
        )
      `,
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #B8941E 100%)',
      border: '1px solid #8B7355',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
      border: '1px solid #CCCCCC',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      hoverBackground: 'linear-gradient(180deg, #F8F8F8 0%, #F0F0F0 50%, #E8E8E8 100%)',
      activeBackground: 'linear-gradient(180deg, #E0E0E0 0%, #D8D8D8 50%, #D0D0D0 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 50%, #0A0A0A 100%)',
      border: '1px solid #000000',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      hoverBackground: 'linear-gradient(180deg, #3A3A3A 0%, #252525 50%, #151515 100%)',
      activeBackground: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 50%, #050505 100%)',
    },
  },

  black: {
    id: 'black',
    name: 'Midnight Black',
    description: 'Sleek modern black piano',
    category: 'modern',
    isLight: false,
    colors: {
      primary: '#E8E8E8',        // Light gray
      secondary: '#999999',      // Medium gray
      accent: '#CCCCCC',         // Bright gray
      border: 'rgba(255, 255, 255, 0.2)',
    },
    lighting: {
      // Cool, subtle ambient glow
      ambientGlow: 'rgba(100, 120, 140, 0.1)',
      ambientOpacity: 0.3,
      
      // Sharp, bright specular highlights for glossy finish
      specularHighlight: 'rgba(255, 255, 255, 0.6)',
      specularIntensity: 0.7,
      specularSize: '25%',
      
      // Deep, sharp black shadows
      shadowColor: 'rgba(0, 0, 0, 0.8)',
      shadowDepth: '8px',
      shadowSoftness: '16px',
      
      // Sharp, mirror-like reflections
      reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.15) 0%, rgba(200, 220, 240, 0.08) 20%, transparent 40%)',
      reflectionOpacity: 0.6,
      
      // Cool blue-white glow
      interactiveGlow: 'rgba(200, 220, 240, 0.5)',
      interactiveGlowSize: '20px',
      
      // Direct overhead lighting
      lightAngle: 180,
      
      // High-gloss glossy finish
      materialFinish: 'glossy',
      glossiness: 0.85,
    },
    container: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
      border: '2px solid #333333',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      beforeBackground: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(255, 255, 255, 0.02) 80px,
          rgba(255, 255, 255, 0.02) 81px
        )
      `,
      afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 60%)',
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #4A4A4A 0%, #6A6A6A 50%, #3A3A3A 100%)',
      border: '1px solid #222222',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #E8E8E8 0%, #D8D8D8 50%, #C8C8C8 100%)',
      border: '1px solid #999999',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      hoverBackground: 'linear-gradient(180deg, #F0F0F0 0%, #E0E0E0 50%, #D0D0D0 100%)',
      activeBackground: 'linear-gradient(180deg, #D0D0D0 0%, #C0C0C0 50%, #B0B0B0 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 50%, #050505 100%)',
      border: '1px solid #000000',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      hoverBackground: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%)',
      activeBackground: 'linear-gradient(180deg, #0A0A0A 0%, #050505 50%, #000000 100%)',
    },
  },

  metal: {
    id: 'metal',
    name: 'Metallic Silver',
    description: 'Futuristic metal finish piano',
    category: 'modern',
    isLight: true,
    colors: {
      primary: '#2C3E50',        // Dark slate blue
      secondary: '#5D6E81',      // Medium slate
      accent: '#34495E',         // Accent blue
      border: 'rgba(45, 62, 80, 0.2)',
    },
    lighting: {
      // Bright, metallic ambient light
      ambientGlow: 'rgba(184, 198, 212, 0.25)',
      ambientOpacity: 0.7,
      
      // Strong, crisp specular highlights for brushed metal
      specularHighlight: 'rgba(255, 255, 255, 0.8)',
      specularIntensity: 0.8,
      specularSize: '30%',
      
      // Medium depth metallic shadows
      shadowColor: 'rgba(45, 62, 80, 0.4)',
      shadowDepth: '5px',
      shadowSoftness: '10px',
      
      // Brushed metal reflections with directional streaks
      reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.35) 0%, rgba(240, 245, 250, 0.2) 30%, transparent 60%)',
      reflectionOpacity: 0.75,
      
      // Bright blue-silver glow
      interactiveGlow: 'rgba(184, 198, 212, 0.7)',
      interactiveGlowSize: '18px',
      
      // Angled lighting for dimension
      lightAngle: 145,
      
      // Brushed metallic finish
      materialFinish: 'metallic',
      glossiness: 0.75,
    },
    container: {
      background: 'linear-gradient(135deg, #B8C6D4 0%, #8A9BAE 50%, #6B7C8F 100%)',
      border: '2px solid #5D6E81',
      boxShadow: '0 8px 32px rgba(107, 124, 143, 0.4), inset 0 1px 0 rgba(184, 198, 212, 0.6)',
      beforeBackground: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(0, 0, 0, 0.05) 80px,
          rgba(0, 0, 0, 0.05) 81px
        ),
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(255, 255, 255, 0.03) 2px,
          rgba(255, 255, 255, 0.03) 4px
        )
      `,
      afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 30%, transparent 60%)',
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A8A8A8 100%)',
      border: '1px solid #888888',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #FAFAFA 0%, #F0F0F0 50%, #E5E5E5 100%)',
      border: '1px solid #BEBEBE',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      hoverBackground: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
      activeBackground: 'linear-gradient(180deg, #E8E8E8 0%, #DEDEDE 50%, #D4D4D4 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #404040 0%, #2A2A2A 50%, #1A1A1A 100%)',
      border: '1px solid #0A0A0A',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      hoverBackground: 'linear-gradient(180deg, #505050 0%, #353535 50%, #252525 100%)',
      activeBackground: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%)',
    },
  },

  white: {
    id: 'white',
    name: 'Pure White',
    description: 'Clean and minimal white piano',
    category: 'modern',
    isLight: true,
    colors: {
      primary: '#333333',        // Dark gray
      secondary: '#666666',      // Medium gray
      accent: '#555555',         // Accent gray
      border: 'rgba(0, 0, 0, 0.15)',
    },
    lighting: {
      // Soft, clean ambient light
      ambientGlow: 'rgba(255, 255, 255, 0.3)',
      ambientOpacity: 0.5,
      
      // Gentle specular highlights for matte finish
      specularHighlight: 'rgba(255, 255, 255, 0.5)',
      specularIntensity: 0.35,
      specularSize: '45%',
      
      // Soft, subtle shadows
      shadowColor: 'rgba(0, 0, 0, 0.15)',
      shadowDepth: '3px',
      shadowSoftness: '8px',
      
      // Minimal, diffused reflections
      reflectionGradient: 'linear-gradient(165deg, rgba(255, 255, 255, 0.4) 0%, rgba(250, 250, 250, 0.2) 35%, transparent 65%)',
      reflectionOpacity: 0.4,
      
      // Subtle gray glow
      interactiveGlow: 'rgba(150, 150, 150, 0.3)',
      interactiveGlowSize: '14px',
      
      // Soft, diffused lighting
      lightAngle: 160,
      
      // Clean matte finish
      materialFinish: 'matte',
      glossiness: 0.3,
    },
    container: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
      border: '2px solid #DDDDDD',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
      beforeBackground: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(0, 0, 0, 0.02) 80px,
          rgba(0, 0, 0, 0.02) 81px
        )
      `,
      afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #F0F0F0 0%, #FFFFFF 50%, #E0E0E0 100%)',
      border: '1px solid #CCCCCC',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 50%, #F5F5F5 100%)',
      border: '1px solid #E0E0E0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
      hoverBackground: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 50%, #F0F0F0 100%)',
      activeBackground: 'linear-gradient(180deg, #F0F0F0 0%, #EBEBEB 50%, #E5E5E5 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #505050 0%, #3A3A3A 50%, #2A2A2A 100%)',
      border: '1px solid #1A1A1A',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      hoverBackground: 'linear-gradient(180deg, #606060 0%, #4A4A4A 50%, #3A3A3A 100%)',
      activeBackground: 'linear-gradient(180deg, #3A3A3A 0%, #2A2A2A 50%, #1A1A1A 100%)',
    },
  },
};

// Helper to get theme by id with fallback
export function getTheme(themeId: string): PianoTheme {
  return PIANO_THEMES[themeId] || PIANO_THEMES.wooden;
}

// Get list of all available themes
export function getAllThemes(): PianoTheme[] {
  return Object.values(PIANO_THEMES);
}

// Generate theme-specific lighting CSS properties
export function getLightingStyles(theme: PianoTheme) {
  const { lighting } = theme;
  
  return {
    // Ambient lighting overlay
    ambientLightOverlay: {
      background: lighting.ambientGlow,
      opacity: lighting.ambientOpacity,
      pointerEvents: 'none' as const,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    
    // Specular highlight overlay
    specularHighlightOverlay: {
      background: `radial-gradient(ellipse at ${getSpecularPosition(lighting.lightAngle)}, ${lighting.specularHighlight} 0%, transparent ${lighting.specularSize})`,
      opacity: lighting.specularIntensity,
      pointerEvents: 'none' as const,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      mixBlendMode: 'overlay' as const,
    },
    
    // Reflection overlay
    reflectionOverlay: {
      background: lighting.reflectionGradient,
      opacity: lighting.reflectionOpacity,
      pointerEvents: 'none' as const,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3,
      mixBlendMode: 'soft-light' as const,
    },
    
    // Interactive glow for hover effects
    interactiveGlow: `0 0 ${lighting.interactiveGlowSize} ${lighting.interactiveGlow}`,
    
    // Material-specific box shadow
    materialShadow: `0 ${lighting.shadowDepth} ${lighting.shadowSoftness} ${lighting.shadowColor}`,
  };
}

// Calculate specular highlight position based on light angle
function getSpecularPosition(angle: number): string {
  // Convert angle to position (0° = top, 90° = right, 180° = bottom, 270° = left)
  const x = 50 + 30 * Math.cos((angle - 90) * Math.PI / 180);
  const y = 50 + 30 * Math.sin((angle - 90) * Math.PI / 180);
  return `${x}% ${y}%`;
}
