import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../bootstrap/bootstrap.min.css';
import ModalPass from './ModalPass';
import ModalEnterQuote from './ModalEnterQuote';
import ModalJson from './ModalJson';

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
          <Navbar.Brand href="#">МУДРЫЕ ЦИТАТЫ</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="text-end">
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
                onClick={addQuote}
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
      <ModalPass
        showModalPass={showModalPass}
        setShowModalPass={setShowModalPass}
        setAllowedAdd={setIsAdmin}
        setShowEnterQuote={setShowEnterQuote}
        setShowAlert={setShowAlert}
      />
      <ModalEnterQuote showEnterQuote={showEnterQuote} setShowEnterQuote={setShowEnterQuote}/>
      <ModalJson
        showModalJson={showModalJson}
        setShowModalJson={setShowModalJson}
      />
      {
        (showAlert) &&
        <Alert
          className='alert-pass position-fixed z-3 m-auto lh-1 top-50 start-50 translate-middle shadow'
          variant='danger'
        >
          Пароль неверный !
        </Alert>
      }
    </>
  );
}

export default Header;