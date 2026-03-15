import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { Coffee, MapPin, DollarSign, Clock, Star, Image, FileText, Sparkles } from 'lucide-react';

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

const CafeFormModal = ({
  showModal,
  currentCafe,
  formData,
  locationsList,
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
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered backdrop="static">
        <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, backgroundColor: `${BROWN}14` }}
              >
                <Coffee size={18} color={BROWN} />
              </div>
              <Modal.Title className="fw-bold" style={{ fontSize: '1.25rem', color: '#3C2A21' }}>
                {currentCafe ? 'Edit Cafe' : 'Add New Cafe'}
              </Modal.Title>
            </div>
            <p className="text-muted mb-0" style={{ fontSize: '0.82rem' }}>
              {currentCafe ? 'Update the cafe details below.' : 'Fill in the details to register a new cafe.'}
            </p>
          </div>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body className="px-4 py-4">
            {/* Divider */}
            <div className="mb-4" style={{ height: 1, background: 'linear-gradient(to right, transparent, #EDE5DD, transparent)' }} />

            <Row className="g-3">
              {/* Cafe Name */}
              <Col md={12}>
                <FormField icon={Coffee} label="Cafe Name *">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter cafe name..."
                  />
                </FormField>
              </Col>

              {/* Image URL */}
              <Col md={12}>
                <FormField icon={Image} label="Image URL *">
                  <Form.Control
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="https://example.com/image.jpg"
                  />
                </FormField>
              </Col>

              {/* Location & Rating */}
              <Col md={6}>
                <FormField icon={MapPin} label="Location *">
                  <Form.Select
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="">Select location</option>
                    {locationsList?.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </Form.Select>
                </FormField>
              </Col>
              <Col md={6}>
                <FormField icon={Star} label="Rating (Default 5.0)">
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </FormField>
              </Col>

              {/* Address */}
              <Col md={12}>
                <FormField icon={MapPin} label="Address *">
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter full address..."
                  />
                </FormField>
              </Col>

              {/* Section label */}
              <Col md={12}>
                <div className="d-flex align-items-center gap-2 mt-2 mb-1">
                  <div style={{ flex: 1, height: 1, backgroundColor: '#EDE5DD' }} />
                  <span className="fw-semibold" style={{ fontSize: '0.7rem', color: '#BFA182', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Pricing & Hours
                  </span>
                  <div style={{ flex: 1, height: 1, backgroundColor: '#EDE5DD' }} />
                </div>
              </Col>

              {/* Price Min & Max */}
              <Col md={6}>
                <FormField icon={DollarSign} label="Price Min (VNĐ) *">
                  <Form.Control
                    type="number"
                    name="priceMin"
                    value={formData.priceMin}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="e.g. 25000"
                  />
                </FormField>
              </Col>
              <Col md={6}>
                <FormField icon={DollarSign} label="Price Max (VNĐ) *">
                  <Form.Control
                    type="number"
                    name="priceMax"
                    value={formData.priceMax}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="e.g. 80000"
                  />
                </FormField>
              </Col>

              {/* Open Hours & Amenities */}
              <Col md={6}>
                <FormField icon={Clock} label="Open Hours *">
                  <Form.Control
                    type="text"
                    name="openHours"
                    value={formData.openHours}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="e.g. 07:00 - 22:00"
                  />
                </FormField>
              </Col>
              <Col md={6}>
                <FormField icon={Sparkles} label="Amenities">
                  <Form.Control
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Wifi, AC, Parking..."
                  />
                </FormField>
              </Col>

              {/* Description */}
              <Col md={12}>
                <FormField icon={FileText} label="Description">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Write a brief description of the cafe..."
                  />
                </FormField>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="border-0 px-4 pb-4 pt-0 gap-2">
            <Button
              variant="none"
              onClick={handleCloseModal}
              className="rounded-pill px-4 py-2 fw-medium"
              style={{ backgroundColor: '#F4EFEB', color: '#7B5B3A', border: 'none' }}
            >
              Cancel
            </Button>
            <Button
              variant="none"
              type="submit"
              className="rounded-pill px-4 py-2 fw-semibold text-white d-flex align-items-center gap-2"
              style={{ backgroundColor: BROWN, border: 'none' }}
            >
              <Coffee size={15} />
              {currentCafe ? 'Save Changes' : 'Add Cafe'}
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

export default CafeFormModal;
