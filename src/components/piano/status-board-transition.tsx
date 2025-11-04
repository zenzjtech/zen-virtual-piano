import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface TransitionWrapperProps {
  children: React.ReactNode;
  transitionKey: string;
}

/**
 * Wrapper component that provides smooth fade and slide transitions
 * when content changes based on the transitionKey
 * 
 * Animation flow:
 * 1. Fade out & slide up (150ms)
 * 2. Content swap
 * 3. Fade in & slide down (300ms)
 * 
 * Uses cubic-bezier for natural motion with easing
 */
export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  transitionKey,
}) => {
  const [displayContent, setDisplayContent] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger exit animation
    setIsAnimating(true);

    // Wait for exit animation, then update content
    const exitTimer = setTimeout(() => {
      setDisplayContent(children);
      // Small delay before enter animation for cleaner transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 20);
    }, 150); // Exit animation duration

    return () => clearTimeout(exitTimer);
  }, [transitionKey]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        gap: 1.5,
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? 'translateY(-10px) scale(0.98)' : 'translateY(0) scale(1)',
        transition: isAnimating
          ? 'all 0.15s cubic-bezier(0.4, 0, 1, 1)' // Exit: fast out
          : 'all 0.3s cubic-bezier(0, 0, 0.2, 1)', // Enter: slow in
        willChange: 'opacity, transform',
      }}
    >
      {displayContent}
    </Box>
  );
};
