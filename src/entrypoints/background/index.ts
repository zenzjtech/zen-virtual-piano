import { instantiateGlobalStore } from '@/store';
import { analytics } from '@/utils/analytics';

const main = () => {
  chrome.runtime.onInstalled.addListener(async function(details) {
    const store = await instantiateGlobalStore();    
    analytics.init(store);
    analytics.getOrCreateUserId();
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
    analytics.init(store);
    analytics.getOrCreateUserId();
  })()   
  // globalErrorHandlerForServiceWorker()  
}

export default defineBackground({  
  type: 'module',
  main
});
