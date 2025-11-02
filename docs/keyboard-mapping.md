# Keyboard Mapping Reference

## 4-Octave Layout (C2 to C6)

### Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    Zen Virtual Piano                         │
│                   49 Keys • 4 Octaves                        │
└─────────────────────────────────────────────────────────────┘

Numbers Row:
  1     2   3     4   5     6   7     8   9   0       -   =
┌───┬───────┬───────┬───────┬───────┬───────┬───────────┬───────┐
│ F5│ C#3   │ D#3   │ F#5   │ F#3   │ G#3   │ A#3       │ C#4 D#4 F#4│
└───┴───────┴───────┴───────┴───────┴───────┴───────────┴───────┘

Top Letter Row:
  Q   W   E   R   T   Y   U   I   O   P   [   ]
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│C3 │D3 │E3 │F3 │G3 │A3 │B3 │C4 │D4 │E4 │F4 │G4 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

Middle Row:
  A       S   D       F       G   H       J       K   L   ;
┌───┬───────┬───────┬───┬───────┬───────┬───────┬───┬───────┬───┐
│C5 │ C#2   │ D#2   │E5 │ F#2   │ G#2   │ A#2   │D5 │ C#5 D#5│
└───┴───────┴───────┴───┴───────┴───────┴───────┴───┴───────┴───┘

Bottom Row:
  Z   X   C   V   B   N   M       ,       .       /       '
┌───┬───┬───┬───┬───┬───┬───┬───────┬───────┬───────┬───────┐
│C2 │D2 │E2 │F2 │G2 │A2 │B2 │   A5  │  A#5  │   B5  │   C6  │
└───┴───┴───┴───┴───┴───┴───┴───────┴───────┴───────┴───────┘
```

## Complete Key Mappings

### Octave 1: C2-B2 (Lowest)
**Bottom Row Pattern**
- **White Keys**: `Z` `X` `C` `V` `B` `N` `M`
- **Black Keys**: `S` `D` `G` `H` `J`

| Key | Note | Frequency | Type  |
|-----|------|-----------|-------|
| Z   | C2   | 65.41 Hz  | White |
| S   | C#2  | 69.30 Hz  | Black |
| X   | D2   | 73.42 Hz  | White |
| D   | D#2  | 77.78 Hz  | Black |
| C   | E2   | 82.41 Hz  | White |
| V   | F2   | 87.31 Hz  | White |
| G   | F#2  | 92.50 Hz  | Black |
| B   | G2   | 98.00 Hz  | White |
| H   | G#2  | 103.83 Hz | Black |
| N   | A2   | 110.00 Hz | White |
| J   | A#2  | 116.54 Hz | Black |
| M   | B2   | 123.47 Hz | White |

### Octave 2: C3-B3 (Mid-Low)
**Top Letter Row + Number Keys**
- **White Keys**: `Q` `W` `E` `R` `T` `Y` `U`
- **Black Keys**: `2` `3` `5` `6` `7`

| Key | Note | Frequency | Type  |
|-----|------|-----------|-------|
| Q   | C3   | 130.81 Hz | White |
| 2   | C#3  | 138.59 Hz | Black |
| W   | D3   | 146.83 Hz | White |
| 3   | D#3  | 155.56 Hz | Black |
| E   | E3   | 164.81 Hz | White |
| R   | F3   | 174.61 Hz | White |
| 5   | F#3  | 185.00 Hz | Black |
| T   | G3   | 196.00 Hz | White |
| 6   | G#3  | 207.65 Hz | Black |
| Y   | A3   | 220.00 Hz | White |
| 7   | A#3  | 233.08 Hz | Black |
| U   | B3   | 246.94 Hz | White |

### Octave 3: C4-B4 (Middle)
**Right Side Keys**
- **White Keys**: `I` `O` `P` `[` `]`
- **Black Keys**: `9` `0` `=`

| Key | Note | Frequency | Type  |
|-----|------|-----------|-------|
| I   | C4   | 261.63 Hz | White |
| 9   | C#4  | 277.18 Hz | Black |
| O   | D4   | 293.66 Hz | White |
| 0   | D#4  | 311.13 Hz | Black |
| P   | E4   | 329.63 Hz | White |
| [   | F4   | 349.23 Hz | White |
| =   | F#4  | 369.99 Hz | Black |
| ]   | G4   | 392.00 Hz | White |

### Octave 4: C5-C6 (High)
**Mixed Layout**
- **White Keys**: `A` `K` `F` `,` `/` `'`
- **Black Keys**: `L` `;` `1` `4` `8` `-` `.`

| Key | Note | Frequency  | Type  |
|-----|------|------------|-------|
| A   | C5   | 523.25 Hz  | White |
| L   | C#5  | 554.37 Hz  | Black |
| K   | D5   | 587.33 Hz  | White |
| ;   | D#5  | 622.25 Hz  | Black |
| F   | E5   | 659.25 Hz  | White |
| 1   | F5   | 698.46 Hz  | White |
| 4   | F#5  | 739.99 Hz  | Black |
| 8   | G5   | 783.99 Hz  | White |
| -   | G#5  | 830.61 Hz  | Black |
| ,   | A5   | 880.00 Hz  | White |
| .   | A#5  | 932.33 Hz  | Black |
| /   | B5   | 987.77 Hz  | White |
| '   | C6   | 1046.50 Hz | White |

## Quick Reference by Key Type

### All White Keys (29 total)
```
Z X C V B N M  (C2-B2)
Q W E R T Y U  (C3-B3)
I O P [ ]      (C4-G4)
A K F , / '    (C5-C6)
1 8            (F5, G5)
```

### All Black Keys (20 total)
```
S D G H J      (C#2-A#2)
2 3 5 6 7      (C#3-A#3)
9 0 =          (C#4-F#4)
L ; 4 - .      (C#5-A#5)
```

## Tips for Playing

1. **Home Row Position**: Rest fingers on `A S D F` for octave 1 access
2. **Number Keys**: Use for mid-range sharps (octave 2)
3. **Top Row**: Natural white keys progression (C3-B3)
4. **Right Hand**: Upper octaves (`I O P [ ]` for C4-G4)
5. **Full Range**: Span from `Z` (lowest) to `'` (highest)

## Memory Aids

- **Low Bass**: Bottom keyboard row (Z-M)
- **Main Melody**: Top letter row (Q-U)  
- **High Notes**: Right side + scattered (I, O, P, A, K, etc.)
- **Sharps Pattern**: Numbers for mid-range, letters for extremes

## Common Scales

### C Major Scale (White keys only)
- **C2**: Z X C V B N M
- **C3**: Q W E R T Y U
- **C4**: I O P [ ]
- **C5**: A K F

### Chromatic Scale (All keys)
Starting from C2: `Z S X D C V G B H N J M...`

---

**Note**: This layout is inspired by virtualpiano.net's standard mapping, optimized for QWERTY keyboards.
