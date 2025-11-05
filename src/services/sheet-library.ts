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
    id: 'kiss-the-rain',
    title: 'Kiss the Rain',
    artist: 'Yiruma',
    difficulty: 'hard' as const,
    tempo: 96,
    timeSignature: '4/4',
    tags: ['contemporary', 'yiruma', 'romantic'],
    notation: `h l z [tz] [ox] [dx] | o s l z x [uz] | [av] [fkv] a h v b | n [plvn] [fm] [kxm] f l | x m [oxn] f [hk] f | [hx] m n v [ikv] [sb] | [hlb] s g v c [uhzc] | [sv] [fzv] s [fl] l z | [ygx] [pc] [dc] p s v | c [wgjx] y a y [az] | h l z [8hz] [wx] [uhx] | w y w t l [8z] | x [0hz] [rv] [ohkv] r u | r o v [rb] n [6lxn] | [0m] [tlm] 0 r 0 [ex] | 0 m [5xn] 0 r 0 | w m n v [qjv] [tb] | [ilb] t p t i [tv] | c [0hzc] [tv] [ohv] t u | t o l z [9gjx] [ec] | t j [wgl] y [ok] [8ygl] | o d g f s f h | [qsj] t [op] t [is] [ta] | [os] [qj] [0dh] [to] [us] [ta] | [us] a [us] [0h] [9tph] [eg] | [tg] [9f] [5ipf] [9d] [tipd] [ws] | [8yod] [wf] [yof] w [tu] [ws] | [yf] [8h] [$sj] [Qu] [tp] [Qs] | [7a] [Qk] [YDk] [Qj] [0ah] r | o f g [edh] [Su] [pg] | f [9pg] e [yh] e [ij] | e k t [yl] [5gjx] 9 w | 9 [rgjz] h l z [8hz] | [wx] [uhx] w y w t | l [wz] x [7hz] [rv] [ohkv] | r u r o v [rb] | n [6lxn] [0m] [tlm] 0 6 | [0z] [tx] z 0 [lm] [5kxn] | 0 [of] u [oa] [ulm] [okn] | [whv] [4hv] [tjb] [ojb] t i | t o [tv] c [0hzc] [tv] | [uhv] t o t u [tl] | z [9jx] [ec] [tjc] e i | e [thv] [ygc] [5gjx] 9 i | e [ogjz] [rh] [al] [oz] [8hz] | [wx] [uhx] w y w t | l [wz] x [0hz] [rv] [ohkv] | r u r o [hv] [rjb] | [kn] [6kxn] [0lm] [tlm] 0 6 | [0z] [tx] z 0 [lm] [5kxn] | 0 [of] u [oa] [ulm] [okn] | [whv] [4hv] [8jb] [ojb] t [ip] | t o [tv] c [0hzc] [tv] | [uhv] t o t u [tl] | z [9gjx] [ec] t j [wgl] | y [ok] [8ygl] w y i | u s f h [qsj] t [op] | t [is] [ta] [os] [qj] [0dh] | [to] [us] [ta] [us] a [us] | [0h] [9ph] [eg] [ig] [ef] | [5ipf] [9d] [tipd] s [8od] [wf] | [yof] w [tu] [ws] [uf] [wh] | [$sj] [Qu] [tp] [Qs] [7a] [Qk] | [YDk] [Qj] [0ah] r o f | g [edh] [Su] [pg] f [9pg] | e [yh] e [ipj] e [ak] | t [ysl] [5fhx] 9 t s | [adhz] [yh] [al] [oz] [8hz] [wx] | [uhx] w y w t l | [8z] x [7hz] [rv] [ohv] r | u r o v [rb] n | [6xn] [0lm] [tlm] 0 r [0z] | [ex] z 0 [lm] [5kxn] 0 | [of] u [oa] [ulm] [okn] [whv] | [4hv] [8jb] [ojb] t [ip] t | o o [th] g [0odg] [th] | [uosh] t o t u [tl] | z [9gjx] [ec] t [9j] [5gl] | 9 [rgk] 9 [%SJL] W [TP] | [IS] [wyts] H L Z [THZ] | [oc] [dc] O [sg] O g | L Z c [HZI] [vs] [HV] | s g s V B m | [ezcm] i [sc] i s i | P i [wcm] i [os] i | [og] [li] [Ol] [WH] [$SH] [*J] | [OSJ] T [IP] T [OS] [QH] | G [$Gs] [*H] [OSH] T [PSI] | T i O S D [(TIG] | [EG] T P [%IS] ( [WS] | [*SI] W Y I [*WI] Z | c [YSGC] [PC] S J [ODGL] | l [*GL] W Y O [*SI]`
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
