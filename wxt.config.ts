import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({  
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['storage'],
    action: {
      // Remove default_popup to allow action.onClicked event
      // Icon will open new tab via background service worker
    },
  },  
  srcDir: 'src',  
  runner: {
    disabled: true,
  },
  imports: {
    dirs: ['components', 'composables'] // Only include these directories
  },
  modulesDir: 'src/modules',   
});