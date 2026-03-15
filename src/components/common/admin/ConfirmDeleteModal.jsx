import { Modal, Button } from 'react-bootstrap';
import { Trash2, AlertTriangle } from 'lucide-react';

const ConfirmDeleteModal = ({ showModal, setShowModal, handleConfirm, currentCafe, title = "Confirm Delete?", actionText = "Delete", message }) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
            <Modal.Body className="text-center p-4">
                <div className="mb-3">
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle"
                        style={{ width: '60px', height: '60px', backgroundColor: '#FFF0F0', color: '#D94040' }}
                    >
                        <AlertTriangle size={30} />
                    </div>
                </div>

                <h5 className="fw-bold text-dark">{title}</h5>
                <p className="text-muted small">
                    {message || (
                        <>Are you sure you want to delete <b>{currentCafe?.name}</b>? <br />This action cannot be undone.</>
                    )}
                </p>

                <div className="d-flex gap-2 mt-4">
                    <Button
                        variant="light"
                        className="w-100 rounded-pill fw-semibold"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        className="w-100 rounded-pill fw-semibold"
                        onClick={handleConfirm}
                    >
                        {actionText}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmDeleteModal;