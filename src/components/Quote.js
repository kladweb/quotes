import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../bootstrap/bootstrap.min.css';
import QuoteAdminPanel from './QuoteAdminPanel'
import QuoteUserPanel from './QuoteUserPanel';

const Quote = ({
                 quote,
                 delQuote,
                 editQuote,
                 toAllQuotes,
                 isFavQuote,
                 countSub,
                 isAdmPanel,
                 changeCurrentQuote,
                 isUserAdmin,
                 isAdmin
               }) => {

  const handlerShowAdminPanel = (e) => {
    console.log(isUserAdmin);
    if (!quote.userAdded && !isUserAdmin) {
      changeCurrentQuote(null);
      return;
    }
    if (isAdmPanel) {
      changeCurrentQuote(null);
    } else {
      changeCurrentQuote(quote);
    }
  }

  useEffect(() => {
  }, [isAdmPanel]);

  return (
    <>
      {
        (isAdmin) && <h5 className='text-info m-0 p-0'>{quote.userName}</h5>
      }
      <Card
        className="my-3 text-start cardQuote"
        border={(quote.userAdded) ? "warning" : "info"}
        onClick={handlerShowAdminPanel}
      >
        <div className='z-0 m-1 d-block position-absolute fixed-bottom'>
          {
            (!quote.userAdded) &&
            <QuoteUserPanel
              quote={quote}
              isFavQuote={isFavQuote}
              countSub={countSub}
            />
          }
          {
            (isAdmPanel) &&
            <QuoteAdminPanel
              editQuote={editQuote}
              delQuote={delQuote}
              toAllQuotes={toAllQuotes}
              quote={quote}
              isAdmin={isAdmin}
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
    </>
  );
}

export default React.memo(Quote, propsAreEqual);

function propsAreEqual(prevProps, nextProps) {
  return prevProps.isAdmPanel === nextProps.isAdmPanel &&
    prevProps.quote === nextProps.quote &&
    prevProps.countSub === nextProps.countSub &&
    prevProps.isFavQuote === nextProps.isFavQuote;
}