/* eslint-disable @typescript-eslint/indent */
import { configureStore } from '@reduxjs/toolkit';
import weather from './weatherSlice';

export const store = configureStore({
  reducer: { weather: weather },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
