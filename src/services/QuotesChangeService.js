import { quotesFetched } from '../redux/quotesSlise';
import { useDispatch, useSelector } from 'react-redux';

import useQuotesService from './QuotesLoadSaveService';

export const useQuotesChange = () => {
  const dispatch = useDispatch();
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const {saveQuotes} = useQuotesService(dispatch);
  const changeQuotes = (quote, action = 'delete') => {
    const newQuotes = [...dataQuotes];
    let numActiveQuote;
    newQuotes.forEach((v, index) => {
      if (v.id === quote.id) {
        numActiveQuote = index;
      }
    })
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
    dispatch(quotesFetched({quotes: newQuotes, dataLoadStatus: 'loaded'}));
    saveQuotes(newQuotes)
        .then(() => {
          console.log('Successfully saved');
        })
        .catch(() => {
          console.log('Saving error');
        });
  }
  return {changeQuotes};
}