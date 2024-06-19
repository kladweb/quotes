import { configureStore } from '@reduxjs/toolkit';

import quotesReducer from './quotesSlise';
import quotesFavReducer from './quotesFavSlise';
import quotesUsersReducer from './quotesUsersSlice';
import quotesIdFavReducer from './quotesIdFavSlice';
import currUserReducer from './loginUserSlice';

const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    quotesFav: quotesFavReducer,
    quotesUsers: quotesUsersReducer,
    quotesIdFav: quotesIdFavReducer,
    currUser: currUserReducer,
  },
});

export default store;