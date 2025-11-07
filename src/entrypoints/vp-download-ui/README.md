# VirtualPiano Download UI

A refined glassmorphic download interface for scraping and saving sheet music from VirtualPiano.net.

## 📁 Structure

```
vp-download-ui/
├── components/           # Reusable UI components
│   ├── download-button.tsx   # Main download button with ripple effect
│   ├── header.tsx            # Branded header with icon
│   ├── status-chip.tsx       # Status feedback chip
│   └── index.ts              # Component exports
├── hooks/               # Custom React hooks
│   ├── use-download-state.ts # Download state management
│   ├── use-ripple-effect.ts  # Ripple animation logic
│   └── index.ts              # Hook exports
├── download-ui.tsx      # Main component (86 lines)
├── main.tsx            # Entry point with theme provider
├── styled.tsx          # Styled components (GlassCard, RippleButton)
├── types.ts            # TypeScript interfaces and types
├── utils.ts            # Utility functions and constants
└── style.css           # Global CSS styles
```

## 🧩 Components

### `<DownloadButton />`
Main download button with state-based styling and ripple effect.

**Props:**
- `status: DownloadStatus` - Current download state
- `ripples: Ripple[]` - Active ripple effects
- `onClick: (e) => void` - Click handler
- `disabled?: boolean` - Disabled state

### `<Header />`
Branded header displaying app name with icon.

### `<StatusChip />`
Feedback chip showing success/error state.

**Props:**
- `status: DownloadStatus` - Current download state
- `show: boolean` - Visibility toggle

## 🪝 Hooks

### `useDownloadState()`
Manages download state and cross-frame communication.

**Returns:**
- `downloadState` - Current download state
- `showToast` - Toast visibility
- `setShowToast` - Toast visibility setter
- `initiateDownload` - Trigger download action

### `useRippleEffect()`
Handles ripple animation lifecycle.

**Returns:**
- `ripples` - Active ripple array
- `addRipple` - Add new ripple at position

## 🎨 Styled Components

### `GlassCard`
Glassmorphic container with backdrop blur effect.

### `RippleButton`
Gradient button with theme-aware colors and ripple support.

### `RippleEffect`
Animated ripple effect element.

## 📦 Types

- `DownloadStatus` - Download state enum
- `DownloadState` - Download state interface
- `SheetData` - Sheet metadata interface
- `DownloadMessage` - Message type union
- `Ripple` - Ripple position interface

## 🛠️ Utils

- `MESSAGE_TYPES` - Message type constants
- `TIMING` - Timing configuration
- `getStatusMessage()` - Get status text
- `createRippleId()` - Generate unique ripple ID
- `calculateRipplePosition()` - Calculate ripple coordinates

## 🎯 Benefits

✅ **Separation of Concerns** - Logic, UI, and styling are isolated  
✅ **Reusability** - Components and hooks can be reused  
✅ **Maintainability** - Smaller, focused files are easier to maintain  
✅ **Type Safety** - Centralized type definitions  
✅ **Testability** - Hooks and utilities can be tested independently  
✅ **Readability** - Main component reduced from 320 to 86 lines

## 🚀 Usage

```tsx
import DownloadUI from './download-ui';

// Rendered in iframe at virtualpiano.net
<DownloadUI />
```

## 🔗 Integration

This UI is injected as an iframe by the content script at:
`src/entrypoints/virtualpiano.content.ts`

Communication happens via `window.postMessage()` API.
