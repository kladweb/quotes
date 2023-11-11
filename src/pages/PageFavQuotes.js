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
    <>
      {
        (currUser) ?
          <div className="App bg-body-secondary pb-5">
            <Quotes
              favorite={true}
            />
            <Container>
              <Row>
                <Col sm={'auto'} md={10} lg={8} xxl={7} className="m-auto mt-1 pt-4">
                  <p className='my-3 mx-auto text-center text-secondary'>
                    Вы можете добавить цитату, которой нет в основном списке. После проверки администратором,
                    добавленная Вами цитата может быть внесена в основной список цитат. При этом она останется и в Вашем
                    личном списке. Спасибо!
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
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
            <div className="App bg-body-secondary pt-4 mt-5 text-center">
              <Container className='my-4'>
                <Spinner animation="border" variant="info"/>
              </Container>
            </div>
      }
    </>
  );
}

export default PageMain;