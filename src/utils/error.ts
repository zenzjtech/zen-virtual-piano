// export function globalErrorHandlerForServiceWorker () {
//     if (typeof self !== "undefined") {
//         self.onerror = function (msg, url, lineNo, columnNo, error) {
//           handler(msg, error, chrome.runtime.getURL('serviceWorker'))
//           return false
//         }
//         return;
//     } 
// }