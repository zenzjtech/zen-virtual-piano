# Integration Notes: Settings Button in Style Popup

## Summary
Added a settings button to the Style Settings Popup that opens the global Settings Dialog on the General tab, which now includes auto theme rotation functionality.

## Changes Made

### 1. New Redux Slice: `auto-theme-slice.ts`
**Location:** `src/store/reducers/auto-theme-slice.ts`

```typescript
interface AutoThemeState {
  enabled: boolean;
  interval: ThemeChangeInterval; // 'daily' | 'hourly' | '30min' | '15min' | '10min' | '5min'
  lastChangeDate: string;
}
```

**Actions:**
- `setAutoThemeEnabled(boolean)` - Enable/disable auto theme rotation
- `setAutoThemeInterval(interval)` - Set rotation interval
- `setLastThemeChangeDate(string)` - Track last change

### 2. Updated General Settings Tab
**Location:** `src/components/settings/tabs/general-tab.tsx`

**Features Added:**
- Toggle for "Auto Theme Rotation"
- Dropdown for interval selection (Daily, Hourly, 30min, 15min, 10min, 5min)
- Helpful tip message
- Theme-aware styling

### 3. Updated Style Settings Popup
**Location:** `src/components/piano/style-settings-popup.tsx`

**Changes:**
- Added `SettingsIcon` import
- Added `onOpenSettings?: () => void` prop
- Added settings button in header (top right)
- Button has theme-aware styling with hover effects

**UI:**
```
┌─────────────────────────────────┐
│ 🎨 Style Settings       ⚙️     │  <- Settings button added here
├─────────────────────────────────┤
│ Search...                       │
│                                 │
│ [Theme options...]              │
└─────────────────────────────────┘
```

## Integration Required

### In `App.tsx` (or wherever StyleSettingsPopup is used):

```typescript
// Add callback to open settings dialog
<StyleSettingsPopup
  // ... existing props
  onOpenSettings={() => {
    // Call the function that opens the global settings dialog
    // Example: handleOpenSettings('general')
    // This should be the same function used by the header settings button
  }}
/>
```

### Expected Behavior:

1. User clicks settings button (⚙️) in Style Settings Popup
2. Global Settings Dialog opens
3. General tab is automatically selected
4. User sees "Auto Theme Rotation" settings

## Auto Theme Rotation Logic (To be implemented)

The auto theme rotation needs to be implemented in a useEffect hook or background service:

```typescript
// Pseudo-code for implementation
useEffect(() => {
  if (!autoTheme.enabled) return;

  const checkInterval = setInterval(() => {
    if (shouldChangeTheme(autoTheme.interval, autoTheme.lastChangeDate)) {
      const randomPreset = getRandomPreset();
      applyPreset(randomPreset);
      dispatch(setLastThemeChangeDate(new Date().toISOString()));
    }
  }, 60000); // Check every minute

  return () => clearInterval(checkInterval);
}, [autoTheme.enabled, autoTheme.interval, autoTheme.lastChangeDate]);
```

## Files Modified

1. ✅ `src/store/reducers/auto-theme-slice.ts` - NEW
2. ✅ `src/store/reducers/index.ts` - Added autoTheme reducer
3. ✅ `src/components/settings/tabs/general-tab.tsx` - Implemented UI
4. ✅ `src/components/piano/style-settings-popup.tsx` - Added settings button

## Files Needing Integration

- `src/entrypoints/piano/App.tsx` - Wire up `onOpenSettings` callback
- Implementation of auto theme rotation timer (can be in App.tsx or a custom hook)

## Testing Checklist

- [ ] Settings button appears in Style Settings Popup header
- [ ] Settings button has theme-aware styling
- [ ] Clicking settings button opens Global Settings Dialog
- [ ] General tab is automatically selected
- [ ] Auto Theme Rotation toggle works
- [ ] Interval dropdown shows correct options
- [ ] Settings persist in Redux store
- [ ] Auto theme rotation timer works (when implemented)
- [ ] Theme changes are applied correctly

## Future Enhancements

- Add "Change Now" button to manually trigger theme change
- Show countdown timer until next auto change
- Add "Favorite Categories" to filter random themes
- Add visual preview of next theme
- Add animation when theme changes automatically
