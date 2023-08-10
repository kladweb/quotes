import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { uid } from 'uid';

import { useQuotesChange } from '../services/QuotesChangeService';
import HintAuthors from './HintAuthors';
import checkQuote from '../utilites/checkQuote';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

function ModalEnterQuote({showEnterQuote, setShowEnterQuote}) {

  const dataQuotes = useSelector(state => state.quotes.quotes);
  const {changeQuotes} = useQuotesChange();

  const [newQuote, setNewQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [sameQuote, setSameQuote] = useState('');
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setValidated(false);
    setShowEnterQuote(false);
    setNewQuote('');
    setAuthor('');
  }
  const checkForm = (event) => {
    if (newQuote.trim() !== '' && author.trim() !== '') {
      addQuote();
      setShowEnterQuote(false);
      setNewQuote('');
      setAuthor('');
    } else {
      setValidated(true);
    }
  }

  const addQuote = () => {
    let newQuoteObj = {
      id: uid(),
      quote: ucFirst(newQuote),
      author: ucFirst(author)
    }
    changeQuotes(newQuoteObj, 'add');
  }

  const onSetAuthor = (e) => {
    setValidated(false);
    if (e.target.value.trim() === '') {
      setAuthor('');
    } else {
      setAuthor(e.target.value);
    }
  }

  const onSetNewQuote = (e) => {
    setValidated(false);
    if (e.target.value.trim() === '') {
      setNewQuote('');
    } else {
      setNewQuote(e.target.value);
    }
    if (e.target.value.length > 20) {
      checkQuote(e.target.value, dataQuotes, setSameQuote)
    } else {
      setSameQuote('');
    }
  }

  function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <Modal show={showEnterQuote}>
      <Modal.Header>
        <Modal.Title>Добавление новой цитаты</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='formQuotes' validated={validated} noValidate>
          <FloatingLabel controlId="ControlTextarea1" label="Цитата:" className="mb-3">
            <Form.Control
              required
              value={newQuote}
              as='textarea'
              type='input'
              placeholder="Цитата:"
              style={{height: '10rem'}}
              onChange={onSetNewQuote}
              onBlur={() => {
                setSameQuote('');
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="ControlTextarea2" label="Автор:">
            <Form.Control
              required
              value={author}
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
      {
        (sameQuote) &&
        <Alert className='position-absolute mx-3 my-1 z-3 lh-1 top-100 shadow' variant='warning'>
          <h6>Похожая цитата уже существует в списке:</h6>
          {sameQuote}
        </Alert>
      }
    </Modal>
  )
    ;
}

export default ModalEnterQuote;