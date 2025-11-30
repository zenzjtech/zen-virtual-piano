import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from '@shared/entrypoints/piano/App'
import { store } from '@shared/store/base'
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from '@shared/theme/mui-theme';
import { NotificationProvider } from '@shared/contexts/notification-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ThemeProvider>      
    </Provider>
  </StrictMode>
)
