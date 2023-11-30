import { quotesFetched } from '../redux/quotesSlise';
import { useDispatch, useSelector } from 'react-redux';
import { useStorage } from '../firebase/storage';
import { setQuotesUsers } from '../redux/quotesUsersSlice';

export const useQuotesService = () => {
  const dispatch = useDispatch();
  const {updateQuotesAll, updateQuotesUser} = useStorage();
  const dataQuotes = useSelector(state => state.quotes.quotes);

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


  return {
    changeAllQuotes,
    changeUsersQuotes
  }
}