import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Quote from './Quote';
import ModalEditQuote from './ModalEditQuote';
import ModalDeleteQuote from './ModalDeleteQuote'
import ModalEnterQuote from './ModalEnterQuote';
import '../bootstrap/bootstrap.min.css';
import './quotes.scss';
import { useQuotesService } from '../services/quotesLoadSaveService';

function Quotes({favorite, isAdmin}) {
  const adminId = {
    userId: process.env.REACT_APP_FIREBASE_ADMIN_ID
  };
  const {changeAllQuotes, changeUsersQuotes, changeFavList} = useQuotesService();
  const statusLoad = useSelector(state => state.quotes.dataLoadStatus);
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);
  const currUser = useSelector(state => state.currUser.currUser);
  const dataQuotesIdFav = useSelector(state => state.quotesIdFav.quotesIdFav);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [activeQuote, setActiveQuote] = useState({});
  const [currentQuote, setCurrentQuote] = useState(false);
  const [showEnterQuote, setShowEnterQuote] = useState(false);
  const [idCurrUser, setIdCurrUser] = useState(null);
  const [dataQuotesAll, setDataQuotesAll] = useState([]);

  useEffect(() => {
    let dataQuotesUserCurrent = [];
    if (currUser) {
      setIdCurrUser(currUser.uid);
      dataQuotesUsers.forEach((quote) => {
        if (quote.userAdded === idCurrUser || isAdmin) {
          dataQuotesUserCurrent.push(quote);
        }
      });
    }
    if (!isAdmin) {
      setDataQuotesAll([...dataQuotes, ...dataQuotesUserCurrent]);
    } else {
      setDataQuotesAll(dataQuotesUserCurrent);
    }
  }, [statusLoad]);

  const onDeleteQuote = (quote) => {
    setShowModalDelete(true);
    setActiveQuote(quote);
  }

  const onEditQuote = (quote) => {
    setShowModalEdit(true);
    setActiveQuote(quote);
  }

  const onToAllQuotes = (quote) => {
    changeAllQuotes(quote, 'add');
    changeFavList(quote, dataQuotesIdFav, 'add');
    changeUsersQuotes(quote, 'delete');
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
        toAllQuotes={onToAllQuotes}
        isFavQuote={isFavQuote(quote)}
        countSub={countSub(quote)}
        changeCurrentQuote={changeParameter}
        isAdmPanel={quote === currentQuote}
        isUserAdmin={idCurrUser === adminId.userId}
        isAdmin={isAdmin}
      />
      :
      null).reverse();

  console.log('render')
  return (
    <Container className='text-center'>
      <Row>
        <Col sm={'auto'} md={10} lg={8} xxl={7} className="mx-auto mt-4 pt-1">
          {
            (statusLoad === 'loaded') ?
              <div className='my-5'>
                {quotesList}
              </div>
              :
              <div className='mt-4 pt-5'>
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
                favorite={favorite}
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
              className='text-info mx-auto d-block my-5 w-auto add-quote'
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