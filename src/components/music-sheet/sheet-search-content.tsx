import React from 'react';
import { Box } from '@mui/material';
import { MusicSheetMetadata } from '@/services/sheet-library';
import { PianoTheme } from '../piano/themes';
import { SheetSection } from './sheet-section';
import { SheetEmptyState } from './sheet-empty-state';

interface SheetSearchContentProps {
  searchQuery: string;
  allSheets: MusicSheetMetadata[];
  filteredSheets: MusicSheetMetadata[];
  displayedRecentSheets: MusicSheetMetadata[];
  displayedAllSheets: MusicSheetMetadata[];
  hasActiveFilters: boolean;
  favorites: string[];
  pianoTheme: PianoTheme;
  onSelectSheet: (sheetId: string) => void;
}

/**
 * Content area for sheet search dialog showing different sections
 */
export const SheetSearchContent: React.FC<SheetSearchContentProps> = ({
  searchQuery,
  allSheets,
  filteredSheets,
  displayedRecentSheets,
  displayedAllSheets,
  hasActiveFilters,
  favorites,
  pianoTheme,
  onSelectSheet,
}) => {
  return (
    <Box sx={{ 
      flex: 1, 
      overflowY: 'auto',
      px: 1,
    }}>
      {/* Empty State */}
      {allSheets.length === 0 && <SheetEmptyState pianoTheme={pianoTheme} />}
      
      {/* Search Results */}
      {searchQuery.trim() && allSheets.length > 0 && (
        <SheetSection
          title={`Search Results (${filteredSheets.length})`}
          sheets={filteredSheets}
          pianoTheme={pianoTheme}
          favorites={favorites}
          onSelectSheet={onSelectSheet}
          emptyMessage={`No sheets found matching "${searchQuery}"`}
        />
      )}
      
      {/* Recently Played */}
      {!searchQuery.trim() && displayedRecentSheets.length > 0 && (
        <SheetSection
          title="⏱ Recently Played"
          sheets={displayedRecentSheets}
          pianoTheme={pianoTheme}
          favorites={favorites}
          onSelectSheet={onSelectSheet}
          showDivider
        />
      )}
      
      {/* All Sheets (when no search) */}
      {!searchQuery.trim() && allSheets.length > 0 && (
        <SheetSection
          title={hasActiveFilters ? `📚 Filtered Sheets (${displayedAllSheets.length})` : `📚 All Sheets (${displayedAllSheets.length})`}
          sheets={displayedAllSheets}
          pianoTheme={pianoTheme}
          favorites={favorites}
          onSelectSheet={onSelectSheet}
          emptyMessage={hasActiveFilters ? "No sheets match the selected filters" : undefined}
        />
      )}
    </Box>
  );
};
