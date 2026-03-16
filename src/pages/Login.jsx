import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Coffee } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await authService.login(email, password);
      login(user);
      if (user.role === 'admin' && from === '/') {
          navigate('/admin');
      } else {
          navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="d-flex align-items-center min-vh-100" 
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
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
                <h3 className="fw-bold">Chào mừng trở lại</h3>
                <p className="text-muted">Đăng nhập để tìm góc chạy deadline tiếp theo của bạn.</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4 position-relative">
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

                <Form.Group className="mb-4 position-relative">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="fw-semibold small text-muted text-uppercase">Mật khẩu</Form.Label>
                    <a href="#" className="small text-decoration-none" style={{ color: 'var(--primary-btn)' }}>Quên mật khẩu?</a>
                  </div>
                  <div className="position-relative">
                    <Lock 
                      size={18} 
                      className="position-absolute text-muted" 
                      style={{ top: '50%', transform: 'translateY(-50%)', left: '16px' }} 
                    />
                    <Form.Control 
                      type="password" 
                      placeholder="Nhập mật khẩu" 
                      className="bg-light border-0 shadow-none px-5 py-3 rounded-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Button 
                  type="submit" 
                  className="btn-primary-modern w-100 py-3 mb-4 d-flex justify-content-center align-items-center gap-2"
                >
                  <LogIn size={20} /> Đăng nhập
                </Button>

                <div className="text-center">
                  <p className="text-muted small">
                    Chưa có tài khoản? <Link to="/register" className="fw-bold text-decoration-none" style={{ color: 'var(--primary-btn)' }}>Đăng ký ngay</Link>
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

export default Login;
