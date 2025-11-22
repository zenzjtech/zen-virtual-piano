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
    "web_accessible_resources": [
      {
        "resources": ["vp-download-ui.html"],
        "matches": [
          "https://virtualpiano.net/*",
          "https://zen-piano.web.app/*"
        ],
      }
    ],    
    oauth2: {
      client_id: "234802539997-4d87d91srfv4abjmsfvsnkkmkb3aaqmk.apps.googleusercontent.com",
      scopes: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
        // Add other Google API scopes your extension requires
      ]
    },    
    content_security_policy: {
      "extension_pages": "script-src 'self'; object-src 'self';"
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