import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, Coffee, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    setError('');
    setLoading(true);
    try {
      await authService.register({ name, email, password });
      alert("Đăng ký thành công! Đang chuyển hướng đến trang Đăng nhập...");
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="d-flex align-items-center min-vh-100" 
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 0'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-5 rounded-4 shadow-lg border-0"
            >
              <div className="text-center mb-4">
                <div className="d-inline-flex bg-primary bg-opacity-10 p-3 rounded-circle mb-3">
                  <Coffee size={32} color="var(--primary-btn)" />
                </div>
                <h3 className="fw-bold">Tạo tài khoản mới</h3>
                <p className="text-muted">Cùng tham gia cộng đồng chạy deadline năng suất nhất.</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Họ và tên</Form.Label>
                  <div className="position-relative">
                    <User 
                      size={18} 
                      className="position-absolute text-muted" 
                      style={{ top: '50%', transform: 'translateY(-50%)', left: '16px' }} 
                    />
                    <Form.Control 
                      type="text" 
                      placeholder="Nhập họ và tên" 
                      className="bg-light border-0 shadow-none px-5 py-3 rounded-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Email</Form.Label>
                  <div className="position-relative">
                    <Mail 
                      size={18} 
                      className="position-absolute text-muted" 
                      style={{ top: '50%', transform: 'translateY(-50%)', left: '16px' }} 
                    />
                    <Form.Control 
                      type="email" 
                      placeholder="Nhập email của bạn" 
                      className="bg-light border-0 shadow-none px-5 py-3 rounded-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Mật khẩu</Form.Label>
                  <div className="position-relative">
                    <Lock 
                      size={18} 
                      className="position-absolute text-muted" 
                      style={{ top: '50%', transform: 'translateY(-50%)', left: '16px' }} 
                    />
                    <Form.Control 
                      type="password" 
                      placeholder="Tạo mật khẩu (Ít nhất 6 ký tự)" 
                      className="bg-light border-0 shadow-none px-5 py-3 rounded-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4 position-relative">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Xác nhận mật khẩu</Form.Label>
                  <div className="position-relative">
                    <Lock 
                      size={18} 
                      className="position-absolute text-muted" 
                      style={{ top: '50%', transform: 'translateY(-50%)', left: '16px' }} 
                    />
                    <Form.Control 
                      type="password" 
                      placeholder="Nhập lại mật khẩu" 
                      className="bg-light border-0 shadow-none px-5 py-3 rounded-3"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </Form.Group>

                <Button 
                  type="submit" 
                  className="btn-primary-modern w-100 py-3 mb-4 d-flex justify-content-center align-items-center gap-2"
                >
                  <UserPlus size={20} /> Tạo tài khoản
                </Button>

                <div className="text-center">
                  <p className="text-muted small">
                    Đã có tài khoản? <Link to="/login" className="fw-bold text-decoration-none" style={{ color: 'var(--primary-btn)' }}>Đăng nhập</Link>
                  </p>
                  <Link to="/" className="text-muted small text-decoration-none">
                    &larr; Quay về trang chủ
                  </Link>
                </div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
