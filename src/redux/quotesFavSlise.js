import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotesFav: [],
}

const quotesFavSlice = createSlice({
  name: 'quotesFav',
  initialState,
  reducers: {
    quotesFavFetched: (state, action) => {
      state.quotesFav = action.payload.quotesFav;
    },
    quotesFavFetchingError: state => {
      state.dataLoadStatus = 'error';
    }
  }
});

const {actions, reducer} = quotesFavSlice;

export default reducer;

export const {
  quotesFavFetched,
  quotesFavFetchingError
} = actions;