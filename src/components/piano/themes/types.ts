/**
 * Piano theme type definitions
 * Defines the structure for piano visual themes
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
