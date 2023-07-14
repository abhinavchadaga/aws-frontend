import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Stage =
  | 'uploadDataset'
  | 'configureTraining'
  | 'confirmationScreen'
  | 'training'
  | 'results';

export interface StageState {
  stage: Stage;
}

const initialState: StageState = {
  stage: 'uploadDataset',
};

export const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    setStage: (state, action: PayloadAction<Stage>) => {
      state.stage = action.payload;
    },
  },
});

export const { setStage } = stageSlice.actions;
export default stageSlice.reducer;
