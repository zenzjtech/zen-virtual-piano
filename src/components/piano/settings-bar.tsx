import React from 'react';
import { Box, Button, styled, Paper, Tooltip } from '@mui/material';
import {
  FiberManualRecord as RecordIcon,
  Keyboard as KeyboardIcon,
  VolumeUp as SoundIcon,
  Palette as StylesIcon,
  Piano as InstrumentIcon,
  PowerSettingsNew as PowerIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';
import { PatternTheme } from './pattern-themes';
import { useAppSelector } from '@/store/hook';
import { getPatternTheme } from './pattern-themes';
import { getSoundSet } from '@/services/sound-sets';
import { getInstrumentImage } from '@/utils/instrument-images';
import { getTheme } from './themes';

interface SettingsBarProps {
  onTogglePiano?: () => void;
  onRecord?: () => void;
  onKeyAssist?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onInstrument?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSound?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onStyles?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BarContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme' && prop !== 'patternTheme',
})<{ pianoTheme: PianoTheme; patternTheme?: PatternTheme }>(({ theme, pianoTheme, patternTheme }) => ({
  background: pianoTheme.container.background,
  color: pianoTheme.colors.primary,
  padding: theme.spacing(1.5, 2),
  borderRadius: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  // Enhanced realistic box shadow with recessed look
  boxShadow: `
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15),
    inset 2px 0 3px rgba(0, 0, 0, 0.1),
    inset -2px 0 3px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.05)
  `,
  border: pianoTheme.container.border,
  borderTop: 'none',
  borderBottom: 'none',
  flexWrap: 'wrap',
  position: 'relative',
  overflow: 'hidden',
  // Subtle inner border highlight
  borderLeft: `1px solid rgba(255, 255, 255, 0.05)`,
  borderRight: `1px solid rgba(255, 255, 255, 0.05)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: patternTheme?.beforePattern || pianoTheme.container.beforeBackground || 'none',
    pointerEvents: 'none',
    opacity: 0.6,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: patternTheme?.afterPattern || pianoTheme.container.afterBackground || 'none',
    pointerEvents: 'none',
    zIndex: 2,
  },
}));

const SettingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'pianoTheme',
})<{ pianoTheme: PianoTheme }>(({ theme, pianoTheme }) => ({
  color: pianoTheme.colors.secondary,
  borderColor: pianoTheme.colors.border,
  minWidth: '100px',
  padding: theme.spacing(1, 2),
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  position: 'relative',
  zIndex: 3,
  background: pianoTheme.isLight 
    ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)',
  // Enhanced button with realistic depth and lighting
  boxShadow: `
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2)
  `,
  // Subtle text shadow for depth
  textShadow: `
    0 1px 1px rgba(0, 0, 0, 0.3),
    0 -1px 0 rgba(255, 255, 255, 0.05)
  `,
  '&:hover': {
    borderColor: pianoTheme.colors.accent,
    background: pianoTheme.isLight 
      ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.08) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.15) 100%)',
    color: pianoTheme.colors.accent,
    // Enhanced glow on hover
    boxShadow: `
      0 0 12px rgba(212, 175, 55, 0.3),
      0 2px 6px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(0, 0, 0, 0.25)
    `,
    transform: 'translateY(-1px)',
    textShadow: `
      0 0 8px rgba(212, 175, 55, 0.4),
      0 1px 2px rgba(0, 0, 0, 0.4)
    `,
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: `
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05)
    `,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(0.75),
    filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '80px',
    fontSize: '0.65rem',
    padding: theme.spacing(0.75, 1.5),
  },
}));

export const SettingsBar: React.FC<SettingsBarProps> = ({
  onTogglePiano,
  onRecord,
  onKeyAssist,
  onInstrument,
  onSound,
  onStyles,
}) => {
  // Get state from Redux
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const patternThemeId = useAppSelector((state) => state.theme.patternTheme);
  const isPianoEnabled = useAppSelector((state) => state.pianoSettings.isPianoEnabled);
  const isRecording = useAppSelector((state) => state.recording.isRecording);
  const currentSoundSetId = useAppSelector((state) => state.pianoSettings.soundSet);
  
  const pianoTheme = getTheme(pianoThemeId);
  const patternTheme = getPatternTheme(patternThemeId);
  const currentSoundSet = getSoundSet(currentSoundSetId);
  return (
    <BarContainer elevation={0} pianoTheme={pianoTheme} patternTheme={patternTheme}>
      {/* Left group: Action buttons */}
      <Box sx={{ display: 'flex', gap: 1, zIndex: 3 }}>
        <SettingButton
          variant="outlined"
          startIcon={<PowerIcon sx={{ fontSize: '1rem' }} />}
          onClick={onTogglePiano}
          pianoTheme={pianoTheme}
          sx={{
            color: isPianoEnabled ? pianoTheme.colors.secondary : '#f44336',
            borderColor: isPianoEnabled ? pianoTheme.colors.border : '#f44336',
            '&:hover': {
              borderColor: isPianoEnabled ? pianoTheme.colors.accent : '#d32f2f',
              color: isPianoEnabled ? pianoTheme.colors.accent : '#d32f2f',
            },
          }}
        >
          {isPianoEnabled ? 'Disable' : 'Enable'}
        </SettingButton>
        
        <SettingButton
          variant="outlined"
          startIcon={<RecordIcon sx={{ fontSize: '1rem' }} />}
          onClick={onRecord}
          pianoTheme={pianoTheme}
          sx={{
            color: isRecording ? '#f44336' : pianoTheme.colors.secondary,
            borderColor: isRecording ? '#f44336' : pianoTheme.colors.border,
            animation: isRecording ? 'pulse 1.5s ease-in-out infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': {
                opacity: 1,
              },
              '50%': {
                opacity: 0.6,
              },
            },
            '&:hover': {
              borderColor: isRecording ? '#d32f2f' : pianoTheme.colors.accent,
              color: isRecording ? '#d32f2f' : pianoTheme.colors.accent,
            },
          }}
        >
          {isRecording ? 'Stop' : 'Record'}
        </SettingButton>
      </Box>

      {/* Right group: Settings buttons */}
      <Box sx={{ display: 'flex', gap: 1, zIndex: 3 }}>
        <Tooltip 
          title="Click to change instrument"
          placement="top"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: pianoTheme.container.background,
                color: pianoTheme.colors.primary,
                border: `1px solid ${pianoTheme.colors.border}`,
                boxShadow: `
                  0 4px 8px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.1 : 0.05})
                `,
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '6px 12px',
                textShadow: `0 1px 2px rgba(0, 0, 0, 0.3)`,
                backdropFilter: 'blur(8px)',
                '& .MuiTooltip-arrow': {
                  color: pianoTheme.container.background,
                  '&::before': {
                    border: `1px solid ${pianoTheme.colors.border}`,
                  },
                },
              },
            },
          }}
          arrow
        >
          <SettingButton
            variant="outlined"
            startIcon={
              <Box
                component="img"
                src={getInstrumentImage(currentSoundSetId)}
                alt={currentSoundSet.name}
                sx={{
                  width: '1rem',
                  height: '1rem',
                  objectFit: 'contain',
                  filter: pianoTheme.isLight
                    ? 'brightness(0.6) saturate(0.8)'
                    : 'brightness(1.1) saturate(1.1)',
                  transition: 'filter 0.2s ease',
                }}
              />
            }
            onClick={onInstrument}
            pianoTheme={pianoTheme}
            sx={{
              '&:hover .instrument-icon': {
                filter: `drop-shadow(0 0 4px ${pianoTheme.colors.accent}) ${pianoTheme.isLight ? 'brightness(0.8)' : 'brightness(1.3)'}`,
              },
            }}
          >
            {currentSoundSet.name}
          </SettingButton>
        </Tooltip>

        <SettingButton
          variant="outlined"
          startIcon={<SoundIcon sx={{ fontSize: '1rem' }} />}
          onClick={onSound}
          pianoTheme={pianoTheme}
        >
          Sound
        </SettingButton>

        <SettingButton
          variant="outlined"
          startIcon={<StylesIcon sx={{ fontSize: '1rem' }} />}
          onClick={onStyles}
          pianoTheme={pianoTheme}
        >
          Appearances
        </SettingButton>

        <SettingButton
          variant="outlined"
          startIcon={<KeyboardIcon sx={{ fontSize: '1rem' }} />}
          onClick={onKeyAssist}
          pianoTheme={pianoTheme}
        >
          Key Assist
        </SettingButton>
      </Box>
    </BarContainer>
  );
};
