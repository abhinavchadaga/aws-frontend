import { configureStore } from '@reduxjs/toolkit';
import stageReducer from './slices/stageSlice';
import trainingConfigReducer from './slices/trainingConfigSlice';

export const store = configureStore({
  reducer: {
    stage: stageReducer,
    trainingConfig: trainingConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
