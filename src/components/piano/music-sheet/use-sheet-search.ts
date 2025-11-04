import { useMemo } from 'react';
import { useAppSelector } from '@/store/hook';
import type { MusicSheet } from './types';

interface UseSheetSearchResult {
  allSheets: MusicSheet[];
  filteredSheets: MusicSheet[];
  recentSheets: MusicSheet[];
  favoriteSheets: MusicSheet[];
  favorites: string[];
}

/**
 * Custom hook for managing sheet search data and filtering
 */
export const useSheetSearch = (searchQuery: string): UseSheetSearchResult => {
  // Get sheets from Redux
  const sheets = useAppSelector((state) => state.musicSheet.sheets);
  const favorites = useAppSelector((state) => state.musicSheet.userData.favorites);
  const recentlyPlayed = useAppSelector((state) => state.musicSheet.userData.recentlyPlayed);
  
  // Convert sheets object to array
  const allSheets = useMemo(() => Object.values(sheets), [sheets]);
  
  // Filter sheets based on search query
  const filteredSheets = useMemo(() => {
    if (!searchQuery.trim()) {
      return allSheets;
    }
    
    const query = searchQuery.toLowerCase();
    return allSheets.filter(sheet => 
      sheet.title.toLowerCase().includes(query) ||
      sheet.artist.toLowerCase().includes(query) ||
      sheet.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [allSheets, searchQuery]);
  
  // Get recently played sheets (max 5)
  const recentSheets = useMemo(() => {
    return recentlyPlayed
      .slice(0, 5)
      .map(id => sheets[id])
      .filter(Boolean);
  }, [recentlyPlayed, sheets]);
  
  // Get favorite sheets
  const favoriteSheets = useMemo(() => {
    return favorites
      .map(id => sheets[id])
      .filter(Boolean);
  }, [favorites, sheets]);

  return {
    allSheets,
    filteredSheets,
    recentSheets,
    favoriteSheets,
    favorites,
  };
};
