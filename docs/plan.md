# Virtual Piano Feature Analysis & Chrome Extension Implementation Plan

## Overview
This document analyzes the features of [Virtual Piano](https://virtualpiano.net) and provides a roadmap for implementing similar functionality as a Chrome extension (not a web app).

**Target Platform**: Chrome Extension  
**Original Service**: https://virtualpiano.net  
**Date**: November 2, 2025

---

## Core Features Analysis

### 1. Virtual Piano Keyboard Interface

#### 1.1 Visual Piano Display
- **Full piano keyboard layout** spanning multiple octaves (appears to be 3+ octaves in the interface)
- **Visual key labeling** with keyboard mappings shown on each key
  - White keys: `1, 2, 3, 4, 5, 6, 7, 8, 9, 0, q, w, e, r, t, y, u, i, o, p, a, s, d, f, g, h, j, k, l, z, x, c, v, b, n, m`
  - Black keys: Corresponding symbols/characters above the white keys
- **Visual feedback** when keys are pressed (keys appear to depress/highlight)
- **Realistic piano aesthetic** with black and white keys, proper proportions

#### 1.2 Keyboard Input
- **Computer keyboard to piano mapping**
  - One-to-one mapping of QWERTY keyboard keys to piano notes
  - Both letter and number keys utilized
  - Visual indicators on piano keys showing which keyboard key to press
- **Mouse/touch input** for clicking piano keys directly
- **Multi-key support** for playing chords

---

### 2. Top Toolbar Features

Based on the screenshot, the interface includes:

#### 2.1 RECORD
- **Audio recording functionality**
- Likely captures user performance for playback or sharing
- Red indicator suggests recording state

#### 2.2 KEY ASSIST
- **Visual/educational assistance** for playing songs
- May highlight which keys to press
- Learning/tutorial mode functionality

#### 2.3 SOUND
- **Instrument/sound selection**
  - URL parameter shows `?instr=grand-classical`
  - **24+ different virtual instruments available**:
    - **Piano variants**: Classical Piano, Grand Classical Piano, Upright Piano, Auditorium Piano, Jazz Piano, Stage Piano
    - **String instruments**: Classical Guitar, Flamenco Guitar, Harp, Violin, Double Bass, Sitar, Oud, Koto
    - **Wind instruments**: Pan Flute, Saxophone, Clarinet, Oboe
    - **Keyboards**: Organ, Accordion
    - **Percussion**: Glockenspiel, Mixed Percussion, Steelpan
    - **Ensemble**: Brass Ensemble
- **Sound quality/audio engine** settings

#### 2.4 STYLES
- **Musical styles or presets**
- May affect how notes are played (sustain, attack, etc.)
- Could include different musical genres or playing techniques

#### 2.5 SAVE
- **Save compositions/recordings**
- Export functionality
- User account integration for cloud storage

#### 2.6 MORE
- **Additional settings and options**
- Likely includes advanced features, preferences, help

#### 2.7 Search/Text Input
- Shows "witakbdw" in the interface
- Possibly for:
  - Searching music sheets
  - Loading saved compositions
  - Song/artist search

#### 2.8 Action Icons (top right)
- **Settings/preferences icon**
- **Home/navigation icon**
- Possibly user account or additional tools

---

### 3. Music Sheets Library

#### 3.1 Sheet Music Repository
- **Thousands of free music sheets**
- **Simple notation system** using plain English alphabet
  - No need to read traditional music notation
  - Letters correspond to keyboard keys
  - Easy for beginners to follow

#### 3.2 Sheet Organization
- **A-Z directory** of all available songs
- **Latest additions** section
- **Popular/trending songs**
- **Categories by**:
  - Genre (Classical, Pop, Rock, Anime, Movie themes, etc.)
  - Difficulty level
  - Artist/composer
  - Popularity

#### 3.3 Sheet Features
- **Request/submit songs** - Community contribution
- **Search functionality** for finding specific songs
- **Sheet preview** before playing

---

### 4. Educational Features

#### 4.1 Learning Resources
- **"How to Play" tutorials**
- **Virtual Music Education** section
- Step-by-step guides for beginners
- Music theory basics

#### 4.2 Interactive Learning
- **Visual key highlighting** (KEY ASSIST feature)
- **Slow playback** for practice
- **Loop sections** for repetition
- **Real-time feedback** on played notes

---

### 5. Social & Community Features

#### 5.1 Competitions
- **Virtual Piano Championships** (annual events like 2021 Championships)
- **Virtual Piano Challenge**
- **Virtual Piano League** - leaderboards of best players
- **Past Champions** showcase

#### 5.2 Community Engagement
- **Share recordings** with others
- **Comment system** on music sheets
- **Rating system** for songs
- **User profiles** and accounts

---

### 6. Multimedia Content

#### 6.1 Watch/Listen
- **Video library** of piano performances
- **"25 Videos to Watch"** curated content
- **Best Piano Videos** collection
- Educational video content
- Performance inspiration

#### 6.2 Audio Playback
- Listen to songs without playing
- Preview music sheets with audio
- Demonstration recordings

---

### 7. Premium Features (Virtual Piano Plus)

#### 7.1 Enhanced Performance
- **Faster audio engine**
- **Lower latency**
- **Better sound quality**

#### 7.2 Additional Features
- **More instruments** or exclusive sounds
- **Advanced recording options**
- **Cloud storage** for unlimited saves
- **Ad-free experience**
- **Priority support**

**Pricing**: $58 USD/year (recurring annual billing, cancel anytime)

---

## Chrome Extension Implementation Strategy

### Phase 1: Core Piano Functionality (MVP)
**Priority**: HIGH | **Complexity**: MEDIUM | **Risk**: LOW

#### Features to Implement:
1. **Virtual piano keyboard UI**
   - 3-octave keyboard display
   - Keyboard mapping visualization
   - Mouse click support
   - Visual feedback on key press

2. **Audio playback system**
   - Sample-based or Web Audio API synthesizer
   - Low-latency audio
   - At least 1 piano sound

3. **Basic keyboard input**
   - QWERTY to piano note mapping
   - Polyphony (multiple simultaneous notes)

#### Technical Approach:
- **Extension type**: New tab interface (opens at `chrome-extension://<extension_id>/index.html`)
- **Audio**: Tone.js and Web Audio API for synthesis/playback. 
- **UI Framework**: React + Material-UI (already in project)
- **Storage**: using redux store @/store/index.ts

---

### Phase 2: Instrument Selection & Sound Engine
**Priority**: HIGH | **Complexity**: MEDIUM | **Risk**: MEDIUM

#### Features to Implement:
1. **Multiple instrument sounds**
   - Start with 5-10 instruments
   - Grand Piano (default)
   - Classical Guitar
   - Organ
   - Strings
   - Synthesizer sounds

2. **Sound selector UI**
   - Dropdown or modal for instrument selection
   - Preview sounds before selecting

3. **Audio quality settings**
   - Volume control
   - Reverb/effects (optional)

#### Technical Approach:
- **Audio samples**: Compressed audio files or SoundFont
- **State management**: Redux for instrument selection
- **Lazy loading**: Load instrument samples on demand

---

### Phase 3: Recording & Playback
**Priority**: MEDIUM | **Complexity**: HIGH | **Risk**: MEDIUM

#### Features to Implement:
1. **Record user performances**
   - Capture note timing and duration
   - MIDI-like event recording (not audio recording initially)

2. **Playback recordings**
   - Replay recorded notes with timing
   - Visual feedback during playback

3. **Save recordings**
   - Store in Chrome Storage API
   - Export as MIDI or custom format
   - Import recordings

#### Technical Approach:
- **Data structure**: JSON array of note events `{note, timestamp, duration}`
- **Storage**: Chrome Storage (sync or local)
- **Export**: File System Access API or download as JSON

---

### Phase 4: Music Sheets Integration
**Priority**: MEDIUM | **Complexity**: MEDIUM | **Risk**: LOW

#### Features to Implement:
1. **Built-in music sheet library**
   - 50-100 popular songs initially
   - Simple letter-based notation
   - Searchable catalog

2. **Sheet display**
   - Show notation above keyboard
   - Highlight current note to play

3. **Auto-play sheets**
   - Computer plays the song
   - User can follow along

#### Technical Approach:
- **Format**: Custom JSON format `{title, artist, notes: "a s d f..."}`
- **Storage**: Bundled with extension or fetched from API
- **Parser**: Convert letter notation to piano notes

---

### Phase 5: Learning Features (KEY ASSIST)
**Priority**: MEDIUM | **Complexity**: MEDIUM | **Risk**: LOW

#### Features to Implement:
1. **Visual key highlighting**
   - Show which keys to press next
   - Follow along with music sheets

2. **Tutorial mode**
   - Step-by-step lessons
   - Wait for correct key before advancing

3. **Practice mode**
   - Slow down playback speed
   - Loop difficult sections
   - Scoring/feedback on accuracy

#### Technical Approach:
- **Animation**: CSS transitions for key highlighting
- **Logic**: Compare user input to sheet notes
- **State machine**: Track lesson progress

---

### Phase 6: Advanced Features
**Priority**: LOW | **Complexity**: HIGH | **Risk**: MEDIUM

#### Features to Implement:
1. **MIDI controller support**
   - Connect real MIDI keyboards
   - Web MIDI API integration

2. **Customizable keyboard mappings**
   - User-defined key layouts
   - Multiple octave shifting

3. **Effects & styles**
   - Sustain pedal simulation
   - Reverb, chorus, delay
   - Attack/release envelope controls

4. **Visual themes**
   - Different piano skins
   - Dark mode support

---

### Phase 7: Cloud & Social (Optional)
**Priority**: LOW | **Complexity**: HIGH | **Risk**: HIGH

#### Features to Implement:
1. **User accounts**
   - Save to cloud (Firebase/Supabase)
   - Sync across devices

2. **Share recordings**
   - Generate shareable links
   - Embed player for shared recordings

3. **Community features**
   - User-submitted sheets
   - Rating system
   - Leaderboards

#### Technical Approach:
- **Backend**: Firebase or Supabase for authentication & storage
- **API**: RESTful or GraphQL for data exchange

---

## Key Differentiators for Chrome Extension

### Advantages Over Web App:
1. **Always accessible** - Available in browser without navigating to website
2. **Offline capability** - Works without internet (after initial install)
3. **Quick access** - Click extension icon to launch instantly in new tab
4. **Background processing** - Can run in service worker if needed
5. **OS integration** - Better keyboard capture when extension tab is focused
6. **No ads** - Cleaner experience without monetization pressure

### Limitations to Consider:
1. **Requires new tab** - Opens in new tab instead of overlay (user preference may vary)
2. **Audio permissions** - Need to handle browser audio policies and user gestures
3. **Storage limits** - Chrome Storage API has size restrictions (~10MB for audio samples)
4. **No SEO** - Not discoverable via search engines
5. **Distribution** - Requires Chrome Web Store approval
6. **Browser context** - Users may need to switch tabs to use it

---

## Technical Architecture Recommendations

### Frontend Stack (Current Project)
- ✅ **React 19** - Modern UI framework
- ✅ **TypeScript** - Type safety
- ✅ **Material-UI v6** - Component library
- ✅ **Redux Toolkit** - State management
- ✅ **Tailwind CSS** - Utility styling

### Audio Engine
- **Web Audio API** - Core audio synthesis
- **Tone.js** (optional) - High-level audio framework
- **SoundFont2** (optional) - For realistic instrument samples

### Data Management
- **Redux Chrome Storage** - Persist settings & recordings
- **IndexedDB** (optional) - For larger data (audio samples)

### Build Tool
- ✅ **WXT** - Chrome extension framework

---

## UI/UX Considerations

### Extension Tab Design
1. **Full screen experience** - Utilizes entire browser tab viewport
2. **Responsive layout** - Adapt to different screen sizes and window resizing
3. **Maximized real estate** - No constraints like popup windows
4. **Keyboard-first design** - All features accessible via keyboard

### Piano Keyboard Layout
1. **Visual hierarchy** - Piano takes center stage
2. **Comprehensive toolbar** - Full feature set available with generous screen space
3. **Expandable panels** - Sheet music, settings in collapsible sections
4. **Accessibility** - ARIA labels, keyboard navigation

### Color Scheme
1. **Dark mode support** - Easier on eyes during practice
2. **High contrast** - Keys clearly distinguishable
3. **Brand colors** - Consistent with Material-UI theme

---

## Audio Performance Optimization

### Latency Reduction
1. **Preload audio samples** - Load on extension start
2. **Web Audio API scheduling** - Accurate timing
3. **Buffer management** - Prevent crackling/popping

### Resource Management
1. **Lazy load instruments** - Only load selected sound
2. **Audio compression** - OGG/WEBM for smaller file sizes
3. **Limit polyphony** - Max 10-12 simultaneous notes

---

## Storage Strategy

### Chrome Storage API
- **Settings**: `chrome.storage.sync` (syncs across devices)
  - Selected instrument
  - Volume level
  - Keyboard layout preferences
  - Theme preference
  
- **Recordings**: `chrome.storage.local` (device-only)
  - User recordings (MIDI data)
  - Favorite sheets
  - Practice history

### Quota Management
- **Sync storage**: 100KB limit
- **Local storage**: 10MB limit (can request more with `unlimitedStorage` permission)
- **Strategy**: Compress recordings, limit number of saved items

---

## Manifest Configuration

### Extension Action Setup
The extension should open a new tab when the icon is clicked:

```json
{
  "manifest_version": 3,
  "action": {
    "default_icon": {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "128": "icon/128.png"
    },
    "default_title": "Zen Virtual Piano"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### Background Service Worker
Handle icon click to open new tab:

```javascript
// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html')
  });
});
```

**Note**: Since WXT is being used, this configuration will be handled by the framework's conventions.

---

## Permissions Required

```json
{
  "permissions": [
    "storage",           // Save settings & recordings
    "unlimitedStorage"   // Store audio samples (optional)
  ],
  "optional_permissions": [
    "midi"               // MIDI controller support (future)
  ]
}
```

---

## Development Roadmap

### Sprint 1 (2 weeks): MVP
- [ ] Basic piano keyboard UI
- [ ] Keyboard input mapping
- [ ] Single piano sound
- [ ] Visual feedback on key press

### Sprint 2 (2 weeks): Audio Enhancement
- [ ] 3-5 instrument sounds
- [ ] Instrument selector
- [ ] Volume control
- [ ] Sound optimization

### Sprint 3 (2 weeks): Recording
- [ ] Record functionality
- [ ] Playback functionality
- [ ] Save/load recordings
- [ ] Export recordings

### Sprint 4 (2 weeks): Music Sheets
- [ ] 20-30 built-in sheets
- [ ] Sheet display UI
- [ ] Sheet search
- [ ] Auto-play sheets

### Sprint 5 (2 weeks): Learning Features
- [ ] KEY ASSIST visual highlighting
- [ ] Tutorial mode
- [ ] Practice mode with scoring

### Sprint 6+ (Ongoing): Polish & Advanced Features
- [ ] More instruments (expand library)
- [ ] MIDI controller support
- [ ] Customizable layouts
- [ ] Effects & styles
- [ ] Cloud sync (if desired)

---

## Success Metrics

### User Engagement
- **Daily Active Users** (DAU)
- **Average session duration**
- **Number of recordings created**
- **Favorite songs played**

### Technical Performance
- **Audio latency** < 50ms
- **Keyboard response time** < 20ms
- **Extension load time** < 2s
- **Memory usage** < 200MB

### User Satisfaction
- **Chrome Web Store rating** > 4.5 stars
- **User reviews** - Positive feedback
- **Bug reports** - Low critical issues
- **Support requests** - Manageable volume

---

## Competitive Analysis

### Similar Extensions
- Research existing piano extensions on Chrome Web Store
- Identify gaps and opportunities
- Unique selling propositions:
  1. **Better sound quality** than competitors
  2. **More instruments** available
  3. **Built-in music sheets** with learning mode
  4. **Beautiful UI** with Material Design

---

## Monetization (Optional)

If considering monetization:

### Free Tier
- Basic piano functionality
- 3-5 instruments
- 20 music sheets
- Basic recording

### Premium Tier ($2-5/month or $20-30/year)
- All instruments (24+)
- Unlimited music sheets
- Cloud sync for recordings
- Advanced effects & styles
- MIDI controller support
- Priority support

### One-Time Purchase Alternative
- Pay once, own forever ($10-20)
- All features included
- Better for users who dislike subscriptions

---

## Conclusion

Virtual Piano is a comprehensive platform with rich features built over years. This Chrome extension should focus on:

1. **Core piano playing experience** - Nail the basics first
2. **Low latency audio** - Critical for playability
3. **Educational value** - Music sheets + learning features
4. **Delightful UX** - Beautiful, intuitive interface

Start with Phase 1-3 for a solid MVP, then iterate based on user feedback.

---

## References
- Virtual Piano Website: https://virtualpiano.net
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Chrome Extension Storage: https://developer.chrome.com/docs/extensions/reference/storage/
- WXT Framework: https://wxt.dev/
- Material-UI: https://mui.com/
