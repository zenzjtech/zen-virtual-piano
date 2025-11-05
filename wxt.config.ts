import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({  
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Zen Virtual Piano',    
    permissions: [
      "identity",
      "storage",
      "unlimitedStorage"
      // Add other permissions your extension needs
    ],    
    action: {
      // Remove default_popup to allow action.onClicked event
      // Icon will open new tab via background service worker
    },
    host_permissions: [
      "https://zen-piano.web.app/*"      
    ],
    oauth2: {
      client_id: "234802539997-4d87d91srfv4abjmsfvsnkkmkb3aaqmk.apps.googleusercontent.com",
      scopes: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
        // Add other Google API scopes your extension requires
      ]
    },    
    key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt9l7vHnrKinCfWsJsELIQAVQbvEdG+YWcMae39kAWN+lFQKK2zqomDgeBh8OPBps0AWbdqdn3q6KVHhyPOFgXVj05oQNgxYA5ED0zuJoH1dmm4w+IfyHalwC3zfKllivSwTOUk9X8AYZDD4wedYyX80r67ilJ7pB9zQhI5+PtyLqVsG4bWS3LhNOXAuYSNNvpMQ2x2EpKiAcYok2s28K5eWyOYzDn5aKSV9tY7t0vvP9+ORiiiXUFessiXLyOI57JrXYysUrDHic3vklu9lM+vWU22pZ3MNt0KATZAxmjpPXFr7T8zHHzBLF4rlRdqtSHj6lFYmMDRlJl+KoKkKVSwIDAQAB"
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