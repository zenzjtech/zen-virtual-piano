import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { 
  playSheet, 
  pauseSheet, 
  setTempo, 
  nextPage, 
  previousPage 
} from '@/store/reducers/music-sheet-slice';

/**
 * Custom hook to handle all keyboard shortcuts for music sheet controls
 * 
 * Playback Controls:
 * - Ctrl+Enter: Play/Pause the current sheet
 * 
 * Note: Spacebar is reserved for pedal control (implemented separately)
 * 
 * Tempo Adjustment:
 * - ArrowUp: Increase tempo by 5 BPM (max: 240)
 * - ArrowDown: Decrease tempo by 5 BPM (min: 40)
 * 
 * Page Navigation:
 * - Enter / ArrowRight: Navigate to next page (2-page spread)
 * - Backspace / ArrowLeft: Navigate to previous page (2-page spread)
 * 
 * Only active when a sheet is loaded
 */
export function useSheetKeyboardControls() {
  const dispatch = useAppDispatch();
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const isPlaying = useAppSelector((state) => state.musicSheet.playback.isPlaying);
  const currentTempo = useAppSelector((state) => state.musicSheet.playback.tempo);
  
  useEffect(() => {
    // Only add listeners if a sheet is loaded
    if (!currentSheet) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Spacebar - toggle play/pause
      // Ctrl+Enter - toggle play/pause
      if (event.ctrlKey && event.key === 'Enter') {
        if (isPlaying) {
          dispatch(pauseSheet());
        } else {
          dispatch(playSheet());
        }
        event.preventDefault();
      }
      
      // ArrowUp - increase tempo
      if (event.key === 'ArrowUp') {
        const newTempo = Math.min(240, currentTempo + 5);
        dispatch(setTempo(newTempo));
        event.preventDefault();
      }
      
      // ArrowDown - decrease tempo
      if (event.key === 'ArrowDown') {
        const newTempo = Math.max(40, currentTempo - 5);
        dispatch(setTempo(newTempo));
        event.preventDefault();
      }
      
      // Enter or Right Arrow - navigate to next page
      if ((event.key === 'Enter' && !event.ctrlKey) || event.key === 'ArrowRight') {
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
  }, [currentSheet, isPlaying, currentTempo, dispatch]);
}
