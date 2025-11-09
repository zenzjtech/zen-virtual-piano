/**
 * Unified dialog header component
 * Provides consistent header styling across all dialogs
 */

import React from 'react';
import { DialogTitle, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDialogTheme } from '@/hooks/use-global-dialog-theme';

interface DialogHeaderProps {
  /** Dialog title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Icon to display in header */
  icon?: React.ReactNode;
  /** Close handler */
  onClose: () => void;
  /** Optional ID for accessibility */
  id?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  title,
  subtitle,
  icon,
  onClose,
  id,
}) => {
  const theme = useDialogTheme();

  return (
    <DialogTitle
      id={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: `1px solid ${theme.borderColor}`,
        background: theme.isDarkBackground
          ? 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.02) 100%)',
        px: 3,
        py: 2.5,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '10px',
            background: theme.accentPrimaryBg,
            border: `1px solid ${theme.accentPrimary}30`,
            color: theme.accentPrimary,
            fontSize: 20,
          }}
        >
          {icon}
        </Box>
      )}
      
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            color: theme.textPrimary,
            letterSpacing: '0.3px',
            mb: subtitle ? 0.5 : 0,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: theme.textSecondary,
              display: 'block',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      
      <IconButton
        onClick={onClose}
        size="small"
        aria-label="Close dialog"
        sx={{
          color: theme.textSecondary,
          transition: 'all 0.2s ease',
          '&:hover': {
            color: theme.textPrimary,
            backgroundColor: theme.hoverBg,
            transform: 'scale(1.05)',
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </DialogTitle>
  );
};
