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
  ArrowBack as ArrowBackIcon,
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
  
  // Piano Keys
  { action: 'Play white keys (C2-E3)', keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], category: 'Piano Keys' },
  { action: 'Play white keys (F3-A4)', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], category: 'Piano Keys' },
  { action: 'Play white keys (B4-C6)', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], category: 'Piano Keys' },
  { action: 'Play white keys (D6-C7)', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], category: 'Piano Keys' },
  { action: 'Play black keys (sharps/flats)', keys: ['Shift', '+', 'key'], category: 'Piano Keys' },
  
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

  // Theme-aware colors
  const dialogBg = isDarkBackground
    ? 'rgba(40, 40, 40, 0.95)'
    : 'rgba(255, 255, 255, 0.95)';
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
    : 'rgba(0, 0, 0, 0.03)';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: dialogBg,
          backdropFilter: 'blur(12px)',
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, ${isDarkBackground ? 0.1 : 0.3}),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2)
          `,
          maxHeight: '80vh',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${borderColor}`,
          background: isDarkBackground
            ? 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.02) 100%)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, ${isDarkBackground ? 0.08 : 0.2}),
            0 2px 4px rgba(0, 0, 0, 0.1)
          `,
          pb: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: textSecondary,
            '&:hover': {
              color: textPrimary,
              backgroundColor: hoverBg,
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            flex: 1,
            color: textPrimary,
            textShadow: `
              0 1px 2px rgba(0, 0, 0, 0.3),
              0 -1px 0 rgba(255, 255, 255, ${isDarkBackground ? 0.05 : 0.1})
            `,
            letterSpacing: '0.5px',
          }}
        >
          Keyboard Shortcuts
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: textSecondary,
            '&:hover': {
              color: textPrimary,
              backgroundColor: hoverBg,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Search Bar */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${borderColor}`,
          background: sectionBg,
          position: 'sticky',
          top: 64,
          zIndex: 9,
          backdropFilter: 'blur(8px)',
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search shortcuts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: textSecondary }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: isDarkBackground
                ? 'rgba(0, 0, 0, 0.3)'
                : 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
              color: textPrimary,
              '& fieldset': {
                borderColor: borderColor,
              },
              '&:hover fieldset': {
                borderColor: textSecondary,
              },
              '&.Mui-focused fieldset': {
                borderColor: textPrimary,
                boxShadow: `0 0 8px ${isDarkBackground ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
              },
            },
            '& .MuiOutlinedInput-input': {
              color: textPrimary,
              fontWeight: 400,
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
        sx={{
          position: 'relative',
          zIndex: 2,
          p: 0,
        }}
      >
        {categories.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: textSecondary }}
            >
              No shortcuts found matching "{searchQuery}"
            </Typography>
          </Box>
        ) : (
          categories.map((category, categoryIndex) => (
            <Box key={category}>
              {/* Category Header */}
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  backgroundColor: sectionBg,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  sx={{
                    color: textPrimary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
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
                    px: 3,
                    py: 1.5,
                    borderBottom:
                      categoryIndex === categories.length - 1 &&
                      index === groupedShortcuts[category].length - 1
                        ? 'none'
                        : `1px solid ${borderColor}`,
                    '&:hover': {
                      backgroundColor: hoverBg,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: textPrimary,
                      flex: 1,
                    }}
                  >
                    {shortcut.action}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        {keyIndex > 0 && keyIndex < shortcut.keys.length && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: textSecondary,
                              mx: 0.5,
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
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(0, 0, 0, 0.08)',
                            color: textPrimary,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: '24px',
                            minWidth: '32px',
                            border: `1px solid ${borderColor}`,
                            boxShadow: `
                              0 1px 2px rgba(0, 0, 0, 0.1),
                              inset 0 1px 0 rgba(255, 255, 255, ${isDarkBackground ? 0.05 : 0.2})
                            `,
                            '& .MuiChip-label': {
                              padding: '0 8px',
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
