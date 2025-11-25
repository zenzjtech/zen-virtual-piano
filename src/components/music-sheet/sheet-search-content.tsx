import React from 'react';
import { Box } from '@mui/material';
import { MusicSheetMetadata } from '@/services/sheet-library';
import { PianoTheme } from '../piano/themes';
import { SheetSection } from './sheet-section';
import { SheetEmptyState } from './sheet-empty-state';
import { useTranslation } from '@/hooks/use-translation';

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
  const { t: tCommon } = useTranslation('common');
  const { t: tSheet } = useTranslation('sheet');

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
          title={`${tSheet('searchResults')} (${filteredSheets.length})`}
          sheets={filteredSheets}
          pianoTheme={pianoTheme}
          favorites={favorites}
          onSelectSheet={onSelectSheet}
          emptyMessage={tSheet('noSheetsFoundMatching', { query: searchQuery })}
        />
      )}
      
      {/* Recently Played */}
      {!searchQuery.trim() && displayedRecentSheets.length > 0 && (
        <SheetSection
          title={`⏱ ${tCommon('recentlyPlayed')}`}
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
          title={hasActiveFilters ? `📚 ${tSheet('filteredSheets')} (${displayedAllSheets.length})` : `📚 ${tCommon('allSheets')} (${displayedAllSheets.length})`}
          sheets={displayedAllSheets}
          pianoTheme={pianoTheme}
          favorites={favorites}
          onSelectSheet={onSelectSheet}
          emptyMessage={hasActiveFilters ? tSheet('noSheetsMatchFilters') : undefined}
        />
      )}
    </Box>
  );
};
