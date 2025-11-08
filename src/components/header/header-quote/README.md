# Header Quote Component

Modular quote display system with favorites, settings, and interval-based rotation.

## Structure

```
header-quote/
├── index.ts                    # Public exports
├── header-quote.tsx            # Main component (presentation)
├── use-quote-selector.ts       # Quote selection logic hook
├── quote-action-buttons.tsx    # Favorite & settings buttons
├── types.ts                    # Shared TypeScript types
└── README.md                   # This file
```

## Components

### `HeaderQuote`
Main component that displays inspirational quotes in the header.

**Features:**
- Theme-aware styling
- Responsive design
- Smooth animations
- Integration with Redux state

**Props:**
- `isDarkBackground: boolean` - Theme context
- `headerStyle?: HeaderTypographyStyle` - Typography style
- `category?: string` - Theme category
- `quoteStyle?: QuoteStyle` - Custom quote styling
- `onOpenSettings?: (tab?: string) => void` - Settings callback

### `QuoteActionButtons`
Action buttons for quote interaction.

**Features:**
- Favorite/unfavorite quotes
- Open settings dialog
- Theme-aware styling
- Hover effects

### `useQuoteSelector`
Custom hook managing quote selection and rotation logic.

**Returns:**
- `currentQuote: Quote | null` - Currently displayed quote
- `showQuote: boolean` - Quote visibility setting
- `favoriteQuoteIds: string[]` - Array of favorite IDs

**Handles:**
- Daily/interval-based quote rotation
- Favorite filtering
- Quote state persistence

## Usage

```tsx
import { HeaderQuote } from '@/components/header-quote';

<HeaderQuote
  isDarkBackground={isDarkBackground}
  headerStyle={preset?.headerStyle}
  category={preset?.category}
  quoteStyle={preset?.quoteStyle}
  onOpenSettings={(tab) => handleOpenSettings(tab)}
/>
```

## State Management

Connects to Redux store via:
- `quoteSettings` - Quote preferences and favorites
- Actions: `toggleFavoriteQuote`, `setLastQuoteChangeDate`, `setCurrentQuoteId`

## Rotation Intervals

- **Daily**: Changes once per day (default)
- **Hourly**: Changes every hour
- **30min**: Changes every 30 minutes
- **10min**: Changes every 10 minutes
- **5min**: Changes every 5 minutes

## Dependencies

- `@mui/material` - UI components
- `@mui/icons-material` - Icons
- `@/lib/quote` - Quote data source
- `@/store` - Redux state management
- `../header/*` - Typography and styling utilities
