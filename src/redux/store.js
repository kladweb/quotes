import { configureStore } from '@reduxjs/toolkit';

import quotesReducer from '../redux/quotesSlise';

const store = configureStore({
  reducer: {
    quotes: quotesReducer
  },
});

export default store;