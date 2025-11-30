export const useAppConfig = () => ({
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