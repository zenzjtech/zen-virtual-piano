import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Stack,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  AutoFixHigh as PresetIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';
import {
  THEME_PRESETS,
  getPresetCategories,
  getPresetsByCategory,
  ThemePreset,
  ThemePresetCategory,
} from './theme-presets';

interface PresetSelectorProps {
  pianoTheme: PianoTheme;
  currentPianoTheme: string;
  currentBackgroundTheme: string;
  currentMusicSheetTheme: string;
  onPresetApply: (preset: ThemePreset) => void;
  searchQuery?: string;
}

/**
 * Preset Selector Component
 * Allows users to browse and apply curated theme combinations
 */
export const PresetSelector: React.FC<PresetSelectorProps> = ({
  pianoTheme,
  currentPianoTheme,
  currentBackgroundTheme,
  currentMusicSheetTheme,
  onPresetApply,
  searchQuery = '',
}) => {
  const [expandedCategory, setExpandedCategory] = useState<ThemePresetCategory | null>('classic');
  const categories = getPresetCategories();

  // Filter presets based on search query
  const filterPresets = (presets: ThemePreset[]) => {
    if (!searchQuery.trim()) return presets;
    const query = searchQuery.toLowerCase();
    return presets.filter(
      preset =>
        preset.name.toLowerCase().includes(query) ||
        preset.description.toLowerCase().includes(query) ||
        preset.category.toLowerCase().includes(query)
    );
  };

  // Check if a preset is currently active
  const isPresetActive = (preset: ThemePreset): boolean => {
    return (
      preset.pianoTheme === currentPianoTheme &&
      preset.backgroundTheme === currentBackgroundTheme &&
      preset.musicSheetTheme === currentMusicSheetTheme
    );
  };

  const handleCategoryToggle = (categoryId: ThemePresetCategory) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <PresetIcon
          sx={{
            color: pianoTheme.colors.secondary,
            fontSize: '1.1rem',
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            color: pianoTheme.colors.secondary,
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          Quick Presets
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        {categories.map(category => {
          const categoryPresets = filterPresets(getPresetsByCategory(category.id));
          if (categoryPresets.length === 0 && searchQuery.trim()) return null;

          const isExpanded = expandedCategory === category.id;
          const hasActivePreset = categoryPresets.some(isPresetActive);

          return (
            <Box key={category.id}>
              {/* Category Header */}
              <Box
                onClick={() => handleCategoryToggle(category.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  py: 1,
                  px: 1.5,
                  borderRadius: 1,
                  transition: 'all 0.2s ease',
                  background: pianoTheme.isLight
                    ? 'rgba(0, 0, 0, 0.02)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${pianoTheme.colors.border}`,
                  '&:hover': {
                    background: pianoTheme.isLight
                      ? 'rgba(0, 0, 0, 0.04)'
                      : 'rgba(255, 255, 255, 0.04)',
                    borderColor: pianoTheme.colors.accent,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: pianoTheme.colors.primary,
                      fontWeight: 600,
                      fontSize: '0.813rem',
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Chip
                    label={categoryPresets.length}
                    size="small"
                    sx={{
                      height: '18px',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: pianoTheme.colors.secondary,
                      bgcolor: pianoTheme.isLight
                        ? 'rgba(0, 0, 0, 0.05)'
                        : 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                  {hasActivePreset && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: pianoTheme.colors.accent,
                      }}
                    />
                  )}
                </Box>
                <IconButton
                  size="small"
                  sx={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: pianoTheme.colors.secondary,
                  }}
                >
                  <ExpandMoreIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Preset Cards */}
              <Collapse in={isExpanded} timeout="auto">
                <Stack spacing={1} sx={{ mt: 1, pl: 1 }}>
                  {categoryPresets.map(preset => {
                    const isActive = isPresetActive(preset);
                    return (
                      <Card
                        key={preset.id}
                        onClick={() => onPresetApply(preset)}
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          border: isActive
                            ? `2px solid ${pianoTheme.colors.accent}`
                            : `1px solid ${pianoTheme.colors.border}`,
                          background: isActive
                            ? pianoTheme.isLight
                              ? 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.05) 100%)'
                              : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)'
                            : pianoTheme.isLight
                            ? 'rgba(255, 255, 255, 0.5)'
                            : 'rgba(0, 0, 0, 0.2)',
                          boxShadow: isActive
                            ? `0 0 12px ${pianoTheme.colors.accent}33`
                            : 'none',
                          '&:hover': {
                            borderColor: pianoTheme.colors.accent,
                            transform: 'translateX(4px)',
                            boxShadow: `0 2px 8px ${pianoTheme.colors.accent}22`,
                          },
                        }}
                      >
                        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  color: pianoTheme.colors.primary,
                                  fontWeight: 600,
                                  fontSize: '0.813rem',
                                  mb: 0.5,
                                }}
                              >
                                {preset.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: pianoTheme.colors.secondary,
                                  opacity: 0.8,
                                  fontSize: '0.7rem',
                                  display: 'block',
                                  mb: 1,
                                }}
                              >
                                {preset.description}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                <Chip
                                  label={preset.pianoTheme}
                                  size="small"
                                  sx={{
                                    height: '16px',
                                    fontSize: '0.6rem',
                                    bgcolor: pianoTheme.isLight
                                      ? 'rgba(100, 100, 200, 0.1)'
                                      : 'rgba(100, 100, 200, 0.2)',
                                    color: pianoTheme.colors.secondary,
                                  }}
                                />
                                <Chip
                                  label={preset.backgroundTheme}
                                  size="small"
                                  sx={{
                                    height: '16px',
                                    fontSize: '0.6rem',
                                    bgcolor: pianoTheme.isLight
                                      ? 'rgba(100, 200, 100, 0.1)'
                                      : 'rgba(100, 200, 100, 0.2)',
                                    color: pianoTheme.colors.secondary,
                                  }}
                                />
                                <Chip
                                  label={preset.musicSheetTheme}
                                  size="small"
                                  sx={{
                                    height: '16px',
                                    fontSize: '0.6rem',
                                    bgcolor: pianoTheme.isLight
                                      ? 'rgba(200, 100, 100, 0.1)'
                                      : 'rgba(200, 100, 100, 0.2)',
                                    color: pianoTheme.colors.secondary,
                                  }}
                                />
                              </Box>
                            </Box>
                            {isActive && (
                              <CheckIcon
                                sx={{
                                  color: pianoTheme.colors.accent,
                                  fontSize: '1.2rem',
                                  ml: 1,
                                }}
                              />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              </Collapse>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
