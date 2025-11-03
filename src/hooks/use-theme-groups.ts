import { useMemo } from 'react';

interface Categorizable {
  id: string;
  category: string;
  name: string;
  description: string;
}

export interface ThemeGroup<T> {
  category: string;
  themes: T[];
}

/**
 * Custom hook to group themes by category
 * @param themes - Array of themes with category field
 * @param categoryOrder - Optional array specifying the order of categories
 * @returns Array of theme groups
 */
export function useThemeGroups<T extends Categorizable>(
  themes: T[],
  categoryOrder?: string[]
): ThemeGroup<T>[] {
  return useMemo(() => {
    // Group themes by category
    const grouped = themes.reduce((acc, theme) => {
      if (!acc[theme.category]) {
        acc[theme.category] = [];
      }
      acc[theme.category].push(theme);
      return acc;
    }, {} as Record<string, T[]>);

    // Convert to array format
    let groups = Object.entries(grouped).map(([category, themes]) => ({
      category,
      themes,
    }));

    // Sort by specified order if provided
    if (categoryOrder) {
      groups.sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        
        // If both are in the order array, sort by their position
        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }
        
        // If only one is in the order array, prioritize it
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        
        // If neither is in the order array, maintain original order
        return 0;
      });
    }

    return groups;
  }, [themes, categoryOrder]);
}
