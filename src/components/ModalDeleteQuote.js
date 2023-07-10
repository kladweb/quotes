import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteQuote({showModalDelete, setShowModalDelete, changeQuotes, quote}) {

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