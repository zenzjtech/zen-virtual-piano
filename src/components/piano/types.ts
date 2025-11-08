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
  // Left to right keyboard layout matching Chrome Piano
  // Numbers row (white keys: 1-0, black keys: !@#$%^&*())
  { note: 'C2', keyboardKey: '1', frequency: 65.41, isBlack: false, label: '1' },
  { note: 'C#2', keyboardKey: '!', frequency: 69.30, isBlack: true, label: '!' },
  { note: 'D2', keyboardKey: '2', frequency: 73.42, isBlack: false, label: '2' },
  { note: 'D#2', keyboardKey: '@', frequency: 77.78, isBlack: true, label: '@' },
  { note: 'E2', keyboardKey: '3', frequency: 82.41, isBlack: false, label: '3' },
  { note: 'F2', keyboardKey: '4', frequency: 87.31, isBlack: false, label: '4' },
  { note: 'F#2', keyboardKey: '$', frequency: 92.50, isBlack: true, label: '$' },
  { note: 'G2', keyboardKey: '5', frequency: 98.00, isBlack: false, label: '5' },
  { note: 'G#2', keyboardKey: '%', frequency: 103.83, isBlack: true, label: '%' },
  { note: 'A2', keyboardKey: '6', frequency: 110.00, isBlack: false, label: '6' },
  { note: 'A#2', keyboardKey: '^', frequency: 116.54, isBlack: true, label: '^' },
  { note: 'B2', keyboardKey: '7', frequency: 123.47, isBlack: false, label: '7' },
  { note: 'C3', keyboardKey: '8', frequency: 130.81, isBlack: false, label: '8' },
  { note: 'C#3', keyboardKey: '*', frequency: 138.59, isBlack: true, label: '*' },
  { note: 'D3', keyboardKey: '9', frequency: 146.83, isBlack: false, label: '9' },
  { note: 'D#3', keyboardKey: '(', frequency: 155.56, isBlack: true, label: '(' },
  { note: 'E3', keyboardKey: '0', frequency: 164.81, isBlack: false, label: '0' },
  
  // Top letter row (white keys: q-p, black keys: Q-P)
  { note: 'F3', keyboardKey: 'q', frequency: 174.61, isBlack: false, label: 'q' },
  { note: 'F#3', keyboardKey: 'Q', frequency: 185.00, isBlack: true, label: 'Q' },
  { note: 'G3', keyboardKey: 'w', frequency: 196.00, isBlack: false, label: 'w' },
  { note: 'G#3', keyboardKey: 'W', frequency: 207.65, isBlack: true, label: 'W' },
  { note: 'A3', keyboardKey: 'e', frequency: 220.00, isBlack: false, label: 'e' },
  { note: 'A#3', keyboardKey: 'E', frequency: 233.08, isBlack: true, label: 'E' },
  { note: 'B3', keyboardKey: 'r', frequency: 246.94, isBlack: false, label: 'r' },
  { note: 'C4', keyboardKey: 't', frequency: 261.63, isBlack: false, label: 't' },
  { note: 'C#4', keyboardKey: 'T', frequency: 277.18, isBlack: true, label: 'T' },
  { note: 'D4', keyboardKey: 'y', frequency: 293.66, isBlack: false, label: 'y' },
  { note: 'D#4', keyboardKey: 'Y', frequency: 311.13, isBlack: true, label: 'Y' },
  { note: 'E4', keyboardKey: 'u', frequency: 329.63, isBlack: false, label: 'u' },
  { note: 'F4', keyboardKey: 'i', frequency: 349.23, isBlack: false, label: 'i' },
  { note: 'F#4', keyboardKey: 'I', frequency: 369.99, isBlack: true, label: 'I' },
  { note: 'G4', keyboardKey: 'o', frequency: 392.00, isBlack: false, label: 'o' },
  { note: 'G#4', keyboardKey: 'O', frequency: 415.30, isBlack: true, label: 'O' },
  { note: 'A4', keyboardKey: 'p', frequency: 440.00, isBlack: false, label: 'p' },
  { note: 'A#4', keyboardKey: 'P', frequency: 466.16, isBlack: true, label: 'P' },
  
  // Middle row (white keys: a-l, black keys: A-L)
  { note: 'B4', keyboardKey: 'a', frequency: 493.88, isBlack: false, label: 'a' },
  { note: 'C5', keyboardKey: 's', frequency: 523.25, isBlack: false, label: 's' },
  { note: 'C#5', keyboardKey: 'S', frequency: 554.37, isBlack: true, label: 'S' },
  { note: 'D5', keyboardKey: 'd', frequency: 587.33, isBlack: false, label: 'd' },
  { note: 'D#5', keyboardKey: 'D', frequency: 622.25, isBlack: true, label: 'D' },
  { note: 'E5', keyboardKey: 'f', frequency: 659.25, isBlack: false, label: 'f' },
  { note: 'F5', keyboardKey: 'g', frequency: 698.46, isBlack: false, label: 'g' },
  { note: 'F#5', keyboardKey: 'G', frequency: 739.99, isBlack: true, label: 'G' },
  { note: 'G5', keyboardKey: 'h', frequency: 783.99, isBlack: false, label: 'h' },
  { note: 'G#5', keyboardKey: 'H', frequency: 830.61, isBlack: true, label: 'H' },
  { note: 'A5', keyboardKey: 'j', frequency: 880.00, isBlack: false, label: 'j' },
  { note: 'A#5', keyboardKey: 'J', frequency: 932.33, isBlack: true, label: 'J' },
  { note: 'B5', keyboardKey: 'k', frequency: 987.77, isBlack: false, label: 'k' },
  { note: 'C6', keyboardKey: 'l', frequency: 1046.50, isBlack: false, label: 'l' },
  { note: 'C#6', keyboardKey: 'L', frequency: 1108.73, isBlack: true, label: 'L' },
  
  // Bottom row (white keys: z-m, black keys: Z-M)
  { note: 'D6', keyboardKey: 'z', frequency: 1174.66, isBlack: false, label: 'z' },
  { note: 'D#6', keyboardKey: 'Z', frequency: 1244.51, isBlack: true, label: 'Z' },
  { note: 'E6', keyboardKey: 'x', frequency: 1318.51, isBlack: false, label: 'x' },
  { note: 'F6', keyboardKey: 'c', frequency: 1396.91, isBlack: false, label: 'c' },
  { note: 'F#6', keyboardKey: 'C', frequency: 1479.98, isBlack: true, label: 'C' },
  { note: 'G6', keyboardKey: 'v', frequency: 1567.98, isBlack: false, label: 'v' },
  { note: 'G#6', keyboardKey: 'V', frequency: 1661.22, isBlack: true, label: 'V' },
  { note: 'A6', keyboardKey: 'b', frequency: 1760.00, isBlack: false, label: 'b' },
  { note: 'A#6', keyboardKey: 'B', frequency: 1864.66, isBlack: true, label: 'B' },
  { note: 'B6', keyboardKey: 'n', frequency: 1975.53, isBlack: false, label: 'n' },
  { note: 'C7', keyboardKey: 'm', frequency: 2093.00, isBlack: false, label: 'm' },
];

/**
 * Creates a reverse mapping from keyboard key to piano key
 * Each key is mapped exactly as specified in KEY_MAPPINGS
 */
export function createKeyboardMap(): Map<string, PianoKey> {
  const map = new Map<string, PianoKey>();
  KEY_MAPPINGS.forEach(key => {
    map.set(key.keyboardKey, key);
  });
  return map;
}
