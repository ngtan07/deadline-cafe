import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button, Form } from 'react-bootstrap';

import { useAuth } from '../../../../contexts/AuthContext';
import { reviewService } from '../../../../services/reviewService';
import { userService } from '../../../../services/userService';
import LoginPromptModal from '../../../common/LoginPromptModal';

// ── Star Rating Picker ──────────────────────────────────────────
const StarRatingPicker = ({ rating, onChange }) => {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="d-flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={22}
                    color={star <= (hovered || rating) ? '#F59E0B' : '#DDD'}
                    fill={star <= (hovered || rating) ? '#F59E0B' : 'none'}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    style={{ cursor: 'pointer', transition: '0.15s' }}
                />
            ))}
        </div>
    );
};

// ── Review Form ─────────────────────────────────────────────────
const ReviewForm = ({ cafeId, onReviewAdded }) => {
    const { user } = useAuth();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleFocusOrClick = () => {
        if (!user) setShowLoginModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) { setShowLoginModal(true); return; }
        if (!comment.trim()) return;

        setSubmitting(true);
        try {
            const newReview = {
                cafeId,
                userId: user.id,
                rating,
                comment: comment.trim(),
                date: new Date().toISOString(),
            };

            const savedReview = await reviewService.create(newReview);

            let reviewWithUser;
            try {
                const userRes = await userService.getById(user.id);
                reviewWithUser = { ...savedReview, user: userRes };
            } catch {
                reviewWithUser = { ...savedReview, user };
            }

            onReviewAdded(reviewWithUser);
            setComment('');
            setRating(5);
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review. Please try again!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
                <h6 className="fw-bold mb-3">
                    {user
                        ? `Hi, ${user.name}! Share your experience`
                        : 'Leave a review'}
                </h6>

                <div className="mb-3">
                    <StarRatingPicker rating={rating} onChange={setRating} />
                </div>

                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={user ? 'Share your deadline experience here...' : 'Log in to write a review...'}
                        style={{ borderRadius: '12px', resize: 'none' }}
                        className="bg-light border-0 shadow-none px-3 py-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={handleFocusOrClick}
                        readOnly={!user}
                    />
                </Form.Group>

                <Button
                    type={user ? 'submit' : 'button'}
                    variant="none"
                    className="btn-primary-modern w-100 d-flex justify-content-center align-items-center gap-2"
                    disabled={submitting}
                    onClick={!user ? handleFocusOrClick : undefined}
                >
                    <Send size={16} />
                    {submitting ? 'Submitting...' : user ? 'Submit Review' : 'Log in to review'}
                </Button>
            </Form>

            <LoginPromptModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
        </>
    );
};

export default ReviewForm;
