# 2025-11-21 Refactor Sheet Data Loading

## Summary
Refactored the sheet music library to load `sheet-data.json` asynchronously from the `public` directory instead of bundling it into the JavaScript bundle. This reduces the initial bundle size and allows for better caching strategies.

## Changes
- Moved `src/assets/sheet-data.json` to `public/data/sheet-data.json`.
- Updated `src/services/sheet-library.ts` to fetch the data using `chrome.runtime.getURL`.
- Added `initSheetLibrary` function to `src/services/sheet-library.ts`.
- Updated `src/entrypoints/piano/App.tsx` to initialize the library before dispatching actions.

## Impact
- **Performance**: Reduced main bundle size by ~132KB.
- **Architecture**: Sheet data is now loaded at runtime, enabling future remote fetching or updates.

## Author
Cascade
