import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../bootstrap/bootstrap.min.css';
import ModalPass from './ModalPass';
import ModalEnterQuote from './ModalEnterQuote';
import ModalJson from './ModalJson';

import authGoogle from '../firebase/auth';

import './header.scss';

function Header() {

  const [showModalPass, setShowModalPass] = useState(false);
  const [showEnterQuote, setShowEnterQuote] = useState(false);
  const [showModalJson, setShowModalJson] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <Navbar fixed="top" expand="md" bg="info" data-bs-theme="dark" className='z-2'>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>
              МУДРЫЕ ЦИТАТЫ
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="text-center">
              <LinkContainer to={'/myquotes'}>
                <Nav.Link eventKey="link-2">Избранные цитаты</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/login'}>
                <Nav.Link eventKey="login">Войти</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;