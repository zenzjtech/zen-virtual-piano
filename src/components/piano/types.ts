/**
 * Piano key types and interfaces
 */

export interface PianoKey {
  /** Musical note (e.g., 'C4', 'D#4') */
  note: string;
  /** Keyboard key that triggers this note */
  keyboardKey: string;
  /** Frequency in Hz */
  frequency: number;
  /** Whether this is a black key */
  isBlack: boolean;
  /** Display label on the key */
  label?: string;
}

export interface KeyPressState {
  [note: string]: boolean;
}

export const KEY_MAPPINGS: PianoKey[] = [
  // First octave (C4-B4)
  { note: 'C4', keyboardKey: 'a', frequency: 261.63, isBlack: false, label: 'A' },
  { note: 'C#4', keyboardKey: 'w', frequency: 277.18, isBlack: true, label: 'W' },
  { note: 'D4', keyboardKey: 's', frequency: 293.66, isBlack: false, label: 'S' },
  { note: 'D#4', keyboardKey: 'e', frequency: 311.13, isBlack: true, label: 'E' },
  { note: 'E4', keyboardKey: 'd', frequency: 329.63, isBlack: false, label: 'D' },
  { note: 'F4', keyboardKey: 'f', frequency: 349.23, isBlack: false, label: 'F' },
  { note: 'F#4', keyboardKey: 't', frequency: 369.99, isBlack: true, label: 'T' },
  { note: 'G4', keyboardKey: 'g', frequency: 392.00, isBlack: false, label: 'G' },
  { note: 'G#4', keyboardKey: 'y', frequency: 415.30, isBlack: true, label: 'Y' },
  { note: 'A4', keyboardKey: 'h', frequency: 440.00, isBlack: false, label: 'H' },
  { note: 'A#4', keyboardKey: 'u', frequency: 466.16, isBlack: true, label: 'U' },
  { note: 'B4', keyboardKey: 'j', frequency: 493.88, isBlack: false, label: 'J' },
  
  // Second octave (C5-B5)
  { note: 'C5', keyboardKey: 'k', frequency: 523.25, isBlack: false, label: 'K' },
  { note: 'C#5', keyboardKey: 'o', frequency: 554.37, isBlack: true, label: 'O' },
  { note: 'D5', keyboardKey: 'l', frequency: 587.33, isBlack: false, label: 'L' },
  { note: 'D#5', keyboardKey: 'p', frequency: 622.25, isBlack: true, label: 'P' },
  { note: 'E5', keyboardKey: ';', frequency: 659.25, isBlack: false, label: ';' },
];

/**
 * Creates a reverse mapping from keyboard key to piano key
 */
export function createKeyboardMap(): Map<string, PianoKey> {
  const map = new Map<string, PianoKey>();
  KEY_MAPPINGS.forEach(key => {
    map.set(key.keyboardKey.toLowerCase(), key);
  });
  return map;
}
