/**
 * Utility functions for mapping instruments to their corresponding image assets
 */

import pianoImg from '@/assets/image/instrument/all/piano.png';
import organImg from '@/assets/image/instrument/all/organ.png';
import harmoniumImg from '@/assets/image/instrument/all/harmonium.png';
import violinImg from '@/assets/image/instrument/all/violin.png';
import acousticGuitarImg from '@/assets/image/instrument/all/accoustic-guitar.png';
import electricGuitarImg from '@/assets/image/instrument/all/electric-guitar.png';
import nylonGuitarImg from '@/assets/image/instrument/all/nylon-guitar.png';
import electricBassImg from '@/assets/image/instrument/all/electric-bass-guitar.png';
import saxophoneImg from '@/assets/image/instrument/all/saxophone.png';
import harpImg from '@/assets/image/instrument/all/harp.png';

/**
 * Maps instrument sound set ID to its corresponding image
 */
export function getInstrumentImage(soundSetId: string): string {
  const imageMap: Record<string, string> = {
    // Piano
    'classical': pianoImg,
    'grand-classical': pianoImg,
    
    // Organ
    'organ-standard': organImg,
    'organ-harmonium': harmoniumImg,
    
    // Violin
    'violin-standard': violinImg,
    
    // Guitar
    'guitar-acoustic': acousticGuitarImg,
    'guitar-electric': electricGuitarImg,
    'guitar-nylon': nylonGuitarImg,
    'guitar-bass-electric': electricBassImg,
    
    // Saxophone
    'saxophone-standard': saxophoneImg,
    
    // Harp
    'harp-standard': harpImg,
    
    // Cello (fallback to violin image since no cello image exists)
    'cello-standard': violinImg,
  };
  
  return imageMap[soundSetId] || pianoImg; // Default to piano image
}

/**
 * Maps instrument type to a default image
 */
export function getInstrumentImageByType(type: string): string {
  const typeMap: Record<string, string> = {
    'piano': pianoImg,
    'organ': organImg,
    'violin': violinImg,
    'guitar': acousticGuitarImg,
    'saxophone': saxophoneImg,
    'harp': harpImg,
    'cello': violinImg,
  };
  
  return typeMap[type] || pianoImg;
}
