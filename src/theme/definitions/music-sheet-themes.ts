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
  {
    id: 'paper-4',
    name: 'Parchment',
    description: 'Classic parchment paper texture',
    backgroundImage: '4.png',
    category: 'papers',
  },
  {
    id: 'paper-5',
    name: 'Cream Paper',
    description: 'Soft cream colored paper texture',
    backgroundImage: '5.png',
    category: 'papers',
  },
  {
    id: 'paper-6',
    name: 'Linen Paper',
    description: 'Textured linen paper finish',
    backgroundImage: '6.png',
    category: 'papers',
  },
  {
    id: 'paper-7',
    name: 'Recycled Paper',
    description: 'Eco-friendly recycled paper texture',
    backgroundImage: '7.png',
    category: 'papers',
  },
  {
    id: 'paper-8',
    name: 'Watercolor Paper',
    description: 'Artistic watercolor paper texture',
    backgroundImage: '8.png',
    category: 'papers',
  },
  {
    id: 'paper-9',
    name: 'Notebook Paper',
    description: 'Classic lined notebook paper',
    backgroundImage: '9.png',
    category: 'papers',
  },
  {
    id: 'paper-10',
    name: 'Parchment Scroll',
    description: 'Ancient scroll parchment texture',
    backgroundImage: '10.png',
    category: 'papers',
  },
  {
    id: 'paper-11',
    name: 'Kraft Paper',
    description: 'Natural kraft paper texture',
    backgroundImage: '11.png',
    category: 'papers',
  },
  {
    id: 'paper-12',
    name: 'Marble Paper',
    description: 'Elegant marble pattern paper',
    backgroundImage: '12.png',
    category: 'papers',
  },
  {
    id: 'paper-13',
    name: 'Vellum Paper',
    description: 'Translucent vellum texture',
    backgroundImage: '13.png',
    category: 'papers',
  },
  {
    id: 'paper-14',
    name: 'Leather Bound',
    description: 'Leather-textured paper',
    backgroundImage: '14.png',
    category: 'papers',
  },
  {
    id: 'paper-15',
    name: 'Canvas Paper',
    description: 'Textured canvas paper finish',
    backgroundImage: '15.png',
    category: 'papers',
  },
];
