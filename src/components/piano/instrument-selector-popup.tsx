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

interface InstrumentSelectorPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  currentSoundSetId: string;
  onClose: () => void;
  onSoundSetChange: (soundSetId: string) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: '320px',
  maxWidth: '400px',
  maxHeight: '400px',
  overflow: 'auto',
  boxShadow: theme.shadows[8],
}));

const SoundSetItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
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

export const InstrumentSelectorPopup: React.FC<InstrumentSelectorPopupProps> = ({
  open,
  anchorEl,
  currentSoundSetId,
  onClose,
  onSoundSetChange,
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
        <StyledPaper elevation={8}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PianoIcon />
              <Typography variant="h6" fontWeight="600">
                Select Instrument
              </Typography>
            </Box>
          </Box>
          
          <List sx={{ py: 0 }}>
            {soundSets.map((soundSet: SoundSet) => {
              const isSelected = soundSet.id === currentSoundSetId;
              
              return (
                <SoundSetItem key={soundSet.id} disablePadding>
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => handleSelect(soundSet.id)}
                    sx={{ py: 2, px: 2 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {isSelected ? (
                        <CheckCircleIcon color="primary" fontSize="small" />
                      ) : (
                        <PianoIcon color="action" fontSize="small" />
                      )}
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight={isSelected ? 600 : 400}>
                          {soundSet.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                            {soundSet.description}
                          </Typography>
                          <CharacteristicChips>
                            <Chip 
                              label={soundSet.characteristics.brightness} 
                              size="small" 
                              color={getCharacteristicColor(soundSet.characteristics.brightness)}
                              variant="outlined"
                              sx={{ fontSize: '0.65rem', height: '20px' }}
                            />
                            <Chip 
                              label={`${soundSet.characteristics.sustain} sustain`} 
                              size="small" 
                              color={getCharacteristicColor(soundSet.characteristics.sustain)}
                              variant="outlined"
                              sx={{ fontSize: '0.65rem', height: '20px' }}
                            />
                            <Chip 
                              label={`${soundSet.characteristics.attack} attack`} 
                              size="small" 
                              color={getCharacteristicColor(soundSet.characteristics.attack)}
                              variant="outlined"
                              sx={{ fontSize: '0.65rem', height: '20px' }}
                            />
                          </CharacteristicChips>
                        </>
                      }
                    />
                  </ListItemButton>
                </SoundSetItem>
              );
            })}
          </List>
        </StyledPaper>
      </ClickAwayListener>
    </Popper>
  );
};
