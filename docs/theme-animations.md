# Theme Preview Animations

## Overview
Enhanced visual feedback system for theme selection with smooth, performant animations.

## Animation Types

### 1. **Entry Animations** (Staggered)
- **Animation**: `fadeInSlideUp`
- **Duration**: 400ms
- **Delay**: 50ms per item (staggered)
- **Effect**: Items fade in while sliding up from 10px below
- **Purpose**: Creates a flowing waterfall effect when sections expand

### 2. **Piano Theme Preview**
- **Animation**: `previewPulse`
- **Duration**: 2s (infinite loop)
- **Effect**: Subtle opacity change (1 ↔ 0.85)
- **Shape**: Circular preview box
- **Hover**: Scales to 1.3x and rotates 180°

### 3. **Background Theme Preview**
- **Animation**: `previewShimmer`
- **Duration**: 3s (infinite loop)
- **Effect**: Brightness variation (1 ↔ 1.1)
- **Shape**: Rounded square preview box
- **Hover**: Scales to 1.4x, rotates 5°, and rounds corners

### 4. **Selected Theme Checkmark**
- **Animation**: `checkmarkPulse`
- **Duration**: 1.5s (infinite loop)
- **Effect**: Gentle scale pulse (1 ↔ 1.05)
- **Hover**: Scales to 1.15x and brightens glow

### 5. **Click Feedback**
- **Effect**: Scale down to 0.98
- **Duration**: 300ms
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Purpose**: Tactile feedback on theme selection

### 6. **Text Hover Effects**
- **Primary text**: Letter spacing expands (0.3px → 0.5px)
- **Secondary text**: Opacity increases (0.85 → 1)
- **Color shift**: Text color changes to accent color

## Performance Considerations

- All animations use CSS transforms and opacity (GPU-accelerated)
- Animations pause on hover to prevent interference
- Easing functions optimized for smooth motion
- No layout reflow during animations

## Customization

The animations respect the current piano theme colors:
- Glow effects use `pianoTheme.colors.accent`
- Shadows adapt to light/dark themes
- Border colors follow theme palette

## Browser Compatibility

Uses modern CSS features:
- CSS keyframe animations
- CSS transforms
- MUI sx prop system
- Supports all modern browsers (Chrome, Firefox, Safari, Edge)
