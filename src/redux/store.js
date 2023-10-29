import { configureStore } from '@reduxjs/toolkit';

import quotesReducer from '../redux/quotesSlise';
import isLoginReducer from '../redux/isLoginSlice';

const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    isLogin: isLoginReducer,
  },
});

export default store;