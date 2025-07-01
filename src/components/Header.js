import React, { useEffect, useState } from 'react';
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
import { Button } from 'react-bootstrap';
import ModalEnterQuote from './ModalEnterQuote';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalInfo from './ModalInfo';

function Header() {
  const adminId = {
    userId: process.env.REACT_APP_FIREBASE_ADMIN_ID
  };
  const location = useLocation();
  const navigate = useNavigate();
  const {initUser, initAppData} = useStorage();
  const currUser = useSelector(state => state.currUser.currUser);
  const srcAvatar = (currUser) ? currUser.photoURL : null;
  const favorite = location.pathname === '/myquotes';
  const [showEnterQuote, setShowEnterQuote] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [info, setInfo] = useState('');

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    initAppData(currUser);
  }, [currUser]);

  const addQuote = () => {
    if (currUser) {
      setShowEnterQuote(true);
    } else {
      navigate('/login');
    }
  }

  return (
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
                <div className='quotes-fav-nav'>Все</div>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/myquotes'}>
              <Nav.Link className='my-0 mx-2 p-0' eventKey="myquotes">
                <div className='quotes-fav-nav'>Избранные</div>
              </Nav.Link>
            </LinkContainer>
            {
              // (currUser?.uid === adminId.userId || favorite) &&
              <Nav.Link className='my-0 mx-2 p-0' onClick={addQuote}>
                <div className='quotes-fav-nav'>Добавить цитату</div>
              </Nav.Link>
            }
            <ModalEnterQuote
              showEnterQuote={showEnterQuote}
              setShowEnterQuote={setShowEnterQuote}
              favorite={favorite}
              setInfo={setInfo}
              setShowModalInfo={setShowModalInfo}
            />
            <ModalInfo
              showModalInfo={showModalInfo}
              setShowModalInfo={setShowModalInfo}
              info={info}
            />
            <LinkContainer to={'/login'}>
              <Nav.Link eventKey="login" className='my-0 mx-2 p-0'>
                {
                  (currUser) ?
                    <Image src={srcAvatar} width={40} height={40} rounded/>
                    :
                    (srcAvatar && srcAvatar === '') ?
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
  );
}

export default Header;
