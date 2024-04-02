import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
  emailId: string;
  password: string;
}
export interface userState {
  user?: User;
}

const initialState: userState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = undefined;
    },
  },
});
export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
