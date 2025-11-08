# Sample Mapping Architecture

## Overview

The sample mapping system uses a **Strategy Pattern** to handle different audio file naming conventions across instruments. This allows each instrument type (or even individual sound sets) to define their own mapping logic.

## Architecture

### Components

```
src/services/
├── sample-mappers/
│   ├── types.ts                    # Type definitions
│   ├── chromatic-mapper.ts         # Chromatic pattern (C, D#, F#, A)
│   ├── natural-notes-mapper.ts     # Natural notes (A, B, C, D, E, F, G)
│   ├── mapper-registry.ts          # Central registry & selection logic
│   └── index.ts                    # Public exports
└── sound-sets.ts                   # Sound set configurations
```

### Flow

1. **Sound Set Definition** → Specifies `type` and optional `customMapper`
2. **buildSampleUrlsMap()** → Calls `getMapper()` with type and customMapper
3. **getMapper()** → Selects appropriate mapper from registry
4. **Mapper Strategy** → Maps keyboard notes to audio file URLs

## Mappers

### Chromatic Mapper
**Pattern**: C, D# (Ds), F# (Fs), A  
**Used by**: Piano, organ, flute, violin, guitar, glockenspiel  
**File naming**: `C1.mp3`, `Ds2.mp3`, `Fs3.mp3`, `A4.mp3`

### Natural Notes Mapper
**Pattern**: A, B, C, D, E, F, G (all white keys)  
**Used by**: Harp  
**File naming**: `A2.mp3`, `B3.mp3`, `C5.mp3`, `D6.mp3`, etc.

## Adding a New Mapper

### 1. Create the Mapper Function

```typescript
// src/services/sample-mappers/my-custom-mapper.ts
import { SampleMapper } from './types';

export const myCustomMapper: SampleMapper = (basePath, samples) => {
  const urlsMap: Record<string, string> = {};
  
  // Define your mapping logic
  // Example: Map all C notes to C4.mp3
  urlsMap.C1 = samples[`${basePath}/C4.mp3`] || '';
  urlsMap.C2 = samples[`${basePath}/C4.mp3`] || '';
  // ... continue for all notes
  
  return urlsMap;
};
```

### 2. Register the Mapper

```typescript
// src/services/sample-mappers/mapper-registry.ts
import { myCustomMapper } from './my-custom-mapper';

export const MAPPER_REGISTRY: Record<string, SampleMapper> = {
  chromatic: chromaticMapper,
  naturalNotes: naturalNotesMapper,
  myCustom: myCustomMapper, // Add here
};
```

### 3. Export from Index

```typescript
// src/services/sample-mappers/index.ts
export * from './my-custom-mapper';
```

### 4. Use in Sound Set

```typescript
// src/services/sound-sets.ts
'my-instrument': {
  id: 'my-instrument',
  name: 'My Custom Instrument',
  type: 'piano',
  path: 'custom',
  sampleNotes: ['C', 'E', 'G'],
  customMapper: 'myCustom', // Use custom mapper
  characteristics: { ... }
}
```

## Per-Instrument vs Per-Sound-Set Mapping

### Default Per-Instrument
By default, each instrument type uses a predefined mapper:
```typescript
const DEFAULT_INSTRUMENT_MAPPERS = {
  piano: 'chromatic',
  harp: 'naturalNotes',
  // ...
};
```

### Override Per-Sound-Set
Individual sound sets can override with `customMapper`:
```typescript
'classical-piano': {
  type: 'piano',
  customMapper: 'chromatic', // Uses default
  // ...
},
'special-piano': {
  type: 'piano',
  customMapper: 'myCustom', // Overrides default!
  // ...
}
```

## Example: Different Sample Sets for Sub-Instruments

```typescript
// Classical piano with standard chromatic pattern
'classical-piano': {
  type: 'piano',
  path: 'classical',
  sampleNotes: ['C', 'Ds', 'Fs', 'A'],
  // Uses default 'chromatic' mapper
},

// Jazz piano with different sample pattern
'jazz-piano': {
  type: 'piano',
  path: 'jazz',
  sampleNotes: ['C', 'E', 'G', 'Bb'],
  customMapper: 'jazzChords', // Custom mapper for jazz voicings
}
```

## Benefits

1. **Extensibility** - Easy to add new mapping patterns
2. **Maintainability** - Each mapper is isolated and testable
3. **Flexibility** - Per-sound-set customization without affecting others
4. **Clarity** - Clean separation between configuration and logic
5. **Scalability** - No if-else chains, handles infinite instruments

## Migration Guide

### Before (Hard-coded)
```typescript
if (soundSet.type === 'harp') {
  // 100+ lines of hardcoded mapping
} else {
  // Another 100+ lines
}
```

### After (Strategy Pattern)
```typescript
const mapper = getMapper(soundSet.type, soundSet.customMapper);
return mapper(basePath, samples);
```

## Testing

Each mapper can be tested in isolation:
```typescript
import { chromaticMapper } from './chromatic-mapper';

const mockSamples = {
  '/audio/piano/C1.mp3': 'url1',
  '/audio/piano/Ds1.mp3': 'url2',
};

const result = chromaticMapper('/audio/piano', mockSamples);
expect(result.C1).toBe('url1');
```
