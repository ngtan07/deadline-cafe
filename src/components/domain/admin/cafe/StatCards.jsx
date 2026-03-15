import { Row, Col, Card } from 'react-bootstrap';
import { Coffee, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCards = ({ totalCafes, avgRating, totalReviews }) => {
  return (
    <Row className="mb-5 gx-4">
      <Col md={4}>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-100">
          <Card className="modern-card border-0 shadow-sm h-100 p-2 rounded-4">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="p-3 rounded-circle text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--primary-btn)' }}>
                <Coffee size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-dark">{totalCafes}</h3>
                <p className="text-muted mb-0 small text-uppercase fw-semibold">Tổng số quán</p>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
      <Col md={4}>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-100">
          <Card className="modern-card border-0 shadow-sm h-100 p-2 rounded-4">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-success p-3 rounded-circle text-white d-flex align-items-center justify-content-center">
                <Star size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-dark">{avgRating}</h3>
                <p className="text-muted mb-0 small text-uppercase fw-semibold">Điểm đánh giá TB</p>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
      <Col md={4}>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-100">
          <Card className="modern-card border-0 shadow-sm h-100 p-2 rounded-4">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-info p-3 rounded-circle text-white d-flex align-items-center justify-content-center">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-dark">{totalReviews}</h3>
                <p className="text-muted mb-0 small text-uppercase fw-semibold">Lượt đánh giá</p>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
    </Row>
  );
};

export default StatCards;
