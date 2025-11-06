/**
 * Color schemes and typography for music sheet themes
 * Each theme has colors and fonts that complement its background image
 */

export interface MusicSheetThemeColors {
  /** Primary text/icon color */
  primary: string;
  /** Accent color for hover/active states */
  accent: string;
  /** Button background color (with transparency) */
  background: string;
  /** Border color */
  border: string;
  /** Shadow color for hover effects */
  shadow: string;
  /** Font family for title text */
  titleFont: string;
  /** Font family for body/metadata text */
  bodyFont: string;
  /** Font family for sheet notation */
  notationFont: string;
}

/**
 * Get color scheme for a music sheet theme
 */
export const getMusicSheetThemeColors = (themeId: string): MusicSheetThemeColors => {
  switch (themeId) {
    case 'paper-2': // Modern Paper - cooler tones, clean modern fonts
      return {
        primary: '#2c3e50',
        accent: '#3498db',
        background: 'rgba(255, 255, 255, 0.85)',
        border: 'rgba(52, 152, 219, 0.3)',
        shadow: '52, 152, 219',
        titleFont: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        notationFont: '"Roboto Mono", "SF Mono", Monaco, "Cascadia Code", Consolas, monospace',
      };
    
    case 'paper-3': // Aged Paper - warm vintage tones, classic serif fonts
      return {
        primary: '#5d4037',
        accent: '#d4a574',
        background: 'rgba(245, 235, 220, 0.85)',
        border: 'rgba(212, 165, 116, 0.4)',
        shadow: '212, 165, 116',
        titleFont: '"Crimson Text", "Palatino", "Palatino Linotype", "Book Antiqua", Georgia, serif',
        bodyFont: '"Crimson Text", Palatino, Georgia, serif',
        notationFont: '"Courier Prime", "Courier New", Courier, monospace',
      };
    
    case 'paper-4': // Parchment - neutral beige tones, traditional serif fonts
      return {
        primary: '#6b5d4f',
        accent: '#b89968',
        background: 'rgba(250, 240, 220, 0.85)',
        border: 'rgba(184, 153, 104, 0.4)',
        shadow: '184, 153, 104',
        titleFont: '"Playfair Display", "Georgia Pro", Georgia, "Times New Roman", serif',
        bodyFont: '"Merriweather", Georgia, serif',
        notationFont: '"Fira Code", "Source Code Pro", Monaco, monospace',
      };
    
    case 'paper-5': // Cream Paper - soft warm tones, elegant fonts
      return {
        primary: '#5a4a3a',
        accent: '#c9b896',
        background: 'rgba(255, 250, 240, 0.85)',
        border: 'rgba(201, 184, 150, 0.3)',
        shadow: '201, 184, 150',
        titleFont: '"Lora", "Garamond", "Georgia", serif',
        bodyFont: '"Lora", Georgia, serif',
        notationFont: '"Roboto Mono", Consolas, monospace',
      };
    
    case 'paper-6': // Linen Paper - neutral gray-beige, clean fonts
      return {
        primary: '#4a4a4a',
        accent: '#9e9e8c',
        background: 'rgba(245, 245, 240, 0.85)',
        border: 'rgba(158, 158, 140, 0.3)',
        shadow: '158, 158, 140',
        titleFont: '"Open Sans", "Helvetica Neue", Arial, sans-serif',
        bodyFont: '"Open Sans", Arial, sans-serif',
        notationFont: '"JetBrains Mono", Monaco, monospace',
      };
    
    case 'paper-7': // Recycled Paper - earthy green-gray, eco fonts
      return {
        primary: '#3e4a3a',
        accent: '#7a8c6f',
        background: 'rgba(240, 242, 235, 0.85)',
        border: 'rgba(122, 140, 111, 0.3)',
        shadow: '122, 140, 111',
        titleFont: '"Nunito", "Verdana", sans-serif',
        bodyFont: '"Nunito", Verdana, sans-serif',
        notationFont: '"Ubuntu Mono", monospace',
      };
    
    case 'paper-8': // Watercolor Paper - soft blue-gray, artistic fonts
      return {
        primary: '#2c4a5a',
        accent: '#6a9ab0',
        background: 'rgba(245, 248, 250, 0.85)',
        border: 'rgba(106, 154, 176, 0.3)',
        shadow: '106, 154, 176',
        titleFont: '"Quicksand", "Trebuchet MS", sans-serif',
        bodyFont: '"Quicksand", Trebuchet MS, sans-serif',
        notationFont: '"Inconsolata", Monaco, monospace',
      };
    
    case 'paper-9': // Notebook Paper - bright white-blue, school fonts
      return {
        primary: '#2a3a52',
        accent: '#4a7ba7',
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'rgba(74, 123, 167, 0.3)',
        shadow: '74, 123, 167',
        titleFont: '"Comic Neue", "Comic Sans MS", cursive',
        bodyFont: '"Comic Neue", "Comic Sans MS", cursive',
        notationFont: '"Courier New", Courier, monospace',
      };
    
    case 'paper-10': // Parchment Scroll - deep brown, ancient fonts
      return {
        primary: '#3d2817',
        accent: '#8b6f47',
        background: 'rgba(242, 230, 210, 0.85)',
        border: 'rgba(139, 111, 71, 0.4)',
        shadow: '139, 111, 71',
        titleFont: '"Cinzel", "Trajan Pro", serif',
        bodyFont: '"Cinzel", serif',
        notationFont: '"Courier Prime", Courier, monospace',
      };
    
    case 'paper-11': // Kraft Paper - brown earthy, rustic fonts
      return {
        primary: '#4a3425',
        accent: '#8b6f47',
        background: 'rgba(220, 200, 170, 0.85)',
        border: 'rgba(139, 111, 71, 0.4)',
        shadow: '139, 111, 71',
        titleFont: '"Archivo Black", Impact, sans-serif',
        bodyFont: '"Archivo", Arial, sans-serif',
        notationFont: '"Space Mono", monospace',
      };
    
    case 'paper-12': // Marble Paper - cool gray-blue, elegant fonts
      return {
        primary: '#2f3e4a',
        accent: '#7a8ea1',
        background: 'rgba(248, 250, 252, 0.85)',
        border: 'rgba(122, 142, 161, 0.3)',
        shadow: '122, 142, 161',
        titleFont: '"Cormorant Garamond", Garamond, serif',
        bodyFont: '"Cormorant", serif',
        notationFont: '"Fira Mono", Monaco, monospace',
      };
    
    case 'paper-13': // Vellum Paper - soft ivory, delicate fonts
      return {
        primary: '#5a524a',
        accent: '#a89f91',
        background: 'rgba(255, 253, 248, 0.9)',
        border: 'rgba(168, 159, 145, 0.3)',
        shadow: '168, 159, 145',
        titleFont: '"EB Garamond", Garamond, serif',
        bodyFont: '"EB Garamond", serif',
        notationFont: '"IBM Plex Mono", monospace',
      };
    
    case 'paper-14': // Leather Bound - rich brown, classic fonts
      return {
        primary: '#3a2416',
        accent: '#8b5a3c',
        background: 'rgba(210, 180, 140, 0.85)',
        border: 'rgba(139, 90, 60, 0.4)',
        shadow: '139, 90, 60',
        titleFont: '"Baskerville", "Libre Baskerville", serif',
        bodyFont: '"Baskerville", serif',
        notationFont: '"Overpass Mono", monospace',
      };
    
    case 'paper-15': // Canvas Paper - natural beige, textured fonts
      return {
        primary: '#4a4238',
        accent: '#a08f7a',
        background: 'rgba(245, 240, 230, 0.85)',
        border: 'rgba(160, 143, 122, 0.3)',
        shadow: '160, 143, 122',
        titleFont: '"Josefin Slab", "Rockwell", serif',
        bodyFont: '"Josefin Sans", sans-serif',
        notationFont: '"Hack", Monaco, monospace',
      };
    
    case 'paper-1': // Vintage Paper - classic warm tones, elegant serif fonts
    default:
      return {
        primary: '#4a3728',
        accent: '#c9a86a',
        background: 'rgba(250, 245, 235, 0.85)',
        border: 'rgba(201, 168, 106, 0.4)',
        shadow: '201, 168, 106',
        titleFont: '"Libre Baskerville", "Baskerville", "Georgia", "Times New Roman", serif',
        bodyFont: '"Libre Baskerville", Georgia, serif',
        notationFont: '"Source Code Pro", "Menlo", "Monaco", Consolas, monospace',
      };
  }
};
