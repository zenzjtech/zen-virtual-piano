/**
 * Piano visual themes
 * Each theme defines the visual appearance of the piano container and keys
 */

export interface PianoTheme {
  id: string;
  name: string;
  description: string;
  
  // Theme brightness for text contrast
  isLight: boolean;
  
  // Container styling
  container: {
    background: string;
    border: string;
    boxShadow: string;
    // Pseudo-element effects
    beforeBackground?: string;
    afterBackground?: string;
  };
  
  // Corner plates styling (brass decorations)
  cornerPlates?: {
    background: string;
    border: string;
    boxShadow: string;
  };
  
  // White keys styling
  whiteKey: {
    background: string;
    border: string;
    boxShadow: string;
    hoverBackground: string;
    activeBackground: string;
  };
  
  // Black keys styling
  blackKey: {
    background: string;
    border: string;
    boxShadow: string;
    hoverBackground: string;
    activeBackground: string;
  };
}

export const PIANO_THEMES: Record<string, PianoTheme> = {
  wooden: {
    id: 'wooden',
    name: 'Wooden Classic',
    description: 'Traditional wooden piano with brass accents',
    isLight: false,
    container: {
      background: 'linear-gradient(135deg, #8B5A3C 0%, #6B4423 50%, #4A2F1A 100%)',
      border: '2px solid #5D3A1A',
      boxShadow: '0 8px 32px rgba(74, 47, 26, 0.3), inset 0 1px 0 rgba(139, 90, 60, 0.4)',
      beforeBackground: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(0, 0, 0, 0.03) 80px,
          rgba(0, 0, 0, 0.03) 81px
        ),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 20px,
          rgba(0, 0, 0, 0.02) 20px,
          rgba(0, 0, 0, 0.02) 21px
        )
      `,
      afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 30%, transparent 60%)',
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #B8941E 100%)',
      border: '1px solid #8B7355',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
      border: '1px solid #CCCCCC',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      hoverBackground: 'linear-gradient(180deg, #F8F8F8 0%, #F0F0F0 50%, #E8E8E8 100%)',
      activeBackground: 'linear-gradient(180deg, #E0E0E0 0%, #D8D8D8 50%, #D0D0D0 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 50%, #0A0A0A 100%)',
      border: '1px solid #000000',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      hoverBackground: 'linear-gradient(180deg, #3A3A3A 0%, #252525 50%, #151515 100%)',
      activeBackground: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 50%, #050505 100%)',
    },
  },

  black: {
    id: 'black',
    name: 'Midnight Black',
    description: 'Sleek modern black piano',
    isLight: false,
    container: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
      border: '2px solid #333333',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      beforeBackground: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(255, 255, 255, 0.02) 80px,
          rgba(255, 255, 255, 0.02) 81px
        )
      `,
      afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 60%)',
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #4A4A4A 0%, #6A6A6A 50%, #3A3A3A 100%)',
      border: '1px solid #222222',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #E8E8E8 0%, #D8D8D8 50%, #C8C8C8 100%)',
      border: '1px solid #999999',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      hoverBackground: 'linear-gradient(180deg, #F0F0F0 0%, #E0E0E0 50%, #D0D0D0 100%)',
      activeBackground: 'linear-gradient(180deg, #D0D0D0 0%, #C0C0C0 50%, #B0B0B0 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 50%, #050505 100%)',
      border: '1px solid #000000',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      hoverBackground: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%)',
      activeBackground: 'linear-gradient(180deg, #0A0A0A 0%, #050505 50%, #000000 100%)',
    },
  },

  metal: {
    id: 'metal',
    name: 'Metallic Silver',
    description: 'Futuristic metal finish piano',
    isLight: true,
    container: {
      background: 'linear-gradient(135deg, #B8C6D4 0%, #8A9BAE 50%, #6B7C8F 100%)',
      border: '2px solid #5D6E81',
      boxShadow: '0 8px 32px rgba(107, 124, 143, 0.4), inset 0 1px 0 rgba(184, 198, 212, 0.6)',
      beforeBackground: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(0, 0, 0, 0.05) 80px,
          rgba(0, 0, 0, 0.05) 81px
        ),
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(255, 255, 255, 0.03) 2px,
          rgba(255, 255, 255, 0.03) 4px
        )
      `,
      afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 30%, transparent 60%)',
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A8A8A8 100%)',
      border: '1px solid #888888',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #FAFAFA 0%, #F0F0F0 50%, #E5E5E5 100%)',
      border: '1px solid #BEBEBE',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      hoverBackground: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
      activeBackground: 'linear-gradient(180deg, #E8E8E8 0%, #DEDEDE 50%, #D4D4D4 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #404040 0%, #2A2A2A 50%, #1A1A1A 100%)',
      border: '1px solid #0A0A0A',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      hoverBackground: 'linear-gradient(180deg, #505050 0%, #353535 50%, #252525 100%)',
      activeBackground: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%)',
    },
  },

  white: {
    id: 'white',
    name: 'Pure White',
    description: 'Clean and minimal white piano',
    isLight: true,
    container: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
      border: '2px solid #DDDDDD',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
      beforeBackground: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(0, 0, 0, 0.02) 80px,
          rgba(0, 0, 0, 0.02) 81px
        )
      `,
      afterBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
    },
    cornerPlates: {
      background: 'linear-gradient(135deg, #F0F0F0 0%, #FFFFFF 50%, #E0E0E0 100%)',
      border: '1px solid #CCCCCC',
      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    whiteKey: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 50%, #F5F5F5 100%)',
      border: '1px solid #E0E0E0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
      hoverBackground: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 50%, #F0F0F0 100%)',
      activeBackground: 'linear-gradient(180deg, #F0F0F0 0%, #EBEBEB 50%, #E5E5E5 100%)',
    },
    blackKey: {
      background: 'linear-gradient(180deg, #505050 0%, #3A3A3A 50%, #2A2A2A 100%)',
      border: '1px solid #1A1A1A',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      hoverBackground: 'linear-gradient(180deg, #606060 0%, #4A4A4A 50%, #3A3A3A 100%)',
      activeBackground: 'linear-gradient(180deg, #3A3A3A 0%, #2A2A2A 50%, #1A1A1A 100%)',
    },
  },
};

// Helper to get theme by id with fallback
export function getTheme(themeId: string): PianoTheme {
  return PIANO_THEMES[themeId] || PIANO_THEMES.wooden;
}

// Get list of all available themes
export function getAllThemes(): PianoTheme[] {
  return Object.values(PIANO_THEMES);
}
