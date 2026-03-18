import axiosInstance from '../config/axios.config';
import { reviewService } from './reviewService';

export const cafeService = {
    getAll: async () => {
        const response = await axiosInstance.get('/cafes');
        return response.data;
    },

    getById: async (id) => {
        const response = await axiosInstance.get(`/cafes/${id}`);
        return response.data;
    },

    /**
     * Lấy tất cả cafes kèm rating được tính từ reviews thực tế của người dùng.
     * Nếu quán chưa có review nào, rating = null.
     */
    getAllWithRating: async () => {
        const [cafes, allReviews] = await Promise.all([
            axiosInstance.get('/cafes').then(r => r.data),
            reviewService.getAll(),
        ]);

        return cafes.map(cafe => {
            const cafeReviews = allReviews.filter(r => String(r.cafeId) === String(cafe.id));
            const computedRating = reviewService.computeAverageRating(cafeReviews);
            return { ...cafe, rating: computedRating ?? cafe.rating };
        });
    },

    /**
     * Lấy 1 cafe kèm rating được tính từ reviews.
     * Nếu chưa có review, giữ nguyên rating gốc trong db.
     */
    getByIdWithRating: async (id) => {
        const [cafe, allReviews] = await Promise.all([
            axiosInstance.get(`/cafes/${id}`).then(r => r.data),
            reviewService.getAll(),
        ]);

        const cafeReviews = allReviews.filter(r => String(r.cafeId) === String(id));
        const computedRating = reviewService.computeAverageRating(cafeReviews);
        return { ...cafe, rating: computedRating ?? cafe.rating };
    },

    create: async (data) => {
        const response = await axiosInstance.post('/cafes', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await axiosInstance.put(`/cafes/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await axiosInstance.delete(`/cafes/${id}`);
        return response.data;
    },
};
