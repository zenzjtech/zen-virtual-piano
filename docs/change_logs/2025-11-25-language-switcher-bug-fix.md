# 2025-11-25 - Language Switcher Bug Fix

## Summary
Fixed a bug in the LanguageSwitcher component where clicking language options resulted in incorrect locale switching and UI language changes.

## Root Cause
The original implementation used `Object.keys(LOCALE_LABELS)` to iterate over locales, which could potentially return keys in unexpected order depending on JavaScript engine behavior, leading to mismatched locale-to-label mappings.

## Changes Made

### Modified Files
- **`src/components/header/language-switcher.tsx`**: 
  - Replaced `Object.keys()` iteration with an explicit `LOCALE_OPTIONS` array
  - Ensured guaranteed order: English ('en'), Japanese ('ja'), Vietnamese ('vi')
  - This guarantees that clicking "English" sets locale to 'en', clicking "日本語" sets 'ja', etc.

## Impact
- **Small impact**: Fixes incorrect language switching behavior
- **Low risk**: Pure refactoring of iteration logic
- **Immediate UI update**: Language changes take effect instantly via existing Redux + i18n integration

## Testing Notes
- Verify clicking "English" switches UI to English
- Verify clicking "日本語" switches UI to Japanese  
- Verify clicking "Tiếng Việt" switches UI to Vietnamese
- Confirm menu closes after selection if desired

## Commit Convention
Following conventional commit format: `fix(i18n): correct language switcher locale mapping order`
