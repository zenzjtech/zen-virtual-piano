# Dialog UI/UX Unification - 2025-11-09

## Summary
Unified the UI/UX styling across all dialogs (keyboard shortcuts, settings, and add sheet) with background-theme awareness, eliminating prop drilling by leveraging Redux store directly.

## Impact
- **Risk Level**: Low
- **Impact Level**: Medium
- **Changes**: Refactored 3 major dialogs + created reusable theme system

## Changes Made

### 1. Created Unified Dialog Theme System

#### New Hook: `useDialogTheme`
- **Location**: `src/hooks/use-dialog-theme.ts`
- **Purpose**: Centralized theme hook that reads directly from Redux store
- **Benefits**:
  - Eliminates prop drilling
  - Automatically adapts to background theme changes
  - Provides consistent theme properties across all dialogs
  - Integrates with `theme-presets.ts` for header theme styles

**Key Features**:
- Background-theme aware (dark/light detection)
- Consistent accent colors (emerald green `#10b981`)
- Unified property names (`textPrimary`, `textSecondary`, `accentPrimary`, etc.)
- Backdrop blur and shadow effects
- Preset-based styling hints

#### Shared Dialog Components
- **`DialogHeader`** (`src/components/global/dialog/dialog-header.tsx`):
  - Consistent header with icon, title, subtitle, and close button
  - Automatically theme-aware
  - Standardized spacing and layout

- **Style Utilities** (`src/components/global/dialog/styles.ts`):
  - `getDialogStyles()`: Standard Paper props with glassmorphism
  - `getTextFieldStyles()`: Unified TextField styling
  - `getScrollbarStyles()`: Custom scrollbar theming

### 2. Refactored Keyboard Shortcuts Dialog

**File**: `src/components/piano/keyboard-shortcuts-dialog.tsx`

**Changes**:
- ✅ Removed prop drilling (`pianoTheme`, `isDarkBackground`)
- ✅ Uses `useDialogTheme()` hook instead
- ✅ Integrated `DialogHeader` component
- ✅ Applied unified styling utilities
- ✅ Maintains all existing functionality
- ✅ Auto-adapts to background theme changes

**Before**: Required manual props for theming  
**After**: Reads theme directly from Redux store

### 3. Refactored Add Sheet Dialog

**File**: `src/components/music-sheet/add-sheet-dialog.tsx`

**Changes**:
- ✅ Integrated `useDialogTheme()` hook
- ✅ Uses `DialogHeader` component
- ✅ Applied unified TextField styling
- ✅ Theme-aware buttons (Cancel, Add Sheet)
- ✅ Consistent Chip styling for tags
- ✅ Background-aware form inputs

**Improvements**:
- Green accent for primary actions
- Consistent border and hover states
- Unified spacing and layout

### 4. Updated Settings Dialog

**File**: `src/components/settings/settings-dialog.tsx`

**Changes**:
- ✅ Migrated from `useSettingsTheme` to `useDialogTheme`
- ✅ Updated all child components to use unified theme interface
- ✅ Applied `getDialogStyles()` utility
- ✅ Maintained all tab functionality

**Updated Components**:
- `settings-header.tsx`: Updated property names (`textColor` → `textPrimary`)
- `setting-toggle.tsx`: Updated theme properties
- `quotes-tab.tsx`: Updated all color references
- `piano-tab.tsx`: Updated theme usage
- `keyboard-tab.tsx`: Updated theme usage
- `general-tab.tsx`: Uses new theme interface

**Type System Updates**:
- `types.ts`: Re-exported `DialogTheme` as `SettingsTheme` for backwards compatibility

## Technical Details

### Theme Property Mapping
| Old Property | New Property | Purpose |
|-------------|-------------|---------|
| `textColor` | `textPrimary` | Primary text color |
| `secondaryTextColor` | `textSecondary` | Secondary/muted text |
| N/A | `accentPrimary` | Primary accent (green) |
| N/A | `accentPrimaryBg` | Accent with transparency |

### Redux Integration
All dialogs now read theme state from Redux:
```typescript
const backgroundThemeId = useAppSelector((state) => state.theme.backgroundTheme);
const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
const musicSheetThemeId = useAppSelector((state) => state.theme.musicSheetTheme);
```

### Background Theme Awareness
Dialogs automatically adjust styling based on `isDarkBackgroundTheme()`:
- Light backgrounds: Darker text, lighter inputs
- Dark backgrounds: Lighter text, darker inputs with higher opacity

## Benefits

### 1. **No Prop Drilling**
- Dialogs access theme directly from Redux
- Cleaner component interfaces
- Easier to maintain

### 2. **Consistent UI/UX**
- All dialogs share the same visual language
- Unified spacing, borders, and effects
- Consistent accent colors

### 3. **Background-Theme Aware**
- Dialogs automatically adapt to background changes
- Proper contrast in all theme combinations
- Seamless integration with theme presets

### 4. **Code Reuse**
- Shared components (`DialogHeader`, style utilities)
- DRY principles applied
- Easier to add new dialogs

### 5. **Maintainability**
- Single source of truth for dialog theming
- Type-safe with TypeScript
- Easy to update styles globally

## Files Created
1. `/src/hooks/use-dialog-theme.ts` - Unified theme hook
2. `/src/components/global/dialog/dialog-header.tsx` - Reusable header component
3. `/src/components/global/dialog/styles.ts` - Shared style utilities
4. `/src/components/global/dialog/index.ts` - Barrel export

## Files Modified
1. `/src/components/piano/keyboard-shortcuts-dialog.tsx` - Full refactor
2. `/src/components/music-sheet/add-sheet-dialog.tsx` - Full refactor
3. `/src/components/settings/settings-dialog.tsx` - Theme integration
4. `/src/components/settings/types.ts` - Type re-export
5. `/src/components/settings/tabs/*.tsx` - Property name updates
6. `/src/components/settings/components/*.tsx` - Property name updates
7. `/src/components/global/app-dialogs.tsx` - Removed old props

## Deprecated
- `useSettingsTheme` hook - Replaced by `useDialogTheme`
- Individual dialog theme prop interfaces - Now use shared `DialogTheme`

## Breaking Changes
None - All changes are internal refactoring. Component APIs remain compatible.

## Testing Recommendations
1. Test all dialogs with different background themes (light/dark)
2. Verify keyboard shortcuts dialog appearance
3. Test add sheet dialog form inputs
4. Confirm settings dialog tabs work correctly
5. Check theme switching during dialog display

## Next Steps (Optional)
1. Apply same pattern to other popups/modals in the app
2. Consider extracting common button styles
3. Add animation transitions between theme changes
4. Create Storybook stories for dialog components

## Notes
- All dialogs maintain their original functionality
- Performance impact: Negligible (hooks are memoized)
- TypeScript types are fully preserved
- Backwards compatible with existing codebase
