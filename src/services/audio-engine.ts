/**
 * Audio Engine Service
 * Uses Tone.js Sampler for realistic piano sounds with pitch-shifting
 * Supports multiple sound sets and dynamic switching
 */

import * as Tone from 'tone';
import { SoundSet, getSoundSet, buildSampleUrlsMap } from './sound-sets';
import { isExtension } from '../utils/env';

// Type declarations for Electron API
declare global {
  interface Window {
    api?: {
      loadAudioFile: (filePath: string) => Promise<string>;
    };
  }
}

export class AudioEngine {
  private sampler: Tone.Sampler | null = null;
  private volume: Tone.Volume | null = null;
  private activeNotes: Set<string> = new Set();
  private isLoaded: boolean = false;
  private sustainOffset: number = 10.5; // Extended release offset (like virtualpiano.net)
  private sustainTime: number = 10.5; // Default sustain time (like virtualpiano.net)
  private currentSoundSet: SoundSet;
  private isChangingSoundSet: boolean = false;
  private initPromise: Promise<void> | null = null;
  private initAbortController: AbortController | null = null;

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
    
    this.initPromise = this.initAudio();
  }

  /**
   * Initialize Tone.js Sampler with the current sound set
   * Maps keyboard notes down by one octave to sample files
   * (e.g., C2 → C1.mp3, C3 → C2.mp3, etc.)
   * Uses lazy loading to only load audio files for the current instrument
   */
  private async initAudio(): Promise<void> {
    // Abort any previous init in progress
    if (this.initAbortController) {
      this.initAbortController.abort();
    }
    this.initAbortController = new AbortController();
    const abortSignal = this.initAbortController;
    
    try {
      let urlsMap: Record<string, string>;

      if (isExtension()) {
        // Browser extension: Use Vite's import.meta.glob
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
          if (path.includes(`${basePath}/`)) {
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
        
        // Check if this init was aborted (another changeSoundSet was called)
        if (abortSignal.signal.aborted) {
          return;
        }
      
        // Build the URLs map for the current sound set
        urlsMap = buildSampleUrlsMap(this.currentSoundSet, samples);
      } else {
        // Electron: Use IPC approach
        if (!window.api || !window.api.loadAudioFile) {
          console.error('Electron API not available. window.api:', window.api);
          throw new Error('Electron audio loading API not available');
        }
        urlsMap = await this.buildElectronUrlsMap();
      }
      
      console.log(`Loading ${this.currentSoundSet.name} samples...`, {
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
          // Ignore callbacks from aborted inits
          if (abortSignal.signal.aborted) {
            return;
          }
          this.isLoaded = true;
          this.isChangingSoundSet = false;
          console.log(`${this.currentSoundSet.name} samples loaded successfully`);
        },
        onerror: (error) => {
          // Ignore errors from aborted inits (sound set was changed mid-load)
          if (abortSignal.signal.aborted) {
            return;
          }
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
    this.initPromise = this.initAudio();
    await this.initPromise;
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
      console.log('Sampler not initialized');
      return;
    }

    // Don't trigger duplicate notes
    if (this.activeNotes.has(note)) {
      return;
    }

    // Wait for samples to load before playing
    if (!this.isLoaded || this.isChangingSoundSet) {
      console.log('Piano samples still loading...');
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
   * Try to load audio files via URLs (for Electron with Vite dev server)
   */
  private async tryLoadViaUrls(): Promise<Record<string, string>> {
    const urlsMap: Record<string, string> = {};
    const basePath = `http://localhost:5173/@shared/assets/audio/${this.currentSoundSet.type}/${this.currentSoundSet.path}`;

    // For each sample note in the sound set, create URLs for all octaves (2-7)
    // This matches the available sample files and Tone.js expectations
    for (const note of this.currentSoundSet.sampleNotes) {
      for (let octave = 2; octave <= 7; octave++) {
        const fileName = `${note}${octave}.mp3`;
        const url = `${basePath}/${fileName}`;
        // Convert 's' suffix to '#' for Tone.js notation (Ds -> D#, Fs -> F#)
        const toneNote = note.replace('s', '#');
        urlsMap[`${toneNote}${octave}`] = url;
      }
    }

    // Test if URLs are accessible by trying to fetch one
    const testUrl = Object.values(urlsMap)[0];
    try {
      const response = await fetch(testUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('URL loading test failed:', error);
      throw error;
    }

    return urlsMap;
  }

  /**
   * Build URLs map for Electron by loading audio files via IPC
   * This bypasses Vite's import.meta.glob which doesn't work in Electron
   */
  private async buildElectronUrlsMap(): Promise<Record<string, string>> {
    const urlsMap: Record<string, string> = {};
    const basePath = `assets/audio/${this.currentSoundSet.type}/${this.currentSoundSet.path}`;

    // For each sample note in the sound set, load files for all octaves (2-7)
    const loadPromises: Promise<void>[] = [];

    for (const note of this.currentSoundSet.sampleNotes) {
      for (let octave = 2; octave <= 7; octave++) {
        const fileName = `${note}${octave}.mp3`;
        const filePath = `${basePath}/${fileName}`;
        // Convert 's' suffix to '#' for Tone.js notation (Ds -> D#, Fs -> F#)
        const toneNote = note.replace('s', '#');
        const toneKey = `${toneNote}${octave}`;

        const loadPromise = window.api!.loadAudioFile(filePath)
          .then((dataUrl: string) => {
            urlsMap[toneKey] = dataUrl;
          })
          .catch((error: any) => {
            console.error(`Failed to load ${filePath}:`, error);
          });
        
        loadPromises.push(loadPromise);
      }
    }

    // Wait for all files to load
    await Promise.all(loadPromises);

    return urlsMap;
  }
}

// Singleton instance
let audioEngineInstance: AudioEngine | null = null;

export function getAudioEngine(soundSetId?: string): AudioEngine {
  if (!audioEngineInstance) {
    audioEngineInstance = new AudioEngine(soundSetId);
  } else if (soundSetId && audioEngineInstance.getCurrentSoundSet().id !== soundSetId) {
    // If instance exists but soundSetId differs, change the sound set
    audioEngineInstance.changeSoundSet(soundSetId);
  }
  return audioEngineInstance;
}
