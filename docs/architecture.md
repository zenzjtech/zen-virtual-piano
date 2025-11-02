# Architecture Guide

## Overview

This is a modern browser extension built using the WXT framework, React, Redux, and Material UI. The extension follows a modular architecture with clear separation between UI components, state management, and browser extension APIs.

## Technology Stack

### Core Framework
- **WXT (v0.19)**: Modern browser extension framework that provides:
  - File-based entry points for extension components
  - Built-in TypeScript support
  - Hot Module Replacement (HMR) for development
  - Multi-browser support (Chrome, Firefox, etc.)
  - Auto-import capabilities

### UI Layer
- **React (v19)**: Component-based UI library
- **Material UI (v6.4)**: Comprehensive component library providing pre-built, accessible components
- **Emotion (v11)**: CSS-in-JS library used by MUI for styling
- **Tailwind CSS (v4.0)**: Utility-first CSS framework for custom styling

### State Management
- **Redux Toolkit (v2.5)**: Modern Redux with simplified API
  - Slice-based architecture
  - Built-in Immer for immutable updates
  - Redux DevTools integration
- **Redux Chrome Storage (v3.0)**: Persistent state management
  - Automatically syncs Redux state with Chrome storage API
  - Enables state persistence across browser sessions

### Development Tools
- **TypeScript (v5.6)**: Type safety and improved developer experience
- **ESLint**: Code linting and consistency
- **Vite**: Fast build tool (integrated via WXT)

## Project Structure

```
extension/
├── src/
│   ├── assets/              # Static assets (images, global CSS)
│   │   ├── react.svg
│   │   └── tailwind.css     # Global Tailwind styles
│   ├── components/          # Reusable React components
│   │   └── counter/         # Example: Feature-based component organization
│   │       ├── counter.tsx
│   │       └── counterSlice.ts
│   ├── entrypoints/         # WXT entry points (extension components)
│   │   ├── background/      # Background service worker
│   │   │   ├── index.ts
│   │   │   └── test.ts
│   │   ├── content.ts       # Content script
│   │   └── popup/           # Extension popup UI
│   │       ├── App.tsx
│   │       ├── main.tsx
│   │       ├── index.html
│   │       └── style.css
│   ├── public/              # Public assets (icons, manifest resources)
│   │   └── icon/
│   └── store/               # Redux store configuration
│       ├── index.ts         # Store setup
│       ├── hook.ts          # Typed Redux hooks
│       └── reducers/        # Combined reducers
├── docs/                    # Documentation
├── wxt.config.ts           # WXT configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.mjs      # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## Browser Extension Architecture

### Entry Points

WXT uses a file-based routing system for extension components:

1. **Background Script** (`src/entrypoints/background/`)
   - Service worker for Chrome Manifest V3
   - Handles long-running tasks and browser events
   - Manages extension lifecycle
   - No direct UI

2. **Content Script** (`src/entrypoints/content.ts`)
   - Injected into web pages
   - Can access and modify page DOM
   - Limited access to extension APIs
   - Isolated JavaScript context

3. **Popup** (`src/entrypoints/popup/`)
   - UI shown when clicking extension icon
   - Full React application with routing
   - Access to all extension APIs
   - Persistent state via Redux

### Component Communication

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   Popup     │◄───────►│  Background  │◄───────►│   Content    │
│   (React)   │         │  (Service    │         │   Script     │
│             │         │   Worker)    │         │              │
└─────────────┘         └──────────────┘         └──────────────┘
      │                        │
      │                        │
      ▼                        ▼
┌─────────────────────────────────┐
│     Chrome Storage API          │
│  (Persisted Redux State)        │
└─────────────────────────────────┘
```

## State Management Architecture

### Redux Store Structure

```typescript
Store
├── counter (example slice)
│   ├── value: number
│   └── status: string
└── [additional slices...]
```

### State Flow

1. **Component Dispatch**: React components dispatch actions using typed hooks
2. **Reducer Processing**: Redux Toolkit slices handle state updates
3. **Storage Sync**: Redux Chrome Storage middleware syncs to browser storage
4. **Component Re-render**: Connected components receive updated state

### Key Files

- **`src/store/index.ts`**: Store configuration with middleware setup
- **`src/store/hook.ts`**: Type-safe `useAppDispatch` and `useAppSelector` hooks
- **`src/store/reducers/index.ts`**: Combined reducers
- **`src/components/*/[feature]Slice.ts`**: Individual feature slices

## Styling Architecture

### Hybrid Approach

The project uses a hybrid styling approach:

1. **Material UI Theme System**
   - Consistent design tokens (colors, spacing, typography)
   - Component-level theming
   - Emotion for CSS-in-JS

2. **Tailwind CSS**
   - Utility-first classes for custom layouts
   - Rapid prototyping
   - PostCSS integration

3. **Component-Scoped CSS**
   - Module CSS for component-specific styles
   - Avoids global namespace pollution

### Configuration

- **Tailwind**: `tailwind.config.js` + `postcss.config.mjs`
- **MUI Theme**: Typically defined in popup entry point
- **Global Styles**: `src/assets/tailwind.css`

## Build System

### Development Workflow

```bash
# Chrome development with HMR
yarn dev

# Firefox development
yarn dev:firefox
```

WXT provides:
- Hot Module Replacement (HMR)
- Auto-reload on file changes
- TypeScript compilation
- Asset optimization

### Production Build

```bash
# Build for Chrome
yarn build

# Build for Firefox
yarn build:firefox

# Create distribution zip
yarn zip
```

Build output: `.output/` directory

### Configuration (`wxt.config.ts`)

```typescript
{
  extensionApi: 'chrome',      // Target API
  modules: ['@wxt-dev/module-react'],  // React integration
  manifest: {
    permissions: ['storage']   // Extension permissions
  },
  srcDir: 'src',
  imports: {
    dirs: ['components', 'composables']  // Auto-import directories
  }
}
```

## Key Architectural Patterns

### 1. Feature-Based Organization
Components are organized by feature (e.g., `counter/`), keeping related code together:
- Component UI (`counter.tsx`)
- State logic (`counterSlice.ts`)
- Types and utilities

### 2. Type Safety
- TypeScript throughout the codebase
- Typed Redux hooks prevent runtime errors
- Interface definitions for props and state

### 3. Single Responsibility
- Each component has a focused purpose
- Slices manage specific state domains
- Entry points handle distinct extension roles

### 4. Declarative UI
- React components describe UI state
- Redux manages application state
- Material UI provides consistent UX

### 5. Persistence Layer
- Redux Chrome Storage automatically syncs state
- No manual storage API calls needed
- State survives browser restarts

## Extension Manifest

WXT auto-generates the manifest based on:
- Entry points found in `src/entrypoints/`
- Configuration in `wxt.config.ts`
- Package metadata from `package.json`

Manifest version: **V3** (modern standard)

## Security Considerations

1. **Content Security Policy**: Defined by WXT/Chrome standards
2. **Permissions**: Minimal permissions requested (currently: `storage`)
3. **API Access**: Background script as security boundary
4. **State Isolation**: Content scripts run in isolated context

## Development Best Practices

### Adding New Features

1. Create component in `src/components/[feature]/`
2. Define Redux slice if state is needed
3. Add slice to combined reducers
4. Use typed hooks in components
5. Apply MUI or Tailwind for styling

### Adding New Entry Points

1. Create file/folder in `src/entrypoints/`
2. WXT automatically detects and configures
3. Follow naming conventions (background, content, popup, etc.)

### State Management

1. Use Redux Toolkit's `createSlice` for new state
2. Define typed actions and reducers
3. Export actions and selectors
4. Use `useAppSelector` and `useAppDispatch` in components

## Future Considerations

- **Options Page**: For user settings (add to `src/entrypoints/`)
- **Internationalization**: i18n support for multiple languages
- **Advanced Routing**: React Router for complex popup navigation
- **API Integration**: Services layer for external API calls
- **Testing**: Jest/Vitest + React Testing Library
- **CI/CD**: Automated builds and releases

## Resources

- [WXT Documentation](https://wxt.dev)
- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Material UI Documentation](https://mui.com)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions)
