import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';

const RecentFeedback = ({ recentReviews, BROWN }) => {

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < Math.round(rating) ? '#F5A623' : '#E0CFBF', fontSize: 14 }}>★</span>
        ));

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
            <Card className="modern-card border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <MessageSquare size={20} color="#5B8DD9" />
                        <h5 className="fw-bold mb-0" style={{ color: '#3C2A21' }}>Recent Feedback</h5>
                    </div>

                    {recentReviews.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <MessageSquare size={40} className="mb-3 opacity-25" />
                            <p>No feedback.</p>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {recentReviews.map((review, i) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.06 }}
                                    className="d-flex gap-3 align-items-start p-3 rounded-4"
                                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                                >
                                    <img
                                        src={review.userAvatar || `https://i.pravatar.cc/40?u=${review.userId}`}
                                        alt={review.userName}
                                        width={40} height={40}
                                        className="rounded-circle flex-shrink-0 shadow-sm"
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-1">
                                            <div>
                                                <span className="fw-semibold text-dark me-2">{review.userName}</span>
                                                <span className="text-muted small">tại <span style={{ color: BROWN }} className="fw-medium">{review.cafeName}</span></span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <span>{renderStars(review.rating)}</span>
                                                <span className="text-muted small">{new Date(review.date).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                        </div>
                                        {review.comment && (
                                            <p className="mb-0 mt-1 text-secondary" style={{ fontSize: '0.87rem' }}>"{review.comment}"</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </Card.Body>
            </Card>
        </motion.div>
    )
}

export default RecentFeedback
