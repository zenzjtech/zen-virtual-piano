# i18n Translation Updates and RTL Support

**Date:** 2025-11-25
**Author:** Cascade

## Summary
Comprehensive update of internationalization (i18n) content for both the Chrome Web Store listings (`public/_locales`) and the application UI (`src/lib/i18n`). Fixed issues where non-English locales contained English placeholder text. Implemented Right-to-Left (RTL) support for Arabic and Urdu.

## Changes

### Store Listing (`public/_locales`)
- **Spanish (`es`)**: Added "Teclado online" keyword.
- **Portuguese (`pt_BR`)**: Added "Teclado Virtual" and "Piano Online" keywords.
- **Japanese (`ja`)**: Added "ピアノゲーム" (Piano Game) keyword.
- **Arabic (`ar`)**: Translated description to Modern Standard Arabic.

### App UI (`src/lib/i18n`)
- **Translation Updates**: Replaced English placeholder text in `common.json` with native translations for:
  - **Chinese**: `zh_CN` (Simplified), `zh_HK` (Traditional).
  - **European**: `fr`, `es`, `de`, `pt_BR`, `ru`, `tr`.
  - **Asian**: `ja` (Polite forms), `id`.
  - **Indian**: `hi`, `te`, `ta`, `bn`, `mr` (Native scripts).
  - **Middle Eastern**: `ar`, `ur`.
- **RTL Support**: 
  - Updated `src/lib/i18n/index.ts` to register `ar` and `ur` locales (previously missing).
  - Added logic to dynamically set `document.dir = 'rtl'` when Arabic or Urdu is selected.

## Impact
- **SEO**: Improved keyword targeting for global markets (China, Brazil, Japan, etc.).
- **UX**: Native UI text for users in 15+ languages.
- **Accessibility**: Proper text direction for RTL languages.
