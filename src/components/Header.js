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

function Header({isAdmin, setIsAdmin}) {

  const [showModalPass, setShowModalPass] = useState(false);
  const [showEnterQuote, setShowEnterQuote] = useState(false);
  const [showModalJson, setShowModalJson] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const addQuote = () => {
    if (isAdmin) {
      setShowEnterQuote(true);
    } else {
      setShowModalPass(true);
    }
  }

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
          <Navbar.Collapse className="justify-content-end-xs" id="responsive-navbar-nav">
            <Nav className="text-end">

              <Nav.Link variant="link" href="/home">Active</Nav.Link>

              <Nav.Item variant="link">
                <Nav.Link eventKey="link-1">Link</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
              </Nav.Item>
              <Button
                variant="link"
                className='text-white text-decoration-none'
                onClick={() => {
                  setShowModalJson(true)
                }}
              >
                Получить JSON
              </Button>
              <Button
                variant="link"
                className='text-white text-decoration-none'
                onClick={authGoogle}
              >
                LOG IN
              </Button>
              <Button
                variant="light"
                className='text-info'
                onClick={addQuote}
              >
                Добавить цитату
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;