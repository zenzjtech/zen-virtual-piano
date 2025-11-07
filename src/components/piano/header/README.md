# Header Component

Refactored header component with modular architecture for better maintainability and code organization.

## File Structure

```
header/
├── index.ts                    # Public exports
├── types.ts                    # TypeScript interfaces and types
├── header.tsx                  # Main Header component (orchestration)
├── header-logo.tsx             # Logo and title component
├── header-actions.tsx          # Action buttons (Help, Account)
├── user-menu.tsx               # User dropdown menu
├── header-utils.ts             # Utility functions (icon selection, colors)
├── header-styles.ts            # Style definitions and theme-aware styles
├── use-header-handlers.ts      # Custom hook for event handlers
└── README.md                   # This file
```

## Component Architecture

### **header.tsx**
Main component that orchestrates all sub-components. Handles:
- Layout structure (AppBar + Toolbar)
- Component composition
- Props distribution

### **header-logo.tsx**
Logo section with:
- Dynamic piano icon selection
- Title text
- Click interaction for refresh/home

### **header-actions.tsx**
Action buttons including:
- Help button (keyboard shortcuts)
- Account button (sign in/user avatar)
- Authentication state display

### **user-menu.tsx**
User dropdown menu with:
- User profile display
- Logout functionality
- Theme-aware styling

## Hooks

### **use-header-handlers.ts**
Custom hook that encapsulates:
- State management (auth, menu)
- Event handlers (account, logout, help, logo click)
- Redux integration
- Notification system

## Utilities

### **header-utils.ts**
Helper functions:
- `getPianoIcon()` - Selects appropriate icon based on theme
- `getTextColor()` - Returns text color based on background
- `getIconColor()` - Returns icon color based on background

### **header-styles.ts**
Style factory functions:
- AppBar glassmorphism styles
- Responsive toolbar styles
- Icon button styles
- Theme-aware styling

## Types

### **types.ts**
TypeScript definitions:
- `HeaderProps` - Main component props
- `HeaderStyleProps` - Style-related props
- `UseHeaderHandlersProps` - Hook props

## Usage

```tsx
import { Header } from '@/components/piano/header';

<Header
  backgroundThemeId="warm"
  isDarkBackground={false}
  onShowKeyboardShortcuts={() => setDialogOpen(true)}
/>
```

## Benefits of This Structure

1. **Separation of Concerns**: Each file has a single responsibility
2. **Reusability**: Components and utilities can be reused independently
3. **Testability**: Isolated functions and components are easier to test
4. **Maintainability**: Changes are localized to specific files
5. **Readability**: Smaller files are easier to understand
6. **Type Safety**: Centralized type definitions

## Future Enhancements

- Add Settings button functionality
- Add Fullscreen button functionality
- Add theme switcher quick access
- Add tooltips for better UX
- Add keyboard shortcuts for header actions
