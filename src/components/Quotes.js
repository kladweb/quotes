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
import { useLocation } from 'react-router-dom';

function Quotes({favorite, isAdmin}) {
  const adminId = {
    userId: process.env.REACT_APP_FIREBASE_ADMIN_ID
  };
  // const location = useLocation();
  // console.log(location.pathname);
  const {changeAllQuotes, changeUsersQuotes, changeFavList} = useQuotesService();
  const statusLoad = useSelector(state => state.quotes.dataLoadStatus);
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const dataFavQuotes = useSelector(state => state.quotesFav.quotesFav);
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);
  const currUser = useSelector(state => state.currUser.currUser);
  const dataQuotesIdFav = useSelector(state => state.quotesIdFav.quotesIdFav);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [activeQuote, setActiveQuote] = useState({});
  const [currentQuote, setCurrentQuote] = useState(false);
  const [showEnterQuote, setShowEnterQuote] = useState(false);
  // const [idCurrUser, setIdCurrUser] = useState(null);
  const [dataQuotesView, setDataQuotesView] = useState([]);
  const [numberQuotes, setNumberQuotes] = useState(8);

  useEffect(() => {
    const handlerScroll = () => {
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
        setNumberQuotes(prevState => prevState + 5);
      }
    }
    window.addEventListener('scroll', handlerScroll);
    return () => {
      window.removeEventListener('scroll', handlerScroll);
    }
  }, []);

  useEffect(() => {
    const currentQuotes = (favorite) ? dataFavQuotes : dataQuotes;
    setDataQuotesView(currentQuotes.slice(0, numberQuotes));
  }, [statusLoad, numberQuotes, dataQuotes, dataFavQuotes, dataQuotesUsers]);

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
    let idFav = false;
    dataFavQuotes.forEach((favQuote) => {
      if (favQuote.id === quote.id) {
        idFav = true;
      }
    });
    return idFav;
  }

  const countSub = (quote) => {
    let count = 0;
    if (dataQuotesIdFav) {
      dataQuotesIdFav.forEach((quoteFav) => {
        if (quoteFav.id === quote.id) {
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

  return (
    <Container className='text-center'>
      <Row>
        <Col sm={'auto'} md={10} lg={8} xxl={7} className="mx-auto mt-4 pt-1">
          {
            (statusLoad === 'loaded') ?
              <div className='my-5'>
                {
                  dataQuotesView.map(quote =>
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
                      isUserAdmin={currUser?.uid === adminId.userId}
                      isAdmin={isAdmin}
                    />)
                }
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
            (currUser?.uid === adminId.userId || favorite) &&
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