import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

import Quotes from '../components/Quotes';
import ModalEnterQuote from '../components/ModalEnterQuote';
import Spinner from 'react-bootstrap/Spinner';

function PageMain() {
  const currUser = useSelector(state => state.currUser.currUser);

  return (
    <div className="App bg-body-secondary">
      {
        (currUser) ?
          <>
            <Quotes
              favorite={true}
            />
            <Container>
              <Row>
                <Col sm={'auto'} md={10} lg={8} xxl={7} className="mx-auto">
                  <p className='mx-auto text-center text-secondary'>
                    Вы можете добавить цитату, которой нет в основном списке. После проверки администратором,
                    добавленная Вами цитата может быть внесена в основной список цитат. При этом она останется и в Вашем
                    личном списке. Спасибо!
                  </p>
                </Col>
              </Row>
            </Container>
          </>
          :
          (currUser !== 0) ?
            <div className='App bg-body-secondary pb-5 text-center'>
              <Container>
                <LinkContainer to={'/login'} className='d-inline-block'>
                  <Nav.Link
                    className='my-5 mx-auto text-center text-info'
                    eventKey="link-2"
                  >
                    Сначала нужно залогиниться!
                  </Nav.Link>
                </LinkContainer>
              </Container>
            </div>
            :
            <Container className='text-center pt-1 mt-4'>
              <div className="mt-4 pt-5">
                <Spinner animation="border" variant="info"/>
              </div>
            </Container>
      }
    </div>
  );
}

export default PageMain;