import { useMemo } from 'react';

interface Filterable {
  name: string;
  description: string;
}

/**
 * Custom hook for filtering themes based on a search query
 * @param themes - Array of themes to filter
 * @param searchQuery - Search string to filter by
 * @returns Filtered array of themes
 */
export function useThemeFilter<T extends Filterable>(
  themes: T[],
  searchQuery: string
): T[] {
  return useMemo(() => {
    const trimmedQuery = searchQuery.trim();
    
    if (!trimmedQuery) {
      return themes;
    }
    
    const query = trimmedQuery.toLowerCase();
    
    return themes.filter(theme => 
      theme.name.toLowerCase().includes(query) ||
      theme.description.toLowerCase().includes(query)
    );
  }, [themes, searchQuery]);
}
