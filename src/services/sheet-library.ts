/**
 * Built-in Sheet Music Library
 * 
 * Contains popular songs in Virtual Piano notation format
 */

import type { MusicSheet, SheetPage } from '@/components/music-sheet/types';
import { parseVPNotation, estimateDuration } from './sheet-parser';
import { isExtension } from '@/utils/env';

let SHEET_DATA: MusicSheet[] = [];

/**
 * Initialize the sheet library by fetching the JSON data
 */
export async function initSheetLibrary(): Promise<void> {
  if (SHEET_DATA.length > 0) return;

  try {
    // Check if running in Electron with IPC available
    if (!isExtension() && window.api?.loadSheetData) {
      // Use IPC to load sheet data in Electron
      SHEET_DATA = await window.api.loadSheetData();
    } else {
      // Use fetch for browser extension
      const url = isExtension() ? 
        chrome.runtime.getURL('/data/sheet-data.json') : 
        '/data/sheet-data.json';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load sheet data: ${response.statusText}`);
      }
      SHEET_DATA = await response.json();
    }
  } catch (error) {
    console.error('Error initializing sheet library:', error);
    throw error;
  }
}

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
    sheet.artist.name.toLowerCase().includes(lowerQuery) ||
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
