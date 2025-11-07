# Header Component

Refactored header component with modular architecture and theme-aware typography for better maintainability and visual harmony.

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
├── header-typography.ts        # Typography styles for different theme categories
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

### **header-typography.ts**
Typography style system:
- `getHeaderTypographyStyle()` - Returns typography styles based on variant
- `getCategoryDefaultStyle()` - Maps theme category to typography style
- 7 typography variants: `classic-serif`, `modern-sans`, `cultural-serif`, `nature-serif`, `artistic-italic`, `energetic-bold`, `luxurious-light`

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

## Theme-Aware Typography

The header title adapts its typography based on the current theme preset:

### **Typography Variants**

| Variant | Font Family | Weight | Use Case |
|---------|-------------|--------|----------|
| `classic-serif` | Playfair Display | 600 | Classic & Vintage themes |
| `modern-sans` | Inter | 500 | Modern, Minimalist, Professional |
| `cultural-serif` | Noto Serif | 500 | Cultural & Traditional themes |
| `nature-serif` | Lora | 500 | Nature-inspired themes |
| `artistic-italic` | Merriweather | 400, Italic | Artistic & Romantic themes |
| `energetic-bold` | Montserrat | 700, Uppercase | Energetic themes |
| `luxurious-light` | Cormorant Garamond | 300 | Luxurious themes |

The header automatically detects the current preset (by matching piano, background, and music sheet themes) and applies the appropriate typography style with smooth transitions.

## Benefits of This Structure

1. **Separation of Concerns**: Each file has a single responsibility
2. **Reusability**: Components and utilities can be reused independently
3. **Testability**: Isolated functions and components are easier to test
4. **Maintainability**: Changes are localized to specific files
5. **Readability**: Smaller files are easier to understand
6. **Type Safety**: Centralized type definitions
7. **Theme Integration**: Seamless integration with theme preset system

## Future Enhancements

- Add Settings button functionality
- Add Fullscreen button functionality
- Add theme switcher quick access
- Add tooltips for better UX
- Add keyboard shortcuts for header actions
