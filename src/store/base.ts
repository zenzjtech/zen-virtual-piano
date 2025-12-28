import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import reducer from './reducers';
import { isExtension } from '../utils/env';

// Check environment at runtime
const isElectron = !isExtension();

// Base store configuration
export const configureStoreOptions: ConfigureStoreOptions = {
  reducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  }
};

// Configure persistence only for Electron
const persistConfig = {
  key: 'zen-virtual-piano',
  storage,
};

// Use persisted reducer for Electron, plain reducer for extension
const finalReducer = isElectron
  ? persistReducer(persistConfig, reducer)
  : reducer;

// Store configuration with appropriate middleware
export const storeConfig: ConfigureStoreOptions = {
  reducer: finalReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: isElectron ? {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      } : undefined,
    });

    if (process.env.NODE_ENV === 'development') {
      return middleware.concat(logger);
    }
    return middleware;
  }
};

// Create and export the appropriate store
export const store = configureStore(storeConfig);

// Persistor only for Electron
export const persistor = isElectron ? persistStore(store as any) : null;

console.log(`🔍 Store initialized: isElectron=${isElectron}, persistor=${!!persistor}`);

// Export reducer for external use
export { reducer };
