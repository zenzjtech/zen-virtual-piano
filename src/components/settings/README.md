# Settings Component

Application-wide settings dialog with theme-aware styling integrated with the theme preset system.

## Structure

```
settings/
├── index.ts                    # Public exports
├── settings-dialog.tsx         # Main settings dialog component
├── use-settings-theme.ts       # Theme extraction hook
└── README.md                   # This file
```

## Components

### `SettingsDialog`
Full-featured tabbed settings dialog for the extension.

**Features:**
- Tab navigation (General, Quotes, Piano, Keyboard)
- Theme-aware styling from `HeaderThemeStyle`
- Responsive design
- Backdrop blur effects
- Smooth animations

**Props:**
- `open: boolean` - Dialog open state
- `onClose: () => void` - Close handler
- `isDarkBackground: boolean` - Theme context
- `initialTab?: 'general' | 'quotes' | 'piano' | 'keyboard'` - Initial tab
- `headerThemeStyle?: HeaderThemeStyle` - Theme styling from current preset

**Tabs:**
1. **General** - General extension settings (coming soon)
2. **Quotes** - Quote display preferences
   - Show/hide quotes toggle
   - Quote change interval selection
   - Show only favorites option
3. **Piano** - Piano settings (coming soon)
4. **Keyboard** - Keyboard shortcuts (coming soon)

### `useSettingsTheme`
Custom hook for extracting theme-aware colors from `HeaderThemeStyle`.

**Parameters:**
- `isDarkBackground: boolean` - Current theme mode
- `headerThemeStyle?: HeaderThemeStyle` - Theme style from preset

**Returns:**
```typescript
{
  backdropBlur: string;
  dialogBg: string;
  borderColor: string;
  boxShadow: string;
  hoverBg: string;
  textColor: string;
  secondaryTextColor: string;
  paperBg: string;
  highlightBg: string;
}
```

**Benefits:**
- Consistent styling across dialog elements
- Automatic fallbacks for missing theme data
- Memoized for performance
- Easy to reuse in other components

## Theme Integration

The settings dialog uses the same theme styling as the header for visual consistency:

```tsx
import { SettingsDialog } from '@/components/settings';

<SettingsDialog
  open={open}
  onClose={handleClose}
  isDarkBackground={isDarkBackground}
  initialTab="quotes"
  headerThemeStyle={currentPreset?.headerThemeStyle}
/>
```

### Theme Properties Used

From `HeaderThemeStyle`:
- `appBar.backdropBlur` - Dialog blur effect
- `appBar.backgroundColor` - Dialog background
- `appBar.borderColor` - Borders and dividers
- `appBar.boxShadow` - Dialog shadow
- `iconButton.hoverBackground` - Interactive elements hover

### Fallback Values

If no theme is provided, sensible defaults are used:
- **Dark mode**: High contrast, prominent shadows
- **Light mode**: Subtle colors, soft shadows

## Usage Example

```tsx
// In header component
const currentPreset = THEME_PRESETS.find(preset => 
  preset.pianoTheme === pianoTheme &&
  preset.backgroundTheme === backgroundTheme &&
  preset.musicSheetTheme === musicSheetTheme
);

// Pass theme to dialog
<SettingsDialog
  open={settingsOpen}
  onClose={handleCloseSettings}
  isDarkBackground={isDarkBackground}
  initialTab="quotes"
  headerThemeStyle={currentPreset?.headerThemeStyle}
/>
```

## State Management

Connects to Redux store:
- `quoteSettings` - Quote preferences (read/write)
- Actions: `setShowQuote`, `setQuoteInterval`, `setShowOnlyFavorites`

## Opening Specific Tabs

Use the `initialTab` prop to open directly to a specific section:

```tsx
// Open to quote settings
onOpenSettings('quotes')

// Open to general settings  
onOpenSettings('general')
```

The dialog can also be linked with hash navigation:
```tsx
// Settings button in quote component
onOpenSettings={() => handleOpenSettings('quotes')}
```

## Dependencies

- `@mui/material` - UI components
- `@mui/icons-material` - Icons
- `@/store` - Redux state management
- `../header/header-theme-styles` - Theme type definitions
