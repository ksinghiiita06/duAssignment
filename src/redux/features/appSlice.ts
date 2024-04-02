import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppLanguage {
  language: string;
}

const initialState: AppLanguage = {
  language: 'na',
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.language = action.payload.language;
    },
  },
});
export const {setLanguage} = appSlice.actions;
export default appSlice.reducer;
