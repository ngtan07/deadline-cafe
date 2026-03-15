
import { Coffee, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListCafe = ({ BROWN, PALETTE, ratingChartData }) => {
    const navigate = useNavigate();
    return (
        <Col xs={12} lg={6}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                <Card className="modern-card border-0 shadow-sm rounded-4 h-100">
                    <Card.Body className="p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-2">
                                <Coffee size={20} color={BROWN} />
                                <h5 className="fw-bold mb-0" style={{ color: '#3C2A21' }}>List of Cafe</h5>
                            </div>
                            <button
                                className="btn btn-sm d-flex align-items-center gap-1 fw-semibold rounded-pill px-3"
                                style={{ backgroundColor: `${BROWN}15`, color: BROWN, border: 'none' }}
                                onClick={() => navigate('/admin/manage-cafe')}
                            >
                                View All <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {ratingChartData.slice(0, 3).map((cafe, i) => (
                                <div key={i} className="d-flex align-items-center gap-3 p-2 rounded-3" style={{ backgroundColor: i % 2 === 0 ? 'transparent' : `${BROWN}06` }}>
                                    <div
                                        className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-white"
                                        style={{ width: 44, height: 44, backgroundColor: PALETTE[i % PALETTE.length], fontSize: '0.8rem' }}
                                    >
                                        #{i + 1}
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <p className="fw-semibold mb-0 text-dark text-truncate" style={{ fontSize: '0.88rem' }}>{cafe.fullName}</p>
                                    </div>
                                    <span
                                        className="badge d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill flex-shrink-0"
                                        style={{ backgroundColor: '#FFF8E1', color: '#B7860B', fontSize: '0.78rem' }}
                                    >
                                        <Star size={11} fill="#F5A623" color="#F5A623" /> {cafe.rating}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </motion.div>
        </Col>
    )
}

export default ListCafe
