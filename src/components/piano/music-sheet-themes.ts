// Music sheet theme options
export interface MusicSheetTheme {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  category: string;
}

export type MusicSheetThemeCategory = 'papers';

export const MUSIC_SHEET_THEME_CATEGORIES: Record<MusicSheetThemeCategory, { name: string; description: string }> = {
  papers: {
    name: 'Paper Textures',
    description: 'Different paper textures for music sheets',
  },
};

export const MUSIC_SHEET_THEMES: MusicSheetTheme[] = [
  {
    id: 'paper-1',
    name: 'Vintage Paper',
    description: 'Classic vintage paper texture',
    backgroundImage: '1.png',
    category: 'papers',
  },
  {
    id: 'paper-2',
    name: 'Modern Paper',
    description: 'Clean modern paper texture',
    backgroundImage: '2.png',
    category: 'papers',
  },
  {
    id: 'paper-3',
    name: 'Aged Paper',
    description: 'Weathered aged paper texture',
    backgroundImage: '3.png',
    category: 'papers',
  },
];
