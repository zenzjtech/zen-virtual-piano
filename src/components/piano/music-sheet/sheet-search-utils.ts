/**
 * Utility functions for sheet search functionality
 */

/**
 * Get the appropriate color for a difficulty level
 */
export const getDifficultyColor = (difficulty: string): 'success' | 'warning' | 'error' => {
  switch (difficulty) {
    case 'easy': return 'success';
    case 'medium': return 'warning';
    case 'hard': return 'error';
    default: return 'warning';
  }
};

/**
 * Check if a sheet is in the favorites list
 */
export const isFavorite = (sheetId: string, favorites: string[]): boolean => {
  return favorites.includes(sheetId);
};
