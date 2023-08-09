import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { uid } from 'uid';

import { useQuotesChange } from '../services/QuotesChangeService';
import HintAuthors from './HintAuthors';

function ModalEnterQuote({showEnterQuote, setShowEnterQuote}) {
  const {changeQuotes} = useQuotesChange();

  const [newQuote, setNewQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleClose = () => {
    setShowEnterQuote(false);
  }
  const checkForm = () => {
    setShowEnterQuote(false);
    if (newQuote !== null && author !== null) {
      if (newQuote.trim() !== '' && author.trim() !== '') {
        addQuote();
      }
    }
  }

  const addQuote = () => {
    let newQuoteObj = {
      id: uid(),
      quote: newQuote,
      author: author
    }
    changeQuotes(newQuoteObj, 'add');
  }

  const onSetAuthor = (e) => {
    setAuthor(e.target.value);
  }

  return (
    <Modal show={showEnterQuote} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление новой цитаты</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='formQuotes'>
          <FloatingLabel controlId="ControlTextarea1" label="Цитата:" className="mb-3">
            <Form.Control
              as='textarea'
              type='input'
              placeholder="Цитата:"
              style={{height: '10rem'}}
              onChange={(e) => setNewQuote(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="ControlTextarea2" label="Автор:">
            <Form.Control
              type="text"
              placeholder="Автор:"
              onChange={onSetAuthor}
              className="form-control"
              list="datalistOptions"
            />
            <HintAuthors author={author}/>
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