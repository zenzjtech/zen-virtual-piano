import { AppBar, Toolbar, Box, Typography, IconButton, Stack, Avatar, CircularProgress, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { Settings, AccountCircle, HelpOutline, Fullscreen, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setGoogleUser, logout, googleUserSelector, isAuthenticatedSelector } from '@/store/reducers/user-slice';
import { authenticateWithGoogle, signOutFromGoogle } from '@/utils/google-auth';
import { useNotification } from '@/contexts/notification-context';
import whitePianoIcon from '@/assets/image/instrument/piano/white.png';
import brownPianoIcon from '@/assets/image/instrument/piano/brown.png';
import blackPianoIcon from '@/assets/image/instrument/piano/black.png';

interface HeaderProps {
  backgroundThemeId: string;
  isDarkBackground: boolean;
  onShowKeyboardShortcuts: () => void;
}

export const Header = ({ backgroundThemeId, isDarkBackground, onShowKeyboardShortcuts }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const googleUser = useAppSelector(googleUserSelector);
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const { showNotification } = useNotification();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
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

  const handleAccount = async (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthenticated) {
      // User is logged in, show menu
      setAnchorEl(event.currentTarget);
    } else {
      // User is not logged in, trigger OAuth
      setIsAuthenticating(true);
      try {
        const userInfo = await authenticateWithGoogle();
        dispatch(setGoogleUser(userInfo));
        showNotification(`Welcome, ${userInfo.name}! 🎹`, 'success');
      } catch (error) {
        console.error('Authentication error:', error);
        showNotification('Failed to sign in. Please try again.', 'error');
      } finally {
        setIsAuthenticating(false);
      }
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseMenu();
    try {
      await signOutFromGoogle();
      dispatch(logout());
      showNotification('Signed out successfully', 'info');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Failed to sign out. Please try again.', 'error');
    }
  };

  const handleHelp = () => {
    onShowKeyboardShortcuts();
  };

  const handleFullscreen = () => {
    console.log('Fullscreen clicked');
  };

  const handleLogoClick = () => {
    // Refresh page or navigate to home
    window.location.reload();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'transparent',
        backdropFilter: isDarkBackground ? 'blur(20px)' : 'blur(16px)',
        WebkitBackdropFilter: isDarkBackground ? 'blur(20px)' : 'blur(16px)', // Safari support
        backgroundColor: isDarkBackground 
          ? 'rgba(0, 0, 0, 0.15)' 
          : 'rgba(255, 255, 255, 0.75)',
        borderBottom: '1px solid',
        borderColor: isDarkBackground 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.06)',
        boxShadow: isDarkBackground
          ? '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
          : '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
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
          onClick={handleLogoClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.5 },
            flex: 1,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 0.8,
            },
            '&:active': {
              opacity: 0.6,
            },
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

          {/* <IconButton
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
          </IconButton> */}

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
            {isAuthenticating ? (
              <CircularProgress 
                size={24} 
                sx={{ color: iconColor }}
              />
            ) : isAuthenticated && googleUser ? (
              <Avatar 
                src={googleUser.picture} 
                alt={googleUser.name}
                sx={{ 
                  width: { xs: 24, sm: 26, md: 28 }, 
                  height: { xs: 24, sm: 26, md: 28 } 
                }}
              />
            ) : (
              <AccountCircle sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
            )}
          </IconButton>
        </Stack>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 220,
              backgroundColor: isDarkBackground 
                ? 'rgba(40, 40, 40, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid',
              borderColor: isDarkBackground 
                ? 'rgba(255, 255, 255, 0.12)' 
                : 'rgba(0, 0, 0, 0.08)',
            },
          }}
        >
          {googleUser && (
            <Box sx={{ px: 2, py: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Avatar 
                  src={googleUser.picture} 
                  alt={googleUser.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography 
                    variant="body2" 
                    fontWeight={600}
                    sx={{ color: isDarkBackground ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)' }}
                  >
                    {googleUser.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ color: isDarkBackground ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }}
                  >
                    {googleUser.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          <Divider sx={{ 
            borderColor: isDarkBackground ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)' 
          }} />
          <MenuItem 
            onClick={handleLogout}
            sx={{
              color: isDarkBackground ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
              '&:hover': {
                backgroundColor: isDarkBackground 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: isDarkBackground ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
