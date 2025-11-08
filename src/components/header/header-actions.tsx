/**
 * Header action buttons component
 */

import { IconButton, Stack, Avatar, CircularProgress } from '@mui/material';
import { AccountCircle, HelpOutline, Settings as SettingsIcon } from '@mui/icons-material';
import { getIconColor } from './header-utils';
import { getIconButtonStyles, iconSizeStyles, avatarSizeStyles } from './header-styles';
import type { GoogleUserInfo } from '@/types/user-slice';

interface HeaderActionsProps {
  isDarkBackground: boolean;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  googleUser: GoogleUserInfo | null;
  onHelp: () => void;
  onAccount: (event: React.MouseEvent<HTMLElement>) => void;
  onSettings: () => void;
}

export const HeaderActions = ({
  isDarkBackground,
  isAuthenticated,
  isAuthenticating,
  googleUser,
  onHelp,
  onAccount,
  onSettings,
}: HeaderActionsProps) => {
  const iconColor = getIconColor(isDarkBackground);

  return (
    <Stack direction="row" spacing={{ xs: 0, sm: 0.5 }}>
      <IconButton
        onClick={onHelp}
        sx={getIconButtonStyles(iconColor, isDarkBackground)}
        aria-label="Help"
      >
        <HelpOutline sx={iconSizeStyles} />
      </IconButton>

      <IconButton
        onClick={onSettings}
        sx={getIconButtonStyles(iconColor, isDarkBackground)}
        aria-label="Settings"
      >
        <SettingsIcon sx={iconSizeStyles} />
      </IconButton>

      <IconButton
        onClick={onAccount}
        sx={getIconButtonStyles(iconColor, isDarkBackground)}
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
            sx={avatarSizeStyles}
          />
        ) : (
          <AccountCircle sx={iconSizeStyles} />
        )}
      </IconButton>
    </Stack>
  );
};
