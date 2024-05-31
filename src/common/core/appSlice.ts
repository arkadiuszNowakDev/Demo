import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

type AppState = {
  viewTitle: string;
};

const initialState: AppState = {
  viewTitle: ''
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setViewTitle: (state, action: PayloadAction<string>) => {
      state.viewTitle = action.payload;
    }
  }
});

export const { setViewTitle } = appSlice.actions;

export const selectViewTitle = (state: RootState) => state.app.viewTitle;

export default appSlice.reducer;
