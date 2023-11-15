import { useSelector } from 'react-redux';
import Quote from './Quote';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ModalEditQuote from './ModalEditQuote';
import ModalDeleteQuote from './ModalDeleteQuote';
import ModalEnterQuote from './ModalEnterQuote';


function QuotesAdmin() {
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);
  console.log(dataQuotesUsers);

  return (
    <Container className='text-center'>
      <Row>
        <Col sm={'auto'} md={10} lg={8} xxl={7} className="mx-auto mt-4 pt-1">
          {quotesUsersList}
        </Col>
      </Row>
    </Container>
  );

}

export default QuotesAdmin;