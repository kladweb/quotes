import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../bootstrap/bootstrap.min.css';
import QuoteAdminPanel from './QuoteAdminPanel'
import QuoteUserPanel from './QuoteUserPanel';
import { useStorage } from '../firebase/storage';

const Quote = ({quote, delQuote, editQuote, isFavQuote, countSub, isAdmPanel, changeParameter}) => {

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  let isAdmin = true;
  let isLogin = true;
  const handlerShowAdminPanel = (e) => {
    if (showAdminPanel) {
      changeParameter(null);
    } else {
      changeParameter(quote);
    }
  }

  useEffect(() => {
    setShowAdminPanel(isAdmPanel);
  }, [isAdmPanel]);

  console.log('QUOTE');

  return (
    <Card
      className="m-auto mt-3 cardQuote"
      border={(quote.userAdded) ? "warning" : "info"}
      onClick={handlerShowAdminPanel}
    >
      <div className='z-0 m-1 d-block position-absolute fixed-bottom'>
        {
          (quote.userAdded) ?
            (showAdminPanel) &&
            <QuoteAdminPanel
              editQuote={editQuote}
              delQuote={delQuote}
              quote={quote}
            />

            :
            <QuoteUserPanel
              quote={quote}
              isFavQuote={isFavQuote}
              countSub={countSub}
            />
        }
      </div>
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

export default React.memo(Quote, propsAreEqual);

function propsAreEqual(prevProps, nextProps) {
  return prevProps.isAdmPanel === nextProps.isAdmPanel &&
    prevProps.quote === nextProps.quote;
}