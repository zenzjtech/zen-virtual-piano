import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { updatePlaybackPosition, stopSheet, nextPage } from '@/store/reducers/music-sheet-slice';
import { getAudioEngine } from '@/services/audio-engine';
import { createKeyboardMap } from '@/components/piano/types';

export const useSheetPlayback = () => {
  const dispatch = useAppDispatch();
  const playback = useAppSelector((state) => state.musicSheet.playback);
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const keyboardMapRef = useRef(createKeyboardMap());

  useEffect(() => {
    if (playback.isPlaying && currentSheet) {
      const playNextNote = () => {
        const allMeasures = currentSheet.pages.flatMap(p => p.measures);
        const measure = allMeasures[playback.currentMeasure];
        if (!measure) {
          dispatch(stopSheet());
          return;
        }

        const note = measure.notes[playback.currentNoteIndex];
        if (!note) {
          const nextMeasureIndex = playback.currentMeasure + 1;
          if (nextMeasureIndex < allMeasures.length) {
            dispatch(updatePlaybackPosition({ measure: nextMeasureIndex, noteIndex: 0 }));
          } else {
            if (playback.loopEnabled) {
              dispatch(updatePlaybackPosition({ measure: 0, noteIndex: 0 }));
            } else {
              dispatch(stopSheet());
            }
          }
          return;
        }

        const noteDuration = (60 / playback.tempo) * 1000 * note.duration;
        if (note.rest) {
          // It's a pause, so we do nothing but wait for the duration.
        } else if (note.chord) {
          note.chord.forEach(chordNoteKey => {
            getAudioEngine().playNote(chordNoteKey);
          });
          setTimeout(() => {
            if (note.chord) {
              note.chord.forEach(chordNoteKey => {
                getAudioEngine().stopNote(chordNoteKey);
              });
            }
          }, noteDuration);
        } else {
          const pianoKey = keyboardMapRef.current.get(note.originalNotation || note.key);
          if (pianoKey) {
            getAudioEngine().playNote(pianoKey.note);
            setTimeout(() => {
              getAudioEngine().stopNote(pianoKey.note);
            }, noteDuration);
          }
        }

        timeoutRef.current = setTimeout(() => {
          dispatch(updatePlaybackPosition({ noteIndex: playback.currentNoteIndex + 1 }));
        }, noteDuration);
      };

      playNextNote();
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [playback.isPlaying, playback.currentMeasure, playback.currentNoteIndex, currentSheet, dispatch, playback.tempo, playback.loopEnabled]);
};
