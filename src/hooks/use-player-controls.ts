import { useAppDispatch } from '@/store/hook';
import {
  playSheet,
  pauseSheet,
  stopSheet,
  previousPage,
  nextPage,
  setTempo,
  toggleLoop,
} from '@/store/reducers/music-sheet-slice';

/**
 * Custom hook for managing music sheet player controls
 * Provides handlers for playback control actions
 */
export const usePlayerControls = () => {
  const dispatch = useAppDispatch();

  const handlePlayPause = (isPlaying: boolean) => {
    if (isPlaying) {
      dispatch(pauseSheet());
    } else {
      dispatch(playSheet());
    }
  };

  const handleStop = () => {
    dispatch(stopSheet());
  };

  const handlePreviousPage = () => {
    dispatch(previousPage());
  };

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handleTempoChange = (tempo: number) => {
    dispatch(setTempo(tempo));
  };

  const handleToggleLoop = () => {
    dispatch(toggleLoop());
  };

  return {
    handlePlayPause,
    handleStop,
    handlePreviousPage,
    handleNextPage,
    handleTempoChange,
    handleToggleLoop,
  };
};
