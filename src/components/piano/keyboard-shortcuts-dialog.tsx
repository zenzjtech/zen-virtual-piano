import React, { useState } from 'react';
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Keyboard as KeyboardIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
  pianoTheme: PianoTheme;
  isDarkBackground: boolean;
}

interface ShortcutItem {
  action: string;
  keys: string[];
  category: string;
}

const shortcuts: ShortcutItem[] = [
  // General
  { action: 'View keyboard shortcuts', keys: ['?'], category: 'General' },

  // Sheet Mode
  { action: 'Play/Pause sheet', keys: ['Space'], category: 'Sheet Mode' },
  { action: 'Increase tempo', keys: ['↑'], category: 'Sheet Mode' },
  { action: 'Decrease tempo', keys: ['↓'], category: 'Sheet Mode' },
  { action: 'Next page', keys: ['Enter'], category: 'Sheet Mode' },
  { action: 'Next page', keys: ['→'], category: 'Sheet Mode' },
  { action: 'Previous page', keys: ['Backspace'], category: 'Sheet Mode' },
  { action: 'Previous page', keys: ['←'], category: 'Sheet Mode' },
  
  // Navigation
  { action: 'Close dialog/popup', keys: ['Esc'], category: 'Navigation' },

  // Piano Keys
  { action: 'Play white keys (C2-E3)', keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], category: 'Piano Keys' },
  { action: 'Play white keys (F3-A4)', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], category: 'Piano Keys' },
  { action: 'Play white keys (B4-C6)', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], category: 'Piano Keys' },
  { action: 'Play white keys (D6-C7)', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], category: 'Piano Keys' },
  { action: 'Play black keys (sharps/flats)', keys: ['Shift', '+', 'key'], category: 'Piano Keys' },
];

/**
 * Keyboard shortcuts help dialog
 * Displays all available keyboard shortcuts with search functionality
 */
export const KeyboardShortcutsDialog: React.FC<KeyboardShortcutsDialogProps> = ({
  open,
  onClose,
  pianoTheme,
  isDarkBackground,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter shortcuts based on search query
  const filteredShortcuts = searchQuery.trim()
    ? shortcuts.filter(
        (shortcut) =>
          shortcut.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shortcut.keys.some((key) => key.toLowerCase().includes(searchQuery.toLowerCase())) ||
          shortcut.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : shortcuts;

  // Group shortcuts by category
  const groupedShortcuts = filteredShortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, ShortcutItem[]>);

  const categories = Object.keys(groupedShortcuts);

  // Theme-aware colors with brand green accent
  const accentGreen = '#10b981'; // Bright green as primary accent
  const dialogBg = isDarkBackground
    ? 'rgba(40, 40, 40, 0.98)'
    : 'rgba(255, 255, 255, 0.98)';
  const textPrimary = isDarkBackground
    ? 'rgba(255, 255, 255, 0.95)'
    : 'rgba(0, 0, 0, 0.87)';
  const textSecondary = isDarkBackground
    ? 'rgba(255, 255, 255, 0.7)'
    : 'rgba(0, 0, 0, 0.6)';
  const borderColor = isDarkBackground
    ? 'rgba(255, 255, 255, 0.12)'
    : 'rgba(0, 0, 0, 0.08)';
  const hoverBg = isDarkBackground
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.03)';
  const sectionBg = isDarkBackground
    ? 'rgba(255, 255, 255, 0.03)'
    : 'rgba(0, 0, 0, 0.02)';
  const accentBg = isDarkBackground
    ? 'rgba(16, 185, 129, 0.15)'
    : 'rgba(16, 185, 129, 0.08)';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: dialogBg,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, ${isDarkBackground ? 0.1 : 0.3}),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2)
          `,
          maxHeight: '85vh',
          overflow: 'hidden',
        },
      }}
      aria-labelledby="keyboard-shortcuts-dialog-title"
      aria-describedby="keyboard-shortcuts-dialog-description"
    >
      {/* Header */}
      <DialogTitle
        id="keyboard-shortcuts-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${borderColor}`,
          background: isDarkBackground
            ? 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.02) 100%)',
          px: 3,
          py: 2.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '10px',
            background: accentBg,
            border: `1px solid ${accentGreen}30`,
          }}
        >
          <KeyboardIcon sx={{ color: accentGreen, fontSize: 20 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{
              color: textPrimary,
              letterSpacing: '0.3px',
              mb: 0.5,
            }}
          >
            Keyboard Shortcuts
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: textSecondary,
              display: 'block',
            }}
          >
            {shortcuts.length} shortcuts available
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close keyboard shortcuts dialog"
          sx={{
            color: textSecondary,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: textPrimary,
              backgroundColor: hoverBg,
              transform: 'scale(1.05)',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Search Bar */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: `1px solid ${borderColor}`,
          background: sectionBg,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search shortcuts by action, key, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
          inputProps={{
            'aria-label': 'Search keyboard shortcuts',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: textSecondary, fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: isDarkBackground
                ? 'rgba(0, 0, 0, 0.3)'
                : 'rgba(255, 255, 255, 0.7)',
              borderRadius: '10px',
              fontSize: '0.875rem',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              color: textPrimary,
              '& fieldset': {
                borderColor: borderColor,
                transition: 'all 0.25s ease',
              },
              '&:hover fieldset': {
                borderColor: textSecondary,
              },
              '&.Mui-focused': {
                backgroundColor: isDarkBackground
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(255, 255, 255, 0.9)',
                '& fieldset': {
                  borderColor: accentGreen,
                  borderWidth: '2px',
                  boxShadow: `0 0 0 3px ${accentGreen}20`,
                },
              },
            },
            '& .MuiOutlinedInput-input': {
              color: textPrimary,
              fontWeight: 400,
              py: 1.25,
              '&::placeholder': {
                color: textSecondary,
                opacity: 0.7,
              },
            },
          }}
        />
      </Box>

      {/* Content */}
      <DialogContent
        id="keyboard-shortcuts-dialog-description"
        sx={{
          p: 0,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDarkBackground
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            '&:hover': {
              background: isDarkBackground
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(0, 0, 0, 0.3)',
            },
          },
        }}
      >
        {categories.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <SearchIcon
              sx={{
                fontSize: 48,
                color: textSecondary,
                opacity: 0.5,
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{ color: textPrimary, mb: 1, fontWeight: 500 }}
            >
              No shortcuts found
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: textSecondary }}
            >
              Try searching with different keywords
            </Typography>
          </Box>
        ) : (
          categories.map((category, categoryIndex) => (
            <Box key={category}>
              {/* Category Header */}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor: sectionBg,
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  backdropFilter: 'blur(8px)',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  sx={{
                    color: accentGreen,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    fontSize: '0.75rem',
                  }}
                >
                  {category}
                </Typography>
              </Box>

              {/* Shortcuts List */}
              {groupedShortcuts[category].map((shortcut, index) => (
                <Box
                  key={`${category}-${index}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    px: 3,
                    py: 2,
                    borderBottom:
                      categoryIndex === categories.length - 1 &&
                      index === groupedShortcuts[category].length - 1
                        ? 'none'
                        : `1px solid ${borderColor}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: hoverBg,
                      borderLeftColor: accentGreen,
                      borderLeftWidth: '3px',
                      paddingLeft: 'calc(24px - 2px)',
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: textPrimary,
                      flex: 1,
                      fontWeight: 400,
                      lineHeight: 1.6,
                    }}
                  >
                    {shortcut.action}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        {keyIndex > 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: textSecondary,
                              mx: 0.25,
                              fontSize: '0.7rem',
                            }}
                          >
                            {shortcut.keys.length > 3 ? ',' : 'or'}
                          </Typography>
                        )}
                        <Chip
                          label={key}
                          size="small"
                          sx={{
                            backgroundColor: isDarkBackground
                              ? 'rgba(255, 255, 255, 0.12)'
                              : 'rgba(0, 0, 0, 0.06)',
                            color: textPrimary,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: '26px',
                            minWidth: '34px',
                            fontFamily: 'monospace',
                            border: `1.5px solid ${borderColor}`,
                            borderRadius: '6px',
                            boxShadow: `
                              0 2px 4px rgba(0, 0, 0, 0.08),
                              inset 0 1px 0 rgba(255, 255, 255, ${isDarkBackground ? 0.08 : 0.3}),
                              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                            `,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: isDarkBackground
                                ? 'rgba(255, 255, 255, 0.18)'
                                : 'rgba(0, 0, 0, 0.1)',
                              transform: 'translateY(-1px)',
                              boxShadow: `
                                0 3px 6px rgba(0, 0, 0, 0.12),
                                inset 0 1px 0 rgba(255, 255, 255, ${isDarkBackground ? 0.1 : 0.4}),
                                inset 0 -1px 0 rgba(0, 0, 0, 0.15)
                              `,
                            },
                            '& .MuiChip-label': {
                              padding: '0 10px',
                            },
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              ))}

              {categoryIndex < categories.length - 1 && (
                <Divider sx={{ borderColor: borderColor }} />
              )}
            </Box>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};
