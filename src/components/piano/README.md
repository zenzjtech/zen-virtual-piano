# Piano Components

This directory contains all piano-related components and utilities.

## File Structure

### Components
- **`piano.tsx`** - Main Piano component
- **`piano-key.tsx`** - Individual piano key component
- **`preset-selector.tsx`** - Theme preset selector component for browsing and applying preset combinations
- **`style-settings-popup.tsx`** - Style settings popup with integrated preset selector

### Styled Components
- **`popup-styled-components.tsx`** - Reusable styled MUI components for popups and dialogs
  - `StyledPopupPaper` - Themed popup container
  - `PopupHeaderBox` - Popup header section
  - `PopupContentBox` - Popup content section
  - `StyledListItem` - Themed list items
  - `StyledListItemButton` - Themed list item buttons
  - `StyledChip` - Themed chips
  - `SearchBox` - Search input container
  - `SearchInput` - Themed search input field

### Theme System
- **`themes/`** - Piano visual themes
  - `wooden.ts` - Classic wooden piano theme
  - `black.ts` - Elegant black piano theme
  - `metal.ts` - Modern metal piano theme
  - `white.ts` - Clean white piano theme
  - `rose-gold.ts` - Luxurious rose gold theme
  - `mahogany.ts` - Rich mahogany theme
  - `nordic-ice.ts` - Cool Nordic ice theme
  - `index.ts` - Theme exports and utilities

- **`background-themes.ts`** - Background color and gradient themes
- **`music-sheet-themes.ts`** - Music sheet paper texture themes
- **`theme-presets.ts`** - Curated harmonious combinations of piano, background, and music sheet themes

### Theme Presets
The `theme-presets.ts` file contains 20 curated preset combinations organized by category:
- **Classic** (4 presets) - Timeless traditional combinations
- **Modern** (4 presets) - Contemporary minimalist styles
- **Cultural** (8 presets) - Traditional and spiritual themes
- **Nature** (2 presets) - Natural and organic themes
- **Artistic** (2 presets) - Creative and expressive combinations

#### Preset Utilities
```typescript
import { 
  THEME_PRESETS, 
  getPresetById, 
  getPresetsByCategory,
  getPresetCategories,
  getRandomPreset,
  getPresetCounts
} from './theme-presets';

// Get all presets
const allPresets = THEME_PRESETS;

// Get specific preset
const preset = getPresetById('classic-elegance');

// Get presets by category
const culturalPresets = getPresetsByCategory('cultural');

// Get random preset
const randomPreset = getRandomPreset();
const randomCultural = getRandomPreset('cultural');
```

## Usage

### Importing Components
```typescript
import { Piano, PianoKeyComponent } from '@/components/piano';
```

### Importing Styled Components
```typescript
import { 
  StyledPopupPaper, 
  PopupHeaderBox, 
  SearchInput 
} from '@/components/piano/popup-styled-components';
```

### Importing Theme Presets
```typescript
import { 
  THEME_PRESETS, 
  getPresetById,
  type ThemePreset 
} from '@/components/piano/theme-presets';
```

### Using a Preset
```typescript
const preset = getPresetById('japanese-zen');
if (preset) {
  // Apply piano theme
  setPianoTheme(preset.pianoTheme);
  
  // Apply background theme
  setBackgroundTheme(preset.backgroundTheme);
  
  // Apply music sheet theme
  setMusicSheetTheme(preset.musicSheetTheme);
}
```

### Using the Preset Selector Component
```typescript
import { PresetSelector } from '@/components/piano/preset-selector';

<PresetSelector
  pianoTheme={currentPianoTheme}
  currentPianoTheme={currentPianoThemeId}
  currentBackgroundTheme={currentBackgroundThemeId}
  currentMusicSheetTheme={currentMusicSheetThemeId}
  onPresetApply={(preset) => {
    // Apply all three themes at once
    setPianoTheme(preset.pianoTheme);
    setBackgroundTheme(preset.backgroundTheme);
    setMusicSheetTheme(preset.musicSheetTheme);
  }}
  searchQuery={searchQuery}
/>
```

## Design Philosophy

### Color Harmony
Each preset is carefully curated to ensure:
- **Complementary colors** - Piano, background, and sheet themes work together
- **Visual balance** - No overwhelming color conflicts
- **Cultural authenticity** - Cultural presets respect traditional color symbolism
- **Mood consistency** - Each preset evokes a specific atmosphere

### Categories
- **Classic** - Traditional piano concert hall aesthetics
- **Modern** - Clean, minimalist contemporary design
- **Cultural** - Inspired by world cultures and spiritual traditions
- **Nature** - Earth tones and natural gradients
- **Artistic** - Creative and expressive combinations

## Contributing

When adding new presets:
1. Test color harmony across all three theme types
2. Provide descriptive names and descriptions
3. Assign to appropriate category
4. Ensure cultural presets are respectful and authentic
