# Auto Theme Rotation Feature

**Date:** 2025-11-08  
**Author:** AI Assistant  
**Type:** Feature Implementation + Refactoring

## Summary

Implemented automatic theme rotation functionality with configurable intervals and refactored the logic into a custom hook for better code organization.

## Changes Made

### 1. Redux State Management
**File:** `src/store/reducers/auto-theme-slice.ts` (NEW)

- Created Redux slice for auto theme rotation settings
- Supports 7 intervals: daily, hourly, 30min, 15min, 10min, 5min, 1min
- Tracks last theme change date for accurate interval calculations
- Actions: `setAutoThemeEnabled`, `setAutoThemeInterval`, `setLastThemeChangeDate`

### 2. Settings UI
**File:** `src/components/settings/tabs/general-tab.tsx`

- Implemented General Settings tab with auto theme rotation controls
- Toggle switch to enable/disable feature
- Dropdown selector for interval configuration
- Helpful tip message for user guidance
- Reused modular setting components (`SettingToggle`, `SettingSection`)

### 3. Style Popup Integration
**File:** `src/components/piano/style-settings-popup.tsx`

- Added settings button (⚙️) in header (top-right)
- Theme-aware button styling with smooth hover effects
- Opens global settings dialog to General tab
- New prop: `onOpenSettings?: () => void`

### 4. Custom Hook (REFACTORED)
**File:** `src/hooks/use-auto-theme-rotation.ts` (NEW)

**Features:**
- Encapsulates all auto theme rotation logic
- Checks every 60 seconds if theme should change
- Calculates time differences for all intervals
- Applies random theme preset (piano + background + sheet)
- Shows notification on theme change
- Tracks analytics events
- Clean, testable, reusable code

**Benefits:**
- Separation of concerns
- Easier to test
- Can be reused elsewhere
- Cleaner App.tsx

### 5. App Integration
**File:** `src/entrypoints/piano/App.tsx`

**Before:** 65 lines of inline logic  
**After:** 1 line hook call

```typescript
// Before: 65 lines of useEffect with complex logic
useEffect(() => {
  if (!autoTheme.enabled) return;
  // ... 60+ lines of logic
}, [/* many dependencies */]);

// After: Clean hook usage
useAutoThemeRotation(uid);
```

**Changes:**
- Removed inline auto theme rotation logic (-62 lines)
- Added `useAutoThemeRotation` hook call (+1 line)
- Added settings dialog state and handlers
- Wired up `onOpenSettings` callback to StyleSettingsPopup
- Integrated SettingsDialog component
- Updated keyboard enable logic to include settings dialog

## File Structure

```
New Files:
├── src/store/reducers/auto-theme-slice.ts         (38 lines)
├── src/hooks/use-auto-theme-rotation.ts           (80 lines)
└── INTEGRATION_NOTES.md                           (Guide)

Modified Files:
├── src/store/reducers/index.ts                    (+1 export)
├── src/components/settings/tabs/general-tab.tsx   (136 lines, full impl)
├── src/components/piano/style-settings-popup.tsx  (+65 lines, button)
└── src/entrypoints/piano/App.tsx                  (-62 inline, +hook)
```

## How It Works

### Flow Diagram
```
User clicks ⚙️ in Style Settings
        ↓
Settings Dialog opens (General tab)
        ↓
User enables Auto Theme Rotation
        ↓
User selects interval (e.g., "Every Hour")
        ↓
Settings saved to Redux
        ↓
useAutoThemeRotation hook activates
        ↓
Checks every 60 seconds
        ↓
When interval passes:
  - Selects random preset
  - Applies all theme components
  - Updates last change date
  - Shows notification
  - Tracks analytics
```

### Interval Calculations

| Interval | Calculation Method |
|----------|-------------------|
| Daily | Compare ISO date strings |
| Hourly | `hoursDiff >= 1` |
| 30min | `minutesDiff >= 30` |
| 15min | `minutesDiff >= 15` |
| 10min | `minutesDiff >= 10` |
| 5min | `minutesDiff >= 5` |
| 1min | `minutesDiff >= 1` |

## Testing

### Manual Testing Checklist
- [x] Settings button appears in Style Settings Popup
- [x] Button has theme-aware styling
- [x] Clicking opens Settings Dialog to General tab
- [x] Toggle enables/disables rotation
- [x] Interval dropdown shows all options
- [x] Settings persist in Redux
- [x] Timer checks every minute
- [x] Theme changes apply correctly
- [x] Notification appears on change
- [x] Analytics events tracked

### Edge Cases Handled
- ✅ Hook doesn't run when disabled
- ✅ Timer cleanup on unmount
- ✅ No errors if uid is undefined
- ✅ Handles all 7 interval types
- ✅ Accurate time calculations
- ✅ Keyboard disabled when dialog open

## Code Quality

### Refactoring Benefits
1. **Modularity** - Logic extracted to custom hook
2. **Readability** - App.tsx 62 lines shorter
3. **Testability** - Hook can be unit tested
4. **Reusability** - Hook can be used elsewhere
5. **Maintainability** - Single source of truth

### Performance
- Check interval: 60 seconds (efficient)
- Only runs when enabled
- Minimal Redux updates
- No memory leaks (proper cleanup)

## Future Enhancements

### Possible Additions
- [ ] "Change Now" button for manual trigger
- [ ] Countdown display until next change
- [ ] Filter by theme categories
- [ ] Preview next theme
- [ ] Theme change history
- [ ] Favorite categories selection
- [ ] Smooth transition animations
- [ ] Theme scheduling (time-based)

## Commit History

```bash
1. feat(settings): add auto theme rotation and settings button
   - Create auto-theme Redux slice
   - Implement General Settings tab
   - Add settings button to Style Popup
   - Wire up callback in App.tsx

2. refactor(hooks): extract auto theme rotation into custom hook
   - Create useAutoThemeRotation hook
   - Remove inline logic from App.tsx
   - Improve code organization
```

## Impact Assessment

**Lines Changed:** +280 / -62  
**Files Added:** 3  
**Files Modified:** 5  
**Breaking Changes:** None  
**Performance Impact:** Negligible (60s interval)  
**User Impact:** High (new feature)

## Related Documentation

- [Settings Component README](../components/settings/README.md)
- [Integration Notes](../../INTEGRATION_NOTES.md)
- [Theme Presets](../components/piano/theme-presets.ts)
- [Redux Store Structure](../store/reducers/README.md)
