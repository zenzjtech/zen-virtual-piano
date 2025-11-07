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
    maxCustomSheets: number
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
})