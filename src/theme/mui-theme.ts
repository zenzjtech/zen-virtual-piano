import { createTheme, Theme } from '@mui/material/styles';

// Secondary color palette options
/* here to Apply Secondary Colors
Detail Panel Section (right side of the UI)
The green header section labeled "EVENT" could have its variants using secondary colors
The highlighted "Session Count" row could use secondary.light as background instead of the current green
Table Elements
Selected rows or alternate row highlighting
Border accents for important data cells
Secondary action buttons (non-primary actions)
Filter Elements (top of the table)
Filter buttons or dropdown indicators
Active filter state indicators
The "Grouped by Network" chip background
Interactive Elements
Secondary buttons throughout the UI
Toggle switches and checkboxes
Pagination controls
Expandable panel indicators (like the arrows in your UI)
Status Indicators
The eye icons in your event list could use secondary colors to indicate different states
Data validation or status badges
*/
const secondaryColorOptions = {
  teal: {
    main: '#4DB6AC', // Complementary teal
    light: '#B2DFDB',
    dark: '#00897B',
    contrastText: '#000000',
  },
  amber: {
    main: '#FFCA28', // Subtle amber
    light: '#FFE082',
    dark: '#FFA000',
    contrastText: '#000000',
  },
  slate: {
    main: '#607D8B', // Refined slate blue
    light: '#B0BEC5',
    dark: '#455A64',
    contrastText: '#FFFFFF',
  },
  mint: {
    main: '#81C784', // Soft mint
    light: '#C8E6C9',
    dark: '#4CAF50',
    contrastText: '#000000',
  },
  purple: {
    main: '#9575CD', // Cool purple
    light: '#D1C4E9',
    dark: '#673AB7',
    contrastText: '#FFFFFF',
  },
};

// Define type for color names
type SecondaryColorName = keyof typeof secondaryColorOptions;

// Function to get the secondary color palette by name
const getSecondaryColor = (colorName: SecondaryColorName = 'amber') => {
  return secondaryColorOptions[colorName];
};

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, opacity: number): string => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return rgba value
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Function to generate secondary color style overrides with opacity
const getSecondaryColorStyles = (colorName: SecondaryColorName = 'amber') => {
  const color = secondaryColorOptions[colorName];
  
  return {
    selected: hexToRgba(color.main, 0.12),
    highlight: hexToRgba(color.main, 0.08),
    hover: hexToRgba(color.main, 0.04),
  };
};

// Get header gradient
export const getHeaderGradient = (theme: Theme) => {
  // Create a blend of orange and secondary.main
  const orangePurpleBlend = '#b67aa6'; // A blend between orange and purple
  return `linear-gradient(30deg, #5f2da0 0%, #6b35ce 40%, ${orangePurpleBlend} 70%, ${theme.palette.secondary.main} 100%)`;
};

// Get pure purple gradient for chips and smaller elements
export const getPurpleGradient = (theme: Theme) => {
  return `linear-gradient(30deg, #8a4edf 0%, #a978f8 50%, ${theme.palette.secondary.main} 100%)`;
};

// Selected secondary color
const selectedColorTheme: SecondaryColorName = 'purple';
const secondaryStyles = getSecondaryColorStyles(selectedColorTheme);

export const muiTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#4CAF50', // Bright Green as primary accent
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#ffffff',
    },
    secondary: getSecondaryColor(selectedColorTheme), // Choose any of: 'teal', 'amber', 'slate', 'mint', 'purple'
    text: {
      primary: '#5d7287',//#212121',   // Dark grey/black for main text
      secondary: '#757575', // Medium grey for secondary text
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },    
  },
  typography: {
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: secondaryStyles.selected,
          },
          '&.highlight': {
            backgroundColor: secondaryStyles.highlight,
          },
          '&:hover': {
            backgroundColor: secondaryStyles.hover,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #eeeeee',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          '&.Mui-expanded': {
            marginTop: 0,
            marginBottom: 16,
          },
          '&:before': {
            display: 'none', // Remove default divider
          }
        },
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            minHeight: 48,
          }
        },
        content: {
          '&.Mui-expanded': {
            marginTop: 12,
            marginBottom: 12,
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#4CAF50', // Green links
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            color: '#4CAF50',
          },
        },
      },
    },
  },
});

export default muiTheme;