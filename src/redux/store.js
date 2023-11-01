import { configureStore } from '@reduxjs/toolkit';

import quotesReducer from '../redux/quotesSlise';
import currUserReducer from './currUserSlice';

const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    currUser: currUserReducer,
  },
});

export default store;