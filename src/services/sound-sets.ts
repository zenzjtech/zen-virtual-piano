/**
 * Sound Set Configuration
 * Defines available piano sound sets and their properties
 */

export interface SoundSet {
  id: string;
  name: string;
  description: string;
  /** Instrument type */
  type: 'piano' | 'organ';
  /** Path to the audio folder (relative to assets/audio/{type}/) */
  path: string;
  /** Sample notes available (used for pitch-shifting) */
  sampleNotes: string[];
  /** Audio characteristics */
  characteristics: {
    brightness: 'bright' | 'balanced' | 'mellow';
    sustain: 'short' | 'medium' | 'long';
    attack: 'soft' | 'medium' | 'sharp';
  };
}

export const SOUND_SETS: Record<string, SoundSet> = {
  classical: {
    id: 'classical',
    name: 'Classical Piano',
    description: 'Warm traditional piano sound',
    type: 'piano',
    path: 'classical',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'balanced',
      sustain: 'medium',
      attack: 'medium',
    },
  },
  
  'grand-classical-1': {
    id: 'grand-classical-1',
    name: 'Grand Piano I',
    description: 'Bright concert grand piano',
    type: 'piano',
    path: 'grand-classical-1',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'bright',
      sustain: 'long',
      attack: 'sharp',
    },
  },
  
  'grand-classical-2': {
    id: 'grand-classical-2',
    name: 'Grand Piano II',
    description: 'Rich and mellow grand piano',
    type: 'piano',
    path: 'grand-classical-2',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'mellow',
      sustain: 'long',
      attack: 'soft',
    },
  },
  
  stage: {
    id: 'stage',
    name: 'Stage Piano',
    description: 'Modern bright stage piano sound',
    type: 'piano',
    path: 'stage',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'bright',
      sustain: 'medium',
      attack: 'sharp',
    },
  },
  
  upright: {
    id: 'upright',
    name: 'Upright Piano',
    description: 'Warm intimate upright piano tone',
    type: 'piano',
    path: 'upright',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'mellow',
      sustain: 'short',
      attack: 'soft',
    },
  },
  
  jazz: {
    id: 'jazz',
    name: 'Jazz Piano',
    description: 'Smooth jazz piano with warm tones',
    type: 'piano',
    path: 'jazz',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'balanced',
      sustain: 'medium',
      attack: 'soft',
    },
  },
  
  auditorium: {
    id: 'auditorium',
    name: 'Auditorium Piano',
    description: 'Spacious concert hall piano sound',
    type: 'piano',
    path: 'auditorium',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'bright',
      sustain: 'long',
      attack: 'medium',
    },
  },
  
  'organ-standard': {
    id: 'organ-standard',
    name: 'Standard Organ',
    description: 'Classic church organ sound',
    type: 'organ',
    path: 'standard',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'bright',
      sustain: 'long',
      attack: 'soft',
    },
  },
};

/**
 * Get sound set by ID with fallback to default
 */
export function getSoundSet(soundSetId: string): SoundSet {
  return SOUND_SETS[soundSetId] || SOUND_SETS.classical;
}

/**
 * Get list of all available sound sets
 */
export function getAllSoundSets(): SoundSet[] {
  return Object.values(SOUND_SETS);
}

/**
 * Build the sample URLs map for a given sound set
 * Maps keyboard notes to their corresponding audio file URLs
 */
export function buildSampleUrlsMap(
  soundSet: SoundSet,
  samples: Record<string, string>
): Record<string, string> {
  const urlsMap: Record<string, string> = {};
  const basePath = `/src/assets/audio/${soundSet.type}/${soundSet.path}`;
  
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
}
