import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import '../bootstrap/bootstrap.min.css';

import Quote from './Quote';
import useQuotesService from '../services/QuotesLoadSaveService';
// import { quotesFetching, quotesFetched, quotesFetchingError } from '../redux/quotesSlise';
// import { setQuotesIdFav } from '../redux/quotesIdFavSlice';
import ModalEditQuote from './ModalEditQuote';
import ModalDeleteQuote from './ModalDeleteQuote'
// import { useStorage } from '../firebase/storage';

import './quotes.scss';

function Quotes({favorite}) {
  const dispatch = useDispatch();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [activeQuote, setActiveQuote] = useState({});

  const [parameter, setParameter] = useState(false);

  const statusLoad = useSelector(state => state.quotes.dataLoadStatus);
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);
  const currUser = useSelector(state => state.currUser.currUser);
  const dataQuotesIdFav = useSelector(state => state.quotesIdFav.quotesIdFav);


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
  console.log('dataQuotesUserCurrent', dataQuotesUserCurrent);

  const {loading, error, getQuotes, saveQuotes} = useQuotesService(dispatch);


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

  const changeParameter = (quoteWithPanel) => {
    setParameter(quoteWithPanel);
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
        changeParameter={changeParameter}
        isAdmPanel={quote === parameter}
      />
      :
      null);

  return (
    <Container>
      <Row>
        <Col sm={'auto'} md={10} lg={8} xxl={7} className="m-auto mt-4 pt-2">
          {
            (statusLoad === 'loaded') ? quotesList :
              <div className="mt-3 text-center">
                <Spinner animation="border" variant="info"/>
              </div>
          }
          {
            (showModalEdit) ?
              <ModalEditQuote
                quote={activeQuote}
                showModalEdit={showModalEdit}
                setShowModalEdit={setShowModalEdit}
              /> : null
          }
          {
            (showModalDelete) ?
              <ModalDeleteQuote
                quote={activeQuote}
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
              /> : null
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Quotes;