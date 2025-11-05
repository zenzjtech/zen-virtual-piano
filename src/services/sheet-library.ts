/**
 * Built-in Sheet Music Library
 * 
 * Contains popular songs in Virtual Piano notation format
 */

import type { MusicSheet, SheetPage } from '@/components/piano/music-sheet/types';
import { parseVPNotation, createPages, estimateDuration } from './sheet-parser';
import appConfig from '@/app.config';
import SHEET_DATA from '@/assets/sheet-data.json';

/**
 * Raw sheet data imported from JSON file
 */

/**
 * Parse all sheets and create full MusicSheet objects
 */
/**
 * A subset of MusicSheet properties, without the heavy notation and pages.
 */
export type MusicSheetMetadata = Omit<MusicSheet, 'pages' | 'notation' | 'durationSeconds'> & {
  durationSeconds?: number;
};

/**
 * Get metadata for all built-in sheets, without parsing notation.
 */
export function getBuiltInSheetMetadata(): MusicSheetMetadata[] {
  return SHEET_DATA.map((data: any) => {
    // Omit notation and pages for metadata
    const { notation, ...metadata } = data;
    return {
      ...metadata,
      difficulty: data.difficulty as 'easy' | 'medium' | 'hard',
    } as MusicSheetMetadata;
  });
}

/**
 * Parse all sheets and create full MusicSheet objects
 */
export function getBuiltInSheets(): MusicSheet[] {
  const metadata = getBuiltInSheetMetadata();
  return metadata.map(data => {
    const sheetData = SHEET_DATA.find(sheet => sheet.id === data.id);
    if (!sheetData) {
      throw new Error(`Sheet data not found for id: ${data.id}`);
    }

    const parsed = parseVPNotation(sheetData.notation, data.tempo);
    const pages: SheetPage[] = [{
      measures: parsed.measures,
      pageNumber: 1,
    }];
    const durationSeconds = estimateDuration(parsed.measures, data.tempo);

    return {
      ...data,
      notation: sheetData.notation,
      pages,
      durationSeconds,
    } as MusicSheet;
  });
}

/**
 * Get a single sheet by ID, with notation and pages.
 */
export function getSheetWithNotation(id: string): MusicSheet | undefined {
  const data = SHEET_DATA.find(sheet => sheet.id === id);
  if (!data) {
    return undefined;
  }

  const parsed = parseVPNotation(data.notation, data.tempo);
  const pages: SheetPage[] = [{
    measures: parsed.measures,
    pageNumber: 1,
  }];
  const durationSeconds = estimateDuration(parsed.measures, data.tempo);

  return {
    ...(data as any),
    pages,
    durationSeconds,
  } as MusicSheet;
}

/**
 * Get a single sheet by ID
 */
export function getSheetById(id: string): MusicSheetMetadata | undefined {
  const sheets = getBuiltInSheetMetadata();
  return sheets.find(sheet => sheet.id === id);
}

/**
 * Search sheets by query
 */
export function searchSheets(query: string): MusicSheetMetadata[] {
  const sheets = getBuiltInSheetMetadata();
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
export function getSheetsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): MusicSheetMetadata[] {
  const sheets = getBuiltInSheetMetadata();
  return sheets.filter(sheet => sheet.difficulty === difficulty);
}

/**
 * Get sheets by tag
 */
export function getSheetsByTag(tag: string): MusicSheetMetadata[] {
  const sheets = getBuiltInSheetMetadata();
  return sheets.filter(sheet => sheet.tags.includes(tag));
}
