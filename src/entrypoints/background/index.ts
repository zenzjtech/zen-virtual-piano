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
   
  // globalErrorHandlerForServiceWorker()  
}

export default defineBackground(() => {
  console.log('Zen Virtual Piano background service worker initialized');  
  main();
});
