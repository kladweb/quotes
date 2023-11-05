import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useSelector } from 'react-redux';
import { getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

function QuoteUserPanel({editQuote, delQuote, quote, isFavQuote}) {
  const currUser = useSelector(state => state.currUser.currUser);
  // console.log('isFavQuote', isFavQuote);
  // useEffect(() => {
  // }, [isFavQuote]);

  const buttonAdd = <OverlayTrigger
    placement="bottom"
    delay={{show: 200, hide: 200}}
    overlay={<Tooltip id="button-tooltip-add">Добавить в избранное</Tooltip>}
  >
    <Button
      size="sm"
      className="my-0 mx-1 p-0 buttAdd"
      variant="light"
      onClick={() => {
        console.log('Add Fav');
        // addQuoteFav(quote)
      }}>
      <span className="material-icons align-bottom text-warning m-0 p-0">add</span>
    </Button>
  </OverlayTrigger>

  const buttonRem = <OverlayTrigger
    placement="bottom"
    delay={{show: 200, hide: 200}}
    overlay={<Tooltip id="button-tooltip-rem">Убрать из избранного</Tooltip>}
  >
    <Button
      size="sm"
      className="my-0 mx-1 p-0 buttRem"
      variant="light"
      onClick={() => {
        // removeQuoteFav(quote);
        console.log('Remove Fav');
      }}>
      <span className="material-icons align-bottom text-success m-0 p-0">done</span>
    </Button>
  </OverlayTrigger>

  return (
    <>
      {
        (isFavQuote) ?
          <>
            {buttonRem}
          </>
          :
          <>
            {buttonAdd}
          </>
      }
    </>
  );
}

export default QuoteUserPanel;