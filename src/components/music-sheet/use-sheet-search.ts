import { useMemo } from 'react';
import { useAppSelector } from '@/store/hook';
import type { MusicSheetMetadata } from '@/services/sheet-library';

interface UseSheetSearchResult {
  allSheets: MusicSheetMetadata[];
  filteredSheets: MusicSheetMetadata[];
  recentSheets: MusicSheetMetadata[];
  favoriteSheets: MusicSheetMetadata[];
  favorites: string[];
  allTags: string[];
  allArtists: string[];
}

export interface UseSheetSearchOptions {
  searchQuery: string;
  showFavoritesOnly?: boolean;
  selectedTags?: string[];
  selectedArtist?: string | null;
  selectedDifficulties?: ('easy' | 'medium' | 'hard')[];
}

/**
 * Custom hook for managing sheet search data and filtering
 */
export const useSheetSearch = ({
  searchQuery,
  showFavoritesOnly = false,
  selectedTags = [],
  selectedArtist = null,
  selectedDifficulties = [],
}: UseSheetSearchOptions): UseSheetSearchResult => {
  // Get sheets from Redux
  const sheets = useAppSelector((state) => state.musicSheet.sheets);
  const favorites = useAppSelector((state) => state.musicSheet.userData.favorites);
  const recentlyPlayed = useAppSelector((state) => state.musicSheet.userData.recentlyPlayed);
  
  // Convert sheets object to array
  const allSheets = useMemo(() => Object.values(sheets), [sheets]);
  
  // Get all unique tags across all sheets
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allSheets.forEach(sheet => {
      sheet.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allSheets]);
  
  // Get all unique artists
  const allArtists = useMemo(() => {
    const artistSet = new Set<string>();
    allSheets.forEach(sheet => {
      if (sheet.artist) artistSet.add(sheet.artist);
    });
    return Array.from(artistSet).sort();
  }, [allSheets]);
  
  // Filter sheets based on search query and filters
  const filteredSheets = useMemo(() => {
    let result = allSheets;
    
    // Filter by favorites
    if (showFavoritesOnly) {
      result = result.filter(sheet => favorites.includes(sheet.id));
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(sheet =>
        selectedTags.some(tag => sheet.tags.includes(tag))
      );
    }
    
    // Filter by artist
    if (selectedArtist) {
      result = result.filter(sheet => sheet.artist === selectedArtist);
    }
    
    // Filter by difficulties
    if (selectedDifficulties.length > 0) {
      result = result.filter(sheet => selectedDifficulties.includes(sheet.difficulty));
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(sheet => 
        sheet.title.toLowerCase().includes(query) ||
        sheet.artist.toLowerCase().includes(query) ||
        sheet.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [allSheets, searchQuery, showFavoritesOnly, selectedTags, selectedArtist, favorites]);
  
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
    allTags,
    allArtists,
  };
};
