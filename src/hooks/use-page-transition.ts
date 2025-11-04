import { useState, useEffect } from 'react';

export interface PageTransitionState {
  /** Whether content should be visible */
  showContent: boolean;
  /** Direction of page turn animation */
  pageDirection: 'left' | 'right';
}

/**
 * Custom hook for managing page transition animations
 * @param pageSetIndex - Current page set index (for 2-page spread)
 * @param transitionDuration - Duration of transition in milliseconds (default: 300)
 * @returns Transition state for animations
 */
export function usePageTransition(
  pageSetIndex: number,
  transitionDuration: number = 300
): PageTransitionState {
  const [prevPageSet, setPrevPageSet] = useState(-1);
  const [pageDirection, setPageDirection] = useState<'left' | 'right'>('right');
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    if (prevPageSet !== -1 && prevPageSet !== pageSetIndex) {
      // Determine direction
      setPageDirection(pageSetIndex > prevPageSet ? 'right' : 'left');
      
      // Gentle fade out
      setShowContent(false);
      
      // Fade back in after subtle delay
      const timer = setTimeout(() => {
        setShowContent(true);
      }, transitionDuration);
      
      return () => clearTimeout(timer);
    }
    setPrevPageSet(pageSetIndex);
  }, [pageSetIndex, prevPageSet, transitionDuration]);

  return {
    showContent,
    pageDirection,
  };
}
