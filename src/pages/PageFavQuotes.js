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

  const [showEnterQuote, setShowEnterQuote] = useState(false);

  const addQuote = () => {
    setShowEnterQuote(true);
    console.log('add quote');
  }

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
                <Col sm={'auto'} md={10} lg={8} xxl={7} className="m-auto mt-1 pt-1">
                  <Button
                    variant="light"
                    className='text-info mx-auto d-block my-3 w-auto'
                    onClick={addQuote}
                  >
                    Добавить цитату
                  </Button>
                  <p className='my-3 mx-auto text-center text-secondary'>
                    Вы можете добавить цитату, которой нет в основном списке. После проверки администратором,
                    добавленная Вами цитата может быть внесена в основной список цитат. При этом она останется и в Вашем
                    списке цитат. Спасибо!
                  </p>
                  <ModalEnterQuote
                    showEnterQuote={showEnterQuote}
                    setShowEnterQuote={setShowEnterQuote}
                  />
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
            <div className="d-inline-block text-info mt-5 fw-bold">
              <Container>
                <Spinner animation="border" variant="info"/>
              </Container>
            </div>
      }
    </>
  );
}

export default PageMain;