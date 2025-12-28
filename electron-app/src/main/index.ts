import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { readFile } from 'fs/promises'
import icon from '../../resources/icon.png?asset'

/**
 * Get the resources path for loading static assets.
 * In development, this points to the source directory.
 * In production, this points to the extraResources directory.
 */
function getResourcesPath(): string {
  if (is.dev) {
    // In dev, go up from electron-app/src/main to extension/src
    return join(__dirname, '../../../src')
  } else {
    // In production, use the resources path where extraResources are copied
    return process.resourcesPath
  }
}



function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Audio file loading handler
  ipcMain.handle('load-audio-file', async (_, filePath: string) => {
    try {
      const resourcesPath = getResourcesPath()
      const fullPath = join(resourcesPath, filePath)
      console.log('Loading audio file:', fullPath)
      const buffer = await readFile(fullPath)
      // Convert to base64 data URL
      const base64 = buffer.toString('base64')
      return `data:audio/mpeg;base64,${base64}`
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('Audio load failed:', errorMessage)
      throw error
    }
  })

  // Sheet data loading handler
  ipcMain.handle('load-sheet-data', async () => {
    try {
      // In dev: electron-app/public/data/sheet-data.json (from src/main -> ../../public)
      // In prod: resources/data/sheet-data.json
      const dataPath = is.dev 
        ? join(__dirname, '../../public/data/sheet-data.json')
        : join(process.resourcesPath, 'data/sheet-data.json')
      console.log('Loading sheet data from:', dataPath)
      const buffer = await readFile(dataPath, 'utf-8')
      return JSON.parse(buffer)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('Sheet data load failed:', errorMessage)
      throw error
    }
  })

  console.log('🚀🚀🚀 IPC HANDLERS REGISTERED 🚀🚀🚀')

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
