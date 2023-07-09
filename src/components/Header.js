import {useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


import NavDropdown from 'react-bootstrap/NavDropdown';

import '../bootstrap/bootstrap.min.css';
import ModalPass from "./ModalPass";
import ModalEnterQuote from "./ModalEnterQuote";

// <Navbar collapseOnSelect expand="md" fixed="top" bg="info" data-bs-theme="dark">

function Header() {

    const [allowedAdd, setAllowedAdd] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEnterQuote, setShowEnterQuote] = useState(false);
    const addQuote = () => {
        if (allowedAdd) {
            setShowEnterQuote(true);
        } else {
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
                            <Nav.Link href="#home">Избранное</Nav.Link>
                            <Button variant="light" className='text-info' onClick={addQuote}>Добавить цитату</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalPass
                showModal={showModal}
                setShowModal={setShowModal}
                setAllowedAdd={setAllowedAdd}
                setShowEnterQuote={setShowEnterQuote}
            />
            <ModalEnterQuote showEnterQuote={showEnterQuote} setShowEnterQuote={setShowEnterQuote}/>
        </>
    );
}

export default Header;

