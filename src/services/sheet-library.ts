/**
 * Built-in Sheet Music Library
 * 
 * Contains popular songs in Virtual Piano notation format
 */

import type { MusicSheet } from '@/components/piano/music-sheet/types';
import { parseVPNotation, createPages, estimateDuration } from './sheet-parser';

/**
 * Raw sheet data (notation only)
 */
const SHEET_DATA = [
  {
    id: 'twinkle-twinkle',
    title: 'Twinkle Twinkle Little Star',
    artist: 'Traditional',
    difficulty: 'easy' as const,
    tempo: 100,
    timeSignature: '4/4',
    tags: ['nursery rhyme', 'classical', 'beginner'],
    notation: 'tt oo pp o | uu yy tt | oo oo uu u | oo oo uu u | pp pp uu u | yy yy tt | tt oo pp o | uu yy tt',
  },
  {
    id: 'happy-birthday',
    title: 'Happy Birthday',
    artist: 'Traditional',
    difficulty: 'easy' as const,
    tempo: 120,
    timeSignature: '3/4',
    tags: ['celebration', 'popular', 'beginner'],
    notation: 'tt t y t i u | tt t y t o i | tt t p a i u y | ss s a i o i',
  },
  {
    id: 'jingle-bells',
    title: 'Jingle Bells',
    artist: 'James Lord Pierpont',
    difficulty: 'easy' as const,
    tempo: 140,
    timeSignature: '4/4',
    tags: ['christmas', 'holiday', 'popular'],
    notation: 'uuu uuu | u t rr u- | iii iu yt | uuu uuu | u t rr u- | iii iu tt y r',
  },
  {
    id: 'ode-to-joy',
    title: 'Ode to Joy',
    artist: 'Ludwig van Beethoven',
    difficulty: 'easy' as const,
    tempo: 120,
    timeSignature: '4/4',
    tags: ['classical', 'beethoven', 'popular'],
    notation: 'uu i o | o i u t | tt u u | uu i o | o i u t | tt t t',
  },
  {
    id: 'fur-elise',
    title: 'Für Elise',
    artist: 'Ludwig van Beethoven',
    difficulty: 'medium' as const,
    tempo: 120,
    timeSignature: '3/8',
    tags: ['classical', 'beethoven', 'popular'],
    notation: 'uY uY u h d s a | t u y | r y u | t u t | uY uY u h d s a | t u y | r y d s',
  },
  {
    id: 'canon-in-d',
    title: 'Canon in D',
    artist: 'Johann Pachelbel',
    difficulty: 'medium' as const,
    tempo: 100,
    timeSignature: '4/4',
    tags: ['classical', 'pachelbel', 'wedding'],
    notation: 's a i u y t r e | s a i u y t r e | s d f a s d f d | s a i a s f d s',
  },
  {
    id: 'let-it-be',
    title: 'Let It Be',
    artist: 'The Beatles',
    difficulty: 'medium' as const,
    tempo: 72,
    timeSignature: '4/4',
    tags: ['rock', 'beatles', 'popular'],
    notation: 'uyt uyt uyt r | uyt uyt uyt | iu iu yt | tu tu yt | uyt uyt uyt r',
  },
  {
    id: 'my-heart-will-go-on',
    title: 'My Heart Will Go On',
    artist: 'Céline Dion',
    difficulty: 'medium' as const,
    tempo: 100,
    timeSignature: '4/4',
    tags: ['pop', 'movie', 'titanic'],
    notation: 'sss sss | sdd dss | saa asa | sdd dss | sss sss | sdd dss | saaa apo',
  },
  {
    id: 'river-flows-in-you',
    title: 'River Flows in You',
    artist: 'Yiruma',
    difficulty: 'hard' as const,
    tempo: 120,
    timeSignature: '4/4',
    tags: ['contemporary', 'yiruma', 'romantic'],
    notation: 'sdf sdf sdf | asd asd asd | sdf sdf dsa | poi poi oiu | sdf sdf sdf',
  },
  {
    id: 'kiss-the-rain',
    title: 'Kiss the Rain',
    artist: 'Yiruma',
    difficulty: 'hard' as const,
    tempo: 96,
    timeSignature: '4/4',
    tags: ['contemporary', 'yiruma', 'romantic'],
    notation: 'asd asd asd | poi poi oiu | asd asd dsa | iop iop poa',
  },
  {
    id: 'mary-had-a-little-lamb',
    title: 'Mary Had a Little Lamb',
    artist: 'Traditional',
    difficulty: 'easy' as const,
    tempo: 120,
    timeSignature: '4/4',
    tags: ['nursery rhyme', 'traditional', 'beginner'],
    notation: 'uyt t | uuu | yyy | uoo | uyt t | uuu uut yyu',
  },
  {
    id: 'london-bridge',
    title: 'London Bridge Is Falling Down',
    artist: 'Traditional',
    difficulty: 'easy' as const,
    tempo: 140,
    timeSignature: '2/4',
    tags: ['nursery rhyme', 'traditional', 'beginner'],
    notation: 'yut uy | trt y | iu yt | yut uy | trt y',
  },
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    artist: 'John Newton',
    difficulty: 'easy' as const,
    tempo: 80,
    timeSignature: '3/4',
    tags: ['hymn', 'traditional', 'religious'],
    notation: 'tu uyt | ut r | tu uyt | ur t | ui iop | oi u | tu uyt',
  },
  {
    id: 'moonlight-sonata',
    title: 'Moonlight Sonata',
    artist: 'Ludwig van Beethoven',
    difficulty: 'hard' as const,
    tempo: 60,
    timeSignature: '4/4',
    tags: ['classical', 'beethoven', 'dramatic'],
    notation: 'iuyt iuyt | iuyt iuyt | ouyt ouyt | ouyt ouyt | iuyt iuyt',
  },
  {
    id: 'chopsticks',
    title: 'Chopsticks',
    artist: 'Euphemia Allen',
    difficulty: 'easy' as const,
    tempo: 120,
    timeSignature: '3/4',
    tags: ['novelty', 'popular', 'beginner'],
    notation: 'ss ss ss | dd dd dd | ff ff ff | dd dd dd | ss ss ss',
  },
  {
    id: 'when-the-saints',
    title: 'When the Saints Go Marching In',
    artist: 'Traditional',
    difficulty: 'easy' as const,
    tempo: 140,
    timeSignature: '4/4',
    tags: ['jazz', 'traditional', 'popular'],
    notation: 'tu i | o | tu i | o | tu i | o iu | ytt',
  },
  {
    id: 'greensleeves',
    title: 'Greensleeves',
    artist: 'Traditional',
    difficulty: 'medium' as const,
    tempo: 90,
    timeSignature: '6/8',
    tags: ['renaissance', 'traditional', 'classical'],
    notation: 'rt uui iop | aso iut | rt uui iop | as r',
  },
  {
    id: 'take-me-home',
    title: 'Take Me Home, Country Roads',
    artist: 'John Denver',
    difficulty: 'medium' as const,
    tempo: 80,
    timeSignature: '4/4',
    tags: ['country', 'folk', 'popular'],
    notation: 'uyt uyt | uio poi | uyt uyt | uio oi',
  },
  {
    id: 'yankee-doodle',
    title: 'Yankee Doodle',
    artist: 'Traditional',
    difficulty: 'easy' as const,
    tempo: 120,
    timeSignature: '2/4',
    tags: ['patriotic', 'traditional', 'american'],
    notation: 'tuyt y | trt y | tuyt o | i | tuyt y | trt y | tu r t',
  },
  {
    id: 'auld-lang-syne',
    title: 'Auld Lang Syne',
    artist: 'Traditional',
    difficulty: 'easy' as const,
    tempo: 100,
    timeSignature: '4/4',
    tags: ['new year', 'traditional', 'scottish'],
    notation: 'tu uyu | yui u | tu uuy | trt | tu uyu | yui u',
  },
];

/**
 * Parse all sheets and create full MusicSheet objects
 */
export function getBuiltInSheets(): MusicSheet[] {
  return SHEET_DATA.map(data => {
    const parsed = parseVPNotation(data.notation, data.tempo);
    const pages = createPages(parsed.measures);
    const durationSeconds = estimateDuration(parsed.measures, data.tempo);
    
    return {
      ...data,
      pages,
      durationSeconds,
    };
  });
}

/**
 * Get a single sheet by ID
 */
export function getSheetById(id: string): MusicSheet | undefined {
  const sheets = getBuiltInSheets();
  return sheets.find(sheet => sheet.id === id);
}

/**
 * Search sheets by query
 */
export function searchSheets(query: string): MusicSheet[] {
  const sheets = getBuiltInSheets();
  const lowerQuery = query.toLowerCase();
  
  return sheets.filter(sheet =>
    sheet.title.toLowerCase().includes(lowerQuery) ||
    sheet.artist.toLowerCase().includes(lowerQuery) ||
    sheet.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get sheets by difficulty
 */
export function getSheetsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): MusicSheet[] {
  const sheets = getBuiltInSheets();
  return sheets.filter(sheet => sheet.difficulty === difficulty);
}

/**
 * Get sheets by tag
 */
export function getSheetsByTag(tag: string): MusicSheet[] {
  const sheets = getBuiltInSheets();
  return sheets.filter(sheet => sheet.tags.includes(tag));
}
