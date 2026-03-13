import { Container, Row, Col } from 'react-bootstrap';
import { Coffee, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#FDFBFA', borderTop: '1px solid rgba(0,0,0,0.05)' }} className="py-5 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Coffee size={24} color="var(--primary-btn)" />
              <h5 className="mb-0 fw-bold" style={{ color: 'var(--primary-btn)' }}>DeadlineCafe</h5>
            </div>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
              Nền tảng tìm kiếm quán cà phê hoàn hảo dành cho sinh viên chạy deadline. Không gian đẹp, wifi mạnh, ổ cắm khắp nơi.
            </p>
          </Col>
          <Col md={3}>
            <h6 className="fw-bold mb-3">Khám phá</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Quận 1</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Quận 3</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Bình Thạnh</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="fw-bold mb-3">Liên hệ</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-muted">Email: hello@deadlinecafe.vn</li>
              <li className="mb-2 text-muted">Hotline: 1900 xxxx</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" style={{ borderColor: 'rgba(0,0,0,0.1)' }}/>
        <div className="text-center text-muted d-flex justify-content-center align-items-center gap-1">
          &copy; {new Date().getFullYear()} DeadlineCafe. Made with <Heart size={16} color="red" /> by Lead Frontend Developer.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
