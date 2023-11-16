import React from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

import Quotes from '../components/Quotes';
import Spinner from 'react-bootstrap/Spinner';

function PageMain() {
  const currUser = useSelector(state => state.currUser.currUser);

  return (
    <div className="App bg-body-secondary">
      <Container>
        <h3 className='mt-5 mb-0 p-0 text-center text-info head-fav'>Избранные цитаты</h3>
      </Container>
      {
        (currUser) ?
          <>
            <Quotes
              favorite={true}
            />
            <Container>
              <Row>
                <Col sm={'auto'} md={10} lg={8} xxl={7} className="mx-auto">
                  <p className='mx-auto mb-4 mb-sm-5 text-center text-secondary fav-note'>
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
            // <div className='App bg-body-secondary pb-5 text-center'>
            <Container className='text-center'>
              <LinkContainer to={'/login'} className='d-inline-block'>
                <Nav.Link
                  className='my-5 mx-auto text-center text-info need-login'
                  eventKey="link-2"
                >
                  Сначала нужно залогиниться!
                </Nav.Link>
              </LinkContainer>
            </Container>
            // </div>
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