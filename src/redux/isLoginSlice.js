import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
}

export const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    changeLoginStatus: (state, action) => {
      state.isLogin = action.payload.isLogin;
    },
  }
});

export const {changeLoginStatus} = isLoginSlice.actions;

export default isLoginSlice.reducer;