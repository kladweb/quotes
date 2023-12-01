import { quotesFetched } from '../redux/quotesSlise';
import { useDispatch, useSelector } from 'react-redux';
import { useStorage } from '../firebase/storage';
import { setQuotesUsers } from '../redux/quotesUsersSlice';
import { setQuotesIdFav } from '../redux/quotesIdFavSlice';

export const useQuotesService = () => {
  const dispatch = useDispatch();
  const {updateQuotesAll, updateQuotesUser, updateQuotesIdFav} = useStorage();
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const idCurrUser = useSelector(state => state.currUser.idCurrUser);

  const changeAllQuotes = (quote, action) => {
    const newQuotes = [...dataQuotes];
    let numActiveQuote = 0;
    newQuotes.forEach((v, index) => {
      if (v.id === quote.id) {
        numActiveQuote = index;
      }
    });
    switch (action) {
      case 'delete':
        newQuotes.splice(numActiveQuote, 1);
        break;
      case 'edit':
        newQuotes.splice(numActiveQuote, 1, quote);
        break;
      case 'add':
        const newQuote = {};
        newQuote.id = quote.id;
        newQuote.quote = quote.quote;
        newQuote.author = quote.author;
        newQuotes.push(newQuote);
        break;
    }
    updateQuotesAll(newQuotes)
      .then(() => {
        dispatch(quotesFetched({quotes: newQuotes, dataLoadStatus: 'loaded'}));
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  const changeUsersQuotes = (quote, action, dataQuotesUsersCurr) => {
    const newQuotes = [...dataQuotesUsersCurr];
    let numActiveQuote = 0;
    newQuotes.forEach((v, index) => {
      if (v.id === quote.id) {
        numActiveQuote = index;
      }
    });
    switch (action) {
      case 'delete':
        newQuotes.splice(numActiveQuote, 1);
        break;
      case 'edit':
        newQuotes.splice(numActiveQuote, 1, quote);
        break;
      case 'add':
        newQuotes.push(quote);
        break;
    }
    updateQuotesUser(newQuotes)
      .then(() => {
        dispatch(setQuotesUsers({quotesUsers: newQuotes}));
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  const changeFavList = (quote, dataQuotesIdFavCurrent, action) => {
    const idAddedUser = idCurrUser;
    let dataQuotesIdFavNew = [];
    let addQuote = true;
    switch (action) {
      case 'add':
        dataQuotesIdFavNew = dataQuotesIdFavCurrent.map((item) => {
          const newItem = {};
          newItem.id = item.id;
          if (item.userAdded) {
            newItem.userAdded = item.userAdded;
          }
          if (item.userName) {
            newItem.userName = item.userName;
          }
          newItem.usersArr = [];
          if (item.usersArr) {
            newItem.usersArr = [...item.usersArr];
          }
          if (newItem.id === quote.id) {
            if (!newItem.usersArr.includes(idAddedUser)) {
              (newItem.usersArr).push(idAddedUser);
              addQuote = false;
            }
          }
          return newItem;
        });
        if (addQuote || dataQuotesIdFavNew.length === 0) {
          const newObj = {};
          newObj.id = quote.id;
          newObj.usersArr = [idAddedUser];
          dataQuotesIdFavNew.push(newObj);
        }
        break;
      case 'remove':
        dataQuotesIdFavCurrent.forEach((item) => {
          const newItem = {};
          newItem.id = item.id;
          newItem.usersArr = [];
          if (item.usersArr) {
            newItem.usersArr = [...item.usersArr];
          }
          if (newItem.id === quote.id) {
            if (item.usersArr.includes(idCurrUser)) {
              let i = newItem.usersArr.indexOf(idCurrUser);
              newItem.usersArr.splice(i, 1);
            }
          }
          if (newItem.usersArr.length !== 0) {
            dataQuotesIdFavNew.push(newItem);
          }
        });
        break;
    }
    dispatch(setQuotesIdFav({quotesIdFav: dataQuotesIdFavNew}));
    updateQuotesIdFav(dataQuotesIdFavNew)
      .then(() => {
        console.log('Данные на сервере изменены');
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  return {
    changeAllQuotes,
    changeUsersQuotes,
    changeFavList,
  }
}