import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useStorage } from '../firebase/storage';

function ModalDeleteQuote({showModalDelete, setShowModalDelete, quote, changeParameter, favorite}) {

  const {changeFavQuotes, changeAllQuotes} = useStorage();
  const handleClose = () => {
    changeParameter(null);
    setShowModalDelete(false);
  }
  const checkForm = () => {
    setShowModalDelete(false);
    if (favorite) {
      changeFavQuotes(quote, 'delete');
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