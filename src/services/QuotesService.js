import { useHttp } from '../hooks/http.hook';
import { quotesFetching, quotesFetched, quotesFetchingError } from '../redux/quotesSlise';

const useQuotesService = (dispatch) => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://fe.it-academy.by/AjaxStringStorage2.php';
  const _apiName = 'KLADKEVICH_QUOTES';

  const getQuotes = async () => {
    let body = new FormData();
    body.append('f', 'READ');
    body.append('n', _apiName);
    const data = await request(_apiBase, 'POST', body);
    return JSON.parse(data.result);
    // dispatch(quotesFetched({quotes: quotesArray}));
    // return quotesArray;
  }

  const saveQuotes = async (newQuotes) => {
    let password = Math.random().toString();
    let body = new FormData();
    body.append('f', 'LOCKGET');
    body.append('n', _apiName);
    body.append('p', password);
    const resultInfo = await request(_apiBase, 'POST', body);
    // console.log('resultInfo', resultInfo);

    body = new FormData();
    body.append('f', 'UPDATE');
    body.append('n', _apiName);
    body.append('v', JSON.stringify(newQuotes));
    body.append('p', password);
    const result = await request(_apiBase, 'POST', body);
    // console.log('result', result);
  }

  return {loading, error, getQuotes, saveQuotes, clearError};
}

export default useQuotesService;