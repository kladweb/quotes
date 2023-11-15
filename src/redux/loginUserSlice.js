import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currUser: 0,
  idCurrUser: null,
}

export const loginUserSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setCurrUser: (state, action) => {
      state.currUser = action.payload.currUser;
      if (action.payload.currUser) {
        state.idCurrUser = action.payload.currUser.uid;
      }
    },
  }
});

export const {setCurrUser} = loginUserSlice.actions;

export default loginUserSlice.reducer;