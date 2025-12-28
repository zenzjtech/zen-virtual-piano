import { instantiateGlobalExtStore } from '@/store';

const main = () => {
  chrome.runtime.onInstalled.addListener(async function(details) {
    const store = await instantiateGlobalExtStore();    
    analytics.init(store);
    analytics.getOrCreateUserId();

    chrome.tabs.create({
        url: 'piano.html'
    });
  })
  
  // Handle extension icon click to open piano in new tab
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('/piano.html')
    });
  }); 

  // Store related handlers
  (async () => {
    const store = await instantiateGlobalExtStore();    
    analytics.init(store);
    analytics.getOrCreateUserId();
  })()   
  // globalErrorHandlerForServiceWorker()  
}

export default defineBackground({  
  type: 'module',
  main
});
