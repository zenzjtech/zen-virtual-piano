import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useDialogTheme } from '@/hooks/use-global-dialog-theme';
import { DialogHeader } from '@/components/global/dialog/global-dialog-header';
import { getDialogStyles, getTextFieldStyles, getDialogButtonStyles } from '@/components/global/dialog/styles';
import { useAppDispatch } from '@/store/hook';
import { addCustomSheet } from '@/store/reducers/music-sheet-slice';
import { useDialogPianoControl } from '@/hooks/use-dialog-piano-control';
import { parseVPNotation } from '@/services/sheet-parser';
import type { MusicSheet } from './types';
import { useTranslation } from '@/hooks/use-translation';

interface AddSheetDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Dialog for creating/adding custom music sheets
 */
export const AddSheetDialog: React.FC<AddSheetDialogProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const theme = useDialogTheme();
  const { t: tSheet } = useTranslation('sheet');
  const { t: tCommon } = useTranslation('common');

  // Disable piano when dialog opens, re-enable when it closes
  useDialogPianoControl(open);
  
  // Form state
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [notation, setNotation] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [tempo, setTempo] = useState<number>(120);
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form
  const resetForm = () => {
    setTitle('');
    setArtist('');
    setNotation('');
    setDifficulty('medium');
    setTempo(120);
    setTimeSignature('4/4');
    setTags([]);
    setTagInput('');
    setSourceUrl('');
    setErrors({});
  };

  // Handle close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Add tag
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = tSheet('titleRequired');
    }

    if (!artist.trim()) {
      newErrors.artist = tSheet('artistRequired');
    }

    if (!notation.trim()) {
      newErrors.notation = tSheet('notationRequired');
    }

    if (tempo < 40 || tempo > 240) {
      newErrors.tempo = tSheet('tempoRangeError');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Parse notation
      const parsedNotation = parseVPNotation(notation, tempo);

      if (parsedNotation.warnings.length > 0) {
        console.log('Notation parsing warnings:', parsedNotation.warnings);
      }

      // Create sheet object
      const newSheet: MusicSheet = {
        id: `custom-${Date.now()}`,
        title: title.trim(),
        artist: {
          name: artist.trim(),
          avatarUrl: "",
        },
        difficulty,
        notation: notation.trim(),
        tempo,
        timeSignature,
        pages: [{
          measures: parsedNotation.measures,
          pageNumber: 1,
        }],
        tags,
        sourceUrl: sourceUrl.trim() || undefined,
      };

      // Add to store
      dispatch(addCustomSheet(newSheet));

      // Close dialog
      handleClose();
    } catch (error) {
      console.error('Failed to create sheet:', error);
      setErrors({
        notation: tSheet('notationParsingError'),
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: { sx: getDialogStyles(theme) },
      }}
    >
      <DialogHeader
        title={tSheet('addCustomSheetTitle')}
        subtitle={tSheet('addCustomSheetSubtitle')}
        icon={<AddIcon />}
        onClose={handleClose}
      />
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Title */}
          <TextField
            label={tSheet('title')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
            sx={getTextFieldStyles(theme)}
          />

          {/* Artist */}
          <TextField
            label={tSheet('artist')}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            error={!!errors.artist}
            helperText={errors.artist}
            fullWidth
            required
            sx={getTextFieldStyles(theme)}
          />

          {/* Notation */}
          <TextField
            label={tSheet('virtualPianoNotation')}
            value={notation}
            onChange={(e) => setNotation(e.target.value)}
            error={!!errors.notation}
            helperText={errors.notation || tSheet('notationPlaceholder')}
            multiline
            rows={4}
            fullWidth
            required
            sx={getTextFieldStyles(theme)}
          />

          {/* Difficulty & Tempo */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>{tSheet('difficulty')}</InputLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                label={tSheet('difficulty')}
                sx={getTextFieldStyles(theme)}
              >
                <MenuItem value="easy">{tSheet('easy')}</MenuItem>
                <MenuItem value="medium">{tSheet('medium')}</MenuItem>
                <MenuItem value="hard">{tSheet('hard')}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label={tSheet('tempoBPM')}
              type="number"
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              error={!!errors.tempo}
              helperText={errors.tempo}
              inputProps={{ min: 40, max: 240 }}
              fullWidth
              sx={getTextFieldStyles(theme)}
            />

            <TextField
              label={tSheet('timeSignature')}
              value={timeSignature}
              onChange={(e) => setTimeSignature(e.target.value)}
              fullWidth
              sx={getTextFieldStyles(theme)}
            />
          </Box>

          {/* Tags */}
          <Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                label={tSheet('addTags')}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                size="small"
                fullWidth
                sx={getTextFieldStyles(theme)}
              />
              <Button
                onClick={handleAddTag}
                variant="outlined"
                size="small"
                disabled={!tagInput.trim()}
                sx={{
                  borderColor: theme.borderColor,
                  color: theme.textPrimary,
                  '&:hover': {
                    borderColor: theme.accentPrimary,
                    backgroundColor: theme.hoverBg,
                  },
                }}
              >
                {tCommon('add')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                  sx={{
                    backgroundColor: theme.highlightBg,
                    color: theme.textPrimary,
                    borderColor: theme.borderColor,
                    '&:hover': {
                      backgroundColor: theme.hoverBg,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Source URL (Optional) */}
          <TextField
            label={tSheet('sourceUrl')}
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            fullWidth
            helperText={tSheet('sourceUrlHelper')}
            sx={getTextFieldStyles(theme)}
          />

          {/* Help text */}
          <Typography variant="caption" sx={{ color: theme.textSecondary }}>
            {tSheet('addSheetNote')}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, borderTop: `1px solid ${theme.borderColor}` }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          sx={getDialogButtonStyles(theme, 'cancel')}
        >
          {tCommon('cancel')}
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          sx={getDialogButtonStyles(theme, 'primary')}
        >
          {tSheet('addSheet')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
