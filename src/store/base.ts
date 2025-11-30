import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import logger from 'redux-logger'

import reducer from './reducers';

export const configureStoreOptions: ConfigureStoreOptions = {
  reducer,
  middleware: (getDefaultMiddleware) => {
      if (process.env.NODE_ENV === 'development') {
          return getDefaultMiddleware().concat(logger)
      }
      return getDefaultMiddleware()
  }
}
export const store = configureStore(configureStoreOptions);


