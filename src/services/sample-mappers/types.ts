/**
 * Sample Mapper Types
 * Defines interfaces for mapping keyboard notes to audio sample URLs
 */

/**
 * Sample mapper function that maps keyboard notes to audio file URLs
 * @param basePath - Base path to the audio samples (e.g., "/src/assets/audio/piano/classical")
 * @param samples - Record of available sample file paths to their URLs
 * @returns Record mapping keyboard notes (e.g., "C4", "D#5") to their audio URLs
 */
export type SampleMapper = (
  basePath: string,
  samples: Record<string, string>
) => Record<string, string>;

/**
 * Configuration for a specific sample pattern
 */
export interface SamplePattern {
  /** Notes available in the sample set (e.g., ['C', 'Ds', 'Fs', 'A']) */
  notes: string[];
  /** Custom mapper function (optional) */
  mapper?: SampleMapper;
}
