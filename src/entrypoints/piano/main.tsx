import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux'
import { instantiateGlobalStore } from '@/store/index.ts';

import '@/assets/tailwind.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from '@/theme/mui-theme';
import { analytics } from '@/utils/analytics.ts';
import { NotificationProvider } from '@/contexts/notification-context';
import '@/lib/i18n';

(async () => {
  const store = await instantiateGlobalStore()
  analytics.init(store);
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  );  
})()
