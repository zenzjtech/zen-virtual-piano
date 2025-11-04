import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setIsPianoEnabled } from '@/store/reducers/piano-settings-slice';
import { trackEvent } from '@/utils/analytics';
import { ANALYTICS_ACTION } from '@/utils/constants';

interface PopupHandlers {
  handleInstrumentPopupClose: () => void;
  handleSoundSettingsClose: () => void;
  handleStyleSettingsClose: () => void;
  handleKeyAssistPopupClose: () => void;
  handleSheetSearchClose: () => void;
}

interface PopupStates {
  instrumentPopupOpen: boolean;
  soundSettingsOpen: boolean;
  styleSettingsOpen: boolean;
  keyAssistPopupOpen: boolean;
  isSheetSearchOpen: boolean;
}

/**
 * Custom hook to handle Escape key functionality
 * Priority 1: Close any open popup
 * Priority 2: Enable piano if it's disabled
 */
export function useEscapeKeyHandler(
  popupStates: PopupStates,
  handlers: PopupHandlers
) {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.user.uid);
  const isPianoEnabled = useAppSelector((state) => state.pianoSettings.isPianoEnabled);

  const {
    instrumentPopupOpen,
    soundSettingsOpen,
    styleSettingsOpen,
    keyAssistPopupOpen,
    isSheetSearchOpen,
  } = popupStates;

  const {
    handleInstrumentPopupClose,
    handleSoundSettingsClose,
    handleStyleSettingsClose,
    handleKeyAssistPopupClose,
    handleSheetSearchClose,
  } = handlers;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Priority 1: Close any open popup and return focus
        if (instrumentPopupOpen) {
          handleInstrumentPopupClose();
          event.preventDefault();
        } else if (soundSettingsOpen) {
          handleSoundSettingsClose();
          event.preventDefault();
        } else if (styleSettingsOpen) {
          handleStyleSettingsClose();
          event.preventDefault();
        } else if (keyAssistPopupOpen) {
          handleKeyAssistPopupClose();
          event.preventDefault();
        } else if (isSheetSearchOpen) {
          handleSheetSearchClose();
          event.preventDefault();
        } 
        // Priority 2: Enable piano if it's disabled and no popups are open
        else if (!isPianoEnabled) {
          dispatch(setIsPianoEnabled(true));
          trackEvent(uid, ANALYTICS_ACTION.PIANO_ENABLED, {
            previous_state: false,
            new_state: true,
            trigger: 'escape_key',
          });
          event.preventDefault();
        }
      }
    };

    // Add listener if any popup is open OR if piano is disabled
    const shouldListen = 
      instrumentPopupOpen || 
      soundSettingsOpen || 
      styleSettingsOpen || 
      keyAssistPopupOpen || 
      isSheetSearchOpen || 
      !isPianoEnabled;

    if (shouldListen) {
      window.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [
    instrumentPopupOpen,
    soundSettingsOpen,
    styleSettingsOpen,
    keyAssistPopupOpen,
    isSheetSearchOpen,
    isPianoEnabled,
    handleInstrumentPopupClose,
    handleSoundSettingsClose,
    handleStyleSettingsClose,
    handleKeyAssistPopupClose,
    handleSheetSearchClose,
    dispatch,
    uid,
  ]);
}
