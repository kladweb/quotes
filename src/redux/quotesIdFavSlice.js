import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotesIdFav: null,
}

export const quotesIdFavSlice = createSlice({
  name: 'quotesIdFav',
  initialState,
  reducers: {
    setQuotesIdFav: (state, action) => {
      state.quotesIdFav = action.payload.quotesIdFav;
    },
  }
});

export const {setQuotesIdFav} = quotesIdFavSlice.actions;

export default quotesIdFavSlice.reducer;