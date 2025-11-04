import { defineAppConfig } from '#imports'

// Define types for your config
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    musicStand: {
        musicSheet: {
            maxCharsPerLine: number;
            linesPerPage: number;
        }
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
})