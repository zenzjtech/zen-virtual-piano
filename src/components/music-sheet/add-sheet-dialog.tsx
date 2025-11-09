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
import { getDialogStyles, getTextFieldStyles } from '@/components/global/dialog/styles';
import { useAppDispatch } from '@/store/hook';
import { addCustomSheet } from '@/store/reducers/music-sheet-slice';
import { disablePianoForDialog, enablePianoAfterDialog } from '@/store/reducers/piano-settings-slice';
import { parseVPNotation } from '@/services/sheet-parser';
import type { MusicSheet } from './types';

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

  // Disable piano when dialog opens, re-enable when it closes
  useEffect(() => {
    if (open) {
      dispatch(disablePianoForDialog());
    } else {
      dispatch(enablePianoAfterDialog());
    }
  }, [open, dispatch]);
  
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
      newErrors.title = 'Title is required';
    }

    if (!artist.trim()) {
      newErrors.artist = 'Artist is required';
    }

    if (!notation.trim()) {
      newErrors.notation = 'Notation is required';
    }

    if (tempo < 40 || tempo > 240) {
      newErrors.tempo = 'Tempo must be between 40 and 240 BPM';
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
        console.warn('Notation parsing warnings:', parsedNotation.warnings);
      }

      // Create sheet object
      const newSheet: MusicSheet = {
        id: `custom-${Date.now()}`,
        title: title.trim(),
        artist: artist.trim(),
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
        notation: 'Failed to parse notation. Please check the format.',
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: getDialogStyles(theme),
      }}
    >
      <DialogHeader
        title="Add Custom Sheet"
        subtitle="Create your own music sheet with Virtual Piano notation"
        icon={<AddIcon />}
        onClose={handleClose}
      />
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Title */}
          <TextField
            label="Title"
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
            label="Artist"
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
            label="Virtual Piano Notation"
            value={notation}
            onChange={(e) => setNotation(e.target.value)}
            error={!!errors.notation}
            helperText={errors.notation || 'Enter Virtual Piano keyboard notation (e.g., "t y u | i o p")'}
            multiline
            rows={4}
            fullWidth
            required
            sx={getTextFieldStyles(theme)}
          />

          {/* Difficulty & Tempo */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                label="Difficulty"
                sx={getTextFieldStyles(theme)}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Tempo (BPM)"
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
              label="Time Signature"
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
                label="Add Tags"
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
                Add
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
            label="Source URL (Optional)"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            fullWidth
            helperText="URL where you found this sheet (for reference)"
            sx={getTextFieldStyles(theme)}
          />

          {/* Help text */}
          <Typography variant="caption" sx={{ color: theme.textSecondary }}>
            Note: Custom sheets are stored locally and limited to a maximum number based on your settings.
            If the limit is reached, the oldest sheet will be automatically removed.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, borderTop: `1px solid ${theme.borderColor}` }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          sx={{
            px: 3,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
            '&:hover': {
              borderColor: theme.textSecondary,
              backgroundColor: theme.hoverBg,
            },
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          sx={{
            px: 3,
            backgroundColor: theme.accentPrimary,
            color: '#ffffff',
            '&:hover': {
              backgroundColor: theme.accentPrimary,
              opacity: 0.9,
            },
          }}
        >
          Add Sheet
        </Button>
      </DialogActions>
    </Dialog>
  );
};
