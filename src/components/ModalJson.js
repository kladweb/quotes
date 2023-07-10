import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";

function ModalJson({showModalJson, setShowModalJson}) {

    const dataQuotes = useSelector(state => state.quotes.quotes);
    const handleClose = () => {
        setShowModalJson(false);
    }

    const quotesJson = (dataQuotes.length === 0) ?
        'Данные ещё не загружены!' :
        JSON.stringify(dataQuotes)

    return (
        <Modal size="lg" show={showModalJson} onHide={handleClose}>
            <Modal.Body>
                <Form.Control
                    className='fs-6'
                    as="textarea"
                    defaultValue={quotesJson}
                    readOnly={true}
                    style={{height: '10rem'}}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" className='bg-white' onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalJson;