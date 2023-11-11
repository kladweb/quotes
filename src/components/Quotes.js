import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import '../bootstrap/bootstrap.min.css';

import Quote from './Quote';
// import { quotesFetching, quotesFetched, quotesFetchingError } from '../redux/quotesSlise';
// import { setQuotesIdFav } from '../redux/quotesIdFavSlice';
import ModalEditQuote from './ModalEditQuote';
import ModalDeleteQuote from './ModalDeleteQuote'
// import { useStorage } from '../firebase/storage';

import './quotes.scss';
import ModalEnterQuote from './ModalEnterQuote';

function Quotes({favorite}) {
  const dispatch = useDispatch();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [activeQuote, setActiveQuote] = useState({});

  const [currentQuote, setCurrentQuote] = useState(false);

  const statusLoad = useSelector(state => state.quotes.dataLoadStatus);
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);
  const currUser = useSelector(state => state.currUser.currUser);
  const dataQuotesIdFav = useSelector(state => state.quotesIdFav.quotesIdFav);

  const [showEnterQuote, setShowEnterQuote] = useState(false);

  const adminId = {
    userId: process.env.REACT_APP_FIREBASE_ADMIN_ID
  };

  let idCurrUser = null;
  let dataQuotesUserCurrent = [];
  if (currUser) {
    idCurrUser = currUser.uid;
    dataQuotesUsers.forEach((quote) => {
      if (quote.userAdded === idCurrUser) {
        dataQuotesUserCurrent.push(quote);
      }
    });
  }

  const dataQuotesAll = [...dataQuotes, ...dataQuotesUserCurrent];
  // console.log('dataQuotes', dataQuotes);
  // console.log('dataQuotesUsers', dataQuotesUsers);
  // console.log('dataQuotesAll', dataQuotesAll);

  // dataQuotesAll.push(dataQuotes);
  // dataQuotesAll.push(dataQuotesUsers);

  // useEffect(() => {
  //   if (statusLoad !== 'loaded') {
  //     getQuotes()
  //       .then((data) => {
  //         dispatch(quotesFetched({quotes: data, dataLoadStatus: 'loaded'}));
  //       });
  //   }
  // }, [dataQuotes, dataQuotesUsers]);

  const onDeleteQuote = (quote) => {
    setShowModalDelete(true);
    setActiveQuote(quote);
  }

  const onEditQuote = (quote) => {
    setShowModalEdit(true);
    setActiveQuote(quote);
  }

  const isFavQuote = (quote) => {
    let isFav = false;
    const idQuote = quote.id;
    if (dataQuotesIdFav) {
      dataQuotesIdFav.forEach((quoteFav) => {
        if (quoteFav.id === idQuote) {
          if (quoteFav.usersArr && quoteFav.usersArr.includes(idCurrUser)) {
            isFav = true;
          }
        }
      });
    }
    return isFav;
  }

  const countSub = (quote) => {
    let count = 0;
    const idQuote = quote.id;
    if (dataQuotesIdFav) {
      dataQuotesIdFav.forEach((quoteFav) => {
        if (quoteFav.id === idQuote) {
          count = quoteFav.usersArr.length;
        }
      });
    }
    return count;
  }

  const changeParameter = (currentQuote) => {
    setCurrentQuote(currentQuote);
  }

  const addQuote = () => {
    setShowEnterQuote(true);
    console.log('add quote');
  }

  const quotesList = dataQuotesAll.map(quote =>
    ((isFavQuote(quote) && !quote.userAdded) ||
      (!favorite && !quote.userAdded) ||
      (favorite && quote.userAdded)) ?
      <Quote
        key={quote.id}
        quote={quote}
        delQuote={onDeleteQuote}
        editQuote={onEditQuote}
        isFavQuote={isFavQuote(quote)}
        countSub={countSub(quote)}
        changeCurrentQuote={changeParameter}
        isAdmPanel={quote === currentQuote}
        isUserAdmin={idCurrUser === adminId.userId}
      />
      :
      null);

  return (
    <Container>
      <Row>
        <Col sm={'auto'} md={10} lg={8} xxl={7} className="m-auto mt-4 pt-1">
          {
            (statusLoad === 'loaded') ? quotesList :
              <div className="App bg-body-secondary mt-4 pt-3 text-center">
                <Spinner animation="border" variant="info"/>
              </div>
          }
          {
            (showModalEdit) ?
              <ModalEditQuote
                quote={activeQuote}
                showModalEdit={showModalEdit}
                setShowModalEdit={setShowModalEdit}
                changeParameter={changeParameter}
              /> : null
          }
          {
            (showModalDelete) ?
              <ModalDeleteQuote
                quote={activeQuote}
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                changeParameter={changeParameter}
                favorite={favorite}
              /> : null
          }
          {
            (idCurrUser === adminId.userId || favorite) &&
            <Button
              variant="light"
              className='text-info mx-auto d-block mt-5 w-auto'
              onClick={addQuote}
            >
              Добавить цитату
            </Button>
          }
          <ModalEnterQuote
            showEnterQuote={showEnterQuote}
            setShowEnterQuote={setShowEnterQuote}
            favorite={favorite}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Quotes;