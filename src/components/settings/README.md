# Settings Component - Modular Architecture

Application-wide settings dialog with theme-aware styling and modular code structure.

## Structure

```
settings/
├── index.ts                       # Public exports
├── types.ts                       # Shared TypeScript types
├── settings-dialog.tsx            # Main dialog orchestrator (138 lines)
├── use-settings-theme.ts          # Theme extraction hook
│
├── components/                    # Reusable setting components
│   ├── index.ts
│   ├── settings-header.tsx        # Dialog header with theme/instrument info
│   ├── tab-panel.tsx              # Tab panel wrapper with animations
│   ├── setting-section.tsx        # Reusable section wrapper
│   └── setting-toggle.tsx         # Reusable toggle switch
│
├── tabs/                          # Tab content components
│   ├── index.ts
│   ├── general-tab.tsx            # General settings
│   ├── quotes-tab.tsx             # Quote preferences
│   ├── piano-tab.tsx              # Piano settings
│   └── keyboard-tab.tsx           # Keyboard shortcuts
│
└── README.md                      # This file
```

## Architecture Benefits

### **1. Modularity**
- Each component has single responsibility
- Easy to locate and modify specific features
- Reusable components across tabs

### **2. Maintainability**
- **Main dialog reduced from 450+ lines to 138 lines** (69% smaller!)
- Clear separation of concerns
- Easy to add new settings tabs

### **3. Reusability**
- `SettingToggle` - Reusable toggle switches
- `SettingSection` - Consistent section styling
- `TabPanel` - Reusable tab wrapper
- `SettingsHeader` - Shared header component

### **4. Testability**
- Components can be tested in isolation
- Mock theme easily
- Test individual tabs independently

## Components

### Core Dialog

#### `SettingsDialog` (138 lines)
Main orchestrator that composes all sub-components.

**Props:**
```typescript
interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  isDarkBackground: boolean;
  initialTab?: SettingsTab;
  headerThemeStyle?: HeaderThemeStyle;
  currentPreset?: ThemePreset;
}
```

**Responsibilities:**
- Dialog structure and layout
- Tab navigation
- Theme extraction
- Animation transitions

### Reusable Components

#### `SettingsHeader` (87 lines)
Dialog header with close button, theme name, and instrument info.

**Features:**
- Theme preset name display
- Current instrument display
- Fade-in animations
- Theme-aware chips

#### `TabPanel` (22 lines)
Wrapper for tab content with fade animation.

**Features:**
- Automatic show/hide
- Fade transitions (250ms)
- Accessibility support

#### `SettingSection` (26 lines)
Reusable section wrapper with consistent styling.

**Usage:**
```tsx
<SettingSection theme={theme}>
  <SettingToggle ... />
</SettingSection>
```

#### `SettingToggle` (52 lines)
Reusable toggle switch with label and description.

**Props:**
```typescript
interface SettingToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  theme: SettingsTheme;
}
```

**Usage:**
```tsx
<SettingToggle
  label="Show Inspirational Quotes"
  description="Display quotes in the header"
  checked={showQuote}
  onChange={setShowQuote}
  theme={theme}
/>
```

### Tab Components

#### `QuotesTab` (164 lines)
Complete quote settings implementation.

**Settings:**
- Show/hide quotes toggle
- Quote interval selector
- Show only favorites toggle

#### `GeneralTab`, `PianoTab`, `KeyboardTab`
Placeholder tabs ready for future settings.

### Hooks

#### `useSettingsTheme`
Extracts theme-aware colors from HeaderThemeStyle.

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

## Usage

### Basic Usage

```tsx
import { SettingsDialog } from '@/components/settings';

<SettingsDialog
  open={open}
  onClose={handleClose}
  isDarkBackground={isDarkBackground}
  initialTab="quotes"
  headerThemeStyle={currentPreset?.headerThemeStyle}
  currentPreset={currentPreset}
/>
```

### Adding New Settings

**1. Create a new tab component:**
```tsx
// tabs/my-new-tab.tsx
export const MyNewTab = ({ theme }: { theme: SettingsTheme }) => {
  return (
    <Box>
      <SettingSection theme={theme}>
        <SettingToggle
          label="My Setting"
          checked={value}
          onChange={setValue}
          theme={theme}
        />
      </SettingSection>
    </Box>
  );
};
```

**2. Export from tabs/index.ts:**
```tsx
export { MyNewTab } from './my-new-tab';
```

**3. Add to main dialog:**
```tsx
<Tab label="My Tab" id="settings-tab-4" />
...
<TabPanel value={tabValue} index={4}>
  <MyNewTab theme={theme} />
</TabPanel>
```

### Creating Custom Setting Components

```tsx
// components/my-custom-setting.tsx
export const MyCustomSetting = ({ theme }: { theme: SettingsTheme }) => {
  return (
    <SettingSection theme={theme}>
      {/* Your custom content */}
    </SettingSection>
  );
};
```

## Code Reuse Examples

### Reusing SettingToggle

```tsx
// Multiple toggles with consistent styling
<SettingSection theme={theme}>
  <SettingToggle
    label="Feature 1"
    description="Description 1"
    checked={feature1}
    onChange={setFeature1}
    theme={theme}
  />
</SettingSection>

<SettingSection theme={theme}>
  <SettingToggle
    label="Feature 2"
    description="Description 2"
    checked={feature2}
    onChange={setFeature2}
    theme={theme}
  />
</SettingSection>
```

### Reusing SettingSection

```tsx
// Consistent section styling automatically
<SettingSection theme={theme}>
  <FormControl fullWidth>
    <InputLabel>My Dropdown</InputLabel>
    <Select>...</Select>
  </FormControl>
</SettingSection>
```

## Animation System

**Dialog Transitions:**
- Fade in: 250ms
- Fade out: 200ms

**Content Animations:**
- Tab panels: 250ms fade
- Header chips: 400ms fade
- Smooth, understated

## File Size Comparison

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| Main dialog | 450 lines | 138 lines | **69%** |
| Quote settings | Inline | 164 lines | Extracted |
| Header | Inline | 87 lines | Extracted |
| Reusable components | 0 | 4 files | New |

**Total lines maintained but organized into focused, reusable modules.**

## Dependencies

- `@mui/material` - UI components
- `@mui/icons-material` - Icons
- `@/store` - Redux state management
- `@/services/sound-sets` - Instrument data
- `../header/header-theme-styles` - Theme definitions
- `../piano/theme-presets` - Theme preset data

## Future Enhancements

**Easy to add:**
- New setting tabs (just create new tab component)
- New setting types (create new reusable component)
- Custom animations per tab
- Setting search/filter
- Import/export settings
- Setting presets

**All modular additions without touching existing code!**
