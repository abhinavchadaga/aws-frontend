import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ModelArch = 'alexnet' | 'resnet' | 'vgg';

export type TrainingConfigState = {
  modelArch: ModelArch | null;
  numEpochs: string | null;
  learningRate: string | null;
};

const initialState: TrainingConfigState = {
  modelArch: null,
  numEpochs: null,
  learningRate: null,
};

export const trainingConfigSlice = createSlice({
  name: 'trainingConfig',
  initialState,
  reducers: {
    setTrainingConfig: (state, action: PayloadAction<TrainingConfigState>) => {
      state.modelArch = action.payload.modelArch;
      state.numEpochs = action.payload.numEpochs;
      state.learningRate = action.payload.learningRate;
    },
  },
});

export const { setTrainingConfig } = trainingConfigSlice.actions;
export default trainingConfigSlice.reducer;
