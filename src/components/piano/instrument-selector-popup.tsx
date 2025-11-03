import React, { useState, useMemo } from 'react';
import {
  List,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  PianoOutlined as PianoIcon,
} from '@mui/icons-material';
import { getAllSoundSets, SoundSet } from '@/services/sound-sets';
import { PianoTheme } from './themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
  StyledListItem,
  StyledListItemButton,
  StyledChip,
  CharacteristicChips,
} from './popup-styled-components';
import { PopupSearchBar } from './popup-search-bar';

interface InstrumentSelectorPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  currentSoundSetId: string;
  onClose: () => void;
  onSoundSetChange: (soundSetId: string) => void;
  pianoTheme: PianoTheme;
  /** Whether to show the search bar (default: true) */
  showSearch?: boolean;
}


export const InstrumentSelectorPopup: React.FC<InstrumentSelectorPopupProps> = ({
  open,
  anchorEl,
  currentSoundSetId,
  onClose,
  onSoundSetChange,
  pianoTheme,
  showSearch = true,
}) => {
  const soundSets = getAllSoundSets();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sound sets based on search query
  const filteredSoundSets = useMemo(() => {
    if (!searchQuery.trim()) {
      return soundSets;
    }
    
    const query = searchQuery.toLowerCase();
    return soundSets.filter(soundSet => 
      soundSet.name.toLowerCase().includes(query) ||
      soundSet.description.toLowerCase().includes(query) ||
      soundSet.characteristics.brightness.toLowerCase().includes(query) ||
      soundSet.characteristics.sustain.toLowerCase().includes(query) ||
      soundSet.characteristics.attack.toLowerCase().includes(query)
    );
  }, [soundSets, searchQuery]);

  const handleSelect = (soundSetId: string) => {
    onSoundSetChange(soundSetId);
    onClose();
  };

  const getCharacteristicColor = (value: string): "primary" | "secondary" | "success" | "warning" | "info" => {
    switch (value) {
      case 'bright': return 'warning';
      case 'mellow': return 'info';
      case 'long': return 'success';
      case 'sharp': return 'error' as any;
      case 'soft': return 'info';
      default: return 'primary';
    }
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 1300 }}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: ['top-start', 'bottom-start'],
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            padding: 8,
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={onClose}>
        <StyledPopupPaper elevation={8} pianoTheme={pianoTheme}>
          <PopupHeaderBox pianoTheme={pianoTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PianoIcon
                sx={{
                  color: pianoTheme.colors.accent,
                  fontSize: '1.5rem',
                  filter: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))`,
                }}
              />
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  color: pianoTheme.colors.primary,
                  textShadow: `
                    0 1px 2px rgba(0, 0, 0, 0.3),
                    0 -1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.1 : 0.05})
                  `,
                  letterSpacing: '0.5px',
                }}
              >
                Select Instrument
              </Typography>
            </Box>
          </PopupHeaderBox>
          
          {/* Search Box */}
          {showSearch && (
            <PopupSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search instruments..."
              pianoTheme={pianoTheme}
              isOpen={open}
            />
          )}
          
          <List sx={{ py: 0 }}>
            {filteredSoundSets.length > 0 ? (
              filteredSoundSets.map((soundSet: SoundSet) => {
              const isSelected = soundSet.id === currentSoundSetId;
              
              return (
                <StyledListItem key={soundSet.id} disablePadding pianoTheme={pianoTheme}>
                  <StyledListItemButton
                    selected={isSelected}
                    isSelected={isSelected}
                    onClick={() => handleSelect(soundSet.id)}
                    pianoTheme={pianoTheme}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {isSelected ? (
                        <CheckCircleIcon
                          sx={{
                            color: pianoTheme.colors.accent,
                            fontSize: '1.25rem',
                            filter: `drop-shadow(0 0 4px ${pianoTheme.colors.accent}66)`,
                          }}
                        />
                      ) : (
                        <PianoIcon
                          sx={{
                            color: pianoTheme.colors.secondary,
                            fontSize: '1.25rem',
                            opacity: 0.6,
                          }}
                        />
                      )}
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          fontWeight={isSelected ? 600 : 500}
                          sx={{
                            color: pianoTheme.colors.primary,
                            textShadow: `0 1px 1px rgba(0, 0, 0, 0.2)`,
                            letterSpacing: '0.3px',
                          }}
                        >
                          {soundSet.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 0.75,
                              fontSize: '0.75rem',
                              color: pianoTheme.colors.secondary,
                              opacity: 0.85,
                            }}
                          >
                            {soundSet.description}
                          </Typography>
                          <CharacteristicChips>
                            <StyledChip
                              label={soundSet.characteristics.brightness}
                              size="small"
                              variant="outlined"
                              pianoTheme={pianoTheme}
                            />
                            <StyledChip
                              label={`${soundSet.characteristics.sustain} sustain`}
                              size="small"
                              variant="outlined"
                              pianoTheme={pianoTheme}
                            />
                            <StyledChip
                              label={`${soundSet.characteristics.attack} attack`}
                              size="small"
                              variant="outlined"
                              pianoTheme={pianoTheme}
                            />
                          </CharacteristicChips>
                        </>
                      }
                    />
                  </StyledListItemButton>
                </StyledListItem>
              );
              })
            ) : (
              <Box sx={{ py: 4, px: 3, textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: pianoTheme.colors.secondary,
                    opacity: 0.7,
                  }}
                >
                  No instruments found matching "{searchQuery}"
                </Typography>
              </Box>
            )}
          </List>
        </StyledPopupPaper>
      </ClickAwayListener>
    </Popper>
  );
};
