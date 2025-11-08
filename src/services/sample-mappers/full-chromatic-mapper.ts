/**
 * Full Chromatic Mapper
 * Maps all 12 chromatic notes per octave for instruments with complete chromatic sampling
 * Used by: cello and other instruments that have samples for every chromatic note
 */

import { SampleMapper } from './types';

/**
 * Maps keyboard notes to full chromatic sample files
 * This mapper handles instruments that have samples for all 12 chromatic notes
 * 
 * IMPORTANT: Only map the actual recorded samples at their recorded pitch.
 * Tone.js will automatically pitch-shift to produce any missing notes.
 * Each key in urlsMap represents the RECORDED pitch of that sample.
 */
export const fullChromaticMapper: SampleMapper = (basePath, samples) => {
  const urlsMap: Record<string, string> = {};
  
  // Only map actual sample files at their recorded pitch
  // Tone.js will automatically find the nearest sample and pitch-shift as needed
  
  // Define all possible chromatic notes across multiple octaves
  // Note: Some samples use 's' suffix for sharps (e.g., Cs, Ds, Fs, Gs, As)
  const notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
  const octaves = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Map each note-octave combination if the sample exists
  for (const octave of octaves) {
    for (const note of notes) {
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
