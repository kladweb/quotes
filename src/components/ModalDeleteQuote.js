import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useQuotesChange } from '../services/QuotesChangeService';

function ModalDeleteQuote({showModalDelete, setShowModalDelete, quote}) {

  const {changeQuotes} = useQuotesChange();
  const handleClose = () => {
    setShowModalDelete(false);
  }
  const checkForm = () => {
    setShowModalDelete(false);
    changeQuotes(quote);
  }

  return (
      <Modal show={showModalDelete} onHide={handleClose}>
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