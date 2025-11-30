# Electron Port Setup Guide

This document outlines the setup for porting the Zen Virtual Piano extension to an Electron desktop application.

## Monorepo Structure

The project uses Yarn workspaces with the following structure:
- `extension/` (root workspace): Core extension code
- `extension/electron-app/`: Electron application

## Shared Code Access

The `electron-app/src/shared` is a symlink pointing to `../src`, allowing the Electron renderer to import shared components, hooks, and services.

## Adapters for Chrome-Specific Features

### State Persistence
- **Extension**: Uses `reduxed-chrome-storage` for Chrome storage API
- **Electron**: Uses `redux-persist` with localStorage
- Adapter: `src/store/storage-adapter.ts` dynamically selects the appropriate storage engine

### Manifest Access
- **Extension**: `chrome.runtime.getManifest()`
- **Electron**: Mock using `process.env.npm_package_version`
- Adapter: `src/utils/manifest-adapter.ts`

### Analytics
- Mixpanel tracks extension version via `getManifest().version`
- Works in both environments with the adapter

## Build and Run

### Extension
```bash
yarn dev  # Chrome dev with HMR
```

### Electron App
```bash
cd electron-app
yarn dev  # Electron dev with hot reload
```

## Key Changes Made

1. **Dependencies**: Added `redux-persist`, `electron-store`, shared React/Redux deps to `electron-app/package.json`
2. **Symlink**: Created `electron-app/src/shared` → `../src`
3. **Vite Alias**: Added `@shared` alias in `electron.vite.config.ts`
4. **Store Adapter**: Conditional store instantiation for extension vs Electron
5. **Renderer Setup**: Updated `electron-app/src/renderer/src/main.tsx` to initialize store with PersistGate for Electron
6. **Analytics Adapter**: Replaced direct Chrome API calls with abstracted functions

## Testing

- Run the Electron app and verify Redux state persists across restarts
- Check analytics events include correct version info
- Ensure piano audio and UI interactions work as in the extension

## Future Enhancements

- Integrate `electron-store` for main process persistence if needed
- Add native MIDI keyboard support via Node.js `midi` package
- Implement auto-updater using `electron-updater`
