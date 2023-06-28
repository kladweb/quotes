import { useHttp } from '../hooks/http.hook';

const useQuotesService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://fe.it-academy.by/AjaxStringStorage2.php';
  const _apiName = 'KLADKEVICH_QUOTES';

  const getQuotes = async () => {
    let body = new FormData();
    body.append('f', 'READ');
    body.append('n', _apiName);
    const data = await request(_apiBase, 'POST', body);
    return JSON.parse(data.result);
  }

  return {loading, error, getQuotes, clearError};
}

export default useQuotesService;