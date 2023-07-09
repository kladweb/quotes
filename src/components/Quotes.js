import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import '../bootstrap/bootstrap.min.css';

import Quote from "./Quote";
import useQuotesService from "../services/QuotesService";
import { quotesFetching, quotesFetched, quotesFetchingError } from '../redux/quotesSlise';

function Quotes() {

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

  const quotesList = dataQuotes.map(quote =>
      <Quote
          key={quote.id}
          quote={quote.quote}
          author={quote.author}
      />);

  return (
      <Container>
        <Row>
          <Col sm={'auto'} md={10} lg={8} xxl={7} className="m-auto mt-5 pt-5">
            {
              (statusLoad === 'loaded') ? quotesList :
                  <div className="mt-3 text-center">
                    <Spinner animation="border" variant="info"/>
                  </div>
            }
          </Col>
        </Row>
      </Container>
  );
}

export default Quotes;