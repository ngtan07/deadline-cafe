import { Star } from 'lucide-react';
import React, { useState } from 'react'

const StarRatingPicker = ({ rating, onChange }) => {
    const [hovered, setHovered] = useState(0);

    return (
        <div className="d-flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={24}
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

export default StarRatingPicker
