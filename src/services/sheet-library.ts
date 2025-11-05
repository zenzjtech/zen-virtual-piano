/**
 * Built-in Sheet Music Library
 * 
 * Contains popular songs in Virtual Piano notation format
 */

import type { MusicSheet } from '@/components/piano/music-sheet/types';
import { parseVPNotation, createPages, estimateDuration } from './sheet-parser';
import appConfig from '@/app.config';
import SHEET_DATA from '@/assets/sheet-data.json';

/**
 * Raw sheet data imported from JSON file
 */

/**
 * Parse all sheets and create full MusicSheet objects
 */
export function getBuiltInSheets(): MusicSheet[] {
  return SHEET_DATA.map((data: any) => {
    const parsed = parseVPNotation(data.notation, data.tempo);
    // Create a single page with all measures - pagination will be calculated dynamically
    const pages = [{
      measures: parsed.measures,
      pageNumber: 1,
    }];
    const durationSeconds = estimateDuration(parsed.measures, data.tempo);
    
    return {
      ...data,
      difficulty: data.difficulty as 'easy' | 'medium' | 'hard',
      pages,
      durationSeconds,
    } as MusicSheet;
  });
}

/**
 * Get a single sheet by ID
 */
export function getSheetById(id: string): MusicSheet | undefined {
  const sheets = getBuiltInSheets();
  return sheets.find(sheet => sheet.id === id);
}

/**
 * Search sheets by query
 */
export function searchSheets(query: string): MusicSheet[] {
  const sheets = getBuiltInSheets();
  const lowerQuery = query.toLowerCase();
  
  return sheets.filter(sheet =>
    sheet.title.toLowerCase().includes(lowerQuery) ||
    sheet.artist.toLowerCase().includes(lowerQuery) ||
    sheet.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get sheets by difficulty
 */
export function getSheetsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): MusicSheet[] {
  const sheets = getBuiltInSheets();
  return sheets.filter(sheet => sheet.difficulty === difficulty);
}

/**
 * Get sheets by tag
 */
export function getSheetsByTag(tag: string): MusicSheet[] {
  const sheets = getBuiltInSheets();
  return sheets.filter(sheet => sheet.tags.includes(tag));
}
