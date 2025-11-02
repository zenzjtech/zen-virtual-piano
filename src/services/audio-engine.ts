/**
 * Audio Engine Service
 * Handles Web Audio API for synthesizing piano sounds
 */

export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeOscillators: Map<string, { oscillator: OscillatorNode; gain: GainNode }> = new Map();

  constructor() {
    this.initAudio();
  }

  /**
   * Initialize Web Audio API context
   */
  private initAudio(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3; // Master volume
      this.masterGain.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  /**
   * Resume audio context (required for user interaction)
   */
  async resume(): Promise<void> {
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Play a note with given frequency
   */
  playNote(note: string, frequency: number): void {
    if (!this.audioContext || !this.masterGain) {
      console.warn('Audio context not initialized');
      return;
    }

    // Resume context if needed
    this.resume();

    // Don't create duplicate oscillators for the same note
    if (this.activeOscillators.has(note)) {
      return;
    }

    const now = this.audioContext.currentTime;

    // Create oscillator for the note
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine'; // Simple sine wave for MVP
    oscillator.frequency.value = frequency;

    // Create gain node for envelope (ADSR)
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0;

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Attack: Quick fade in
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01);

    // Start oscillator
    oscillator.start(now);

    // Store reference
    this.activeOscillators.set(note, { oscillator, gain: gainNode });
  }

  /**
   * Stop playing a note
   */
  stopNote(note: string): void {
    const active = this.activeOscillators.get(note);
    if (!active || !this.audioContext) {
      return;
    }

    const now = this.audioContext.currentTime;
    const { oscillator, gain } = active;

    // Release: Quick fade out
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.1);

    // Stop oscillator after release
    oscillator.stop(now + 0.1);

    // Clean up
    this.activeOscillators.delete(note);
  }

  /**
   * Stop all notes
   */
  stopAll(): void {
    this.activeOscillators.forEach((_, note) => {
      this.stopNote(note);
    });
  }

  /**
   * Set master volume (0-1)
   */
  setVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopAll();
    if (this.audioContext) {
      this.audioContext.close();
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
