import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ModelArch = 'alexnet' | 'resnet' | 'vgg';

export type TrainingConfigState = {
  modelArch: ModelArch | null;
  maxEpochs: string | null;
  learningRate: string | null;
};

const initialState: TrainingConfigState = {
  modelArch: null,
  maxEpochs: null,
  learningRate: null,
};

export const trainingConfigSlice = createSlice({
  name: 'trainingConfig',
  initialState,
  reducers: {
    setTrainingConfig: (state, action: PayloadAction<TrainingConfigState>) => {
      state.modelArch = action.payload.modelArch;
      state.maxEpochs = action.payload.maxEpochs;
      state.learningRate = action.payload.learningRate;
    },
  },
});

export const { setTrainingConfig } = trainingConfigSlice.actions;
export default trainingConfigSlice.reducer;
