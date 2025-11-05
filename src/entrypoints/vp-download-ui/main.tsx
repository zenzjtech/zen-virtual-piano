import React from 'react';
import ReactDOM from 'react-dom/client';
import DownloadUI from './download-ui.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from '@/theme/mui-theme';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <DownloadUI />
    </ThemeProvider>
  </React.StrictMode>
);
