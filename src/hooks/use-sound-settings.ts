import { useState } from 'react';

/**
 * Custom hook to manage local sound settings state
 * These are settings that aren't persisted to Redux yet
 */
export function useSoundSettings() {
  const [transpose, setTranspose] = useState(0);
  const [volume, setVolume] = useState(80);
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const [midiDevice, setMidiDevice] = useState('none');

  const toggleMetronome = () => setMetronomeEnabled(!metronomeEnabled);

  return {
    transpose,
    setTranspose,
    volume,
    setVolume,
    metronomeEnabled,
    toggleMetronome,
    midiDevice,
    setMidiDevice,
  };
}
