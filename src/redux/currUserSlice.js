import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currUser: 0,
}

export const currUserSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setCurrUser: (state, action) => {
      state.currUser = action.payload.currUser;
    },
  }
});

export const {setCurrUser} = currUserSlice.actions;

export default currUserSlice.reducer;