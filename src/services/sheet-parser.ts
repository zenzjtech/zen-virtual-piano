/**
 * Virtual Piano Notation Parser
 * 
 * Parses Virtual Piano notation format into structured musical data
 * 
 * Format examples:
 * - Lowercase letters (a-z): Natural notes in middle octave
 * - Uppercase letters (A-Z): Natural notes in higher octave  
 * - Numbers (1-9, 0): Piano keys
 * - | : Measure separator
 * - - : Note hold/sustain
 * - [abc] : Chord (simultaneous notes)
 */

import type { Measure, Note, ParsedNotation, SheetPage } from '@/components/music-sheet/types';

/**
 * Map Virtual Piano notation to actual note names
 */
const VP_NOTE_MAP: Record<string, string> = {
  // Numbers (lower octave)
  '1': 'C2',
  '2': 'D2',
  '3': 'E2',
  '4': 'F2',
  '5': 'G2',
  '6': 'A2',
  '7': 'B2',
  '8': 'C3',
  '9': 'D3',
  '0': 'E3',
  
  // Lowercase (middle octave - C4 to B4)
  'q': 'F3',
  'w': 'G3',
  'e': 'A3',
  'r': 'B3',
  't': 'C4',
  'y': 'D4',
  'u': 'E4',
  'i': 'F4',
  'o': 'G4',
  'p': 'A4',
  'a': 'B4',
  's': 'C5',
  'd': 'D5',
  'f': 'E5',
  'g': 'F5',
  'h': 'G5',
  'j': 'A5',
  'k': 'B5',
  'l': 'C6',
  'z': 'D6',
  'x': 'E6',
  'c': 'F6',
  'v': 'G6',
  'b': 'A6',
  'n': 'B6',
  'm': 'C7',
  
  // Uppercase (higher octave)
  'Q': 'F#3',
  'W': 'G#3',
  'E': 'A#3',
  'T': 'C#4',
  'Y': 'D#4',
  'I': 'F#4',
  'O': 'G#4',
  'P': 'A#4',
  'S': 'C#5',
  'D': 'D#5',
  'G': 'F#5',
  'H': 'G#5',
  'J': 'A#5',
  'Z': 'D#6',
  'X': 'E#6',
  'C': 'F#6',
  'V': 'G#6',
  'B': 'A#6',
  'N': 'B#6',
};

/**
 * Parse Virtual Piano notation into structured measures
 */
export function parseVPNotation(notation: string, tempo: number = 120): ParsedNotation {
  const warnings: string[] = [];
  const measures: Measure[] = [];
  let currentMeasure: Note[] = [];

  // Preprocess for paragraph breaks (extended pauses)
  const processedNotation = notation.replace(/\n\s*\n/g, ' | | ');

  const tokens = processedNotation.match(/\s*\|\s*|\[[a-zA-Z0-9\s]+\]|[a-zA-Z0-9]|-/g) || [];

  for (const token of tokens) {
    // Handle pauses
    if (token.includes('|')) {
      const spaceCount = token.length - token.replace(/ /g, '').length;
      let duration = 1 + (spaceCount * 0.5); // Base duration + 0.5 for each space
      currentMeasure.push({ key: 'pause', duration, rest: true, originalNotation: token });
      continue;
    }

    // Handle bracketed notation
    if (token.startsWith('[')) {
      const content = token.substring(1, token.length - 1);
      // Simultaneous notes (chord)
      if (!content.includes(' ')) {
        const chord: string[] = [];
        const chordOriginalNotations: string[] = [];
        for (const char of content) {
          const noteName = VP_NOTE_MAP[char];
          if (noteName) {
            chord.push(noteName);
            chordOriginalNotations.push(char);
          } else {
            warnings.push(`Unknown note in chord: ${char}`);
          }
        }
        if (chord.length > 0) {
          currentMeasure.push({ key: chord[0], duration: 1, chord, originalNotation: `[${chordOriginalNotations.join('')}]` });
        }
      } else { // Fast sequence
        for (const char of content.split('')) {
          if (char === ' ') continue;
          const noteName = VP_NOTE_MAP[char];
          if (noteName) {
            currentMeasure.push({ key: noteName, duration: 0.25, originalNotation: char });
          } else {
            warnings.push(`Unknown note in sequence: ${char}`);
          }
        }
      }
      continue;
    }

    // Handle sustain/hold
    if (token === '-') {
      if (currentMeasure.length > 0) {
        currentMeasure[currentMeasure.length - 1].duration += 0.5;
      }
      continue;
    }

    // Handle regular note
    const noteName = VP_NOTE_MAP[token];
    if (noteName) {
      currentMeasure.push({ key: noteName, duration: 1, originalNotation: token });
    } else {
      warnings.push(`Unknown character: ${token}`);
    }
  }

  if (currentMeasure.length > 0) {
    measures.push({
      notes: currentMeasure,
      duration: currentMeasure.reduce((sum, note) => sum + note.duration, 0),
    });
  }

  return {
    measures,
    tempo,
    warnings,
  };
}

/**
 * Convert measures to text tokens for line wrapping calculation
 */
function measuresToTextTokens(measures: Measure[]): string[] {
  const tokens: string[] = [];
  measures.forEach((measure) => {
    measure.notes.forEach((note) => {
      tokens.push((note.originalNotation || note.key) + ' ');
    });
  });
  return tokens;
}

/**
 * Split text tokens into lines based on character limit
 */
function tokensToLines(tokens: string[], maxCharsPerLine: number): string[][] {
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentLength = 0;

  tokens.forEach((token) => {
    const tokenLength = token.length;
    
    // If adding this token would exceed the limit and we have content, start new line
    if (currentLength + tokenLength > maxCharsPerLine && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [];
      currentLength = 0;
    }
    
    currentLine.push(token);
    currentLength += tokenLength;
  });

  // Add the last line if it has content
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Map lines back to measures for page structure
 */
function linesToMeasures(lines: string[][], allMeasures: Measure[]): Measure[] {
  // For now, just return all measures since we're displaying by lines
  // This maintains compatibility with existing structure
  return allMeasures;
}

/**
 * Split measures into pages based on LINE COUNT (after character wrapping)
 * This ensures consistent page sizes regardless of measure boundaries
 */
export function createPages(measures: Measure[], maxCharsPerLine: number = 35, linesPerPage: number = 8): SheetPage[] {
  // Convert measures to text tokens
  const tokens = measuresToTextTokens(measures);
  
  // Split tokens into lines based on character limit
  const lines = tokensToLines(tokens, maxCharsPerLine);
  
  // Split lines into pages
  const pages: SheetPage[] = [];
  
  for (let i = 0; i < lines.length; i += linesPerPage) {
    const endLine = Math.min(i + linesPerPage, lines.length);
    
    pages.push({
      measures: measures, // Include all measures (display will filter by line range)
      pageNumber: Math.floor(i / linesPerPage) + 1,
      lineRange: {
        start: i,
        end: endLine,
      },
    });
  }
  
  // If no pages were created (empty song), create one empty page
  if (pages.length === 0) {
    pages.push({
      measures: measures,
      pageNumber: 1,
      lineRange: { start: 0, end: 0 },
    });
  }
  
  return pages;
}

/**
 * Estimate duration in seconds based on measures and tempo
 */
export function estimateDuration(measures: Measure[], tempo: number): number {
  const totalBeats = measures.reduce((sum, measure) => sum + measure.duration, 0);
  const beatsPerSecond = tempo / 60;
  return totalBeats / beatsPerSecond;
}
