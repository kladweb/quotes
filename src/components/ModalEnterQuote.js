import {useState} from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useDispatch, useSelector} from "react-redux";
import {uid} from 'uid';
import useQuotesService from "../services/QuotesService";
import {quotesFetched} from "../redux/quotesSlise";

function ModalEnterQuote({showEnterQuote, setShowEnterQuote}) {

    const dispatch = useDispatch();
    const dataQuotes = useSelector(state => state.quotes.quotes);
    const [newQuote, setNewQuote] = useState(null);
    const [author, setAuthor] = useState(null);

    const {loading, error, getQuotes, saveQuotes} = useQuotesService(dispatch);

    const handleClose = () => {
        setShowEnterQuote(false);
    }
    const checkForm = () => {
        setShowEnterQuote(false);
        if (newQuote !== '' && author !== '') {
            addQuote();
        }
    }

    const addQuote = () => {
        let newQuotes = [...dataQuotes];
        let newQuoteObj = {
            id: uid(),
            quote: newQuote,
            author: author
        }
        newQuotes.push(newQuoteObj);
        console.log(newQuotes);
        dispatch(quotesFetched({quotes: newQuotes, dataLoadStatus: 'loaded'}));
        saveQuotes(newQuotes)
            .then(() => {
                console.log('Успешно сохранено');
            })
            .catch(() => {
                console.log('Ошибка сохранения');
            });
    }

    return (
        <Modal show={showEnterQuote} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление новой цитаты</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel controlId="ControlTextarea1" label="Цитата:" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Цитата:"
                            style={{height: '10rem'}}
                            onChange={(e) => setNewQuote(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="ControlTextarea2" label="Автор:">
                        <Form.Control
                            type="text"
                            placeholder="Автор:"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </FloatingLabel>
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

export default ModalEnterQuote;