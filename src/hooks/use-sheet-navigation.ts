import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { nextPage, previousPage } from '@/store/reducers/music-sheet-slice';

/**
 * Custom hook to handle keyboard navigation for music sheets
 * - Enter / ArrowRight: Navigate to next page
 * - Backspace / ArrowLeft: Navigate to previous page
 * 
 * Only active when a sheet is loaded
 */
export function useSheetNavigation() {
  const dispatch = useAppDispatch();
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  
  useEffect(() => {
    // Only add listeners if a sheet is loaded
    if (!currentSheet) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Enter or Right Arrow - navigate to next page
      if (event.key === 'Enter' || event.key === 'ArrowRight') {
        dispatch(nextPage());
        event.preventDefault();
      }
      
      // Backspace or Left Arrow - navigate to previous page
      if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
        dispatch(previousPage());
        event.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSheet, dispatch]);
}
