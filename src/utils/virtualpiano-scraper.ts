/**
 * VirtualPiano.net Sheet Scraper
 * 
 * Extracts sheet music data from virtualpiano.net pages
 */

import type { MusicSheet } from '@/components/music-sheet/types';
import { parseVPNotation, estimateDuration } from '@/services/sheet-parser';

export interface ScrapedSheetData {
  title: string;
  artist: string;
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyLevel: number;
  tempo: number;
  targetLength: string;
  notation: string;
  tags: string[];
  sourceUrl: string;
  thumbnailUrl?: string;
  verifiedBy?: string;
}

/**
 * Scrape sheet data from a virtualpiano.net music sheet page
 */
export function scrapeVirtualPianoSheet(): ScrapedSheetData | null {
  try {
    // Get the main article element
    const article = document.querySelector('article.music_sheet');
    if (!article) {
      console.error('Sheet article not found');
      return null;
    }

    // Extract title and artist using the shared function
    const { title, artist } = extractSheetTitleAndArtist();

    // Extract difficulty level (number)
    const difficultySpan = document.querySelector('#difficulty');
    const difficultyLevel = difficultySpan ? parseInt(difficultySpan.textContent?.trim() || '5') : 5;
    
    // Map difficulty level to category
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (difficultyLevel <= 3) difficulty = 'easy';
    else if (difficultyLevel >= 7) difficulty = 'hard';

    // Extract difficulty text
    const difficultyText = article.querySelector('.sheet__info-tags a[href*="difficulty"]');
    const difficultyCategory = difficultyText?.textContent?.trim().toLowerCase();
    if (difficultyCategory === 'easy') difficulty = 'easy';
    else if (difficultyCategory === 'hard' || difficultyCategory === 'advanced') difficulty = 'hard';

    // Extract tempo
    const tempoSpan = document.querySelector('#tempo');
    const tempo = tempoSpan ? parseInt(tempoSpan.textContent?.trim() || '120') : 120;

    // Extract target length
    const lengthSpan = document.querySelector('#target-length');
    const targetLength = lengthSpan?.textContent?.trim() || '00:00';

    // Extract notation from sheet content
    const sheetContent = document.querySelector('#sheet-content');
    if (!sheetContent) {
      console.error('Sheet content not found');
      return null;
    }

    // Get notation text - extract all text nodes and clean up
    const notationElement = sheetContent.querySelector('p');
    if (!notationElement) {
      console.error('Notation paragraph not found');
      return null;
    }

    // Extract notation preserving structure
    let notation = '';
    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        notation += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.classList.contains('spec')) {
          // Include special characters (brackets, pipes)
          notation += element.textContent;
        } else if (element.tagName === 'BR') {
          notation += '\n';
        } else {
          // Recurse into other elements
          Array.from(element.childNodes).forEach(processNode);
        }
      }
    };

    Array.from(notationElement.childNodes).forEach(processNode);
    notation = notation.trim();

    if (!notation) {
      console.error('No notation found');
      return null;
    }

    // Extract tags
    const tags: string[] = [];
    const tagElements = document.querySelectorAll('#sheet-tags a');
    tagElements.forEach(tag => {
      const tagText = tag.textContent?.trim();
      if (tagText) tags.push(tagText);
    });

    // Extract category tags (Rock, Pop, etc.)
    const categoryElements = document.querySelectorAll('#type-tags a');
    categoryElements.forEach(cat => {
      const catText = cat.textContent?.trim();
      if (catText) tags.push(catText);
    });

    // Extract verified by
    const verifiedElement = document.querySelector('#verified-by a');
    const verifiedBy = verifiedElement?.textContent?.trim();

    // Get artist/author image URL from sheet__authors-artist section
    const artistImg = document.querySelector('.sheet__authors-artist .icon img');
    const thumbnailUrl = artistImg?.getAttribute('src') || undefined;

    return {
      title,
      artist,
      difficulty,
      difficultyLevel,
      tempo,
      targetLength,
      notation,
      tags: [...new Set(tags)], // Remove duplicates
      sourceUrl: window.location.href,
      thumbnailUrl,
      verifiedBy,
    };
  } catch (error) {
    console.error('Error scraping sheet:', error);
    return null;
  }
}

/**
 * Convert scraped data to MusicSheet format
 */
export function convertToMusicSheet(scrapedData: ScrapedSheetData): MusicSheet {
  // Generate ID from title and artist
  const id = `vp-${scrapedData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}-${Date.now()}`;

  // Parse the notation
  const parsed = parseVPNotation(scrapedData.notation, scrapedData.tempo);
  
  // Create single page for now (pagination handled by UI)
  const pages = [{
    measures: parsed.measures,
    pageNumber: 1,
  }];

  const durationSeconds = estimateDuration(parsed.measures, scrapedData.tempo);

  return {
    id,
    title: scrapedData.title,
    artist: {
      name: scrapedData.artist,
      avatarUrl: scrapedData.thumbnailUrl || "",
    },
    difficulty: scrapedData.difficulty,
    notation: scrapedData.notation,
    tempo: scrapedData.tempo,
    timeSignature: '4/4', // Default, VP doesn't specify
    pages,
    tags: scrapedData.tags,
    durationSeconds,
    sourceUrl: scrapedData.sourceUrl,
    thumbnailUrl: scrapedData.thumbnailUrl,
  };
}

/**
 * Check if current page is a virtualpiano.net sheet page
 */
export function isVirtualPianoSheetPage(): boolean {
  return (
    window.location.hostname === 'virtualpiano.net' &&
    window.location.pathname.startsWith('/music-sheet/')
  );
}

/**
 * Extract only title and artist from a virtualpiano.net sheet page
 */
export function extractSheetTitleAndArtist(): { title: string; artist: string } {
  try {
    // Extract title from H1 in sheet__head-wrapper
    const h1Element = document.querySelector('.sheet__head-wrapper h1');
    let title = h1Element?.textContent?.trim() || 'Unknown Title';

    // Extract artist from sheet__author link
    const artistLink = document.querySelector('.sheet__head-wrapper .sheet__author a');
    let artist = artistLink?.textContent?.trim() || 'Unknown Artist';

    // Fallback to page title parsing if direct extraction fails
    if (title === 'Unknown Title' || artist === 'Unknown Artist') {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*(?:\((.+?)\))?\s*-\s*Virtual Piano/);
      if (titleMatch) {
        if (title === 'Unknown Title') title = titleMatch[1].trim();
        if (artist === 'Unknown Artist' && titleMatch[2]) artist = titleMatch[2].trim();
      }
    }

    // Final fallback: extract from URL path
    if (title === 'Unknown Title') {
      const urlPath = window.location.pathname;
      const pathSegments = urlPath.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment) {
        title = lastSegment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      }
    }

    return { title, artist };
  } catch (error) {
    console.error('Error extracting sheet title and artist:', error);
    return { title: 'Unknown Title', artist: 'Unknown Artist' };
  }
}
