import { AppBar, Toolbar, Box, Typography, IconButton, Stack } from '@mui/material';
import { Settings, AccountCircle, HelpOutline, Fullscreen } from '@mui/icons-material';
import whitePianoIcon from '@/assets/image/instrument/piano/white.png';
import brownPianoIcon from '@/assets/image/instrument/piano/brown.png';
import blackPianoIcon from '@/assets/image/instrument/piano/black.png';

interface HeaderProps {
  backgroundThemeId: string;
  isDarkBackground: boolean;
}

export const Header = ({ backgroundThemeId, isDarkBackground }: HeaderProps) => {
  // Determine which piano icon to use based on background theme
  const getPianoIcon = () => {
    // Dark backgrounds -> white icon
    if (isDarkBackground) {
      return whitePianoIcon;
    }
    
    // Warm/golden backgrounds -> brown icon
    const warmBackgrounds = [
      'warm',
      'gufeng-vermillion-gold',
      'zen-sakura-dawn',
      'leela-saffron-marigold',
      'isha-earth-mystic',
      'sacred-light-glory',
      'islamic-emerald-gold'
    ];
    
    if (warmBackgrounds.includes(backgroundThemeId)) {
      return brownPianoIcon;
    }
    
    // Light/cool backgrounds -> black icon
    return blackPianoIcon;
  };

  // Determine text color based on background
  const textColor = isDarkBackground ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)';
  const iconColor = isDarkBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)';

  // Placeholder handlers (to be wired later)
  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const handleAccount = () => {
    console.log('Account clicked');
  };

  const handleHelp = () => {
    console.log('Help clicked');
  };

  const handleFullscreen = () => {
    console.log('Fullscreen clicked');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)', // Safari support
        backgroundColor: isDarkBackground 
          ? 'rgba(255, 255, 255, 0.08)' 
          : 'rgba(255, 255, 255, 0.7)',
        borderBottom: '1px solid',
        borderColor: isDarkBackground 
          ? 'rgba(255, 255, 255, 0.12)' 
          : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 48, sm: 52, md: 56 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Left: Logo and Title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.5 },
            flex: 1,
          }}
        >
          <Box
            component="img"
            src={getPianoIcon()}
            alt="Piano Icon"
            sx={{
              height: { xs: 28, sm: 32, md: 36 },
              width: 'auto',
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: textColor,
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              letterSpacing: '0.01em',
            }}
          >
            Zen Virtual Piano
          </Typography>
        </Box>

        {/* Right: Action Buttons */}
        <Stack direction="row" spacing={{ xs: 0, sm: 0.5 }}>
          <IconButton
            onClick={handleHelp}
            sx={{
              color: iconColor,
              '&:hover': {
                backgroundColor: isDarkBackground 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
              },
            }}
            aria-label="Help"
          >
            <HelpOutline sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
          </IconButton>

          <IconButton
            onClick={handleFullscreen}
            sx={{
              color: iconColor,
              '&:hover': {
                backgroundColor: isDarkBackground 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
              },
            }}
            aria-label="Fullscreen"
          >
            <Fullscreen sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
          </IconButton>

          <IconButton
            onClick={handleSettings}
            sx={{
              color: iconColor,
              '&:hover': {
                backgroundColor: isDarkBackground 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
              },
            }}
            aria-label="Settings"
          >
            <Settings sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
          </IconButton>

          <IconButton
            onClick={handleAccount}
            sx={{
              color: iconColor,
              '&:hover': {
                backgroundColor: isDarkBackground 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
              },
            }}
            aria-label="Account"
          >
            <AccountCircle sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
