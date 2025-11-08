/**
 * Natural Notes Mapper
 * Maps all natural notes (A, B, C, D, E, F, G) - the white keys
 * Used by: harp and other instruments that sample all natural notes
 */

import { SampleMapper } from './types';

/**
 * Maps keyboard notes to natural note sample files (A-G)
 * This mapper handles instruments that have samples for all white keys
 * and pitch-shifts for black keys (sharps/flats)
 */
export const naturalNotesMapper: SampleMapper = (basePath, samples) => {
  const urlsMap: Record<string, string> = {};
  
  // C notes - available: C3, C5
  urlsMap.C1 = samples[`${basePath}/C3.mp3`] || '';
  urlsMap.C2 = samples[`${basePath}/C3.mp3`] || '';
  urlsMap.C3 = samples[`${basePath}/C3.mp3`] || '';
  urlsMap.C4 = samples[`${basePath}/C3.mp3`] || '';
  urlsMap.C5 = samples[`${basePath}/C5.mp3`] || '';
  urlsMap.C6 = samples[`${basePath}/C5.mp3`] || '';
  urlsMap.C7 = samples[`${basePath}/C5.mp3`] || '';
  urlsMap.C8 = samples[`${basePath}/C5.mp3`] || '';
  
  // C# notes - pitch-shift from C
  urlsMap['C#1'] = samples[`${basePath}/C3.mp3`] || '';
  urlsMap['C#2'] = samples[`${basePath}/C3.mp3`] || '';
  urlsMap['C#3'] = samples[`${basePath}/C3.mp3`] || '';
  urlsMap['C#4'] = samples[`${basePath}/C3.mp3`] || '';
  urlsMap['C#5'] = samples[`${basePath}/C5.mp3`] || '';
  urlsMap['C#6'] = samples[`${basePath}/C5.mp3`] || '';
  urlsMap['C#7'] = samples[`${basePath}/C5.mp3`] || '';
  
  // D notes - available: D2, D4, D6, D7
  urlsMap.D1 = samples[`${basePath}/D2.mp3`] || '';
  urlsMap.D2 = samples[`${basePath}/D2.mp3`] || '';
  urlsMap.D3 = samples[`${basePath}/D2.mp3`] || '';
  urlsMap.D4 = samples[`${basePath}/D4.mp3`] || '';
  urlsMap.D5 = samples[`${basePath}/D4.mp3`] || '';
  urlsMap.D6 = samples[`${basePath}/D6.mp3`] || '';
  urlsMap.D7 = samples[`${basePath}/D7.mp3`] || '';
  
  // D# notes - pitch-shift from E
  urlsMap['D#1'] = samples[`${basePath}/E1.mp3`] || '';
  urlsMap['D#2'] = samples[`${basePath}/E1.mp3`] || '';
  urlsMap['D#3'] = samples[`${basePath}/E3.mp3`] || '';
  urlsMap['D#4'] = samples[`${basePath}/E3.mp3`] || '';
  urlsMap['D#5'] = samples[`${basePath}/E5.mp3`] || '';
  urlsMap['D#6'] = samples[`${basePath}/E5.mp3`] || '';
  urlsMap['D#7'] = samples[`${basePath}/E5.mp3`] || '';
  
  // E notes - available: E1, E3, E5
  urlsMap.E1 = samples[`${basePath}/E1.mp3`] || '';
  urlsMap.E2 = samples[`${basePath}/E1.mp3`] || '';
  urlsMap.E3 = samples[`${basePath}/E3.mp3`] || '';
  urlsMap.E4 = samples[`${basePath}/E3.mp3`] || '';
  urlsMap.E5 = samples[`${basePath}/E5.mp3`] || '';
  urlsMap.E6 = samples[`${basePath}/E5.mp3`] || '';
  urlsMap.E7 = samples[`${basePath}/E5.mp3`] || '';
  
  // F notes - available: F2, F4, F6, F7
  urlsMap.F1 = samples[`${basePath}/F2.mp3`] || '';
  urlsMap.F2 = samples[`${basePath}/F2.mp3`] || '';
  urlsMap.F3 = samples[`${basePath}/F2.mp3`] || '';
  urlsMap.F4 = samples[`${basePath}/F4.mp3`] || '';
  urlsMap.F5 = samples[`${basePath}/F4.mp3`] || '';
  urlsMap.F6 = samples[`${basePath}/F6.mp3`] || '';
  urlsMap.F7 = samples[`${basePath}/F7.mp3`] || '';
  
  // F# notes - pitch-shift from G
  urlsMap['F#1'] = samples[`${basePath}/G1.mp3`] || '';
  urlsMap['F#2'] = samples[`${basePath}/G1.mp3`] || '';
  urlsMap['F#3'] = samples[`${basePath}/G3.mp3`] || '';
  urlsMap['F#4'] = samples[`${basePath}/G3.mp3`] || '';
  urlsMap['F#5'] = samples[`${basePath}/G5.mp3`] || '';
  urlsMap['F#6'] = samples[`${basePath}/G5.mp3`] || '';
  urlsMap['F#7'] = samples[`${basePath}/G5.mp3`] || '';
  
  // G notes - available: G1, G3, G5
  urlsMap.G1 = samples[`${basePath}/G1.mp3`] || '';
  urlsMap.G2 = samples[`${basePath}/G1.mp3`] || '';
  urlsMap.G3 = samples[`${basePath}/G3.mp3`] || '';
  urlsMap.G4 = samples[`${basePath}/G3.mp3`] || '';
  urlsMap.G5 = samples[`${basePath}/G5.mp3`] || '';
  urlsMap.G6 = samples[`${basePath}/G5.mp3`] || '';
  urlsMap.G7 = samples[`${basePath}/G5.mp3`] || '';
  
  // G# notes - pitch-shift from G
  urlsMap['G#1'] = samples[`${basePath}/G1.mp3`] || '';
  urlsMap['G#2'] = samples[`${basePath}/G1.mp3`] || '';
  urlsMap['G#3'] = samples[`${basePath}/G3.mp3`] || '';
  urlsMap['G#4'] = samples[`${basePath}/G3.mp3`] || '';
  urlsMap['G#5'] = samples[`${basePath}/G5.mp3`] || '';
  urlsMap['G#6'] = samples[`${basePath}/G5.mp3`] || '';
  urlsMap['G#7'] = samples[`${basePath}/G5.mp3`] || '';
  
  // A notes - available: A2, A4, A6
  urlsMap.A1 = samples[`${basePath}/A2.mp3`] || '';
  urlsMap.A2 = samples[`${basePath}/A2.mp3`] || '';
  urlsMap.A3 = samples[`${basePath}/A2.mp3`] || '';
  urlsMap.A4 = samples[`${basePath}/A4.mp3`] || '';
  urlsMap.A5 = samples[`${basePath}/A4.mp3`] || '';
  urlsMap.A6 = samples[`${basePath}/A6.mp3`] || '';
  urlsMap.A7 = samples[`${basePath}/A6.mp3`] || '';
  
  // A# notes - pitch-shift from B
  urlsMap['A#1'] = samples[`${basePath}/B1.mp3`] || '';
  urlsMap['A#2'] = samples[`${basePath}/B1.mp3`] || '';
  urlsMap['A#3'] = samples[`${basePath}/B3.mp3`] || '';
  urlsMap['A#4'] = samples[`${basePath}/B3.mp3`] || '';
  urlsMap['A#5'] = samples[`${basePath}/B5.mp3`] || '';
  urlsMap['A#6'] = samples[`${basePath}/B6.mp3`] || '';
  urlsMap['A#7'] = samples[`${basePath}/B6.mp3`] || '';
  
  // B notes - available: B1, B3, B5, B6
  urlsMap.B1 = samples[`${basePath}/B1.mp3`] || '';
  urlsMap.B2 = samples[`${basePath}/B1.mp3`] || '';
  urlsMap.B3 = samples[`${basePath}/B3.mp3`] || '';
  urlsMap.B4 = samples[`${basePath}/B3.mp3`] || '';
  urlsMap.B5 = samples[`${basePath}/B5.mp3`] || '';
  urlsMap.B6 = samples[`${basePath}/B6.mp3`] || '';
  urlsMap.B7 = samples[`${basePath}/B6.mp3`] || '';
  
  return urlsMap;
};
