import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import '../bootstrap/bootstrap.min.css';
import { useStorage } from '../firebase/storage';

import './header.scss';

function Header() {
  const {initUser, initAppData} = useStorage();
  const currUser = useSelector(state => state.currUser.currUser);
  let srcAvatar = null;
  if (currUser) {
    srcAvatar = currUser.photoURL;
  }

  useEffect(() => {
    initUser();
    initAppData();
  }, []);

  return (
    <>
      <Navbar fixed="top" expand="md" bg="info" data-bs-theme="dark" className='z-2 navbar-quotes'>
        <Container>
          <LinkContainer to={'/main'}>
            <Navbar.Brand>
              <div className='quotes-fav-nav'>МУДРЫЕ ЦИТАТЫ</div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="text-center align-items-center">
              <LinkContainer to={'/main'}>
                <Nav.Link className='my-0 mx-2 p-0' eventKey="main">
                  <div className='quotes-fav-nav'>Основной список</div>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/myquotes'}>
                <Nav.Link className='my-0 mx-2 p-0' eventKey="myquotes">
                  <div className='quotes-fav-nav'>Избранные цитаты</div>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/login'}>
                <Nav.Link eventKey="login" className='my-0 mx-2 p-0'>
                  {
                    (currUser) ?
                      <Image src={srcAvatar} width={40} height={40} rounded/>
                      :
                      (currUser === 0) ?
                        <div className="mx-1">
                          <Spinner animation="border" variant="light"/>
                        </div>
                        :
                        <div>Войти</div>
                  }
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;