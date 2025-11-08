/**
 * Sound Set Configuration
 * Defines available piano sound sets and their properties
 */

import { getMapper } from './sample-mappers';

export interface SoundSet {
  id: string;
  name: string;
  description: string;
  /** Instrument type */
  type: 'piano' | 'organ' | 'flute' | 'violin' | 'guitar' | 'glockenspiel' | 'harp' | 'cello';
  /** Path to the audio folder (relative to assets/audio/{type}/) */
  path: string;
  /** Sample notes available (used for pitch-shifting) */
  sampleNotes: string[];
  /** Custom sustain offset added to the user's sustain setting (in seconds). Default: 0 */
  sustainOffset?: number;
  /** 
   * Custom sample mapper key (optional)
   * If not specified, uses default mapper for instrument type
   * Available: 'chromatic', 'naturalNotes', 'fullChromatic'
   */
  customMapper?: string;
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
  
  'grand-classical': {
    id: 'grand-classical',
    name: 'Grand Piano',
    description: 'Rich and mellow grand piano',
    type: 'piano',
    path: 'grand-classical',
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
  
  'flute-pan': {
    id: 'flute-pan',
    name: 'Pan Flute',
    description: 'Smooth pan flute sound',
    type: 'flute',
    path: 'pan',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    sustainOffset: -10,
    characteristics: {
      brightness: 'bright',
      sustain: 'medium',
      attack: 'soft',
    },
  },
  
  'violin-standard': {
    id: 'violin-standard',
    name: 'Violin',
    description: 'Classic string violin sound',
    type: 'violin',
    path: 'standard',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    sustainOffset: -10,
    characteristics: {
      brightness: 'bright',
      sustain: 'long',
      attack: 'medium',
    },
  },
  
  'guitar-classical': {
    id: 'guitar-classical',
    name: 'Classical Guitar',
    description: 'Warm acoustic classical guitar',
    type: 'guitar',
    path: 'classical',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'mellow',
      sustain: 'medium',
      attack: 'sharp',
    },
  },
  
  'guitar-flamenco': {
    id: 'guitar-flamenco',
    name: 'Flamenco Guitar',
    description: 'Passionate Spanish flamenco guitar',
    type: 'guitar',
    path: 'flamenco',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    characteristics: {
      brightness: 'bright',
      sustain: 'short',
      attack: 'sharp',
    },
  },
  
  'glockenspiel-standard': {
    id: 'glockenspiel-standard',
    name: 'Glockenspiel',
    description: 'Bright metallic bell-like percussion',
    type: 'glockenspiel',
    path: 'standard',
    sampleNotes: ['C', 'Ds', 'Fs', 'A'],
    sustainOffset: -10,
    characteristics: {
      brightness: 'bright',
      sustain: 'short',
      attack: 'sharp',
    },
  },
  
  'harp-standard': {
    id: 'harp-standard',
    name: 'Harp',
    description: 'Ethereal plucked string harp',
    type: 'harp',
    path: 'standard',
    sampleNotes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], // Harp uses all natural notes (white keys)
    characteristics: {
      brightness: 'bright',
      sustain: 'medium',
      attack: 'soft',
    },
  },
  
  'cello-standard': {
    id: 'cello-standard',
    name: 'Cello',
    description: 'Rich and warm orchestral cello',
    type: 'cello',
    path: 'standard',
    sampleNotes: ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'], // Full chromatic sampling
    sustainOffset: -8,
    characteristics: {
      brightness: 'mellow',
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
 * Uses the appropriate sample mapper based on instrument type or custom configuration
 * @param soundSet - The sound set configuration
 * @param samples - Record of available sample file paths to their URLs
 * @returns Mapping of keyboard notes to audio URLs
 */
export function buildSampleUrlsMap(
  soundSet: SoundSet,
  samples: Record<string, string>
): Record<string, string> {
  const basePath = `/src/assets/audio/${soundSet.type}/${soundSet.path}`;
  
  // Get the appropriate mapper for this sound set
  // Supports custom mappers per sound set or falls back to instrument type defaults
  const mapper = getMapper(soundSet.type, soundSet.customMapper);
  
  // Delegate to the mapper strategy
  return mapper(basePath, samples);
}
