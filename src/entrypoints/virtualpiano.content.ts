/**
 * Content Script for virtualpiano.net
 * 
 * Injects UI for downloading sheet notation from virtualpiano.net sheet pages
 */

import { instantiateGlobalStore } from '@/store';
import { isVirtualPianoSheetPage } from '@/utils/virtualpiano-scraper';

export default defineContentScript({
  matches: ['https://virtualpiano.net/music-sheet/*'],
  
  async main() {
    console.log('Zen Virtual Piano: VirtualPiano.net content script loaded');

    // Only proceed if this is a sheet page
    if (!isVirtualPianoSheetPage()) {
      console.log('Not a sheet page, exiting');
      return;
    }

    // Initialize Redux store for access
    const store = await instantiateGlobalStore();
    console.log('Redux store initialized in content script');

    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Check if sheet content exists
    const sheetContent = document.querySelector('#sheet-content');
    if (!sheetContent) {
      console.log('Sheet content not found, exiting');
      return;
    }

    // Inject the download UI iframe
    injectDownloadUI();
  },
});

/**
 * Inject the download UI as an iframe
 */
function injectDownloadUI() {
  // Create iframe container
  const container = document.createElement('div');
  container.id = 'zen-vp-download-ui';
  container.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    overflow: hidden;
  `;

  // Create iframe pointing to unlisted page
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('/vp-download-ui.html');
  iframe.style.cssText = `
    width: 280px;
    height: 80px;
    border: none;
    display: block;
  `;

  container.appendChild(iframe);
  document.body.appendChild(container);

  console.log('Download UI iframe injected');

  // Listen for messages from iframe
  window.addEventListener('message', async (event) => {
    // Verify message is from our iframe
    if (event.source !== iframe.contentWindow) return;

    if (event.data.type === 'SCRAPE_AND_DOWNLOAD') {
      await handleDownload();
    }
  });
}

/**
 * Handle sheet download action
 */
async function handleDownload() {
  const { scrapeVirtualPianoSheet, convertToMusicSheet } = await import('@/utils/virtualpiano-scraper');
  const { addCustomSheet } = await import('@/store/reducers/music-sheet-slice');

  try {
    // Scrape sheet data
    const scrapedData = scrapeVirtualPianoSheet();
    
    if (!scrapedData) {
      // Send error back to iframe
      window.postMessage({
        type: 'DOWNLOAD_ERROR',
        error: 'Could not extract sheet data from page'
      }, '*');
      return;
    }

    // Convert to MusicSheet format
    const musicSheet = convertToMusicSheet(scrapedData);

    // Get store and dispatch action
    const store = await instantiateGlobalStore();
    store.dispatch(addCustomSheet(musicSheet));

    // Copy notation to clipboard
    await navigator.clipboard.writeText(scrapedData.notation);

    // Send success message to iframe
    window.postMessage({
      type: 'DOWNLOAD_SUCCESS',
      sheet: {
        title: musicSheet.title,
        artist: musicSheet.artist,
        difficulty: musicSheet.difficulty,
        notation: scrapedData.notation,
      }
    }, '*');

    // Send chrome notification
    chrome.runtime.sendMessage({
      type: 'SHOW_NOTIFICATION',
      title: 'Sheet Downloaded!',
      message: `"${musicSheet.title}" by ${musicSheet.artist} has been added to your library.`,
      sheet: {
        title: musicSheet.title,
        artist: musicSheet.artist,
      }
    });

  } catch (error) {
    console.error('Error downloading sheet:', error);
    window.postMessage({
      type: 'DOWNLOAD_ERROR',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, '*');
  }
}
