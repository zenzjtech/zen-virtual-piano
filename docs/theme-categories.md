# Theme Categories & Grouping System

## Overview
Organizes themes into logical categories with visual headers for better navigation and user experience.

## Background Theme Categories

### 1. **Basics** (5 themes)
Simple solid colors for clean, distraction-free backgrounds
- Cool Blue
- Pure White  
- Light Gray
- Warm Beige
- Dark Gray

### 2. **Cultural & Spiritual** (9 themes)
Traditional and spiritual themes from various cultures
- **Chinese**: Ink & Jade (墨玉), Vermillion & Gold (朱金)
- **Japanese**: Sakura Dawn (桜の夜明け), Bamboo & Stone (竹石)
- **Hindu**: Saffron & Marigold (केसर), Peacock Divine (मयूर), Isha Earth Mystic (ईशा)
- **Christian**: Sacred Light & Glory
- **Islamic**: Emerald & Gold (الزمرد)

### 3. **Gradients** (3 themes)
Beautiful gradient backgrounds for visual interest
- Sunset Gradient
- Ocean Gradient
- Forest Gradient

## Piano Theme Categories

### 1. **Classic** (1 theme)
Traditional piano aesthetics
- Wooden Classic

### 2. **Modern** (3 themes)
Contemporary piano designs
- Midnight Black
- Metallic Silver
- Pure White

**Note**: Piano themes currently don't display categories since there are only 4 total themes.

## Technical Implementation

### Data Structure

```typescript
interface BackgroundTheme {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient?: string;
  category: string;  // Category identifier
}

interface PianoTheme {
  id: string;
  name: string;
  description: string;
  category?: string;  // Optional for backward compatibility
  // ... other fields
}
```

### Grouping Hook

**`useThemeGroups<T>`** - Generic hook for grouping themes by category
- Accepts themes array and optional category order
- Returns array of `ThemeGroup<T>` objects
- Memoized for performance

```typescript
const themeGroups = useThemeGroups(themes, ['basics', 'cultural', 'gradients']);
```

### Category Header Component

**`CategoryHeader`** - Displays category name and description
- Animated fade-in with slide-down effect
- Staggered delays based on category index
- Styled with accent colors
- Shows category name and optional description

### Theme Section Configuration

**Grouping Control**:
- `enableGrouping={true}` - Enable category grouping (default)
- `enableGrouping={false}` - Disable grouping, show flat list
- `categoryOrder={['cat1', 'cat2']}` - Specify category display order

## Category Metadata

```typescript
export const BACKGROUND_THEME_CATEGORIES = {
  basics: {
    name: 'Basics',
    description: 'Simple solid colors',
  },
  cultural: {
    name: 'Cultural & Spiritual',
    description: 'Traditional and spiritual themes',
  },
  gradients: {
    name: 'Gradients',
    description: 'Beautiful gradient backgrounds',
  },
};
```

## User Experience

### Visual Organization
- Category headers with uppercase labels
- Descriptions in smaller italicized text
- Themes grouped under their categories
- Staggered entry animations per category

### Search Behavior
- Search works across all categories
- Empty categories are automatically hidden
- Category headers only show if they have themes

### Animation Sequence
1. Category header fades in with slide-down (0.4s)
2. Theme items fade in with slide-up (0.4s)
3. Each category has 0.1s delay offset
4. Theme items within category have 0.05s stagger

## Benefits

1. **Improved Navigation**: Users can quickly find themes by type
2. **Better Organization**: Logical grouping reduces cognitive load
3. **Cultural Awareness**: Highlights the diversity of theme options
4. **Scalability**: Easy to add new categories and themes
5. **Flexibility**: Grouping can be enabled/disabled per section

## Future Enhancements

- Add piano theme categories when collection grows
- Implement category filtering/tabs
- Add favorite/recent categories
- Support user-defined categories
- Category-specific icons
