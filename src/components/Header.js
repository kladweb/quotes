import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import '../bootstrap/bootstrap.min.css';
import ModalPass from "./ModalPass";

// <Navbar collapseOnSelect expand="md" fixed="top" bg="info" data-bs-theme="dark">

function Header() {

  const [allowedAdd, setAllowedAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const addQuote = () => {
    if (!allowedAdd) {
      setShowModal(true);
    }
  }

  return (
    <>
      <Navbar fixed="top" expand="md" bg="info" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">МУДРЫЕ ЦИТАТЫ</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="text-end">
              {/*<Nav.Link href="#deets">More deets</Nav.Link>*/}
              <Nav.Link href="#home">Избранное</Nav.Link>
              <Button variant="light" className='text-info' onClick={addQuote}>Добавить цитату</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalPass showModal={showModal} setShowModal={setShowModal}/>
    </>
  );
}

export default Header;

