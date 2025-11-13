// Define types for your config
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    musicStand: {
        musicSheet: {
            maxCharsPerLine: number;
            linesPerPage: number;
        }
    },
    noteHistoryLimit: number,
    maxCustomSheets: number,
    app: {
      homeUrl: string,
      highlightAnimationDuration: number,
      highlightAnimationDelay: number
    }
  }
}

export default defineAppConfig({
  musicStand: {
    musicSheet: {
      maxCharsPerLine: 45,
      linesPerPage: 6,
    },
  },
  noteHistoryLimit: 500,
  maxCustomSheets: 10,
  app: {
    homeUrl: 'https://zen-piano.web.app',
    highlightAnimationDuration: 10000,
    highlightAnimationDelay: 30000
  }
})