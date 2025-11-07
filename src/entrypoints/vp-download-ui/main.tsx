import React from 'react';
import ReactDOM from 'react-dom/client';
import DownloadUI from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { muiTheme } from '@/theme/mui-theme';
import { Provider } from 'react-redux';
import { instantiateGlobalStore } from '@/store';
import './style.css';

// Initialize Redux store
const initApp = async () => {
  const store = await instantiateGlobalStore();
  console.log('Redux store initialized in vp-download-ui');

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline enableColorScheme />
          <DownloadUI />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

initApp();
