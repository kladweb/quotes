import {useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import '../bootstrap/bootstrap.min.css';
import ModalPass from "./ModalPass";
import ModalEnterQuote from "./ModalEnterQuote";
import ModalJson from "./ModalJson";

function Header({isAdmin, setIsAdmin}) {

    const [showModalPass, setShowModalPass] = useState(false);
    const [showEnterQuote, setShowEnterQuote] = useState(false);
    const [showModalJson, setShowModalJson] = useState(false);
    const addQuote = () => {
        if (isAdmin) {
            setShowEnterQuote(true);
        } else {
            setShowModalPass(true);
        }
    }

    return (
        <>
            <Navbar fixed="top" expand="md" bg="info" data-bs-theme="dark" className='z-3'>
                <Container>
                    <Navbar.Brand href="#home">МУДРЫЕ ЦИТАТЫ</Navbar.Brand>
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
            />
            <ModalEnterQuote showEnterQuote={showEnterQuote} setShowEnterQuote={setShowEnterQuote}/>
            <ModalJson
                showModalJson={showModalJson}
                setShowModalJson={setShowModalJson}
            />
        </>
    );
}

export default Header;

