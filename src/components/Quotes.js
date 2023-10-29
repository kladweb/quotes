import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import '../bootstrap/bootstrap.min.css';

import Quote from './Quote';
import useQuotesService from '../services/QuotesLoadSaveService';
import { quotesFetching, quotesFetched, quotesFetchingError } from '../redux/quotesSlise';
import ModalEditQuote from './ModalEditQuote';
import ModalDeleteQuote from './ModalDeleteQuote'

function Quotes({isAdmin}) {

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [activeQuote, setActiveQuote] = useState({});

  const dispatch = useDispatch();
  const statusLoad = useSelector(state => state.quotes.dataLoadStatus);
  const dataQuotes = useSelector(state => state.quotes.quotes);

  const {loading, error, getQuotes, saveQuotes} = useQuotesService(dispatch);

  useEffect(() => {
    if (statusLoad !== 'loaded') {
      getQuotes()
          .then((data) => {
            dispatch(quotesFetched({quotes: data, dataLoadStatus: 'loaded'}));
          });
    }
  }, [dataQuotes]);

  const onDeleteQuote = (quote) => {
    setShowModalDelete(true);
    setActiveQuote(quote);
  }

  const onEditQuote = (quote) => {
    setShowModalEdit(true);
    setActiveQuote(quote);
  }

  const quotesList = dataQuotes.map(quote =>
      <Quote
          key={quote.id}
          quote={quote}
          isAdmin={isAdmin}
          delQuote={onDeleteQuote}
          editQuote={onEditQuote}
      />);

  return (
      <Container>
        <Row>
          <Col sm={'auto'} md={10} lg={8} xxl={7} className="m-auto mt-4 pt-2">
            {
              (statusLoad === 'loaded') ? quotesList :
                  <div className="mt-3 text-center">
                    <Spinner animation="border" variant="info"/>
                  </div>
            }
            {
              (showModalEdit) ?
                  <ModalEditQuote
                      quote={activeQuote}
                      showModalEdit={showModalEdit}
                      setShowModalEdit={setShowModalEdit}
                  /> : null
            }
            {
              (showModalDelete) ?
                  <ModalDeleteQuote
                      quote={activeQuote}
                      showModalDelete={showModalDelete}
                      setShowModalDelete={setShowModalDelete}
                  /> : null
            }
          </Col>
        </Row>
      </Container>
  );
}

export default Quotes;