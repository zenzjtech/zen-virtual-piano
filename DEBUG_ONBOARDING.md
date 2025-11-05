# Onboarding Debugging Guide

## Current Issue
The instrument button is not being highlighted during Step 1 of the onboarding, and it's not clickable.

## Testing Mode Active
The onboarding now starts automatically 1 second after the app loads (regardless of sheet mode state) to make testing easier.

## Debug Logs to Check

Open the browser console (F12) and look for these logs:

### 1. **Onboarding Start**
```
🎓 Starting onboarding (TESTING MODE)
```
- If you DON'T see this: The onboarding isn't starting at all
- Check: `hasSeenSheetOnboarding` in Redux DevTools

### 2. **Onboarding State**
```
🎓 Onboarding State: {
  open: true,
  currentStep: 1,  // Should be 1 for instrument selection
  stepActionCompleted: false,
  isInstrumentPopupOpen: false,
  isCurrentStepInteractive: true,
  targetRefs: {
    instrument: 'exists' or 'null',  // SHOULD BE 'exists'
    instrumentPopup: 'null'
  }
}
```

### 3. **Step 1 Target Selection**
```
📍 Step 1 target: {
  step: 1,
  isPopupOpen: false,
  hasPopupRef: false,
  hasButtonRef: true,  // SHOULD BE true
  selectedRef: 'found' or 'null',  // SHOULD BE 'found'
  refElement: <button>...</button>  // Should show the actual button element
}
```

### 4. **Spotlight Application**
```
🎯 Spotlight targeting: <button>...</button>
✅ Spotlight applied: {
  position: 'relative',
  zIndex: '1400',
  rect: { left: 123, top: 456, width: 100, height: 40 }
}
```

## Expected Flow

1. ✅ App loads
2. ✅ After 1 second → `🎓 Starting onboarding (TESTING MODE)`
3. ✅ `🎓 Onboarding State` shows `currentStep: 1`
4. ✅ `📍 Step 1 target` shows `hasButtonRef: true, selectedRef: 'found'`
5. ✅ `🎯 Spotlight targeting` shows the button element
6. ✅ `✅ Spotlight applied` confirms z-index and position
7. ✅ **Button should now be visible with blue pulsing border**
8. ✅ **Button should be clickable**

## Common Issues & Fixes

### Issue 1: `instrument: 'null'` in targetRefs
**Problem:** The ref isn't being attached to the button
**Fix:** Check that `instrumentButtonRef` is passed to `SettingsBar` component

### Issue 2: `selectedRef: 'null'` but `hasButtonRef: true`
**Problem:** The ref exists but `.current` is null
**Fix:** The ref timing might be off - try increasing the timeout from 1000ms to 2000ms

### Issue 3: No spotlight logs at all
**Problem:** The spotlight component isn't rendering
**Fix:** Check the `getTargetRef(currentStep)` return value

### Issue 4: Spotlight logs appear but button still not highlighted
**Problem:** Z-index or CSS issue
**Fix:** Inspect the button in DevTools and check:
- Does it have `data-onboarding-highlight="true"` attribute?
- Does it have `z-index: 1400` in inline styles?
- Is there a parent element with higher z-index blocking it?

## Manual Reset

To reset the onboarding and test again:

1. Open Redux DevTools
2. Find `state.onboarding`
3. Manually set:
   ```json
   {
     "hasSeenSheetOnboarding": false,
     "onboardingStep": 0,
     "stepActionCompleted": false,
     "isInstrumentPopupOpen": false
   }
   ```
4. Or clear Chrome storage: `chrome.storage.local.clear()`

## Browser Console Commands

```javascript
// Check if button ref exists
console.log('Button ref:', document.querySelector('[data-onboarding-highlight="true"]'));

// Check z-index layers
document.querySelectorAll('[style*="z-index"]').forEach(el => {
  console.log(el, window.getComputedStyle(el).zIndex);
});

// Force highlight a button (find it first in Elements tab)
const btn = document.querySelector('button'); // Adjust selector
btn.style.zIndex = '1400';
btn.style.position = 'relative';
btn.setAttribute('data-onboarding-highlight', 'true');
```

## Next Steps Based on Console Output

**Report back with:**
1. All console logs (copy-paste)
2. Screenshot of Redux DevTools showing `state.onboarding`
3. Screenshot of the button's computed styles in DevTools
4. Whether clicking the backdrop works (should skip onboarding)

This will help identify exactly where the issue is!
