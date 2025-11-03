# Theme-Specific Lighting System

## Overview
The virtual piano now features a comprehensive lighting system that creates realistic visual effects for different material types. Each theme has unique lighting characteristics that simulate real-world materials.

## Lighting Properties

### Ambient Lighting
- **Purpose**: Overall glow and illumination of the piano
- **Properties**:
  - `ambientGlow`: Color and intensity of ambient light
  - `ambientOpacity`: Transparency of ambient lighting (0-1)

### Specular Highlights
- **Purpose**: Glossy reflections that simulate light bouncing off surfaces
- **Properties**:
  - `specularHighlight`: Color of the highlight
  - `specularIntensity`: Brightness of highlights (0-1)
  - `specularSize`: Size/spread of highlights

### Shadow Configuration
- **Purpose**: Create depth and dimensionality
- **Properties**:
  - `shadowColor`: Color tint of shadows
  - `shadowDepth`: How far shadows extend
  - `shadowSoftness`: Blur radius for soft/hard shadows

### Reflections
- **Purpose**: Mirror-like or diffused reflections on surfaces
- **Properties**:
  - `reflectionGradient`: Gradient overlay for reflections
  - `reflectionOpacity`: Transparency of reflections (0-1)

### Interactive Effects
- **Purpose**: Visual feedback for user interactions
- **Properties**:
  - `interactiveGlow`: Glow color for hover/active states
  - `interactiveGlowSize`: Size of the glow effect

### Material Properties
- **Purpose**: Define the overall look and feel
- **Properties**:
  - `materialFinish`: 'matte' | 'glossy' | 'metallic' | 'wood'
  - `glossiness`: Overall glossiness level (0-1)
  - `lightAngle`: Direction of primary light source (0-360°)

## Theme Presets

### 🪵 Wooden Classic
**Material**: Polished wood with natural grain

- **Ambient**: Warm golden glow (rgba(212, 175, 55, 0.15))
- **Specular**: Soft, warm highlights (40% size, 0.4 intensity)
- **Shadows**: Deep, warm shadows (6px depth, 12px softness)
- **Reflections**: Natural wood reflections with subtle grain
- **Interactive**: Golden glow effect
- **Light Angle**: 135° (top-left, natural lighting)
- **Glossiness**: 0.5 (semi-gloss polished wood)

**Characteristics**:
- Warm, inviting appearance
- Natural-looking reflections
- Soft specular highlights
- Rich, organic feel

### 🌑 Midnight Black
**Material**: High-gloss lacquered finish

- **Ambient**: Cool, subtle glow (rgba(100, 120, 140, 0.1))
- **Specular**: Sharp, bright highlights (25% size, 0.7 intensity)
- **Shadows**: Deep, crisp shadows (8px depth, 16px softness)
- **Reflections**: Mirror-like, sharp reflections
- **Interactive**: Cool blue-white glow
- **Light Angle**: 180° (direct overhead)
- **Glossiness**: 0.85 (very high gloss)

**Characteristics**:
- Sleek, modern appearance
- Sharp, dramatic reflections
- High contrast lighting
- Premium glossy finish

### 🔩 Metallic Silver
**Material**: Brushed metal with directional finish

- **Ambient**: Bright metallic glow (rgba(184, 198, 212, 0.25))
- **Specular**: Strong, crisp highlights (30% size, 0.8 intensity)
- **Shadows**: Medium depth metallic shadows (5px depth, 10px softness)
- **Reflections**: Directional streaks (brushed metal effect)
- **Interactive**: Bright blue-silver glow
- **Light Angle**: 145° (angled for dimension)
- **Glossiness**: 0.75 (high gloss with texture)

**Characteristics**:
- Industrial, futuristic look
- Directional light streaks
- Crisp, bright highlights
- Metallic shimmer

### ⚪ Pure White
**Material**: Clean matte finish

- **Ambient**: Soft, clean white glow (rgba(255, 255, 255, 0.3))
- **Specular**: Gentle highlights (45% size, 0.35 intensity)
- **Shadows**: Soft, subtle shadows (3px depth, 8px softness)
- **Reflections**: Minimal, diffused reflections
- **Interactive**: Subtle gray glow
- **Light Angle**: 160° (soft, diffused)
- **Glossiness**: 0.3 (low gloss matte)

**Characteristics**:
- Clean, minimalist appearance
- Soft, diffused lighting
- Subtle depth
- Modern matte finish

## Usage

### In Components

The lighting system is automatically applied to all piano components:

```typescript
import { getTheme, getLightingStyles } from './themes';

const theme = getTheme('wooden');
const lighting = getLightingStyles(theme);

// Use in styled components
const StyledComponent = styled(Box)({
  boxShadow: theme.lighting.materialShadow,
  '&:hover': {
    boxShadow: lighting.interactiveGlow,
  },
});
```

### Dynamic Lighting Properties

Piano keys automatically adjust based on the theme's lighting properties:

- **Brightness**: Adjusted based on `specularIntensity`
- **Contrast**: Enhanced based on `glossiness`
- **Shadows**: Dynamic depth using theme values
- **Reflections**: Overlay gradients for material-specific looks

## Visual Effects Applied

### 1. Piano Keys
- Material-specific glossiness and contrast
- Dynamic shadow depth based on theme
- Reflection overlays for realistic finish
- Interactive glow on hover

### 2. Status Board & Settings Bar
- Beveled edges with theme-appropriate highlights
- Multi-layered shadows for depth
- Recessed panels with inset lighting
- Metallic corner plates with enhanced 3D effects

### 3. Container Elements
- Ambient glow overlays
- Specular highlight positioning
- Reflection gradients
- Material-specific shadows

## Customization

To add a new theme with custom lighting:

```typescript
newTheme: {
  // ... other theme properties
  lighting: {
    ambientGlow: 'rgba(r, g, b, a)',
    ambientOpacity: 0.5,
    specularHighlight: 'rgba(r, g, b, a)',
    specularIntensity: 0.6,
    specularSize: '35%',
    shadowColor: 'rgba(r, g, b, a)',
    shadowDepth: '5px',
    shadowSoftness: '10px',
    reflectionGradient: 'linear-gradient(...)',
    reflectionOpacity: 0.5,
    interactiveGlow: 'rgba(r, g, b, a)',
    interactiveGlowSize: '15px',
    lightAngle: 145,
    materialFinish: 'glossy',
    glossiness: 0.7,
  },
}
```

## Performance Considerations

- CSS-based effects for optimal performance
- No JavaScript animations for lighting
- Hardware-accelerated transforms
- Minimal overdraw with blend modes
- Efficient gradient caching

## Future Enhancements

Possible future additions to the lighting system:
- Animated ambient light pulsing
- Dynamic shadows based on key press
- Environment mapping for reflections
- Real-time light position adjustment
- HDR lighting effects
- Subsurface scattering for materials
