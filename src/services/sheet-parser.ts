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

import type { Measure, Note, ParsedNotation, SheetPage } from '@/components/piano/music-sheet/types';

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
  
  // Split by measure separator |
  const measureStrings = notation.split('|').map(m => m.trim()).filter(m => m.length > 0);
  
  for (const measureStr of measureStrings) {
    const notes: Note[] = [];
    let i = 0;
    
    while (i < measureStr.length) {
      const char = measureStr[i];
      
      // Skip whitespace
      if (char === ' ') {
        i++;
        continue;
      }
      
      // Handle chord notation [abc]
      if (char === '[') {
        const chordEnd = measureStr.indexOf(']', i);
        if (chordEnd === -1) {
          warnings.push(`Unclosed chord bracket at position ${i}`);
          i++;
          continue;
        }
        
        const chordNotes = measureStr.substring(i + 1, chordEnd);
        const chord: string[] = [];
        
        const chordOriginalNotations: string[] = [];
        for (const chordChar of chordNotes) {
          const noteName = VP_NOTE_MAP[chordChar];
          if (noteName) {
            chord.push(noteName);
            chordOriginalNotations.push(chordChar);
          } else {
            warnings.push(`Unknown note in chord: ${chordChar}`);
          }
        }
        
        if (chord.length > 0) {
          notes.push({
            key: chord[0], // Use first note as primary
            duration: 1,
            chord: chord,
            originalNotation: '[' + chordOriginalNotations.join('') + ']',
          });
        }
        
        i = chordEnd + 1;
        continue;
      }
      
      // Handle sustain/hold -
      if (char === '-') {
        if (notes.length > 0) {
          // Extend duration of previous note
          notes[notes.length - 1].duration += 0.5;
        }
        i++;
        continue;
      }
      
      // Handle regular note
      const noteName = VP_NOTE_MAP[char];
      if (noteName) {
        notes.push({
          key: noteName,
          duration: 1,
          originalNotation: char,
        });
      } else {
        warnings.push(`Unknown character: ${char}`);
      }
      
      i++;
    }
    
    // Add measure
    if (notes.length > 0) {
      measures.push({
        notes,
        duration: notes.reduce((sum, note) => sum + note.duration, 0),
      });
    }
  }
  
  return {
    measures,
    tempo,
    warnings,
  };
}

/**
 * Split measures into pages (6 measures per page)
 */
export function createPages(measures: Measure[]): SheetPage[] {
  const pages: SheetPage[] = [];
  const measuresPerPage = 6;
  
  for (let i = 0; i < measures.length; i += measuresPerPage) {
    const pageMeasures = measures.slice(i, i + measuresPerPage);
    pages.push({
      measures: pageMeasures,
      pageNumber: Math.floor(i / measuresPerPage) + 1,
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
