import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { PianoTheme } from './themes';
import { getSoundSet } from '@/services/sound-sets';
import { getInstrumentImage } from '@/utils/instrument-images';
import { useAppSelector } from '@/store/hook';
import { trackEvent } from '@/utils/analytics';
import { ANALYTICS_ACTION } from '@/utils/constants';

interface InstrumentSettingProps {
  currentSoundSetId: string;
  pianoTheme: PianoTheme;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const InstrumentSetting: React.FC<InstrumentSettingProps> = ({
  currentSoundSetId,
  pianoTheme,
  onClick,
}) => {
  const uid = useAppSelector((state) => state.user.uid);
  const currentSoundSet = getSoundSet(currentSoundSetId);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Track instrument selector opened
    trackEvent(uid, ANALYTICS_ACTION.INSTRUMENT_SELECTOR_OPENED, {
      current_instrument: currentSoundSetId,
    });
    
    // Call the provided onClick handler if exists
    onClick?.(event);
  };

  return (
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
      <Box
        component="button"
        sx={{
          color: pianoTheme.colors.secondary,
          borderColor: pianoTheme.colors.border,
          minWidth: '100px',
          padding: '8px 16px',
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
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2)
          `,
          textShadow: `
            0 1px 1px rgba(0, 0, 0, 0.3),
            0 -1px 0 rgba(255, 255, 255, 0.05)
          `,
          border: `1px solid ${pianoTheme.colors.border}`,
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          '&:hover': {
            borderColor: pianoTheme.colors.accent,
            background: pianoTheme.isLight
              ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.08) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.15) 100%)',
            color: pianoTheme.colors.accent,
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
            '& .instrument-icon': {
              filter: `drop-shadow(0 0 4px ${pianoTheme.colors.accent}) ${pianoTheme.isLight ? 'brightness(0.8)' : 'brightness(1.3)'}`,
            },
          },
          '&:active': {
            transform: 'translateY(1px)',
            boxShadow: `
              inset 0 2px 4px rgba(0, 0, 0, 0.3),
              inset 0 -1px 0 rgba(255, 255, 255, 0.05)
            `,
          },
          '& .MuiButton-startIcon': {
            marginRight: '6px',
            filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))',
          },
          '@media (max-width: 600px)': {
            minWidth: '80px',
            fontSize: '0.65rem',
            padding: '6px 12px',
          },
        }}
        onClick={handleClick}
      >
        <Box
          component="img"
          src={getInstrumentImage(currentSoundSetId)}
          alt={currentSoundSet.name}
          className="instrument-icon"
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
        {currentSoundSet.name}
      </Box>
    </Tooltip>
  );
};
