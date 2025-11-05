import { instantiateGlobalStore } from '@/store';
import { getOrCreateUserId } from '@/utils/analytics';

const main = () => {
  chrome.runtime.onInstalled.addListener(async function(details) {
    const store = await instantiateGlobalStore();    
    getOrCreateUserId(store);
  })
  
  // Handle extension icon click to open piano in new tab
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('/piano.html')
    });
  }); 

  // Store related handlers
  (async () => {
    const store = await instantiateGlobalStore();    
    getOrCreateUserId(store);    
  })()

  // Handle messages from content scripts
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SHOW_NOTIFICATION') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL('/icon-96.png'),
        title: message.title,
        message: message.message,
        priority: 2,
      });
    }
  });
   
  // globalErrorHandlerForServiceWorker()  
}

export default defineBackground(() => {
  console.log('Zen Virtual Piano background service worker initialized');  
  main();
});
