import { Modal, Button } from 'react-bootstrap';
import { Coffee, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPromptModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="sm">
            <Modal.Body className="text-center p-4">
                <div className="mb-3">
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle"
                        style={{ width: '64px', height: '64px', backgroundColor: 'var(--primary-bg, #FFF8F0)', color: 'var(--primary-btn, #D97706)' }}
                    >
                        <Coffee size={30} />
                    </div>
                </div>

                <h5 className="fw-bold text-dark mb-2">You're not logged in</h5>
                <p className="text-muted small mb-4">
                    Log in to share your deadline experience with the community!
                </p>

                <div className="d-flex flex-column gap-2">
                    <Link
                        to="/login"
                        className="btn btn-primary-modern w-100 d-flex justify-content-center align-items-center gap-2 py-2"
                        onClick={onHide}
                    >
                        <LogIn size={18} /> Log in
                    </Link>
                    <Link
                        to="/register"
                        className="btn btn-outline-secondary w-100 d-flex justify-content-center align-items-center gap-2 py-2 rounded-pill"
                        onClick={onHide}
                    >
                        <UserPlus size={18} /> Create an account
                    </Link>
                    <Button variant="link" className="text-muted small text-decoration-none" onClick={onHide}>
                        Maybe later
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginPromptModal;
