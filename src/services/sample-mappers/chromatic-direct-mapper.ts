/**
 * Chromatic Direct Mapper
 * Chromatic pattern (C, D#, F#, A) with direct octave mapping (no downshift)
 * Used for instruments where sample files match the target note exactly
 * (e.g., C2.mp3 is used for keyboard note C2, not C3)
 */

import { SampleMapper } from './types';

/**
 * Maps keyboard notes to chromatic sample files with direct octave mapping
 * Pattern: C, D# (Ds), F# (Fs), A - every 3 semitones
 * 
 * IMPORTANT: Only map the actual recorded samples at their recorded pitch.
 * Tone.js will automatically pitch-shift to produce all other notes.
 */
export const chromaticDirectMapper: SampleMapper = (basePath, samples) => {
  const urlsMap: Record<string, string> = {};
  
  // Only map actual sample files at their recorded pitch
  // Tone.js will automatically find the nearest sample and pitch-shift as needed
  
  // Define chromatic notes (C, Ds, Fs, A) across octaves 2-7
  // This covers the virtual piano's 68-key range (C2 to C7)
  const chromaticNotes = ['C', 'Ds', 'Fs', 'A'];
  const octaves = [2, 3, 4, 5, 6, 7];
  
  // Map each chromatic note-octave combination if the sample exists
  for (const octave of octaves) {
    for (const note of chromaticNotes) {
      const samplePath = `${basePath}/${note}${octave}.mp3`;
      const sampleUrl = samples[samplePath];
      
      if (sampleUrl) {
        // Convert 's' suffix to '#' for Tone.js notation
        const toneNote = note.replace('s', '#');
        urlsMap[`${toneNote}${octave}`] = sampleUrl;
      }
    }
  }
  
  return urlsMap;
};
