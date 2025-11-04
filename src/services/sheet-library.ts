/**
 * Built-in Sheet Music Library
 * 
 * Contains popular songs in Virtual Piano notation format
 */

import type { MusicSheet } from '@/components/piano/music-sheet/types';
import { parseVPNotation, createPages, estimateDuration } from './sheet-parser';
import appConfig from '@/app.config';

/**
 * Raw sheet data (notation only)
 */
const SHEET_DATA = [
  {
    id: 'kiss-the-rain-v2',
    title: 'Kiss the Rain v2',
    artist: 'Yiruma',
    difficulty: 'hard' as const,
    tempo: 96,
    timeSignature: '4/4',
    tags: ['contemporary', 'yiruma', 'romantic'],
    notation: `
      o s d [td] f f | o s o s d f [wd] h h | o a o h j k [ek] l [sfl]
      s f z z x z l [0k] o a o 0
      l k h [ih] j j | s g s h g [0g] h h
      o a o s d [yf] g [pdg] p d p h g [wf] o a g f [wd]
      o s d [td] f f | o s o s d f [wd] h h | o a o h j k [ek] l [sfl]
      s f z z x z l [0k] o a o 0
      l k h [ih] j j | s g s h g [0g] h h
      o a o s d [yf] g [pdg] p [ws] y a
      [ts] u o s f s f h [ij] s g s i a s j [0h]
      o a o e a s h [yh] g [odg] f [wf] d
      o s d [td] f f | o t s f h [ij] s f s r k k j [0h] o a f g [eh] g f
      [yg] o h o [yj] s k l [ox] d h d [oz]
      o s d [td] f f | o s o s d f [wd] h h | o a o h j k [ek] l [sfl]
      s f z z x z l [0k] o a o 0
      l k l k h [ih] j j | s g s j h g [0g] h h
      o a o s d [yf] g [pdg] p [ws] y a [ts] u o s f
      l k h [ih] j j | s g h g [0g] h h | o a s d [yf] g g
      p [ws] y a [ts] u o s t u o s f
    `,
  },
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
    notation: `h l z [tz] [ox] [dx] | o s l z x [uz] | [av] [fkv] a h v b | n [plvn] [fm] [kxm] f l | x m [oxn] f [hk] f | [hx] m n v [ikv] [sb] | [hlb] s g v c [uhzc] | [sv] [fzv] s [fl] l z | [ygx] [pc] [dc] p s v | c [wgjx] y a y [az] | h l z [8hz] [wx] [uhx] | w y w t l [8z] | x [0hz] [rv] [ohkv] r u | r o v [rb] n [6lxn] | [0m] [tlm] 0 r 0 [ex] | 0 m [5xn] 0 r 0 | w m n v [qjv] [tb] | [ilb] t p t i [tv] | c [0hzc] [tv] [ohv] t u | t o l z [9gjx] [ec] | t j [wgl] y [ok] [8ygl] | o d g f s f h | [qsj] t [op] t [is] [ta] | [os] [qj] [0dh] [to] [us] [ta] | [us] a [us] [0h] [9tph] [eg] | [tg] [9f] [5ipf] [9d] [tipd] [ws] | [8yod] [wf] [yof] w [tu] [ws] | [yf] [8h] [$sj] [Qu] [tp] [Qs] | [7a] [Qk] [YDk] [Qj] [0ah] r | o f g [edh] [Su] [pg] | f [9pg] e [yh] e [ij] | e k t [yl] [5gjx] 9 w | 9 [rgjz] h l z [8hz] | [wx] [uhx] w y w t | l [wz] x [7hz] [rv] [ohkv] | r u r o v [rb] | n [6lxn] [0m] [tlm] 0 6 | [0z] [tx] z 0 [lm] [5kxn] | 0 [of] u [oa] [ulm] [okn] | [whv] [4hv] [tjb] [ojb] t i | t o [tv] c [0hzc] [tv] | [uhv] t o t u [tl] | z [9jx] [ec] [tjc] e i | e [thv] [ygc] [5gjx] 9 i | e [ogjz] [rh] [al] [oz] [8hz] | [wx] [uhx] w y w t | l [wz] x [0hz] [rv] [ohkv] | r u r o [hv] [rjb] | [kn] [6kxn] [0lm] [tlm] 0 6 | [0z] [tx] z 0 [lm] [5kxn] | 0 [of] u [oa] [ulm] [okn] | [whv] [4hv] [8jb] [ojb] t [ip] | t o [tv] c [0hzc] [tv] | [uhv] t o t u [tl] | z [9gjx] [ec] t j [wgl] | y [ok] [8ygl] w y i | u s f h [qsj] t [op] | t [is] [ta] [os] [qj] [0dh] | [to] [us] [ta] [us] a [us] | [0h] [9ph] [eg] [ig] [ef] | [5ipf] [9d] [tipd] s [8od] [wf] | [yof] w [tu] [ws] [uf] [wh] | [$sj] [Qu] [tp] [Qs] [7a] [Qk] | [YDk] [Qj] [0ah] r o f | g [edh] [Su] [pg] f [9pg] | e [yh] e [ipj] e [ak] | t [ysl] [5fhx] 9 t s | [adhz] [yh] [al] [oz] [8hz] [wx] | [uhx] w y w t l | [8z] x [7hz] [rv] [ohv] r | u r o v [rb] n | [6xn] [0lm] [tlm] 0 r [0z] | [ex] z 0 [lm] [5kxn] 0 | [of] u [oa] [ulm] [okn] [whv] | [4hv] [8jb] [ojb] t [ip] t | o o [th] g [0odg] [th] | [uosh] t o t u [tl] | z [9gjx] [ec] t [9j] [5gl] | 9 [rgk] 9 [%SJL] W [TP] | [IS] [wyts] H L Z [THZ] | [oc] [dc] O [sg] O g | L Z c [HZI] [vs] [HV] | s g s V B m | [ezcm] i [sc] i s i | P i [wcm] i [os] i | [og] [li] [Ol] [WH] [$SH] [*J] | [OSJ] T [IP] T [OS] [QH] | G [$Gs] [*H] [OSH] T [PSI] | T i O S D [(TIG] | [EG] T P [%IS] ( [WS] | [*SI] W Y I [*WI] Z | c [YSGC] [PC] S J [ODGL] | l [*GL] W Y O [*SI]`
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
    // Create a single page with all measures - pagination will be calculated dynamically
    const pages = [{
      measures: parsed.measures,
      pageNumber: 1,
    }];
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
