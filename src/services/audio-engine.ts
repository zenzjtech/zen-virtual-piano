/**
 * Audio Engine Service
 * Uses Tone.js Sampler for realistic piano sounds with pitch-shifting
 */

import * as Tone from 'tone';

export class AudioEngine {
  private sampler: Tone.Sampler | null = null;
  private volume: Tone.Volume | null = null;
  private activeNotes: Set<string> = new Set();
  private isLoaded: boolean = false;
  private sustainOffset: number = 10.5; // Extended release offset (like virtualpiano.net)
  private sustainTime: number = 10.5; // Default sustain time (like virtualpiano.net)

  constructor() {
    // Initialize Tone.js with interactive latency for better responsiveness
    // Note: latencyHint must be set during context creation
    try {
      // Only create new context if one doesn't exist
      if (typeof Tone.context === 'undefined' || !Tone.context.rawContext) {
        const context = new Tone.Context({ latencyHint: 'interactive' });
        Tone.setContext(context);
      }
    } catch (e) {
      // Context already exists, continue with default settings
      console.log('Using existing Tone.js context');
    }
    this.initAudio();
  }

  /**
   * Initialize Tone.js Sampler with classical piano samples
   * Maps keyboard notes down by one octave to sample files
   * (e.g., C2 → C1.mp3, C3 → C2.mp3, etc.)
   */
  private async initAudio(): Promise<void> {
    try {
      // Import all audio samples using Vite's glob import
      // This ensures proper bundling and URL resolution
      const samples = import.meta.glob('@/assets/audio/piano/classical/*.mp3', { 
        eager: true,
        query: '?url',
        import: 'default'
      }) as Record<string, string>;
      
      // Build the URLs map from imported samples
      // Map sample files to notes one octave lower than the file names
      // This means C2 will use C1.mp3, C3 will use C2.mp3, etc.
      const urlsMap: Record<string, string> = {};
      
      // C notes (every octave) - C2 uses C1.mp3, C3 uses C2.mp3, etc.
      urlsMap.C1 = samples['/src/assets/audio/piano/classical/C1.mp3'] || '';
      urlsMap.C2 = samples['/src/assets/audio/piano/classical/C1.mp3'] || '';
      urlsMap.C3 = samples['/src/assets/audio/piano/classical/C2.mp3'] || '';
      urlsMap.C4 = samples['/src/assets/audio/piano/classical/C3.mp3'] || '';
      urlsMap.C5 = samples['/src/assets/audio/piano/classical/C4.mp3'] || '';
      urlsMap.C6 = samples['/src/assets/audio/piano/classical/C5.mp3'] || '';
      urlsMap.C7 = samples['/src/assets/audio/piano/classical/C6.mp3'] || '';
      urlsMap.C8 = samples['/src/assets/audio/piano/classical/C7.mp3'] || '';
      
      // D# (Ds) notes (every minor third from C)
      urlsMap['D#1'] = samples['/src/assets/audio/piano/classical/Ds1.mp3'] || '';
      urlsMap['D#2'] = samples['/src/assets/audio/piano/classical/Ds1.mp3'] || '';
      urlsMap['D#3'] = samples['/src/assets/audio/piano/classical/Ds2.mp3'] || '';
      urlsMap['D#4'] = samples['/src/assets/audio/piano/classical/Ds3.mp3'] || '';
      urlsMap['D#5'] = samples['/src/assets/audio/piano/classical/Ds4.mp3'] || '';
      urlsMap['D#6'] = samples['/src/assets/audio/piano/classical/Ds5.mp3'] || '';
      urlsMap['D#7'] = samples['/src/assets/audio/piano/classical/Ds6.mp3'] || '';
      
      // F# (Fs) notes (tritone from C)
      urlsMap['F#1'] = samples['/src/assets/audio/piano/classical/Fs1.mp3'] || '';
      urlsMap['F#2'] = samples['/src/assets/audio/piano/classical/Fs1.mp3'] || '';
      urlsMap['F#3'] = samples['/src/assets/audio/piano/classical/Fs2.mp3'] || '';
      urlsMap['F#4'] = samples['/src/assets/audio/piano/classical/Fs3.mp3'] || '';
      urlsMap['F#5'] = samples['/src/assets/audio/piano/classical/Fs4.mp3'] || '';
      urlsMap['F#6'] = samples['/src/assets/audio/piano/classical/Fs5.mp3'] || '';
      urlsMap['F#7'] = samples['/src/assets/audio/piano/classical/Fs6.mp3'] || '';
      
      // A notes (major sixth from C)
      urlsMap.A1 = samples['/src/assets/audio/piano/classical/A1.mp3'] || '';
      urlsMap.A2 = samples['/src/assets/audio/piano/classical/A1.mp3'] || '';
      urlsMap.A3 = samples['/src/assets/audio/piano/classical/A2.mp3'] || '';
      urlsMap.A4 = samples['/src/assets/audio/piano/classical/A3.mp3'] || '';
      urlsMap.A5 = samples['/src/assets/audio/piano/classical/A4.mp3'] || '';
      urlsMap.A6 = samples['/src/assets/audio/piano/classical/A5.mp3'] || '';
      urlsMap.A7 = samples['/src/assets/audio/piano/classical/A6.mp3'] || '';
      
      console.log('Loading piano samples...', urlsMap);
      
      // Create separate Volume node for better audio control
      this.volume = new Tone.Volume(-10);

      // Tone.js will pitch-shift from nearest available sample
      this.sampler = new Tone.Sampler({
        urls: urlsMap,        
        curve: "exponential",
        attack: 0,
        release: 4, 
        onload: () => {
          this.isLoaded = true;
          console.log('Piano samples loaded successfully');
        },
        onerror: (error) => {
          console.error('Failed to load piano samples:', error);
        },
      });

      // Chain: Sampler -> Volume -> Destination (like virtualpiano.net)
      this.sampler.chain(this.volume, Tone.Destination);

    } catch (error) {
      console.error('Failed to initialize Tone.js sampler:', error);
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
   * Play a note using Tone.Sampler
   * @param note - Musical note (e.g., 'C4', 'D#4')
   * @param frequency - Not used with sampler, kept for API compatibility
   */
  playNote(note: string, frequency?: number): void {
    if (!this.sampler) {
      console.warn('Sampler not initialized');
      return;
    }

    // Resume context if needed
    this.resume();

    // Don't trigger duplicate notes
    if (this.activeNotes.has(note)) {
      return;
    }

    // Wait for samples to load before playing
    if (!this.isLoaded) {
      console.warn('Piano samples still loading...');
      return;
    }

    // Tone.js Sampler will automatically:
    // 1. Find the nearest available sample (C, D#, F#, or A)
    // 2. Apply pitch-shifting algorithm to reach the target note
    // 3. Use Web Audio API to output the sound
    this.sampler.triggerAttack(note);
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
    const now = Tone.now();
    this.sampler.triggerRelease(note, now + this.sustainOffset + this.sustainTime);
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
