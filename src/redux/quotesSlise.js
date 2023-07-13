import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotes: [],
  dataLoadStatus: 'not_loaded', // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
}

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    quotesFetching: state => {
      state.dataLoadStatus = 'loading'
    },
    quotesFetched: (state, action) => {
      state.dataLoadStatus = action.payload.dataLoadStatus;
      state.quotes = action.payload.quotes;
    },
    quotesFetchingError: state => {
      state.dataLoadStatus = 'error';
    }
  }
});

const {actions, reducer} = quotesSlice;

export default reducer;

export const {
  quotesFetching,
  quotesFetched,
  quotesFetchingError
} = actions;