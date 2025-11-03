# Wood Grain Texture System

## Overview
The wooden theme features realistic wood grain texture patterns created entirely with CSS gradients. This approach provides authentic-looking wood textures without requiring external image files.

## Texture Components

### 1. Vertical Grain Lines (`beforeBackground`)

The primary wood grain pattern consists of multiple vertical lines that simulate natural wood fibers:

```css
repeating-linear-gradient(
  90deg,
  transparent,
  transparent 3px,
  rgba(74, 47, 26, 0.15) 3px,
  rgba(74, 47, 26, 0.15) 3.5px,
  /* ... pattern repeats at varying intervals */
)
```

**Characteristics:**
- **Variable spacing**: Lines appear at 3px, 8px, 15px, 25px, and 40px intervals
- **Variable opacity**: Ranges from 0.08 to 0.18 for natural variation
- **Variable thickness**: Some lines are 0.5px, others are 1px
- **Color variations**: Multiple brown shades simulate depth

**Pattern Details:**
- Fine grain (3px spacing): Primary wood fiber direction
- Medium grain (8px, 15px): Secondary fiber patterns
- Wide grain (25px, 40px): Major wood grain lines

### 2. Horizontal Variations

Subtle horizontal patterns add cross-grain texture:

```css
repeating-linear-gradient(
  0deg,
  transparent,
  transparent 60px,
  rgba(60, 38, 21, 0.08) 60px,
  rgba(60, 38, 21, 0.08) 62px,
  /* ... */
)
```

**Purpose:**
- Creates natural wood "waviness"
- Simulates growth ring interruptions
- Adds depth to the grain pattern
- Spacing at 60px and 120px intervals

### 3. Wood Knots & Imperfections

Radial gradients simulate natural wood knots at strategic positions:

```css
radial-gradient(
  ellipse 80px 60px at 15% 25%,
  rgba(60, 38, 21, 0.25) 0%,
  rgba(74, 47, 26, 0.15) 30%,
  transparent 50%
)
```

**Three Knots Positioned:**
1. **Top-left** (15%, 25%): 80×60px ellipse
2. **Right-center** (75%, 60%): 100×70px ellipse
3. **Bottom-center** (40%, 80%): 60×50px ellipse

**Characteristics:**
- Elliptical shape (natural knot appearance)
- Darker center fading to transparent edges
- Variable sizes for realism
- Strategic placement for visual interest

### 4. Growth Rings (`afterBackground`)

Concentric circles simulate tree growth rings:

```css
repeating-radial-gradient(
  circle at 30% 40%,
  transparent 0px,
  transparent 80px,
  rgba(60, 38, 21, 0.03) 80px,
  rgba(60, 38, 21, 0.03) 82px,
  /* ... */
)
```

**Characteristics:**
- Centered at 30%, 40% (off-center for realism)
- Rings at 80px and 160px radius
- Very subtle (0.03-0.04 opacity)
- Creates organic, natural appearance

### 5. Highlight Overlay

Natural lighting effects with a diagonal gradient:

```css
linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.12) 0%,
  rgba(255, 255, 255, 0.06) 30%,
  transparent 60%
)
```

**Purpose:**
- Simulates polished wood sheen
- Adds depth and dimension
- Creates realistic light reflection
- Enhances 3D appearance

## Color Palette

### Primary Wood Tones
- `#8B5A3C` - Light brown (base color)
- `#6B4423` - Medium brown
- `#4A2F1A` - Dark brown

### Grain Colors
- `rgba(74, 47, 26, *)` - Primary grain color
- `rgba(60, 38, 21, *)` - Darker grain accents
- `rgba(90, 56, 35, *)` - Lighter grain highlights
- `rgba(50, 32, 18, *)` - Deep knot centers
- `rgba(70, 45, 25, *)` - Knot edges

### Opacity Levels
- **0.03-0.04**: Very subtle (growth rings)
- **0.06-0.08**: Subtle (background grain)
- **0.10-0.15**: Medium (main grain lines)
- **0.18-0.25**: Strong (prominent features, knot centers)

## Technical Implementation

### Layer Stacking (back to front)

1. **Base gradient** - Diagonal brown gradient
2. **beforeBackground** (z-index: 1, opacity: 0.6)
   - Vertical grain lines
   - Horizontal variations
   - Wood knots (3x radial gradients)
3. **afterBackground** (z-index: 2)
   - Growth rings
   - Highlight overlay
4. **Content layer** (z-index: 3)

### CSS Properties Used

```css
.container::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: /* beforeBackground patterns */;
  pointer-events: none;
  opacity: 0.6;
  z-index: 1;
}

.container::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: /* afterBackground patterns */;
  pointer-events: none;
  z-index: 2;
}
```

## Performance Considerations

### Advantages
✅ No external image loading
✅ Scales to any resolution
✅ Minimal memory footprint
✅ Hardware-accelerated rendering
✅ Easy to customize colors/patterns

### Optimization
- Uses CSS gradients (GPU-accelerated)
- No JavaScript calculations
- Static patterns (no animation overhead)
- Efficient layer compositing

## Customization Guide

### Adjusting Grain Density

**More dense grain:**
```css
/* Reduce spacing intervals */
transparent 0px,
transparent 2px,  /* was 3px */
rgba(74, 47, 26, 0.15) 2px,
```

**Less dense grain:**
```css
/* Increase spacing intervals */
transparent 0px,
transparent 5px,  /* was 3px */
rgba(74, 47, 26, 0.15) 5px,
```

### Adjusting Grain Visibility

**More prominent:**
```css
/* Increase opacity values */
rgba(74, 47, 26, 0.25)  /* was 0.15 */
```

**More subtle:**
```css
/* Decrease opacity values */
rgba(74, 47, 26, 0.08)  /* was 0.15 */
```

### Adding/Removing Knots

To add a new knot:
```css
radial-gradient(
  ellipse [width]px [height]px at [x]% [y]%,
  rgba(60, 38, 21, 0.25) 0%,
  rgba(74, 47, 26, 0.15) 30%,
  transparent 50%
)
```

### Changing Wood Type

**Dark walnut:**
```css
background: linear-gradient(135deg, #5A3825 0%, #3E2415 50%, #2A1810 100%);
/* Adjust grain colors to match */
```

**Light oak:**
```css
background: linear-gradient(135deg, #C19A6B 0%, #9B7653 50%, #7D5E3F 100%);
/* Use lighter grain colors */
```

**Cherry wood:**
```css
background: linear-gradient(135deg, #9B4444 0%, #7A3333 50%, #5A2222 100%);
/* Adjust to reddish tones */
```

## Visual Examples

### Pattern Breakdown

```
Base Layer (background)
├── Diagonal gradient (135deg)
│   └── Creates depth and dimension
│
├── Before Layer (beforeBackground, 60% opacity)
│   ├── Vertical grain (repeating-linear-gradient 90deg)
│   │   ├── Fine lines (3px spacing)
│   │   ├── Medium lines (8px, 15px spacing)
│   │   └── Wide lines (25px, 40px spacing)
│   ├── Horizontal variation (repeating-linear-gradient 0deg)
│   │   ├── 60px intervals
│   │   └── 120px intervals
│   └── Wood knots (3× radial-gradient)
│       ├── Top-left knot
│       ├── Right-center knot
│       └── Bottom-center knot
│
└── After Layer (afterBackground)
    ├── Highlight gradient (135deg)
    └── Growth rings (repeating-radial-gradient)
```

## Future Enhancements

Potential improvements:
- Animated wood shimmer effect
- Dynamic knot positioning
- Seasonal color variations
- Aged/weathered wood option
- Multiple wood species presets
- Customizable grain direction

## Browser Compatibility

✅ Chrome/Edge (all versions)
✅ Firefox (all versions)
✅ Safari (all versions)
✅ Opera (all versions)

**Note**: CSS gradients are widely supported. No fallback needed.

---
**Created**: November 3, 2025  
**Theme**: Wooden Classic  
**Impact**: Small  
**Risk**: Low
