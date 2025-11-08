/**
 * Natural Notes Mapper
 * Maps all natural notes (A, B, C, D, E, F, G) - the white keys
 * Used by: harp and other instruments that sample all natural notes
 */

import { SampleMapper } from './types';

/**
 * Maps keyboard notes to natural note sample files (A-G)
 * This mapper handles instruments that have samples for all white keys
 * 
 * IMPORTANT: Only map the actual recorded samples at their recorded pitch.
 * Tone.js will automatically pitch-shift to produce all other notes.
 * Each key in urlsMap represents the RECORDED pitch of that sample, not a target keyboard note.
 */
export const naturalNotesMapper: SampleMapper = (basePath, samples) => {
  const urlsMap: Record<string, string> = {};
  
  // Only map actual sample files at their recorded pitch
  // Tone.js will automatically find the nearest sample and pitch-shift as needed
  
  // A notes
  const A2 = samples[`${basePath}/A2.mp3`];
  const A4 = samples[`${basePath}/A4.mp3`];
  const A6 = samples[`${basePath}/A6.mp3`];
  if (A2) urlsMap.A2 = A2;
  if (A4) urlsMap.A4 = A4;
  if (A6) urlsMap.A6 = A6;
  
  // B notes
  const B1 = samples[`${basePath}/B1.mp3`];
  const B3 = samples[`${basePath}/B3.mp3`];
  const B5 = samples[`${basePath}/B5.mp3`];
  const B6 = samples[`${basePath}/B6.mp3`];
  if (B1) urlsMap.B1 = B1;
  if (B3) urlsMap.B3 = B3;
  if (B5) urlsMap.B5 = B5;
  if (B6) urlsMap.B6 = B6;
  
  // C notes
  const C3 = samples[`${basePath}/C3.mp3`];
  const C5 = samples[`${basePath}/C5.mp3`];
  if (C3) urlsMap.C3 = C3;
  if (C5) urlsMap.C5 = C5;
  
  // D notes
  const D2 = samples[`${basePath}/D2.mp3`];
  const D4 = samples[`${basePath}/D4.mp3`];
  const D6 = samples[`${basePath}/D6.mp3`];
  const D7 = samples[`${basePath}/D7.mp3`];
  if (D2) urlsMap.D2 = D2;
  if (D4) urlsMap.D4 = D4;
  if (D6) urlsMap.D6 = D6;
  if (D7) urlsMap.D7 = D7;
  
  // E notes
  const E1 = samples[`${basePath}/E1.mp3`];
  const E3 = samples[`${basePath}/E3.mp3`];
  const E5 = samples[`${basePath}/E5.mp3`];
  if (E1) urlsMap.E1 = E1;
  if (E3) urlsMap.E3 = E3;
  if (E5) urlsMap.E5 = E5;
  
  // F notes
  const F2 = samples[`${basePath}/F2.mp3`];
  const F4 = samples[`${basePath}/F4.mp3`];
  const F6 = samples[`${basePath}/F6.mp3`];
  const F7 = samples[`${basePath}/F7.mp3`];
  if (F2) urlsMap.F2 = F2;
  if (F4) urlsMap.F4 = F4;
  if (F6) urlsMap.F6 = F6;
  if (F7) urlsMap.F7 = F7;
  
  // G notes
  const G1 = samples[`${basePath}/G1.mp3`];
  const G3 = samples[`${basePath}/G3.mp3`];
  const G5 = samples[`${basePath}/G5.mp3`];
  if (G1) urlsMap.G1 = G1;
  if (G3) urlsMap.G3 = G3;
  if (G5) urlsMap.G5 = G5;
  
  return urlsMap;
};
