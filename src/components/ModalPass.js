import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalPass({showModalPass, setShowModalPass, setAllowedAdd, setShowEnterQuote, setShowAlert}) {

  let inputAdmin = '';
  const handleClose = () => {
    setShowModalPass(false);
  }
  const checkPass = (e) => {
    setShowModalPass(false);
    if (inputAdmin === 'Quotesforme') {
      setAllowedAdd(true);
      setShowEnterQuote(true);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }

  const setPass = (e) => {
    inputAdmin = e.target.value
  }

  return (
    <Modal show={showModalPass} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Введите пароль администратора</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="password" autoFocus onInput={setPass}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" className='bg-white' onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="info" className='text-white' onClick={checkPass}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPass;