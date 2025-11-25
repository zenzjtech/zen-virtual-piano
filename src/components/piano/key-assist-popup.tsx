import React from 'react';
import {
  Box,
  Typography,
  Popper,
  ClickAwayListener,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import {
  Keyboard as KeyboardIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
  PopupContentBox,
} from './popup-styled-components';
import { useTranslation } from '@/hooks/use-translation';

interface KeyAssistPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  showKeyboard: boolean;
  showNoteName: boolean;
  onClose: () => void;
  onShowKeyboardChange: (enabled: boolean) => void;
  onShowNoteNameChange: (enabled: boolean) => void;
  pianoTheme: PianoTheme;
}

/**
 * Key Assist popup component for configuring keyboard and note name display
 * Only one option can be enabled at a time, but both can be disabled
 */
export const KeyAssistPopup: React.FC<KeyAssistPopupProps> = ({
  open,
  anchorEl,
  showKeyboard,
  showNoteName,
  onClose,
  onShowKeyboardChange,
  onShowNoteNameChange,
  pianoTheme,
}) => {
  const { t } = useTranslation('piano');
  const handleKeyboardToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue && showNoteName) {
      // If turning on keyboard, turn off note name first
      onShowNoteNameChange(false);
    }
    onShowKeyboardChange(newValue);
  };

  const handleNoteNameToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue && showKeyboard) {
      // If turning on note name, turn off keyboard first
      onShowKeyboardChange(false);
    }
    onShowNoteNameChange(newValue);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="top-start"
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
          {/* Header */}
          <PopupHeaderBox pianoTheme={pianoTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <KeyboardIcon
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
                {t('keyAssistSettings')}
              </Typography>
            </Box>
          </PopupHeaderBox>

          {/* Content */}
          <PopupContentBox pianoTheme={pianoTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: pianoTheme.colors.secondary,
                  fontSize: '0.8rem',
                  opacity: 0.85,
                  mb: 1,
                }}
              >
                {t('chooseDisplayKeyInfo')}
              </Typography>

              <Divider sx={{ borderColor: pianoTheme.colors.border, opacity: 0.3 }} />

              {/* Show Keyboard Option */}
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showKeyboard}
                      onChange={handleKeyboardToggle}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: pianoTheme.colors.accent,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: pianoTheme.colors.accent,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ ml: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body1"
                          fontWeight={showKeyboard ? 600 : 500}
                          sx={{
                            color: pianoTheme.colors.primary,
                            fontSize: '0.9rem',
                          }}
                        >
                          {t('showKeyboardKeys')}
                        </Typography>
                        {showKeyboard && (
                          <CheckCircleIcon
                            sx={{
                              fontSize: '1rem',
                              color: pianoTheme.colors.accent,
                              filter: `drop-shadow(0 0 4px ${pianoTheme.colors.accent}66)`,
                            }}
                          />
                        )}
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: pianoTheme.colors.secondary,
                          opacity: 0.8,
                          fontSize: '0.7rem',
                          display: 'block',
                          mt: 0.5,
                        }}
                      >
                        {t('displayKeyboardShortcuts')}
                      </Typography>
                    </Box>
                  }
                  sx={{ 
                    margin: 0,
                    width: '100%',
                    alignItems: 'flex-start',
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ borderColor: pianoTheme.colors.border, opacity: 0.3 }} />

              {/* Show Note Name Option */}
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showNoteName}
                      onChange={handleNoteNameToggle}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: pianoTheme.colors.accent,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: pianoTheme.colors.accent,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ ml: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body1"
                          fontWeight={showNoteName ? 600 : 500}
                          sx={{
                            color: pianoTheme.colors.primary,
                            fontSize: '0.9rem',
                          }}
                        >
                          {t('showNoteNames')}
                        </Typography>
                        {showNoteName && (
                          <CheckCircleIcon
                            sx={{
                              fontSize: '1rem',
                              color: pianoTheme.colors.accent,
                              filter: `drop-shadow(0 0 4px ${pianoTheme.colors.accent}66)`,
                            }}
                          />
                        )}
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: pianoTheme.colors.secondary,
                          opacity: 0.8,
                          fontSize: '0.7rem',
                          display: 'block',
                          mt: 0.5,
                        }}
                      >
                        {t('displayNoteNames')}
                      </Typography>
                    </Box>
                  }
                  sx={{ 
                    margin: 0,
                    width: '100%',
                    alignItems: 'flex-start',
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                    },
                  }}
                />
              </Box>

              {/* Info note when both are disabled */}
              {!showKeyboard && !showNoteName && (
                <>
                  <Divider sx={{ borderColor: pianoTheme.colors.border, opacity: 0.3 }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: pianoTheme.colors.secondary,
                      fontSize: '0.7rem',
                      opacity: 0.7,
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}
                  >
                    {t('noLabelsShown')}
                  </Typography>
                </>
              )}
            </Box>
          </PopupContentBox>
        </StyledPopupPaper>
      </ClickAwayListener>
    </Popper>
  );
};
