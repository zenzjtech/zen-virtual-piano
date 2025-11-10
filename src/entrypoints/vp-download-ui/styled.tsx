/**
 * Styled components for the VirtualPiano download UI
 */

import { styled } from '@mui/material/styles';
import { Paper, Button } from '@mui/material';

/**
 * Glassmorphic card container with backdrop blur effect
 */
export const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 16,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
  padding: theme.spacing(2),
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
    transform: 'translateY(-2px)',
  },
}));

/**
 * Button with gradient background and ripple effect support
 */
export const RippleButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.secondary.contrastText,
  padding: theme.spacing(0.75, 2),
  borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius : 8,
  fontWeight: theme.typography.fontWeightMedium as number,
  fontSize: '13px',
  textTransform: 'none',
  letterSpacing: '0.02em',
  boxShadow: `0 2px 12px ${theme.palette.secondary.main}40`,
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  minHeight: 36,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    boxShadow: `0 4px 20px ${theme.palette.secondary.main}60`,
    transform: 'translateY(-1px) scale(1.01)',
  },
  '&:active': {
    transform: 'translateY(0) scale(0.98)',
  },
  '&.Mui-disabled': {
    color: theme.palette.secondary.contrastText,
    opacity: 0.85,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

/**
 * Animated ripple effect element
 */
export const RippleEffect = styled('span')({
  position: 'absolute',
  borderRadius: '50%',
  transform: 'scale(0)',
  animation: 'ripple 600ms ease-out',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  '@keyframes ripple': {
    to: {
      transform: 'scale(4)',
      opacity: 0,
    },
  },
});
