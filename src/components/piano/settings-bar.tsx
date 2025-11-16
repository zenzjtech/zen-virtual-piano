import React from 'react';
import { Box } from '@mui/material';
import {
  FiberManualRecord as RecordIcon,
  Keyboard as KeyboardIcon,
  VolumeUp as SoundIcon,
  Palette as StylesIcon,
  PowerSettingsNew as PowerIcon,
} from '@mui/icons-material';
import { PianoTheme } from './themes';
import { useAppSelector } from '@/store/hook';
import { getTheme } from './themes';
import { InstrumentSetting } from './instrument-setting';
import { BarContainer, SettingButton } from '@/components/global/components';

interface SettingsBarProps {
  onTogglePiano?: () => void;
  onRecord?: () => void;
  onKeyAssist?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onInstrument?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSound?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onStyles?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

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
  const isPianoEnabled = useAppSelector((state) => state.pianoSettings.isPianoEnabled);
  const isRecording = useAppSelector((state) => state.recording.isRecording);
  const currentSoundSetId = useAppSelector((state) => state.pianoSettings.soundSet);
  
  const pianoTheme = getTheme(pianoThemeId);
  return (
    <BarContainer elevation={0} pianoTheme={pianoTheme}>
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
        <InstrumentSetting
          currentSoundSetId={currentSoundSetId}
          pianoTheme={pianoTheme}
          onClick={onInstrument}
        />

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
