import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Figure from 'react-bootstrap/Figure';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../bootstrap/bootstrap.min.css';
import ModalPass from './ModalPass';
import ModalEnterQuote from './ModalEnterQuote';
import ModalJson from './ModalJson';

import authGoogle from '../firebase/auth';

import './header.scss';

function Header() {
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.currUser.currUser);
  let srcAvatar = null;
  if (currUser) {
    srcAvatar = currUser.photoURL;
  }

  // const [showModalPass, setShowModalPass] = useState(false);
  // const [showEnterQuote, setShowEnterQuote] = useState(false);
  // const [showModalJson, setShowModalJson] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  console.log(srcAvatar);

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
            <Nav className="text-center align-items-center">
              <LinkContainer to={'/myquotes'}>
                <Nav.Link className='my-0 mx-2 p-0' eventKey="link-2">Избранные цитаты</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/login'}>
                <Nav.Link eventKey="login" className='my-0 mx-2 p-0'>
                  {
                    (currUser) ?
                      <Figure className='m-0 p-0 d-inline-block'>
                        <Figure.Image
                          className='m-0 p-0 d-inline-block'
                          width={40}
                          height={40}
                          alt="avatar"
                          src={srcAvatar}
                        />
                      </Figure>
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