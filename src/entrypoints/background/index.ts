export default defineBackground(() => {
  // Handle extension icon click to open piano in new tab
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('/piano.html')
    });
  });
  
  console.log('Zen Virtual Piano background service worker initialized');
});
  