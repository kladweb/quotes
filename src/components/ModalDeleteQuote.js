import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useQuotesService } from '../services/quotesLoadSaveService';
import { quotesFavFetched } from '../redux/quotesFavSlise';

function ModalDeleteQuote({showModalDelete, setShowModalDelete, quote, changeParameter}) {

  const {changeAllQuotes, changeUsersQuotes} = useQuotesService();
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);
  const handleClose = () => {
    changeParameter(null);
    setShowModalDelete(false);
  }
  const checkForm = () => {
    setShowModalDelete(false);
    if (quote.userAdded) {
      changeUsersQuotes(quote, 'delete', dataQuotesUsers);
    } else {
      changeAllQuotes(quote, 'delete');
    }
  }

  return (
    <Modal className='my-5' show={showModalDelete} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='fs-5'>Вы действительно хотите удалить цитату ?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="outline-info" className='bg-white' onClick={handleClose}>
          НЕТ
        </Button>
        <Button type="submit" variant="info" className='text-white' onClick={checkForm}>
          УДАЛИТЬ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteQuote;