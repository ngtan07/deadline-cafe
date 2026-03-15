import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { User, Mail, Shield, Image } from 'lucide-react';

const BROWN = '#8B3A2A';

const FormField = ({ icon: Icon, label, children }) => (
  <Form.Group>
    <Form.Label
      className="fw-semibold d-flex align-items-center gap-2 mb-2"
      style={{ fontSize: '0.78rem', color: '#7B5B3A', textTransform: 'uppercase', letterSpacing: '0.04em' }}
    >
      <Icon size={13} color={BROWN} /> {label}
    </Form.Label>
    {children}
  </Form.Group>
);

const inputClass = "rounded-3 shadow-none py-2 px-3";
const inputStyle = {
  backgroundColor: '#FAF7F5',
  border: '1.5px solid #EDE5DD',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};
const inputFocusStyle = {
  borderColor: BROWN,
  boxShadow: `0 0 0 3px ${BROWN}18`,
  backgroundColor: '#FFF',
};

const UserFormModal = ({
  showModal,
  currentUser,
  formData,
  handleInputChange,
  handleCloseModal,
  handleSubmit
}) => {

  const handleFocus = (e) => {
    Object.assign(e.target.style, inputFocusStyle);
  };
  const handleBlur = (e) => {
    Object.assign(e.target.style, inputStyle);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} size="md" centered backdrop="static">
        <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, backgroundColor: `${BROWN}14` }}
              >
                <User size={18} color={BROWN} />
              </div>
              <Modal.Title className="fw-bold" style={{ fontSize: '1.25rem', color: '#3C2A21' }}>
                View User Details
              </Modal.Title>
            </div>
            <p className="text-muted mb-0" style={{ fontSize: '0.82rem' }}>
              Detailed view of the user. Cannot be modified here.
            </p>
          </div>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body className="px-4 py-4">
            {/* Divider */}
            <div className="mb-4" style={{ height: 1, background: 'linear-gradient(to right, transparent, #EDE5DD, transparent)' }} />

            <Row className="g-4">
              {/* User Name */}
              <Col md={12}>
                <FormField icon={User} label="Full Name *">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    readOnly
                    className={inputClass}
                    style={inputStyle}
                  />
                </FormField>
              </Col>

              {/* Email */}
              <Col md={12}>
                <FormField icon={Mail} label="Email Address *">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    readOnly
                    className={inputClass}
                    style={inputStyle}
                  />
                </FormField>
              </Col>
              
              {/* Avatar URL */}
              <Col md={12}>
                <FormField icon={Image} label="Avatar URL">
                  <Form.Control
                    type="url"
                    name="avatar"
                    value={formData.avatar || ''}
                    readOnly
                    className={inputClass}
                    style={inputStyle}
                  />
                </FormField>
              </Col>

              {/* Role */}
              <Col md={12}>
                <FormField icon={Shield} label="User Role *">
                  <Form.Select
                    name="role"
                    value={formData.role || ''}
                    disabled
                    className={inputClass}
                    style={{ ...inputStyle, cursor: 'not-allowed', opacity: 0.9 }}
                  >
                    <option value="user">Regular User</option>
                    <option value="admin">Administrator</option>
                  </Form.Select>
                </FormField>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="border-0 px-4 pb-4 pt-0 gap-2">
            <Button
              variant="none"
              onClick={handleCloseModal}
              className="rounded-pill px-5 py-2 fw-semibold text-white d-block mx-auto"
              style={{ backgroundColor: BROWN, border: 'none' }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <style>{`
        .modal-content {
          border: none !important;
          border-radius: 20px !important;
          box-shadow: 0 25px 60px rgba(60, 42, 33, 0.15) !important;
          overflow: hidden;
        }
        .modal-backdrop.show {
          opacity: 0.3 !important;
        }
        .btn-close:focus {
          box-shadow: 0 0 0 3px ${BROWN}25 !important;
        }
      `}</style>
    </>
  );
};

export default UserFormModal;
