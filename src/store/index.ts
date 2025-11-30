import {
  setupReduxed, ReduxedSetupOptions
} from 'reduxed-chrome-storage';
import { configureStore } from '@reduxjs/toolkit';
import { configureStoreOptions } from './base';

const extStoreCreatorContainer = (preloadedState?: any) => configureStore({
  preloadedState,
  ...configureStoreOptions
})


const optionsGlobal: ReduxedSetupOptions = {
  plainActions: true,
};

const optionsLocal: ReduxedSetupOptions = {
  plainActions: true,
  isolated: true
};
export const instantiateGlobalExtStore = setupReduxed(extStoreCreatorContainer, optionsGlobal);
export const instantiateLocalExtStore = setupReduxed(extStoreCreatorContainer, optionsLocal);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStore = Awaited<ReturnType<typeof extStoreCreatorContainer>>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<RootStore["getState"]>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = RootStore["dispatch"]
