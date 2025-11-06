/**
 * Audio Engine Service
 * Uses Tone.js Sampler for realistic piano sounds with pitch-shifting
 * Supports multiple sound sets and dynamic switching
 */

import * as Tone from 'tone';
import { SoundSet, getSoundSet, buildSampleUrlsMap } from './sound-sets';

export class AudioEngine {
  private sampler: Tone.Sampler | null = null;
  private volume: Tone.Volume | null = null;
  private activeNotes: Set<string> = new Set();
  private isLoaded: boolean = false;
  private sustainOffset: number = 10.5; // Extended release offset (like virtualpiano.net)
  private sustainTime: number = 10.5; // Default sustain time (like virtualpiano.net)
  private currentSoundSet: SoundSet;
  private isChangingSoundSet: boolean = false;

  constructor(soundSetId: string = 'classical') {
    this.currentSoundSet = getSoundSet(soundSetId);
    
    // Initialize Tone.js with playback latency for minimal delay (~5ms)
    // Note: latencyHint must be set during context creation
    try {
      // Only create new context if one doesn't exist
      if (typeof Tone.context === 'undefined' || !Tone.context.rawContext) {
        const context = new Tone.Context({ latencyHint: 'playback' });
        Tone.setContext(context);
      }
    } catch (e) {
      // Context already exists, continue with default settings
      console.log('Using existing Tone.js context');
    }
    
    // Resume context immediately (user interaction will have occurred)
    this.resume();
    
    this.initAudio();
  }

  /**
   * Initialize Tone.js Sampler with the current sound set
   * Maps keyboard notes down by one octave to sample files
   * (e.g., C2 → C1.mp3, C3 → C2.mp3, etc.)
   * Uses lazy loading to only load audio files for the current instrument
   */
  private async initAudio(): Promise<void> {
    try {
      // Import audio samples using Vite's lazy glob import
      // This creates a map of import functions instead of eagerly loading all files
      const sampleImporters = import.meta.glob('@/assets/audio/**/*.mp3', { 
        query: '?url',
        import: 'default'
      });
      
      // Build the file path pattern for the current sound set
      const basePath = `/src/assets/audio/${this.currentSoundSet.type}/${this.currentSoundSet.path}`;
      
      // Dynamically load only the files needed for the current sound set
      const samples: Record<string, string> = {};
      const loadPromises: Promise<void>[] = [];
      
      for (const [path, importer] of Object.entries(sampleImporters)) {
        // Check if this file belongs to the current sound set
        if (path.includes(`/audio/${this.currentSoundSet.type}/${this.currentSoundSet.path}/`)) {
          const loadPromise = (importer as () => Promise<string>)().then((url) => {
            samples[path] = url;
          }).catch((error) => {
            console.error(`Failed to load ${path}:`, error);
          });
          loadPromises.push(loadPromise);
        }
      }
      
      // Wait for all required samples to load
      await Promise.all(loadPromises);
      
      // Build the URLs map for the current sound set
      const urlsMap = buildSampleUrlsMap(this.currentSoundSet, samples);
      
      console.log(`Loading ${this.currentSoundSet.name} samples...`, {
        loaded: Object.keys(samples).length,
        urlsMap: Object.keys(urlsMap).length
      });
      
      // Create separate Volume node for better audio control
      if (!this.volume) {
        this.volume = new Tone.Volume(-10);
      }

      // Dispose old sampler if it exists
      if (this.sampler) {
        this.sampler.dispose();
      }

      // Tone.js will pitch-shift from nearest available sample
      this.sampler = new Tone.Sampler({
        urls: urlsMap,        
        curve: "exponential",
        attack: 0,
        release: 4, 
        onload: () => {
          this.isLoaded = true;
          this.isChangingSoundSet = false;
          console.log(`${this.currentSoundSet.name} samples loaded successfully`);
        },
        onerror: (error) => {
          console.error(`Failed to load ${this.currentSoundSet.name} samples:`, error);
          this.isChangingSoundSet = false;
        },
      });

      // Chain: Sampler -> Volume -> Destination
      this.sampler.chain(this.volume, Tone.Destination);

    } catch (error) {
      console.error('Failed to initialize Tone.js sampler:', error);
      this.isChangingSoundSet = false;
    }
  }

  /**
   * Resume audio context (required for user interaction)
   */
  async resume(): Promise<void> {
    if (Tone.context.state === 'suspended') {
      await Tone.context.resume();
    }
  }

  /**
   * Change the sound set and reload samples
   * @param soundSetId - ID of the sound set to load
   */
  async changeSoundSet(soundSetId: string): Promise<void> {
    // Stop all currently playing notes
    this.stopAll();
    
    this.isChangingSoundSet = true;
    this.isLoaded = false;
    this.currentSoundSet = getSoundSet(soundSetId);
    
    // Reinitialize audio with new sound set
    await this.initAudio();
  }

  /**
   * Get the current sound set
   */
  getCurrentSoundSet(): SoundSet {
    return this.currentSoundSet;
  }

  /**
   * Check if sound set is currently being changed
   */
  isChanging(): boolean {
    return this.isChangingSoundSet;
  }

  /**
   * Check if audio is currently loaded and ready
   */
  isReady(): boolean {
    return this.isLoaded && !this.isChangingSoundSet;
  }

  /**
   * Play a note using Tone.Sampler
   * @param note - Musical note (e.g., 'C4', 'D#4')
   * @param frequency - Not used with sampler, kept for API compatibility
   * @param velocity - Velocity value (0.0 to 1.0), defaults to 1.0 (maximum volume)
   */
  playNote(note: string, frequency?: number, velocity: number = 1.0): void {
    if (!this.sampler) {
      console.warn('Sampler not initialized');
      return;
    }

    // Don't trigger duplicate notes
    if (this.activeNotes.has(note)) {
      return;
    }

    // Wait for samples to load before playing
    if (!this.isLoaded || this.isChangingSoundSet) {
      console.warn('Piano samples still loading...');
      return;
    }

    // Clamp velocity to valid range (0.0 to 1.0)
    const clampedVelocity = Math.max(0.0, Math.min(1.0, velocity));

    // Tone.js Sampler will automatically:
    // 1. Find the nearest available sample (C, D#, F#, or A)
    // 2. Apply pitch-shifting algorithm to reach the target note
    // 3. Use Web Audio API to output the sound
    // 4. Apply velocity to control volume (0.0 = silent, 1.0 = max volume)
    this.sampler.triggerAttack(note, undefined, clampedVelocity);
    this.activeNotes.add(note);
  }

  /**
   * Stop playing a note with extended release offset
   */
  stopNote(note: string): void {
    if (!this.sampler || !this.activeNotes.has(note)) {
      return;
    }

    // Use extended release timing like virtualpiano.net
    // Add instrument-specific sustain offset (e.g., -10 for flute/violin)
    const instrumentSustainOffset = this.currentSoundSet.sustainOffset || 0;
    const now = Tone.now();
    this.sampler.triggerRelease(note, now + this.sustainOffset + this.sustainTime + instrumentSustainOffset);
    this.activeNotes.delete(note);
  }

  /**
   * Stop all notes
   */
  stopAll(): void {
    if (!this.sampler) {
      return;
    }

    this.sampler.releaseAll();
    this.activeNotes.clear();
  }

  /**
   * Set master volume (0-1)
   */
  setVolume(volume: number): void {
    if (this.volume) {
      // Convert linear volume to dB
      const dbVolume = 20 * Math.log10(Math.max(0.01, Math.min(1, volume)));
      this.volume.volume.value = dbVolume;
    }
  }

  /**
   * Set note release time for sustain effect (in seconds)
   * Higher values = longer sustain, lower values = shorter sustain
   */
  setSustain(sustainTime: number): void {
    this.sustainTime = sustainTime;
  }

  /**
   * Set the extended release offset (like virtualpiano.net)
   * This adds extra time to the natural release for more realistic decay
   */
  setSustainOffset(offset: number): void {
    this.sustainOffset = Math.max(0, offset);
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopAll();
    if (this.sampler) {
      this.sampler.dispose();
    }
    if (this.volume) {
      this.volume.dispose();
    }
  }
}

// Singleton instance
let audioEngineInstance: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!audioEngineInstance) {
    audioEngineInstance = new AudioEngine();
  }
  return audioEngineInstance;
}
