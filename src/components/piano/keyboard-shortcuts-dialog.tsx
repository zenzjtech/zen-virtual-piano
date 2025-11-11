import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Divider,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Keyboard as KeyboardIcon,
} from '@mui/icons-material';
import { useDialogTheme } from '@/hooks/use-global-dialog-theme';
import { DialogHeader } from '@/components/global/dialog/global-dialog-header';
import { getDialogStyles, getTextFieldStyles, getScrollbarStyles } from '@/components/global/dialog/styles';
import { useAppDispatch } from '@/store/hook';
import { useDialogPianoControl } from '@/hooks/use-dialog-piano-control';

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
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
  { action: 'Play/Pause sheet', keys: ['Ctrl+Enter'], category: 'Sheet Mode' },
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
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useDialogTheme();
  const dispatch = useAppDispatch();

  // Disable piano when dialog opens, re-enable when it closes
  useDialogPianoControl(open);

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: getDialogStyles(theme),
      }}
      aria-labelledby="keyboard-shortcuts-dialog-title"
      aria-describedby="keyboard-shortcuts-dialog-description"
    >
      {/* Header */}
      <DialogHeader
        id="keyboard-shortcuts-dialog-title"
        title="Keyboard Shortcuts"
        subtitle={`${shortcuts.length} shortcuts available`}
        icon={<KeyboardIcon />}
        onClose={onClose}
      />

      {/* Search Bar */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: `1px solid ${theme.borderColor}`,
          background: theme.sectionBg,
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
                <SearchIcon sx={{ color: theme.textSecondary, fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            ...getTextFieldStyles(theme),
            '& .MuiOutlinedInput-input': {
              py: 1.25,
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
          ...getScrollbarStyles(theme),
        }}
      >
        {categories.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <SearchIcon
              sx={{
                fontSize: 48,
                color: theme.textSecondary,
                opacity: 0.5,
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{ color: theme.textPrimary, mb: 1, fontWeight: 500 }}
            >
              No shortcuts found
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.textSecondary }}
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
                  backgroundColor: theme.sectionBg,
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  backdropFilter: 'blur(8px)',
                  borderBottom: `1px solid ${theme.borderColor}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  sx={{
                    color: theme.accentPrimary,
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
                        : `1px solid ${theme.borderColor}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.hoverBg,
                      borderLeftColor: theme.accentPrimary,
                      borderLeftWidth: '3px',
                      paddingLeft: 'calc(24px - 2px)',
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.textPrimary,
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
                              color: theme.textSecondary,
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
                            backgroundColor: theme.isDarkBackground
                              ? 'rgba(255, 255, 255, 0.12)'
                              : 'rgba(0, 0, 0, 0.06)',
                            color: theme.textPrimary,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: '26px',
                            minWidth: '34px',
                            fontFamily: 'monospace',
                            border: `1.5px solid ${theme.borderColor}`,
                            borderRadius: '6px',
                            boxShadow: `
                              0 2px 4px rgba(0, 0, 0, 0.08),
                              inset 0 1px 0 rgba(255, 255, 255, ${theme.isDarkBackground ? 0.08 : 0.3}),
                              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                            `,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: theme.isDarkBackground
                                ? 'rgba(255, 255, 255, 0.18)'
                                : 'rgba(0, 0, 0, 0.1)',
                              transform: 'translateY(-1px)',
                              boxShadow: `
                                0 3px 6px rgba(0, 0, 0, 0.12),
                                inset 0 1px 0 rgba(255, 255, 255, ${theme.isDarkBackground ? 0.1 : 0.4}),
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
                <Divider sx={{ borderColor: theme.borderColor }} />
              )}
            </Box>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};
