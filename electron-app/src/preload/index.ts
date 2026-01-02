import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Type declarations for Electron API
declare global {
  interface Window {
    api?: {
      loadAudioFile: (filePath: string) => Promise<string>;
      loadSheetData: () => Promise<any>;
      getAppVersion: () => Promise<string>;
    };
  }
}

// Custom APIs for renderer
const api = {
  loadAudioFile: (filePath: string) => ipcRenderer.invoke('load-audio-file', filePath),
  loadSheetData: () => ipcRenderer.invoke('load-sheet-data'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Failed to expose APIs:', error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
