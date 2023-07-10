import {useState} from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalEditQuote({quote, showModalEdit, setShowModalEdit, changeQuotes}) {

    const [newQuote, setNewQuote] = useState(quote.quote);
    const [author, setAuthor] = useState(quote.author);
    const [doChange, setDoChange] = useState(false);

    console.log('newQuote', newQuote);
    console.log('author', author);

    const handleClose = () => {
        setShowModalEdit(false);
    }

    const checkForm = () => {
        setShowModalEdit(false);
        if (newQuote !== '' && author !== '' && doChange) {
            let newQuoteObj = {
                id: quote.id,
                quote: newQuote,
                author: author
            }
            changeQuotes(newQuoteObj, 'edit');
        }
    }

    return (
        <Modal show={showModalEdit} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование цитаты</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className='fst-italic'>Цитата:</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue={quote.quote}
                        style={{height: '10rem'}}
                        onChange={(e) => {
                            setNewQuote(e.target.value);
                            setDoChange(true);
                        }}
                    />
                    <Form.Label className='mt-2 fst-italic'>Автор:</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={quote.author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                            setDoChange(true);
                        }}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" className='bg-white' onClick={handleClose}>
                    Закрыть
                </Button>
                <Button type="submit" variant="info" className='text-white' onClick={checkForm}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditQuote;