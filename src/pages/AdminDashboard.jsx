import { useState } from 'react';
import { Container, Row, Col, Nav, Card, Table } from 'react-bootstrap';
import { LayoutDashboard, Coffee, Users, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const AdminDashboard = () => {
  const { data: cafes } = useFetch('http://localhost:3000/cafes');
  const [activeTab, setActiveTab] = useState('cafes');

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar Layout */}
      <div 
        className="bg-white shadow-sm d-flex flex-column p-3" 
        style={{ width: '280px', zIndex: 1000 }}
      >
        <div className="d-flex align-items-center gap-2 mb-4 px-2">
          <div className="bg-primary text-white p-2 rounded-3">
            <LayoutDashboard size={24} color="var(--primary-btn)" style={{ backgroundColor: 'transparent' }} />
          </div>
          <span className="fs-5 fw-bold" style={{ color: 'var(--primary-btn)' }}>Admin Panel</span>
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
      <div className="flex-grow-1 p-5 overflow-auto">
        <h2 className="fw-bold mb-4">Quản lý Quán Cà Phê</h2>
        
        <Row className="mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle" style={{ color: 'var(--primary-btn)' }}>
                  <Coffee size={24} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{cafes?.length || 0}</h3>
                  <p className="text-muted mb-0 small">Tổng số quán</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 fw-semibold text-muted py-3 px-4 rounded-top-left-4">ID</th>
                  <th className="border-0 fw-semibold text-muted py-3">Tên quán</th>
                  <th className="border-0 fw-semibold text-muted py-3">Khu vực</th>
                  <th className="border-0 fw-semibold text-muted py-3">Đánh giá</th>
                  <th className="border-0 fw-semibold text-muted py-3 text-end px-4 rounded-top-right-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cafes?.map(cafe => (
                  <tr key={cafe.id}>
                    <td className="px-4 py-3 text-muted">#{cafe.id}</td>
                    <td className="py-3 fw-medium">
                      <div className="d-flex align-items-center gap-3">
                        <img src={cafe.image} alt={cafe.name} width={40} height={40} className="rounded-2 object-fit-cover" />
                        {cafe.name}
                      </div>
                    </td>
                    <td className="py-3 text-muted">{cafe.district}</td>
                    <td className="py-3">
                      <span className="badge bg-warning text-dark px-2 py-1 rounded-pill">
                        ★ {cafe.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button className="btn btn-sm btn-light text-primary me-2 rounded-pill px-3">Sửa</button>
                      <button className="btn btn-sm btn-light text-danger rounded-pill px-3">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
