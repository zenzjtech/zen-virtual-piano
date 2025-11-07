/**
 * Detailed header theme styling configuration
 */

export interface HeaderThemeStyle {
  // AppBar styling
  appBar: {
    backdropBlur: { dark: string; light: string };
    backgroundColor: { dark: string; light: string };
    borderColor: { dark: string; light: string };
    boxShadow: { dark: string; light: string };
  };
  
  // Logo styling
  logo: {
    size: { xs: number; sm: number; md: number };
    opacity: number;
    hoverOpacity: number;
  };
  
  // Title/Typography styling
  title: {
    fontSize: { xs: string; sm: string; md: string };
    fontWeight: number;
    letterSpacing: string;
    opacity: number;
  };
  
  // Icon button styling
  iconButton: {
    size: { xs: number; sm: number; md: number };
    opacity: number;
    hoverOpacity: number;
    hoverBackground: { dark: string; light: string };
  };
  
  // Toolbar styling
  toolbar: {
    minHeight: { xs: number; sm: number; md: number };
    padding: { xs: number; sm: number; md: number };
  };
}

export const HEADER_THEME_STYLES = {
  classic: {
    appBar: {
      backdropBlur: { dark: 'blur(20px)', light: 'blur(16px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.20)', light: 'rgba(255, 255, 255, 0.80)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.08)' },
      boxShadow: { 
        dark: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        light: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)'
      },
    },
    logo: { size: { xs: 28, sm: 32, md: 36 }, opacity: 1, hoverOpacity: 0.85 },
    title: { fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, fontWeight: 600, letterSpacing: '0.01em', opacity: 0.95 },
    iconButton: { size: { xs: 20, sm: 22, md: 24 }, opacity: 0.85, hoverOpacity: 1, hoverBackground: { dark: 'rgba(255, 255, 255, 0.1)', light: 'rgba(0, 0, 0, 0.06)' } },
    toolbar: { minHeight: { xs: 52, sm: 56, md: 60 }, padding: { xs: 2, sm: 3, md: 4 } },
  },
  
  modern: {
    appBar: {
      backdropBlur: { dark: 'blur(24px)', light: 'blur(20px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.10)', light: 'rgba(255, 255, 255, 0.70)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.05)' },
      boxShadow: { 
        dark: '0 1px 2px rgba(0, 0, 0, 0.2)',
        light: '0 1px 2px rgba(0, 0, 0, 0.03)'
      },
    },
    logo: { size: { xs: 26, sm: 30, md: 34 }, opacity: 0.95, hoverOpacity: 1 },
    title: { fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' }, fontWeight: 500, letterSpacing: '-0.01em', opacity: 0.9 },
    iconButton: { size: { xs: 19, sm: 21, md: 23 }, opacity: 0.75, hoverOpacity: 0.95, hoverBackground: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.04)' } },
    toolbar: { minHeight: { xs: 48, sm: 52, md: 56 }, padding: { xs: 2, sm: 3, md: 4 } },
  },
  
  cultural: {
    appBar: {
      backdropBlur: { dark: 'blur(18px)', light: 'blur(14px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.25)', light: 'rgba(255, 255, 255, 0.85)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.15)', light: 'rgba(0, 0, 0, 0.10)' },
      boxShadow: { 
        dark: '0 2px 4px rgba(0, 0, 0, 0.35), 0 1px 3px rgba(0, 0, 0, 0.25)',
        light: '0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)'
      },
    },
    logo: { size: { xs: 30, sm: 34, md: 38 }, opacity: 1, hoverOpacity: 0.88 },
    title: { fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.3rem' }, fontWeight: 500, letterSpacing: '0.03em', opacity: 0.95 },
    iconButton: { size: { xs: 21, sm: 23, md: 25 }, opacity: 0.85, hoverOpacity: 1, hoverBackground: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.07)' } },
    toolbar: { minHeight: { xs: 54, sm: 58, md: 62 }, padding: { xs: 2.5, sm: 3.5, md: 4.5 } },
  },
  
  nature: {
    appBar: {
      backdropBlur: { dark: 'blur(16px)', light: 'blur(12px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.18)', light: 'rgba(255, 255, 255, 0.75)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.06)' },
      boxShadow: { 
        dark: '0 1px 3px rgba(0, 0, 0, 0.25)',
        light: '0 1px 3px rgba(0, 0, 0, 0.04)'
      },
    },
    logo: { size: { xs: 29, sm: 33, md: 37 }, opacity: 0.97, hoverOpacity: 0.85 },
    title: { fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, fontWeight: 500, letterSpacing: '0.01em', opacity: 0.92 },
    iconButton: { size: { xs: 20, sm: 22, md: 24 }, opacity: 0.80, hoverOpacity: 0.98, hoverBackground: { dark: 'rgba(255, 255, 255, 0.09)', light: 'rgba(0, 0, 0, 0.05)' } },
    toolbar: { minHeight: { xs: 50, sm: 54, md: 58 }, padding: { xs: 2, sm: 3, md: 4 } },
  },
  
  artistic: {
    appBar: {
      backdropBlur: { dark: 'blur(22px)', light: 'blur(18px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.15)', light: 'rgba(255, 255, 255, 0.78)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.07)' },
      boxShadow: { 
        dark: '0 2px 5px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
        light: '0 2px 5px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.04)'
      },
    },
    logo: { size: { xs: 30, sm: 34, md: 38 }, opacity: 0.95, hoverOpacity: 0.82 },
    title: { fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' }, fontWeight: 400, letterSpacing: '0.02em', opacity: 0.93 },
    iconButton: { size: { xs: 20, sm: 22, md: 24 }, opacity: 0.82, hoverOpacity: 0.98, hoverBackground: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.06)' } },
    toolbar: { minHeight: { xs: 52, sm: 56, md: 60 }, padding: { xs: 2.5, sm: 3.5, md: 4.5 } },
  },
  
  vintage: {
    appBar: {
      backdropBlur: { dark: 'blur(18px)', light: 'blur(15px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.22)', light: 'rgba(255, 255, 255, 0.82)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.14)', light: 'rgba(0, 0, 0, 0.09)' },
      boxShadow: { 
        dark: '0 2px 4px rgba(0, 0, 0, 0.32), 0 1px 2px rgba(0, 0, 0, 0.22)',
        light: '0 2px 4px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.05)'
      },
    },
    logo: { size: { xs: 30, sm: 34, md: 38 }, opacity: 1, hoverOpacity: 0.87 },
    title: { fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.28rem' }, fontWeight: 600, letterSpacing: '0.02em', opacity: 0.96 },
    iconButton: { size: { xs: 21, sm: 23, md: 25 }, opacity: 0.87, hoverOpacity: 1, hoverBackground: { dark: 'rgba(255, 255, 255, 0.11)', light: 'rgba(0, 0, 0, 0.07)' } },
    toolbar: { minHeight: { xs: 54, sm: 58, md: 62 }, padding: { xs: 2.5, sm: 3.5, md: 4.5 } },
  },
  
  professional: {
    appBar: {
      backdropBlur: { dark: 'blur(24px)', light: 'blur(20px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.12)', light: 'rgba(255, 255, 255, 0.72)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.06)' },
      boxShadow: { 
        dark: '0 1px 2px rgba(0, 0, 0, 0.25)',
        light: '0 1px 2px rgba(0, 0, 0, 0.03)'
      },
    },
    logo: { size: { xs: 26, sm: 30, md: 34 }, opacity: 0.92, hoverOpacity: 1 },
    title: { fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' }, fontWeight: 500, letterSpacing: '0em', opacity: 0.88 },
    iconButton: { size: { xs: 19, sm: 21, md: 23 }, opacity: 0.72, hoverOpacity: 0.92, hoverBackground: { dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(0, 0, 0, 0.04)' } },
    toolbar: { minHeight: { xs: 48, sm: 52, md: 56 }, padding: { xs: 2, sm: 3, md: 4 } },
  },
  
  romantic: {
    appBar: {
      backdropBlur: { dark: 'blur(20px)', light: 'blur(16px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.14)', light: 'rgba(255, 255, 255, 0.80)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.06)' },
      boxShadow: { 
        dark: '0 2px 6px rgba(0, 0, 0, 0.28), 0 1px 3px rgba(0, 0, 0, 0.18)',
        light: '0 2px 6px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)'
      },
    },
    logo: { size: { xs: 29, sm: 33, md: 37 }, opacity: 0.96, hoverOpacity: 0.84 },
    title: { fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' }, fontWeight: 400, letterSpacing: '0.02em', opacity: 0.94 },
    iconButton: { size: { xs: 20, sm: 22, md: 24 }, opacity: 0.84, hoverOpacity: 0.98, hoverBackground: { dark: 'rgba(255, 255, 255, 0.10)', light: 'rgba(0, 0, 0, 0.05)' } },
    toolbar: { minHeight: { xs: 52, sm: 56, md: 60 }, padding: { xs: 2.5, sm: 3.5, md: 4.5 } },
  },
  
  energetic: {
    appBar: {
      backdropBlur: { dark: 'blur(26px)', light: 'blur(22px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.16)', light: 'rgba(255, 255, 255, 0.76)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.14)', light: 'rgba(0, 0, 0, 0.08)' },
      boxShadow: { 
        dark: '0 2px 6px rgba(0, 0, 0, 0.32), 0 1px 3px rgba(0, 0, 0, 0.22)',
        light: '0 2px 6px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)'
      },
    },
    logo: { size: { xs: 30, sm: 34, md: 38 }, opacity: 1, hoverOpacity: 0.88 },
    title: { fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' }, fontWeight: 700, letterSpacing: '0.05em', opacity: 0.95 },
    iconButton: { size: { xs: 21, sm: 23, md: 25 }, opacity: 0.88, hoverOpacity: 1, hoverBackground: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.08)' } },
    toolbar: { minHeight: { xs: 50, sm: 54, md: 58 }, padding: { xs: 2, sm: 3, md: 4 } },
  },
  
  minimalist: {
    appBar: {
      backdropBlur: { dark: 'blur(28px)', light: 'blur(24px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.08)', light: 'rgba(255, 255, 255, 0.65)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.05)', light: 'rgba(0, 0, 0, 0.03)' },
      boxShadow: { 
        dark: '0 1px 2px rgba(0, 0, 0, 0.15)',
        light: '0 1px 2px rgba(0, 0, 0, 0.02)'
      },
    },
    logo: { size: { xs: 24, sm: 28, md: 32 }, opacity: 0.85, hoverOpacity: 1 },
    title: { fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, fontWeight: 300, letterSpacing: '0em', opacity: 0.80 },
    iconButton: { size: { xs: 18, sm: 20, md: 22 }, opacity: 0.65, hoverOpacity: 0.85, hoverBackground: { dark: 'rgba(255, 255, 255, 0.06)', light: 'rgba(0, 0, 0, 0.03)' } },
    toolbar: { minHeight: { xs: 44, sm: 48, md: 52 }, padding: { xs: 2, sm: 3, md: 4 } },
  },
  
  luxurious: {
    appBar: {
      backdropBlur: { dark: 'blur(22px)', light: 'blur(18px)' },
      backgroundColor: { dark: 'rgba(0, 0, 0, 0.18)', light: 'rgba(255, 255, 255, 0.88)' },
      borderColor: { dark: 'rgba(255, 255, 255, 0.16)', light: 'rgba(0, 0, 0, 0.10)' },
      boxShadow: { 
        dark: '0 3px 8px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.25)',
        light: '0 3px 8px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06)'
      },
    },
    logo: { size: { xs: 32, sm: 36, md: 40 }, opacity: 1, hoverOpacity: 0.90 },
    title: { fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.35rem' }, fontWeight: 300, letterSpacing: '0.08em', opacity: 0.98 },
    iconButton: { size: { xs: 22, sm: 24, md: 26 }, opacity: 0.90, hoverOpacity: 1, hoverBackground: { dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.08)' } },
    toolbar: { minHeight: { xs: 56, sm: 60, md: 64 }, padding: { xs: 3, sm: 4, md: 5 } },
  },
} as const;
