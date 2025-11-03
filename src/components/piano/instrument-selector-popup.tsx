import React, { useRef, useEffect } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Chip,
  styled,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  PianoOutlined as PianoIcon,
} from '@mui/icons-material';
import { getAllSoundSets, SoundSet } from '@/services/sound-sets';
import { PianoTheme } from './themes';

interface InstrumentSelectorPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  currentSoundSetId: string;
  onClose: () => void;
  onSoundSetChange: (soundSetId: string) => void;
  pianoTheme: PianoTheme;
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  minWidth: '320px',
  maxWidth: '420px',
  maxHeight: '500px',
  overflow: 'auto',
  background: pianoTheme.container.background,
  border: pianoTheme.container.border,
  borderRadius: '8px',
  // Enhanced realistic box shadow with depth
  boxShadow: `
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.3 : 0.1}),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2)
  `,
  position: 'relative',
  // Subtle texture overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: pianoTheme.container.beforeBackground || 'transparent',
    pointerEvents: 'none',
    opacity: 0.3,
    zIndex: 1,
    borderRadius: '8px',
  },
  // Smooth scrollbar styling
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: pianoTheme.colors.border,
    borderRadius: '4px',
    '&:hover': {
      background: pianoTheme.colors.accent,
    },
  },
}));

const SoundSetItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  borderBottom: `1px solid ${pianoTheme.colors.border}`,
  position: 'relative',
  zIndex: 2,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const CharacteristicChips = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  flexWrap: 'wrap',
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme' && prop !== 'isSelected',
})<{ pianoTheme: PianoTheme; isSelected: boolean }>(({ theme, pianoTheme, isSelected }) => ({
  padding: theme.spacing(2),
  position: 'relative',
  zIndex: 2,
  transition: 'all 0.2s ease',
  background: isSelected
    ? pianoTheme.isLight
      ? 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.08) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)'
    : 'transparent',
  // Button depth and lighting
  boxShadow: isSelected
    ? `
      inset 0 2px 4px rgba(0, 0, 0, 0.2),
      inset 0 -1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.2 : 0.05})
    `
    : 'none',
  '&:hover': {
    background: pianoTheme.isLight
      ? 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
    boxShadow: `
      0 0 12px ${pianoTheme.colors.accent}33,
      inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.15 : 0.08})
    `,
  },
  '&:active': {
    boxShadow: `
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05)
    `,
  },
}));

const HeaderBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  padding: theme.spacing(2, 2.5),
  borderBottom: `1px solid ${pianoTheme.colors.border}`,
  background: pianoTheme.isLight
    ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.02) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)',
  position: 'relative',
  zIndex: 2,
  // Enhanced depth
  boxShadow: `
    inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.2 : 0.08}),
    0 2px 4px rgba(0, 0, 0, 0.1)
  `,
}));

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  fontSize: '0.65rem',
  height: '22px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderColor: pianoTheme.colors.border,
  color: pianoTheme.colors.secondary,
  // Subtle chip depth
  boxShadow: `
    0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.2 : 0.05})
  `,
  '&:hover': {
    borderColor: pianoTheme.colors.accent,
    color: pianoTheme.colors.accent,
  },
}));

export const InstrumentSelectorPopup: React.FC<InstrumentSelectorPopupProps> = ({
  open,
  anchorEl,
  currentSoundSetId,
  onClose,
  onSoundSetChange,
  pianoTheme,
}) => {
  const soundSets = getAllSoundSets();

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
        <StyledPaper elevation={8} pianoTheme={pianoTheme}>
          <HeaderBox pianoTheme={pianoTheme}>
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
          </HeaderBox>
          
          <List sx={{ py: 0 }}>
            {soundSets.map((soundSet: SoundSet) => {
              const isSelected = soundSet.id === currentSoundSetId;
              
              return (
                <SoundSetItem key={soundSet.id} disablePadding pianoTheme={pianoTheme}>
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
                </SoundSetItem>
              );
            })}
          </List>
        </StyledPaper>
      </ClickAwayListener>
    </Popper>
  );
};
