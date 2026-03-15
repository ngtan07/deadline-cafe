import { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Table, Modal, Button, Form } from 'react-bootstrap';
import { LayoutDashboard, Coffee, Users, MessageSquare, Settings, LogOut, Plus, Trash2, Edit, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

const AdminDashboard = () => {
  const { data: cafes } = useFetch('http://localhost:3000/cafes');
  const { data: locations } = useFetch('http://localhost:3000/locations');
  const [activeTab, setActiveTab] = useState('cafes');

  // Data States
  const [cafesList, setCafesList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [currentCafe, setCurrentCafe] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    locationId: '',
    address: '',
    rating: 5.0,
    priceMin: '',
    priceMax: '',
    openHours: '',
    description: '',
    amenities: ''
  });

  // Fetch initial data
  useEffect(() => {
    if (cafes) {
      setCafesList(cafes);
    }
  }, [cafes]);

  // Fetch reviews for stats
  useEffect(() => {
    axios.get('http://localhost:3000/reviews')
      .then(res => setReviewsList(res.data))
      .catch(err => console.error(err));
  }, []);

  // Compute Stats
  const totalCafes = cafesList.length;
  const totalReviews = reviewsList.length;
  const avgRating = totalCafes > 0
    ? (cafesList.reduce((sum, cafe) => sum + parseFloat(cafe.rating), 0) / totalCafes).toFixed(1)
    : 0;

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShowModal = (cafe = null) => {
    if (cafe) {
      setCurrentCafe(cafe);
      setFormData({
        ...cafe,
        priceMin: cafe.priceRange?.min || '',
        priceMax: cafe.priceRange?.max || '',
        amenities: Array.isArray(cafe.amenities) ? cafe.amenities.join(', ') : cafe.amenities
      });
    } else {
      setCurrentCafe(null);
      setFormData({
        name: '', image: '', locationId: locations?.[0]?.id || '', address: '', rating: 5.0,
        priceMin: '', priceMax: '', openHours: '', description: '', amenities: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare structured data
    const newCafeData = {
      ...formData,
      rating: parseFloat(formData.rating),
      amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
      priceRange: {
        min: parseInt(formData.priceMin) || 0,
        max: parseInt(formData.priceMax) || 0
      }
    };
    
    // Remove temporary form fields before sending
    delete newCafeData.priceMin;
    delete newCafeData.priceMax;

    try {
      if (currentCafe) {
        // Update
        const res = await axios.put(`http://localhost:3000/cafes/${currentCafe.id}`, newCafeData);
        setCafesList(prev => prev.map(c => c.id === currentCafe.id ? res.data : c));
      } else {
        // Create - Note: json-server auto-generates string strictly if using uuid, but numeric strings usually tick up. 
        // We'll let json-server handle ID generation.
        const res = await axios.post(`http://localhost:3000/cafes`, newCafeData);
        setCafesList(prev => [...prev, res.data]);
      }
      handleCloseModal();
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu dữ liệu!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá quán này không? Dữ liệu không thể phục hồi.')) {
      try {
        await axios.delete(`http://localhost:3000/cafes/${id}`);
        setCafesList(prev => prev.filter(c => c.id !== id));
      } catch (err) {
        alert('Có lỗi xảy ra khi xoá quán!');
      }
    }
  };

  return (
    <div className="d-flex vh-100" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Sidebar Layout */}
      <div
        className="bg-white shadow-sm d-flex flex-column p-4"
        style={{ width: '280px', zIndex: 1000, borderRight: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="d-flex align-items-center gap-3 mb-5 px-2">
          <div className="p-2 rounded-3" style={{ backgroundColor: 'var(--primary-btn)' }}>
            <LayoutDashboard size={24} color="#FFF" />
          </div>
          <span className="fs-5 fw-bold" style={{ color: 'var(--primary-btn)', letterSpacing: '-0.5px' }}>Admin Panel</span>
        </div>

        <Nav className="flex-column gap-2 flex-grow-1">
          <Nav.Link
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${activeTab === 'dashboard' ? 'bg-light text-primary fw-bold' : 'text-muted'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} /> Tổng quan
          </Nav.Link>
          <Nav.Link
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${activeTab === 'cafes' ? 'bg-light text-primary fw-bold' : 'text-muted'}`}
            onClick={() => setActiveTab('cafes')}
          >
            <Coffee size={20} /> Quản lý Quán
          </Nav.Link>
          <Nav.Link className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-muted">
            <Users size={20} /> Người dùng
          </Nav.Link>
          <Nav.Link className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-muted">
            <MessageSquare size={20} /> Đánh giá
          </Nav.Link>
          <Nav.Link className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-muted mt-auto">
            <Settings size={20} /> Cài đặt
          </Nav.Link>
          <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-danger">
            <LogOut size={20} /> Về trang chủ
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5 overflow-auto custom-scrollbar">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: 'var(--primary-btn)' }}>Tổng quan Quản trị</h2>
              <p className="text-muted mb-0">Quản lý hệ thống Dehofee của bạn</p>
            </div>
            <div className="d-flex gap-3">
              <div className="bg-white px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2 fw-medium text-muted">
                Admin <Users size={18} />
              </div>
            </div>
          </div>

          <Row className="mb-5 gx-4">
            <Col md={4}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-100">
                <Card className="modern-card border-0 h-100 p-2">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle" style={{ color: 'var(--primary-btn)' }}>
                      <Coffee size={24} />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">{totalCafes}</h3>
                      <p className="text-muted mb-0 small">Tổng số quán</p>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-100">
                <Card className="modern-card border-0 h-100 p-2">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                      <Star size={24} />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">{avgRating}</h3>
                      <p className="text-muted mb-0 small">Điểm đánh giá TB</p>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-100">
                <Card className="modern-card border-0 h-100 p-2">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">{totalReviews}</h3>
                      <p className="text-muted mb-0 small">Lượt đánh giá</p>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0" style={{ color: 'var(--primary-btn)' }}>Danh sách Quán</h4>
          <Button
            className="btn-primary-modern px-4 py-2 d-flex align-items-center gap-2"
            onClick={() => handleShowModal()}
          >
            <Plus size={18} /> Thêm Quán Mới
          </Button>
        </div>

        <Card className="modern-card border-0">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <tr>
                  <th className="border-0 fw-semibold text-muted py-3 px-4">ID</th>
                  <th className="border-0 fw-semibold text-muted py-3">Thông tin Quán</th>
                  <th className="border-0 fw-semibold text-muted py-3">Khu vực</th>
                  <th className="border-0 fw-semibold text-muted py-3">Đánh giá</th>
                  <th className="border-0 fw-semibold text-muted py-3 text-end px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cafesList.map(cafe => (
                  <tr key={cafe.id}>
                    <td className="px-4 py-3 text-muted">#{cafe.id}</td>
                    <td className="py-3 fw-medium">
                      <div className="d-flex align-items-center gap-3">
                        <img src={cafe.image} alt={cafe.name} width={40} height={40} className="rounded-2 object-fit-cover" />
                        {cafe.name}
                      </div>
                    </td>
                    <td className="py-3 text-muted">
                        {locations?.find(l => l.id === cafe.locationId)?.name || 'Không xác định'}
                    </td>
                    <td className="py-3">
                      <span className="badge bg-warning text-dark px-2 py-1 rounded-pill">
                        ★ {cafe.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button
                        className="btn btn-sm btn-light text-primary me-2 rounded-pill px-3"
                        onClick={() => handleShowModal(cafe)}
                      >
                        <Edit size={14} className="me-1" /> Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-light text-danger rounded-pill px-3"
                        onClick={() => handleDelete(cafe.id)}
                      >
                        <Trash2 size={14} className="me-1" /> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        </motion.div>

        {/* Modal Thêm/Sửa Quán */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered backdrop="static">
          <Modal.Header closeButton className="border-0 pb-0 pt-4 px-4">
            <Modal.Title className="fw-bold fs-4" style={{ color: 'var(--primary-btn)' }}>
              {currentCafe ? 'Chỉnh sửa Quán' : 'Thêm Quán Mới'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 pb-4">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Tên quán *</Form.Label>
                    <Form.Control
                      required name="name" value={formData.name} onChange={handleInputChange}
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Khu vực *</Form.Label>
                    <Form.Select
                      required name="locationId" value={formData.locationId} onChange={handleInputChange}
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    >
                      <option value="">Chọn khu vực</option>
                      {locations?.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Địa chỉ chi tiết</Form.Label>
                    <Form.Control
                      name="address" value={formData.address} onChange={handleInputChange}
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Bìa quán (URL Hình ảnh) *</Form.Label>
                    <Form.Control
                      required name="image" value={formData.image} onChange={handleInputChange}
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                      placeholder="https://..."
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Đánh giá ban đầu</Form.Label>
                    <Form.Control
                      type="number" step="0.1" min="1" max="5"
                      name="rating" value={formData.rating} onChange={handleInputChange}
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Mức giá thấp nhất (VNĐ)</Form.Label>
                    <Form.Control
                      type="number" step="1000"
                      name="priceMin" value={formData.priceMin} onChange={handleInputChange}
                      placeholder="VD: 25000"
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Mức giá cao nhất (VNĐ)</Form.Label>
                    <Form.Control
                      type="number" step="1000"
                      name="priceMax" value={formData.priceMax} onChange={handleInputChange}
                      placeholder="VD: 55000"
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Giờ mở cửa</Form.Label>
                    <Form.Control
                      name="openHours" value={formData.openHours} onChange={handleInputChange}
                      placeholder="VD: 07:00 - 22:00"
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Tiện ích (phân cách bằng dấu phẩy)</Form.Label>
                    <Form.Control
                      name="amenities" value={formData.amenities} onChange={handleInputChange}
                      placeholder="VD: Wifi 5G, Quiet Zone, Air Con"
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-semibold text-muted">Mô tả ngắn</Form.Label>
                    <Form.Control
                      as="textarea" rows={3}
                      name="description" value={formData.description} onChange={handleInputChange}
                      className="rounded-3 shadow-none bg-light border-0 py-2"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex gap-2 justify-content-end border-top pt-3">
                <Button variant="light" className="px-4 rounded-pill" onClick={handleCloseModal}>Huỷ</Button>
                <Button type="submit" className="btn-primary-modern px-5 py-2">
                  {currentCafe ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
};

export default AdminDashboard;
