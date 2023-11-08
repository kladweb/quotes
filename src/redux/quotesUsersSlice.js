import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotesUsers: [],
}

export const quotesUsersSlice = createSlice({
  name: 'quotesUsers',
  initialState,
  reducers: {
    setQuotesUsers: (state, action) => {
      state.quotesUsers = action.payload.quotesUsers;
    },
  }
});

export const {setQuotesUsers} = quotesUsersSlice.actions;

export default quotesUsersSlice.reducer;