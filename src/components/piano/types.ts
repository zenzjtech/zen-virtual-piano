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
  // Octave 1: C2-B2 (Bottom row: z-m)
  { note: 'C2', keyboardKey: 'z', frequency: 65.41, isBlack: false, label: 'Z' },
  { note: 'C#2', keyboardKey: 's', frequency: 69.30, isBlack: true, label: 'S' },
  { note: 'D2', keyboardKey: 'x', frequency: 73.42, isBlack: false, label: 'X' },
  { note: 'D#2', keyboardKey: 'd', frequency: 77.78, isBlack: true, label: 'D' },
  { note: 'E2', keyboardKey: 'c', frequency: 82.41, isBlack: false, label: 'C' },
  { note: 'F2', keyboardKey: 'v', frequency: 87.31, isBlack: false, label: 'V' },
  { note: 'F#2', keyboardKey: 'g', frequency: 92.50, isBlack: true, label: 'G' },
  { note: 'G2', keyboardKey: 'b', frequency: 98.00, isBlack: false, label: 'B' },
  { note: 'G#2', keyboardKey: 'h', frequency: 103.83, isBlack: true, label: 'H' },
  { note: 'A2', keyboardKey: 'n', frequency: 110.00, isBlack: false, label: 'N' },
  { note: 'A#2', keyboardKey: 'j', frequency: 116.54, isBlack: true, label: 'J' },
  { note: 'B2', keyboardKey: 'm', frequency: 123.47, isBlack: false, label: 'M' },
  
  // Octave 2: C3-B3 (Top letters: q-])
  { note: 'C3', keyboardKey: 'q', frequency: 130.81, isBlack: false, label: 'Q' },
  { note: 'C#3', keyboardKey: '2', frequency: 138.59, isBlack: true, label: '2' },
  { note: 'D3', keyboardKey: 'w', frequency: 146.83, isBlack: false, label: 'W' },
  { note: 'D#3', keyboardKey: '3', frequency: 155.56, isBlack: true, label: '3' },
  { note: 'E3', keyboardKey: 'e', frequency: 164.81, isBlack: false, label: 'E' },
  { note: 'F3', keyboardKey: 'r', frequency: 174.61, isBlack: false, label: 'R' },
  { note: 'F#3', keyboardKey: '5', frequency: 185.00, isBlack: true, label: '5' },
  { note: 'G3', keyboardKey: 't', frequency: 196.00, isBlack: false, label: 'T' },
  { note: 'G#3', keyboardKey: '6', frequency: 207.65, isBlack: true, label: '6' },
  { note: 'A3', keyboardKey: 'y', frequency: 220.00, isBlack: false, label: 'Y' },
  { note: 'A#3', keyboardKey: '7', frequency: 233.08, isBlack: true, label: '7' },
  { note: 'B3', keyboardKey: 'u', frequency: 246.94, isBlack: false, label: 'U' },
  
  // Octave 3: C4-B4 (Middle: i-/)
  { note: 'C4', keyboardKey: 'i', frequency: 261.63, isBlack: false, label: 'I' },
  { note: 'C#4', keyboardKey: '9', frequency: 277.18, isBlack: true, label: '9' },
  { note: 'D4', keyboardKey: 'o', frequency: 293.66, isBlack: false, label: 'O' },
  { note: 'D#4', keyboardKey: '0', frequency: 311.13, isBlack: true, label: '0' },
  { note: 'E4', keyboardKey: 'p', frequency: 329.63, isBlack: false, label: 'P' },
  { note: 'F4', keyboardKey: '[', frequency: 349.23, isBlack: false, label: '[' },
  { note: 'F#4', keyboardKey: '=', frequency: 369.99, isBlack: true, label: '=' },
  { note: 'G4', keyboardKey: ']', frequency: 392.00, isBlack: false, label: ']' },
  
  // Octave 4: C5-C6 (Extended range)
  { note: 'C5', keyboardKey: 'a', frequency: 523.25, isBlack: false, label: 'A' },
  { note: 'C#5', keyboardKey: 'l', frequency: 554.37, isBlack: true, label: 'L' },
  { note: 'D5', keyboardKey: 'k', frequency: 587.33, isBlack: false, label: 'K' },
  { note: 'D#5', keyboardKey: ';', frequency: 622.25, isBlack: true, label: ';' },
  { note: 'E5', keyboardKey: 'f', frequency: 659.25, isBlack: false, label: 'F' },
  { note: 'F5', keyboardKey: '1', frequency: 698.46, isBlack: false, label: '1' },
  { note: 'F#5', keyboardKey: '4', frequency: 739.99, isBlack: true, label: '4' },
  { note: 'G5', keyboardKey: '8', frequency: 783.99, isBlack: false, label: '8' },
  { note: 'G#5', keyboardKey: '-', frequency: 830.61, isBlack: true, label: '-' },
  { note: 'A5', keyboardKey: ',', frequency: 880.00, isBlack: false, label: ',' },
  { note: 'A#5', keyboardKey: '.', frequency: 932.33, isBlack: true, label: '.' },
  { note: 'B5', keyboardKey: '/', frequency: 987.77, isBlack: false, label: '/' },
  { note: 'C6', keyboardKey: "'", frequency: 1046.50, isBlack: false, label: "'" },
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
