import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useStorage } from '../firebase/storage';

function QuoteUserPanel({quote, isFavQuote, countSub}) {
  const {addFavQuote, removeFavQuote} = useStorage();
  const currUser = useSelector(state => state.currUser.currUser);
  const navigate = useNavigate();

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
        if (currUser) {
          addFavQuote(quote);
        } else {
          navigate('/myquotes');
          return;
        }
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
        removeFavQuote(quote);
        console.log('Remove Fav');
      }}>
      <span className="material-icons align-bottom text-success m-0 p-0">done</span>
    </Button>
  </OverlayTrigger>

  const showCount = <> {
    (countSub) ?
      <OverlayTrigger
        placement="bottom"
        delay={{show: 200, hide: 200}}
        overlay={<Tooltip id="button-tooltip-count">Количество добавивших</Tooltip>}
      >
        <p className='d-inline-block my-0 p-0 align-middle text-secondary count'>{countSub}</p>
      </OverlayTrigger>
      :
      null
  }
  </>

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
      {showCount}
    </>
  );
}

export default QuoteUserPanel;