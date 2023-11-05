import React, { useEffect } from 'react';
import { collection, doc, limit, query, setDoc, where, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase/firebase';
import Card from 'react-bootstrap/Card';
import '../bootstrap/bootstrap.min.css';

import QuoteAdminPanel from './QuoteAdminPanel'
import QuoteUserPanel from './QuoteUserPanel';

import './quote.scss';

const Quote = ({quote, delQuote, editQuote, isFavQuote}) => {
  let isAdmin = true;

  let isLogin = true;
  return (
    <Card className="m-auto mt-3 cardQuote" border="info">
      {
        (isAdmin) &&
        <div className='z-0 m-1 d-block position-absolute fixed-bottom'>
          {/*<QuoteAdminPanel editQuote={editQuote} delQuote={delQuote} quote={quote}/>*/}
          <QuoteUserPanel
            editQuote={editQuote}
            delQuote={delQuote}
            quote={quote}
            isFavQuote={isFavQuote}
          />
        </div>
      }
      <Card.Body>
        <Card.Text className="mb-2" style={{textIndent: '2rem'}}>
          {quote.quote}
        </Card.Text>
        <Card.Text className="fst-italic text-end">
          {quote.author}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default React.memo(Quote);