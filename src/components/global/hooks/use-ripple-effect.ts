/**
 * Hook for managing ripple effect animations
 */

import { useState, useCallback } from 'react';
import { Ripple } from '../../../entrypoints/vp-download-ui/types';
import { createRippleId, calculateRipplePosition, TIMING } from '../../../entrypoints/vp-download-ui/utils';

interface UseRippleEffectReturn {
  ripples: Ripple[];
  addRipple: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const useRippleEffect = (): UseRippleEffectReturn => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const { x, y } = calculateRipplePosition(event);
    const newRipple: Ripple = { x, y, id: createRippleId() };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, TIMING.RIPPLE_ANIMATION_DURATION);
  }, []);

  return {
    ripples,
    addRipple,
  };
};
