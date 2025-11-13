# 2025-01-13 Highlight Animation for Downloaded Sheets

## Summary
Implemented a timestamp-based highlight animation system that triggers when users navigate to the piano page from the download button. The animation highlights the song name and music sheet with a theme-aware light travel effect, accompanied by a notification confirming the song addition.

## Changes Made

### Download Button Enhancement
- Modified `download-button.tsx` to add a timestamp parameter (`?highlight=<timestamp>`) to the piano URL when navigating from a successful download
- Updated tab handling to include the timestamp in both new tab creation and existing tab updates

### Highlight Animation Hook
- Created new `use-highlight-animation.ts` hook to detect URL timestamp parameters
- Implements 20-second window validation for animation triggers
- Automatically cleans up URL parameters after detection
- Manages animation state with 10-second duration
- **NEW**: Integrates with notification system to show success message with song details

### Component Integration
- Updated `App.tsx` to use the highlight animation hook and pass state to MusicStand
- Modified `music-stand.tsx` to accept and forward `isHighlighted` prop
- Enhanced `music-book-display.tsx` with theme-aware light travel animation around the music sheet border
- Updated `book-page.tsx` to add highlight animation to the song title on left pages

### Animation Details

#### Music Sheet Border Effects
- **Traveling Light**: Dual light beams travel around the border in a continuous loop (3s duration)
- **Static Border**: 3px solid border with pulsing opacity (0.6 to 1.0)
- **Glow Effects**: Multi-layer box shadows (40px and 80px) with theme accent color
- **Subtle Pulse**: Entire book scales slightly (1.0 to 1.005) for breathing effect
- **Enhanced Contrast**: Full opacity accent color (FF) for bright, visible light trails

#### Title Highlight Effects
- **Text Glow**: Multi-layer text shadows creating strong glow effect
- **Background Glow**: Radial gradient backdrop that pulses and scales (1.0 to 1.1)
- **Light Sweep**: Traveling gradient with dual light beams across title
- **Border Frame**: 2px border with box shadow and inset glow
- **Text Pulse**: Title scales 5% larger during animation for emphasis
- **Duration**: All animations synchronized at 2 seconds for visual harmony

#### Technical Implementation
- **Theme Awareness**: All animations use `pianoTheme.colors.accent` for consistent theming
- **Multi-layer Effects**: Uses `::before` and `::after` pseudo-elements for layered animations
- **Hardware Acceleration**: Transform and opacity changes for smooth 60fps performance
- **Cross-browser Support**: Includes `-webkit-` prefixes for Safari/Chrome compatibility
- **Notification Integration**: Uses notification context to show success message with song title and artist
- **Redux Integration**: Accesses current sheet data from Redux store for notification content
- **Automatic Cleanup**: Animation state cleared after 10 seconds, URL parameters cleaned up

## Technical Implementation
- Uses React hooks for state management and URL parameter detection
- Leverages Material-UI's `sx` prop for dynamic CSS-in-JS styling
- Implements theme-aware colors from the piano theme system
- Maintains clean URL state by removing parameters after processing

## Files Modified
- `src/components/global/components/download-button.tsx`
- `src/hooks/use-highlight-animation.ts` (new)
- `src/entrypoints/piano/App.tsx`
- `src/components/music-sheet/music-stand.tsx`
- `src/components/music-sheet/music-book-display.tsx`
- `src/components/music-sheet/book-page.tsx`

## Testing Recommendations
- Test complete flow: download button → piano page → highlight animation
- Verify animation works with different theme presets (classic, modern, cultural, etc.)
- Confirm URL cleanup after animation completes
- Test edge cases: existing tabs, multiple rapid clicks, expired timestamps
