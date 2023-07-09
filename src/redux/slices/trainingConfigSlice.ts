import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ModelArch = 'alexnet' | 'resnet' | 'vgg';

export type TrainingConfigState = {
  architecture: ModelArch | null;
  maxEpochs: number | null;
  learningRate: number | null;
};

const initialState: TrainingConfigState = {
  architecture: null,
  maxEpochs: null,
  learningRate: null,
};

export const trainingConfigSlice = createSlice({
  name: 'trainingConfig',
  initialState,
  reducers: {
    setTrainingConfig: (state, action: PayloadAction<TrainingConfigState>) => {
      state.architecture = action.payload.architecture;
      state.maxEpochs = action.payload.maxEpochs;
      state.learningRate = action.payload.learningRate;
    },
  },
});

export const { setTrainingConfig } = trainingConfigSlice.actions;
export default trainingConfigSlice.reducer;
