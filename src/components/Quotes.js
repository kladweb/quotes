import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../bootstrap/bootstrap.min.css';

import Quote from "./Quote";
import useQuotesService from "../services/QuotesService";

const Quotes = () => {

  const [quotes, setQuotes] = useState([]);

  const {loading, error, getQuotes} = useQuotesService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    getQuotes()
    .then(onQuotesLoaded)
  }

  const onQuotesLoaded = (newQuotesList) => {
    setQuotes([...newQuotesList]);
  }

  const quotesList = quotes.map(quote =>
    <Quote
      key={quote.id}
      quote={quote.quote}
      author={quote.author}
    />);

  return (
    <Container>
      <Row>
        <Col sm={'auto'} md={10} lg={8} xxl={7} className="m-auto mt-5 pt-5">
          {quotesList}
        </Col>
      </Row>
    </Container>
  );
}

export default Quotes;