import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function QuoteAdminPanel({editQuote, delQuote, quote}) {

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
    </ButtonGroup>
  );
}

export default QuoteAdminPanel;