import React, { useRef, useEffect } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { PianoTheme } from './themes';
import { SearchBox, SearchInput } from './popup-styled-components';

interface PopupSearchBarProps {
  /** Current search query value */
  value: string;
  /** Callback when search value changes */
  onChange: (value: string) => void;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Piano theme for styling */
  pianoTheme: PianoTheme;
  /** Whether to auto-focus the search input (default: true) */
  autoFocus?: boolean;
  /** Whether the popup is open (for auto-focus timing) */
  isOpen?: boolean;
}

/**
 * Reusable search bar component for popups
 * Provides consistent search functionality across all popup components
 */
export const PopupSearchBar: React.FC<PopupSearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  pianoTheme,
  autoFocus = true,
  isOpen = true,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when popup opens
  useEffect(() => {
    if (autoFocus && isOpen && searchInputRef.current) {
      // Delay to ensure Popper is fully positioned and rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [autoFocus, isOpen]);

  const handleClear = () => {
    onChange('');
    // Refocus after clearing
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  return (
    <SearchBox pianoTheme={pianoTheme}>
      <SearchInput
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        pianoTheme={pianoTheme}
        inputRef={searchInputRef}
        autoFocus={autoFocus}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                fontSize="small"
                sx={{ color: pianoTheme.colors.secondary }}
              />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
                sx={{
                  color: pianoTheme.colors.secondary,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: pianoTheme.colors.accent,
                    backgroundColor: pianoTheme.isLight
                      ? 'rgba(0, 0, 0, 0.04)'
                      : 'rgba(255, 255, 255, 0.08)',
                  },
                }}
                aria-label="Clear search"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </SearchBox>
  );
};
