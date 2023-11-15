import { configureStore } from '@reduxjs/toolkit';

import quotesReducer from './quotesSlise';
import quotesUsersReducer from './quotesUsersSlice';
import quotesIdFavReducer from './quotesIdFavSlice';
import currUserReducer from './loginUserSlice';

const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    quotesUsers: quotesUsersReducer,
    quotesIdFav: quotesIdFavReducer,
    currUser: currUserReducer,
  },
});

export default store;