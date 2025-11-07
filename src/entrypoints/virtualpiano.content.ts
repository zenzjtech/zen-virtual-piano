/**
 * Content Script for virtualpiano.net
 * 
 * Injects UI for downloading sheet notation from virtualpiano.net sheet pages
 */

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
    bottom: 28px;
    right: 28px;
    z-index: 999999;
    border-radius: 16px;
    overflow: visible;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `;

  // Create iframe pointing to unlisted page
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('/vp-download-ui.html');
  iframe.style.cssText = `
    width: 320px;
    height: 180px;
    border: none;
    display: block;
    background: transparent;
  `;

  container.appendChild(iframe);
  document.body.appendChild(container);

  console.log('Download UI iframe injected');

  // Listen for messages from iframe
  window.addEventListener('message', async (event) => {
    // Verify message is from our iframe
    if (event.source !== iframe.contentWindow) return;

    if (event.data.type === 'SCRAPE_AND_DOWNLOAD') {
      await handleDownload(iframe);
    }
  });
}

/**
 * Handle sheet download action
 */
async function handleDownload(iframe: HTMLIFrameElement) {
  const { scrapeVirtualPianoSheet, convertToMusicSheet } = await import('@/utils/virtualpiano-scraper');

  // Wait for iframe to be ready
  if (!iframe.contentWindow) {
    console.error('Iframe content window not available');
    return;
  }

  try {
    // Scrape sheet data
    const scrapedData = scrapeVirtualPianoSheet();
    
    if (!scrapedData) {
      // Send error directly to iframe
      iframe.contentWindow.postMessage({
        type: 'DOWNLOAD_ERROR',
        error: 'Could not extract sheet data from page'
      }, '*');
      return;
    }

    // Convert to MusicSheet format
    const musicSheet = convertToMusicSheet(scrapedData);

    // Copy notation to clipboard
    await navigator.clipboard.writeText(scrapedData.notation);

    // Send success message directly to iframe with complete sheet data
    iframe.contentWindow.postMessage({
      type: 'DOWNLOAD_SUCCESS',
      sheet: musicSheet,
    }, '*');

  } catch (error) {
    console.error('Error downloading sheet:', error);
    iframe.contentWindow?.postMessage({
      type: 'DOWNLOAD_ERROR',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, '*');
  }
}
