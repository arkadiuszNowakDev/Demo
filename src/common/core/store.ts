import { configureStore } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/src/configureStore';

import appReducer from './appSlice';

export const createNewStore = (): EnhancedStore =>
  configureStore({
    reducer: {
      app: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });

export const store = createNewStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
