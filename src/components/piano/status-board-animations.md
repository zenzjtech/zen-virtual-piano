# Status Board Animation System

## Overview
The status board now features smooth, polished animations when switching between display modes (Manual Play ↔ Sheet Music).

## Animation Components

### TransitionWrapper
**Location:** `status-board-transition.tsx`

A reusable wrapper that handles mode transitions with:
- **Fade out/in effects** (opacity)
- **Slide animations** (translateY)
- **Scale effects** (slight zoom)

#### Animation Timeline
```
Mode Change Triggered
    ↓
[0-150ms] Exit Animation
    • Fade out: opacity 1 → 0
    • Slide up: translateY 0 → -10px
    • Scale down: scale 1 → 0.98
    • Timing: cubic-bezier(0.4, 0, 1, 1) - fast out
    ↓
[150ms] Content Swap
    ↓
[150-450ms] Enter Animation
    • Fade in: opacity 0 → 1
    • Slide down: translateY -10px → 0
    • Scale up: scale 0.98 → 1
    • Timing: cubic-bezier(0, 0, 0.2, 1) - slow in
    ↓
Complete (300ms total)
```

## Styled Component Transitions

All styled components in `status-board-styled.tsx` now include CSS transitions:

### Container Elements
- `CurrentNoteDisplay`: 0.3s transition for all properties
- `PressedKeysDisplay`: 0.3s transition for all properties
- `HistoryDisplay`: 0.3s transition for all properties

### Text Elements
- `NoteText`: 0.2s opacity & transform transitions (faster for instant feedback)
- `KeyText`: 0.2s opacity & transform transitions
- `PressedKeysText`: 0.3s color & opacity transitions
- `Label`: 0.3s opacity transitions

## Timing Functions

### Cubic Bezier Curves Used
1. **Exit Animation:** `cubic-bezier(0.4, 0, 1, 1)`
   - Fast acceleration, sharp deceleration
   - Creates snappy exit feel

2. **Enter Animation:** `cubic-bezier(0, 0, 0.2, 1)`
   - Slow acceleration, fast deceleration
   - Creates smooth, natural entrance

3. **General Transitions:** `cubic-bezier(0.4, 0, 0.2, 1)`
   - Balanced easing for hover states and interactions

## Performance Optimization

- **`willChange: 'opacity, transform'`** - Browser hint for GPU acceleration
- **Transform-based animations** - Hardware accelerated
- **No layout thrashing** - Only opacity and transform changes
- **Short durations** - 150-300ms prevents sluggish feel

## Usage Example

```tsx
<TransitionWrapper transitionKey={isSheetMode ? 'sheet' : 'manual'}>
  {isSheetMode ? (
    <SheetModeDisplay {...props} />
  ) : (
    <ManualModeDisplay {...props} />
  )}
</TransitionWrapper>
```

The `transitionKey` prop triggers animations when it changes.

## Design Principles

1. **Subtle & Professional** - Not distracting from piano playing
2. **Fast & Responsive** - 300ms total feels instant
3. **Directional** - Slide up on exit, down on enter (natural flow)
4. **Layered** - Combination of opacity, position, and scale
5. **Performance-first** - GPU accelerated transforms only

## Future Enhancements

Potential improvements (not implemented):
- Staggered animations for child elements
- Spring physics for more natural motion
- Gesture-based transitions (swipe)
- Reduced motion support for accessibility
