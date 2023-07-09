import { configureStore } from '@reduxjs/toolkit';
import stageSlice from './slices/stageSlice';
import trainingConfigSlice from './slices/trainingConfigSlice';

export const store = configureStore({
  reducer: {
    stage: stageSlice,
    trainingConfig: trainingConfigSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
