import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Star, Send, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

const CafeReviews = () => {
  const { id } = useParams();
  const { data: cafe, loading: cafeLoading } = useFetch(`http://localhost:3000/cafes/${id}`);
  const { data: initialReviews, loading: reviewsLoading } = useFetch(`http://localhost:3000/reviews?cafeId=${id}&_expand=user`);
  
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (initialReviews) {
      setReviews(initialReviews);
    }
  }, [initialReviews]);

  if (cafeLoading || reviewsLoading) return <Container className="py-5 text-center">Đang tải đánh giá...</Container>;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview = {
      cafeId: id,
      userId: "1",
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const res = await axios.post('http://localhost:3000/reviews', newReview);
      const userRes = await axios.get(`http://localhost:3000/users/1`);
      const reviewWithUser = { ...res.data, user: userRes.data };

      setReviews([reviewWithUser, ...reviews]);
      setNewComment('');
      setNewRating(5);
    } catch (err) {
      alert("Lỗi khi gửi đánh giá.");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <Link to={`/cafe/${id}`} className="text-decoration-none text-muted mb-4 d-inline-block">
        <ArrowLeft size={20} className="me-2" />
        Quay lại {cafe?.name}
      </Link>
      
      <h2 className="fw-bold mb-4">Tất cả bài đánh giá ({reviews.length})</h2>

      <Form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-4 shadow-sm mb-5 border-0">
        <h6 className="fw-bold mb-3">Để lại đánh giá của bạn</h6>
        <div className="d-flex mb-3 gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={24} 
              className="cursor-pointer"
              color={star <= (hoverRating || newRating) ? "#F59E0B" : "#DDD"}
              fill={star <= (hoverRating || newRating) ? "#F59E0B" : "none"}
              onClick={() => setNewRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              style={{ cursor: 'pointer', transition: '0.2s' }}
            />
          ))}
        </div>
        <Form.Group className="mb-3">
          <Form.Control 
            as="textarea" 
            rows={4} 
            placeholder="Chia sẻ trải nghiệm của bạn..."
            style={{ borderRadius: '12px', resize: 'none' }}
            className="bg-light border-0 shadow-none px-3 py-3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="none" className="btn-primary-modern w-100 d-flex justify-content-center align-items-center gap-2">
          <Send size={18} /> Gửi đánh giá
        </Button>
      </Form>

      <div className="d-flex flex-column gap-3">
        {reviews.map((review) => (
          <div key={review.id} className="d-flex gap-3">
            <img 
              src={review.user?.avatar || "https://i.pravatar.cc/150?u=default"} 
              alt="avatar" 
              className="rounded-circle object-fit-cover shadow-sm"
              width={48} height={48}
            />
            <div className="w-100">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold">{review.user?.name || "Người dùng ẩn danh"}</span>
                <span className="text-muted small">{review.date}</span>
              </div>
              <div className="d-flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} color="#F59E0B" fill={i < review.rating ? "#F59E0B" : "none"} />
                ))}
              </div>
              <div className="bubble-review shadow-sm border-0">
                {review.comment}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CafeReviews;
