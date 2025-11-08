/**
 * Chromatic Mapper
 * Standard chromatic pattern (C, D#, F#, A) used by most piano instruments
 */

import { SampleMapper } from './types';

/**
 * Maps keyboard notes to chromatic sample files
 * Standard pattern: C, D# (Ds), F# (Fs), A across multiple octaves
 * Used by: piano, organ, most standard instruments
 */
export const chromaticMapper: SampleMapper = (basePath, samples) => {
  const urlsMap: Record<string, string> = {};
  
  // C notes (every octave) - keyboard note maps to one octave lower in file
  // e.g., C2 keyboard note uses C1.mp3 file
  urlsMap.C1 = samples[`${basePath}/C1.mp3`] || '';
  urlsMap.C2 = samples[`${basePath}/C1.mp3`] || '';
  urlsMap.C3 = samples[`${basePath}/C2.mp3`] || '';
  urlsMap.C4 = samples[`${basePath}/C3.mp3`] || '';
  urlsMap.C5 = samples[`${basePath}/C4.mp3`] || '';
  urlsMap.C6 = samples[`${basePath}/C5.mp3`] || '';
  urlsMap.C7 = samples[`${basePath}/C6.mp3`] || '';
  urlsMap.C8 = samples[`${basePath}/C7.mp3`] || '';
  
  // D# (Ds) notes
  urlsMap['D#1'] = samples[`${basePath}/Ds1.mp3`] || '';
  urlsMap['D#2'] = samples[`${basePath}/Ds1.mp3`] || '';
  urlsMap['D#3'] = samples[`${basePath}/Ds2.mp3`] || '';
  urlsMap['D#4'] = samples[`${basePath}/Ds3.mp3`] || '';
  urlsMap['D#5'] = samples[`${basePath}/Ds4.mp3`] || '';
  urlsMap['D#6'] = samples[`${basePath}/Ds5.mp3`] || '';
  urlsMap['D#7'] = samples[`${basePath}/Ds6.mp3`] || '';
  
  // F# (Fs) notes
  urlsMap['F#1'] = samples[`${basePath}/Fs1.mp3`] || '';
  urlsMap['F#2'] = samples[`${basePath}/Fs1.mp3`] || '';
  urlsMap['F#3'] = samples[`${basePath}/Fs2.mp3`] || '';
  urlsMap['F#4'] = samples[`${basePath}/Fs3.mp3`] || '';
  urlsMap['F#5'] = samples[`${basePath}/Fs4.mp3`] || '';
  urlsMap['F#6'] = samples[`${basePath}/Fs5.mp3`] || '';
  urlsMap['F#7'] = samples[`${basePath}/Fs6.mp3`] || '';
  
  // A notes
  urlsMap.A1 = samples[`${basePath}/A1.mp3`] || '';
  urlsMap.A2 = samples[`${basePath}/A1.mp3`] || '';
  urlsMap.A3 = samples[`${basePath}/A2.mp3`] || '';
  urlsMap.A4 = samples[`${basePath}/A3.mp3`] || '';
  urlsMap.A5 = samples[`${basePath}/A4.mp3`] || '';
  urlsMap.A6 = samples[`${basePath}/A5.mp3`] || '';
  urlsMap.A7 = samples[`${basePath}/A6.mp3`] || '';
  
  return urlsMap;
};
