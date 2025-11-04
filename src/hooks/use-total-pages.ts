import { useMemo } from 'react';
import { useAppConfig } from '#imports';
import type { MusicSheet } from '@/components/piano/music-sheet/types';

/**
 * Custom hook to calculate total pages for a music sheet
 * based on the configured max chars per line and lines per page
 */
export const useTotalPages = (currentSheet: MusicSheet | null): number => {
  const appConfig = useAppConfig();
  
  const totalPages = useMemo(() => {
    if (!currentSheet) return 1;
    
    const allMeasures = currentSheet.pages[0]?.measures || [];
    const { maxCharsPerLine, linesPerPage } = appConfig.musicStand.musicSheet;
    
    // Count total lines
    const tokens: string[] = [];
    allMeasures.forEach((measure) => {
      measure.notes.forEach((note) => {
        tokens.push((note.originalNotation || note.key) + ' ');
      });
    });
    
    let lineCount = 0;
    let currentLength = 0;
    tokens.forEach((token) => {
      if (currentLength + token.length > maxCharsPerLine && currentLength > 0) {
        lineCount++;
        currentLength = 0;
      }
      currentLength += token.length;
    });
    if (currentLength > 0) lineCount++;
    
    const calculatedPages = Math.ceil(lineCount / linesPerPage);
    
    return calculatedPages;
  }, [currentSheet, appConfig.musicStand.musicSheet]);
  
  return totalPages;
};
