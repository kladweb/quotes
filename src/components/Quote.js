import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import '../bootstrap/bootstrap.min.css';

import QuoteAdminPanel from './QuoteAdminPanel'

const Quote = ({quote, delQuote, editQuote}) => {
  let isLogin = useSelector(state => state.isLogin.isLogin);
  return (
    <Card className="m-auto mt-3 cardQuote" border="info">
      {
        (isLogin) &&
        <QuoteAdminPanel editQuote={editQuote} delQuote={delQuote} quote={quote}/>
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