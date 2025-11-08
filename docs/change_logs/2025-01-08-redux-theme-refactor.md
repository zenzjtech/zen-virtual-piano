# Redux Store Refactoring - Theme Consolidation

**Date:** 2025-01-08  
**Author:** Cascade AI Assistant

## Summary

Refactored the Redux store structure to consolidate all theme-related state into a single `theme` slice, improving code organization and maintainability.

## Changes Made

### 1. Created New Theme Slice
- **File:** `src/store/reducers/theme-slice.ts`
- Renamed `autoTheme` slice to `theme`
- Consolidated theme-related properties from multiple slices:
  - Moved `pianoSettings.theme` → `theme.pianoTheme`
  - Moved `pianoSettings.backgroundTheme` → `theme.backgroundTheme`
  - Moved `pianoSettings.musicSheetTheme` → `theme.musicSheetTheme`
  - Kept existing auto-theme properties: `autoThemeEnabled`, `autoThemeInterval`, `lastThemeChangeDate`

### 2. Updated Piano Settings Slice
- **File:** `src/store/reducers/piano-settings-slice.ts`
- Removed theme-related properties: `theme`, `backgroundTheme`, `musicSheetTheme`
- Removed corresponding action creators: `setTheme`, `setBackgroundTheme`, `setMusicSheetTheme`
- Retained piano-specific settings: `soundSet`, `sustain`, `showKeyboard`, `showNoteName`, `isPianoEnabled`

### 3. Updated Store Configuration
- **File:** `src/store/reducers/index.ts`
- Changed import from `auto-theme-slice` to `theme-slice`
- Updated store key from `autoTheme` to `theme`
- Deleted old `auto-theme-slice.ts` file

### 4. Updated All Consuming Components

#### App Component
- **File:** `src/entrypoints/piano/App.tsx`
- Updated imports to use new action creators from `theme-slice`
- Changed state selectors:
  - `state.pianoSettings.theme` → `state.theme.pianoTheme`
  - `state.pianoSettings.backgroundTheme` → `state.theme.backgroundTheme`
  - `state.pianoSettings.musicSheetTheme` → `state.theme.musicSheetTheme`
- Updated action creator: `setTheme` → `setPianoTheme`

#### Auto Theme Rotation Hook
- **File:** `src/hooks/use-auto-theme-rotation.ts`
- Consolidated imports from both slices into single `theme-slice` import
- Updated state selectors:
  - `state.autoTheme.enabled` → `state.theme.autoThemeEnabled`
  - `state.autoTheme.interval` → `state.theme.autoThemeInterval`
  - `state.autoTheme.lastChangeDate` → `state.theme.lastThemeChangeDate`
- Updated action creator: `setTheme` → `setPianoTheme`

#### Settings Components
- **File:** `src/components/settings/tabs/general-tab.tsx`
- Updated import from `auto-theme-slice` to `theme-slice`
- Changed state selector from `state.autoTheme` to `state.theme`
- Renamed prop parameter to avoid naming conflict with state

#### Header Component
- **File:** `src/components/header/header.tsx`
- Updated state selectors:
  - `state.pianoSettings.theme` → `state.theme.pianoTheme`
  - `state.pianoSettings.musicSheetTheme` → `state.theme.musicSheetTheme`

#### Music Sheet Components
- **File:** `src/components/music-sheet/music-stand.tsx`
  - Updated state selector: `state.pianoSettings.musicSheetTheme` → `state.theme.musicSheetTheme`
  
- **File:** `src/components/music-sheet/theme-gallery-dialog.tsx`
  - Updated import from `piano-settings-slice` to `theme-slice`
  - Updated state selector: `state.pianoSettings.musicSheetTheme` → `state.theme.musicSheetTheme`

## State Structure Comparison

### Before
```typescript
{
  pianoSettings: {
    theme: string,
    backgroundTheme: string,
    musicSheetTheme: string,
    soundSet: string,
    sustain: number,
    ...
  },
  autoTheme: {
    enabled: boolean,
    interval: ThemeChangeInterval,
    lastChangeDate: string
  }
}
```

### After
```typescript
{
  pianoSettings: {
    soundSet: string,
    sustain: number,
    ...
  },
  theme: {
    pianoTheme: string,
    backgroundTheme: string,
    musicSheetTheme: string,
    autoThemeEnabled: boolean,
    autoThemeInterval: ThemeChangeInterval,
    lastThemeChangeDate: string
  }
}
```

## Benefits

1. **Better Organization:** All theme-related state is now in a single slice
2. **Clearer Separation:** Piano settings now only contain piano-specific configuration
3. **Improved Maintainability:** Easier to find and modify theme-related logic
4. **Consistent Naming:** Auto-theme properties follow the same naming convention as other properties

## Migration Notes

- This is a breaking change for the Redux store structure
- Users may need to re-configure their theme settings on first load after update
- All state persistence should handle the migration automatically via Redux Chrome Storage

## Testing Recommendations

1. Verify theme changes work correctly
2. Test auto-theme rotation functionality
3. Confirm theme persistence across browser sessions
4. Check all theme-related UI components render correctly
