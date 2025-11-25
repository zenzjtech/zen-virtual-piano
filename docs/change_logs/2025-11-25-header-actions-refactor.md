# 2025-11-25 - Header Actions Code Split Refactor

## Summary
Refactored `header-actions.tsx` by extracting the language switcher functionality into a separate `LanguageSwitcher` component for better modularity and maintainability.

## Changes Made

### New Files
- **`src/components/header/language-switcher.tsx`**: New dedicated component for language selection with dropdown menu.

### Modified Files
- **`src/components/header/header-actions.tsx`**: 
  - Removed language switcher logic and imports.
  - Added import and usage of `LanguageSwitcher` component.
  - Reduced component size and improved separation of concerns.

## Impact
- **Small impact**: UI functionality remains identical, only internal code structure changed.
- **Low risk**: Pure refactoring with no functional changes.
- **Benefits**: Improved code maintainability, easier testing, and better reusability.

## Testing Notes
- Verify language switcher still works in header.
- Check that menu styling adapts to light/dark themes.
- Confirm immediate UI updates when language is changed.

## Commit Convention
Following conventional commit format: `refactor(header): extract language switcher into separate component`
