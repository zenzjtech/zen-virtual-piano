/**
 * Mapper Registry
 * Central registry for all sample mapping strategies
 * Allows instruments and sound sets to specify their preferred mapper
 */

import { SampleMapper } from './types';
import { chromaticMapper } from './chromatic-mapper';
import { chromaticDirectMapper } from './chromatic-direct-mapper';
import { naturalNotesMapper } from './natural-notes-mapper';
import { fullChromaticMapper } from './full-chromatic-mapper';

/**
 * Registry of available sample mappers
 */
export const MAPPER_REGISTRY: Record<string, SampleMapper> = {
  chromatic: chromaticMapper,
  chromaticDirect: chromaticDirectMapper,
  naturalNotes: naturalNotesMapper,
  fullChromatic: fullChromaticMapper,
};

/**
 * Default mappers for each instrument type
 * Can be overridden per sound set
 */
export const DEFAULT_INSTRUMENT_MAPPERS: Record<string, string> = {
  piano: 'chromatic',
  organ: 'chromatic',
  flute: 'chromatic',
  violin: 'chromatic',
  guitar: 'chromatic',
  glockenspiel: 'chromatic',
  harp: 'naturalNotes',
  cello: 'fullChromatic',
};

/**
 * Get the appropriate mapper for a given instrument type and optional custom mapper key
 */
export function getMapper(
  instrumentType: string,
  customMapperKey?: string
): SampleMapper {
  // Use custom mapper if specified
  if (customMapperKey && MAPPER_REGISTRY[customMapperKey]) {
    return MAPPER_REGISTRY[customMapperKey];
  }
  
  // Fall back to default mapper for instrument type
  const defaultMapperKey = DEFAULT_INSTRUMENT_MAPPERS[instrumentType];
  if (defaultMapperKey && MAPPER_REGISTRY[defaultMapperKey]) {
    return MAPPER_REGISTRY[defaultMapperKey];
  }
  
  // Ultimate fallback: chromatic mapper
  return chromaticMapper;
}
