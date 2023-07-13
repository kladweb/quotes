import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function QuoteAdminPanel({editQuote, delQuote, quote}) {

  return (
      <ButtonGroup size="sm" className='z-0 m-1 d-block position-absolute fixed-bottom'>
        <Button variant="outline-warning" onClick={() => {
          editQuote(quote)
        }}>Edit</Button>
        <Button variant="outline-warning" onClick={() => {
          delQuote(quote)
        }}>Delete</Button>
      </ButtonGroup>
  );
}

export default QuoteAdminPanel;