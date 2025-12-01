## 2024-12-01 - Audio Engine SoundSet Initialization Fix

**Author:** Cascade

**Summary:** Fixed issue where AudioEngine was not initializing with the user's saved soundSetId on page load, causing it to always default to 'classical-piano' instead of the user's preferred sound set.

**Changes Made:**
- Modified `getAudioEngine()` function in `audio-engine.ts` to accept an optional `soundSetId` parameter
- Updated the function to create AudioEngine with the provided soundSetId or change sound set if instance already exists with different soundSetId
- Added `useEffect` in `App.tsx` to initialize AudioEngine with current soundSetId from Redux store on component mount
- Added soundSet selector in App.tsx to access current soundSetId from Redux state
