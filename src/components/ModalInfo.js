import Modal from 'react-bootstrap/Modal';

function ModalInfo({showModalInfo, setShowModalInfo, info}) {

  const handleClose = () => {
    setShowModalInfo(false);
  }

  return (
    <Modal className='my-5' show={showModalInfo} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='fs-5'>{info}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}

export default ModalInfo;
