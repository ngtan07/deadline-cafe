import { Star } from 'lucide-react';

const ReviewItem = ({ review }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d)) return dateStr;
        return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="d-flex gap-2 align-items-start">
            {/* Circular avatar */}
            <img
                src={review.user?.avatar || `https://i.pravatar.cc/150?u=${review.userId}`}
                alt="avatar"
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                    border: '2px solid var(--bg-secondary)',
                }}
            />

            {/* Review content */}
            <div className="flex-grow-1 min-w-0">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        {review.user?.name || 'Anonymous User'}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                        {formatDate(review.date)}
                    </span>
                </div>

                {/* Star rating */}
                <div className="d-flex gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={11}
                            color="#F59E0B"
                            fill={i < review.rating ? '#F59E0B' : 'none'}
                        />
                    ))}
                </div>

                {/* Comment bubble */}
                <div
                    className="bg-light rounded-3 px-3 py-2"
                    style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-main)', background: '#fcfaf9' }}
                >
                    {review.comment}
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
