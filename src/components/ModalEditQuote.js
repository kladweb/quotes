import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import HintAuthors from './HintAuthors';
import { useStorage } from '../firebase/storage';
import { useQuotesService } from '../services/quotesLoadSaveService';

function ModalEditQuote({quote, showModalEdit, setShowModalEdit, changeParameter, favorite}) {

  const {loadQuotesUsers} = useStorage();
  const {changeAllQuotes, changeUsersQuotes} = useQuotesService();

  const [newQuote, setNewQuote] = useState(quote.quote);
  const [author, setAuthor] = useState(quote.author);
  const [doChange, setDoChange] = useState(false);

  const handleClose = () => {
    changeParameter(null);
    setShowModalEdit(false);
  }

  const checkForm = () => {
    setShowModalEdit(false);
    if (newQuote !== '' && author !== '' && doChange) {
      let newQuoteObj = {};
      if (favorite) {
        newQuoteObj = {
          id: quote.id,
          quote: newQuote,
          author: author,
          userAdded: quote.userAdded,
          userName: quote.displayName
        }
      } else {
        newQuoteObj = {
          id: quote.id,
          quote: newQuote,
          author: author
        }
      }
      if (favorite) {
        loadQuotesUsers()
          .then((data) => {
            changeUsersQuotes(newQuoteObj, 'edit', data);
          });
      } else {
        changeAllQuotes(newQuoteObj, 'edit');
      }
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
            list="datalistOptions"
            defaultValue={quote.author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setDoChange(true);
            }}
          />
          <HintAuthors author={author}/>
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