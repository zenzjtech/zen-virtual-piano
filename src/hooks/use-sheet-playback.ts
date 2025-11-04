import { useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { updatePlaybackPosition, stopSheet, nextPage } from '@/store/reducers/music-sheet-slice';
import { getAudioEngine } from '@/services/audio-engine';
import { createKeyboardMap } from '@/components/piano/types';
import { useAppConfig } from '#imports';

/**
 * Calculate which page a given measure/note belongs to based on line pagination
 */
function calculatePageForPosition(
  measures: any[],
  currentMeasure: number,
  currentNoteIndex: number,
  maxCharsPerLine: number,
  linesPerPage: number
): number {
  // Convert measures to tokens and track positions
  const tokens: Array<{ measureIndex: number; noteIndex: number; text: string }> = [];
  measures.forEach((measure, measureIdx) => {
    measure.notes.forEach((note: any, noteIdx: number) => {
      tokens.push({
        measureIndex: measureIdx,
        noteIndex: noteIdx,
        text: (note.originalNotation || note.key) + ' ',
      });
    });
  });

  // Find the token index for current position
  const currentTokenIndex = tokens.findIndex(
    t => t.measureIndex === currentMeasure && t.noteIndex === currentNoteIndex
  );
  
  if (currentTokenIndex === -1) return 0;

  // Split tokens into lines
  let currentLine = 0;
  let currentLength = 0;

  for (let i = 0; i <= currentTokenIndex; i++) {
    const tokenLength = tokens[i].text.length;
    
    // If adding this token would exceed the limit and we have content, start new line
    if (currentLength + tokenLength > maxCharsPerLine && currentLength > 0) {
      currentLine++;
      currentLength = 0;
    }
    
    currentLength += tokenLength;
  }

  // Calculate which page this line belongs to
  const page = Math.floor(currentLine / linesPerPage);
  return page;
}

export const useSheetPlayback = () => {
  const dispatch = useAppDispatch();
  const playback = useAppSelector((state) => state.musicSheet.playback);
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const appConfig = useAppConfig();
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
            // Calculate which page this measure belongs to
            const nextPage = calculatePageForPosition(
              allMeasures,
              nextMeasureIndex,
              0,
              appConfig.musicStand.musicSheet.maxCharsPerLine,
              appConfig.musicStand.musicSheet.linesPerPage
            );
            dispatch(updatePlaybackPosition({ measure: nextMeasureIndex, noteIndex: 0, page: nextPage }));
          } else {
            if (playback.loopEnabled) {
              dispatch(updatePlaybackPosition({ measure: 0, noteIndex: 0, page: 0 }));
            } else {
              dispatch(stopSheet());
            }
          }
          return;
        }

        const noteDurationInMs = (60 / playback.tempo) * 1000 * note.duration;
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
          }, noteDurationInMs);
        } else {
          const pianoKey = keyboardMapRef.current.get(note.originalNotation || note.key);
          if (pianoKey) {
            getAudioEngine().playNote(pianoKey.note);
            setTimeout(() => {
              getAudioEngine().stopNote(pianoKey.note);
            }, noteDurationInMs);
          }
        }

        timeoutRef.current = setTimeout(() => {
          const nextNoteIndex = playback.currentNoteIndex + 1;
          // Calculate which page this note belongs to
          const nextPage = calculatePageForPosition(
            allMeasures,
            playback.currentMeasure,
            nextNoteIndex,
            appConfig.musicStand.musicSheet.maxCharsPerLine,
            appConfig.musicStand.musicSheet.linesPerPage
          );
          dispatch(updatePlaybackPosition({ noteIndex: nextNoteIndex, page: nextPage }));
        }, noteDurationInMs);
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
  }, [playback.isPlaying, playback.currentMeasure, playback.currentNoteIndex, currentSheet, dispatch, playback.tempo, playback.loopEnabled, appConfig.musicStand.musicSheet.maxCharsPerLine, appConfig.musicStand.musicSheet.linesPerPage]);
};
