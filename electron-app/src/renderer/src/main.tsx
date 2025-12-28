import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from '@shared/entrypoints/piano/App'
import { store, persistor } from '@shared/store/base'
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from '@shared/theme/mui-theme';
import { NotificationProvider } from '@shared/contexts/notification-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={muiTheme}>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </ThemeProvider>
        </PersistGate>
      ) : (
        <ThemeProvider theme={muiTheme}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ThemeProvider>
      )}
    </Provider>
  </StrictMode>
)
