/**
 * User menu component
 */

import { Menu, MenuItem, Box, Avatar, Typography, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { Logout } from '@mui/icons-material';
import type { GoogleUserInfo } from '@/types/user-slice';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  isDarkBackground: boolean;
  googleUser: GoogleUserInfo | null;
  onClose: () => void;
  onLogout: () => void;
}

export const UserMenu = ({
  anchorEl,
  open,
  isDarkBackground,
  googleUser,
  onClose,
  onLogout,
}: UserMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
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
        onClick={onLogout}
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
  );
};
