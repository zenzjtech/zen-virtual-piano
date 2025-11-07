import { Measure } from './types';

export interface LineRanges {
  /** Total number of lines */
  totalLines: number;
  /** Page ranges for line-based pagination */
  pageRanges: Array<{ start: number; end: number }>;
}

export interface PageSpread {
  /** Left page index (0-indexed) */
  leftPageIndex: number;
  /** Right page index (0-indexed) */
  rightPageIndex: number;
  /** Current page set index */
  pageSetIndex: number;
}

/**
 * Calculate line ranges dynamically based on config
 * @param measures - All measures in the sheet
 * @param maxCharsPerLine - Maximum characters per line
 * @param linesPerPage - Number of lines per page
 * @returns Line ranges for pagination
 */
export function calculateLineRanges(
  measures: Measure[],
  maxCharsPerLine: number,
  linesPerPage: number
): LineRanges {
  // Convert measures to tokens
  const tokens: string[] = [];
  measures.forEach((measure) => {
    measure.notes.forEach((note) => {
      tokens.push((note.originalNotation || note.key) + ' ');
    });
  });
  
  // Split into lines
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentLength = 0;
  
  tokens.forEach((token) => {
    if (currentLength + token.length > maxCharsPerLine && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [];
      currentLength = 0;
    }
    currentLine.push(token);
    currentLength += token.length;
  });
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  // Calculate page ranges
  const pageRanges: Array<{ start: number; end: number }> = [];
  for (let i = 0; i < lines.length; i += linesPerPage) {
    pageRanges.push({
      start: i,
      end: Math.min(i + linesPerPage, lines.length),
    });
  }
  
  return { totalLines: lines.length, pageRanges };
}

/**
 * Calculate 2-page spread indices based on current page
 * @param currentPage - Current page number (0-indexed)
 * @returns Page spread information
 */
export function calculatePageSpread(currentPage: number): PageSpread {
  const pageSetIndex = Math.floor(currentPage / 2);
  const leftPageIndex = pageSetIndex * 2;
  const rightPageIndex = leftPageIndex + 1;
  
  return {
    leftPageIndex,
    rightPageIndex,
    pageSetIndex,
  };
}
