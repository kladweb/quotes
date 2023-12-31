import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function QuoteAdminPanel({editQuote, delQuote, toAllQuotes, quote, isAdmin}) {

  return (
    <ButtonGroup size="sm" className=''>
      <Button className="m-0 py-0 px-1" variant="outline-warning" onClick={(e) => {
        e.stopPropagation();
        editQuote(quote)
      }}>Edit</Button>
      <Button className="m-0 py-0 px-1" variant="outline-warning" onClick={(e) => {
        e.stopPropagation();
        delQuote(quote)
      }}>Delete</Button>
      {
        (isAdmin) &&
        <Button className="m-0 py-0 px-1" variant="outline-warning" onClick={(e) => {
          e.stopPropagation();
          toAllQuotes(quote);
        }}>To All quotes</Button>
      }
    </ButtonGroup>
  );
}

export default QuoteAdminPanel;