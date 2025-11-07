import React from 'react';
import ReactDOM from 'react-dom/client';
import DownloadUI from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { muiTheme } from '@/theme/mui-theme';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline enableColorScheme />
      <DownloadUI />
    </ThemeProvider>
  </React.StrictMode>
);
