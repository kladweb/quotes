import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { uid } from 'uid';

import HintAuthors from './HintAuthors';
import checkQuote from '../utilites/checkQuote';
import { setQuotesUsers } from '../redux/quotesUsersSlice';
import { useStorage } from '../firebase/storage';

function ModalEnterQuote({showEnterQuote, setShowEnterQuote, favorite}) {

  const dispatch = useDispatch();
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);
  const currUser = useSelector(state => state.currUser.currUser);
  const idCurrUser = useSelector(state => state.currUser.idCurrUser);
  const {loadQuotesUsers, addQuoteToAll, changeUsersQuotes} = useStorage();

  const [newQuote, setNewQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [linkInfo, setLinkInfo] = useState('');
  const [sameQuote, setSameQuote] = useState('');
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setValidated(false);
    setShowEnterQuote(false);
    setNewQuote('');
    setAuthor('');
  }
  const checkForm = () => {
    if (newQuote.trim() !== '' && author.trim() !== '') {
      if (favorite) {
        addQuoteFav();
      } else {
        addQuoteAll();
      }
      setShowEnterQuote(false);
      setNewQuote('');
      setAuthor('');
      setLinkInfo('');
    } else {
      setValidated(true);
    }
  }

  function addQuoteAll() {
    let newQuoteObj = {
      id: uid(),
      quote: ucFirst(newQuote),
      author: ucFirst(author),
    }
    const dataQuotesNew = dataQuotes.map((quote) => {
      console.log('quote', quote);
      const newQuote = {};
      newQuote.id = quote.id;
      newQuote.quote = quote.quote;
      newQuote.author = quote.author;
      return newQuote;
    });
    dataQuotesNew.push(newQuoteObj);
    console.log('dataQuotesNew', dataQuotesNew);
    addQuoteToAll(newQuoteObj);
  }

  function addQuoteFav() {
    let newQuoteObj = {
      id: uid(),
      quote: ucFirst(newQuote),
      author: ucFirst(author),
      userAdded: idCurrUser,
      userName: currUser.displayName,
      linkInfo: (linkInfo) ? linkInfo : 'нет данных об источнике',
    }
    // const dataQuotesUsersNew = dataQuotesUsers.map((quote) => {
    //   console.log('quote', quote);
    //   const newQuote = {};
    //   newQuote.id = quote.id;
    //   newQuote.quote = quote.quote;
    //   newQuote.author = quote.author;
    //   newQuote.userAdded = quote.userAdded;
    //   newQuote.userName = quote.userName;
    //   newQuote.linkInfo = quote.linkInfo;
    //   return newQuote;
    // });
    // dataQuotesUsersNew.push(newQuoteObj);
    // console.log('dataQuotesNew', dataQuotesUsersNew);
    loadQuotesUsers()
      .then((data) => {
        changeUsersQuotes(newQuoteObj, 'add', data);
      })

    // addFavQuote(newQuoteObj);
    // updateQuotesUser(dataQuotesUsersNew)
    //   .then(() => {
    //     dispatch(setQuotesUsers({quotesUsers: dataQuotesUsersNew}));
    //   });
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
          <FloatingLabel label="Цитата:" className="mb-3">
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
          <FloatingLabel label="Автор:">
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
          <FloatingLabel label="Ссылка на источник (необязательно):">
            <Form.Control
              value={linkInfo}
              type="text"
              placeholder="Ссылка на источник:"
              onChange={(e) => {
                setLinkInfo(e.target.value);
              }}
              className="my-3"
              // list="datalistOptions"
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" className='bg-white' onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="info" className='text-white' onClick={checkForm}>
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
  );
}

export default ModalEnterQuote;
