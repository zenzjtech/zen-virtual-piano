import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Chip,
  IconButton,
  styled,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  PianoOutlined as PianoIcon,
} from '@mui/icons-material';
import { getAllSoundSets, SoundSet } from '@/services/sound-sets';

interface SoundSelectorDialogProps {
  open: boolean;
  currentSoundSetId: string;
  onClose: () => void;
  onSoundSetChange: (soundSetId: string) => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '400px',
    maxWidth: '500px',
  },
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

export const SoundSelectorDialog: React.FC<SoundSelectorDialogProps> = ({
  open,
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
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PianoIcon />
          <Typography variant="h6">Select Piano Sound</Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0 }}>
        <List sx={{ py: 0 }}>
          {soundSets.map((soundSet: SoundSet) => {
            const isSelected = soundSet.id === currentSoundSetId;
            
            return (
              <SoundSetItem key={soundSet.id} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => handleSelect(soundSet.id)}
                  sx={{ py: 2, px: 3 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {isSelected ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <PianoIcon color="action" />
                    )}
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={isSelected ? 600 : 400}>
                        {soundSet.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {soundSet.description}
                        </Typography>
                        <CharacteristicChips>
                          <Chip 
                            label={soundSet.characteristics.brightness} 
                            size="small" 
                            color={getCharacteristicColor(soundSet.characteristics.brightness)}
                            variant="outlined"
                          />
                          <Chip 
                            label={`${soundSet.characteristics.sustain} sustain`} 
                            size="small" 
                            color={getCharacteristicColor(soundSet.characteristics.sustain)}
                            variant="outlined"
                          />
                          <Chip 
                            label={`${soundSet.characteristics.attack} attack`} 
                            size="small" 
                            color={getCharacteristicColor(soundSet.characteristics.attack)}
                            variant="outlined"
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
      </DialogContent>
    </StyledDialog>
  );
};
