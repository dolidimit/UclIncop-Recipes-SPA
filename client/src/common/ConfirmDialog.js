import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmDialog = ({
    show,
    onClose,
    onSave
}) => {

    return (
        <Modal className= "modal" show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please, confirm the delete call.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Click 
            on Delete to delete the item or click on Close to cancel.
        </Modal.Body>
        <Modal.Footer>
          <Button className = "close" variant='light' onClick={onClose}>
            Close
          </Button>
          <Button className = "savech" variant='warning' onClick={onSave}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default ConfirmDialog;