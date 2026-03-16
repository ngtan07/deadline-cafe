import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from 'react-bootstrap';

import { useAuth } from '../../../../contexts/AuthContext';
import LoginPromptModal from '../../../common/LoginPromptModal';
import ReviewItem from './ReviewItem';
import { useNavigate } from 'react-router-dom';

const ReviewSection = ({ reviews, cafeId }) => {
    const { user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const displayedReviews = reviews.slice(0, 2);

    const handleViewMore = () => {
        if (!user) {
            setShowLoginModal(true);
        } else {
            navigate(`/cafe/${cafeId}/reviews`);
        }
    };

    return (
        <div className="mb-4">
            {/* Header */}
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', color: 'var(--primary-btn)' }}>
                <MessageCircle size={20} />
                Community Reviews
                <span
                    className="badge bg-light text-dark border fw-semibold ms-1"
                    style={{ fontSize: '0.75rem' }}
                >
                    {reviews.length}
                </span>
            </h4>

            <div className="d-flex flex-column gap-3">
                {displayedReviews.length === 0 ? (
                    <>
                        <p className="text-muted text-center small py-2">
                            No reviews yet. Write to be the first!
                        </p>
                        <div className="text-center mt-3">
                            <Button
                                variant="outline-secondary"
                                className="rounded-pill px-4"
                                style={{ fontSize: '0.82rem' }}
                                onClick={handleViewMore}
                            >
                                Write a review
                            </Button>
                        </div>

                    </>
                ) : (
                    displayedReviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))
                )}
            </div>

            {reviews.length > 0 && (
                <div className="text-center mt-3">
                    <Button
                        variant="outline-secondary"
                        className="rounded-pill px-4"
                        style={{ fontSize: '0.82rem' }}
                        onClick={handleViewMore}
                    >
                        {reviews.length > 2
                            ? `View all ${reviews.length} reviews`
                            : 'View & write a review'}
                    </Button>
                </div>
            )}

            {/* Login Modal */}
            <LoginPromptModal
                show={showLoginModal}
                onHide={() => setShowLoginModal(false)}
            />
        </div>
    );
};

export default ReviewSection;
