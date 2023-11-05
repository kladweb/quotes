import { configureStore } from '@reduxjs/toolkit';

import quotesReducer from './quotesSlise';
import quotesIdFavReducer from './quotesIdFavSlice';
import currUserReducer from './currUserSlice';

const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    quotesIdFav: quotesIdFavReducer,
    currUser: currUserReducer,
  },
});

export default store;