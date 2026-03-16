import { motion } from 'framer-motion';
import { Star } from 'lucide-react';


const ReviewCard = ({ review, index }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d)) return dateStr;
        return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="d-flex gap-3 p-3 bg-white rounded-4 shadow-sm border border-light"
            style={{ borderLeft: '4px solid var(--primary-btn)' }}
        >
            <img
                src={review.user?.avatar || `https://i.pravatar.cc/150?u=${review.userId}`}
                alt="avatar"
                className="rounded-circle shadow-sm flex-shrink-0"
                style={{
                    width: '56px',
                    height: '56px',
                    minWidth: '56px',
                    minHeight: '56px',
                    objectFit: 'cover',
                    border: '2px solid var(--bg-secondary)'
                }}
            />
            <div className="w-100">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold" style={{ color: 'var(--text-main)' }}>{review.user?.name || 'Anonymous User'}</span>
                    <span className="text-muted small">{formatDate(review.date)}</span>
                </div>
                <div className="d-flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} color="#F59E0B" fill={i < review.rating ? '#F59E0B' : 'none'} />
                    ))}
                </div>
                <div className="p-2 rounded-3 mt-1" style={{ color: 'var(--text-main)', fontSize: '0.95rem', background: '#fcfaf9' }}>
                    {review.comment}
                </div>
            </div>
        </motion.div>
    );
};


export default ReviewCard
