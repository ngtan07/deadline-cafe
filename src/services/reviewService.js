import axiosInstance from '../config/axios.config';
import { userService } from './userService';

export const reviewService = {
    getAll: async () => {
        const response = await axiosInstance.get('/reviews');
        return response.data;
    },

    /**
     * Lấy reviews theo cafeId, sau đó enrich từng review với thông tin user.
     * json-server v1.x không hỗ trợ _expand, nên tự join thủ công.
     */
    getByCafeExpandUser: async (cafeId) => {
        // Fetch all reviews and filter manually because json-server v1.x 
        // has issues with numeric vs string IDs in query parameters.
        const response = await axiosInstance.get('/reviews');
        const allReviews = response.data;
        const reviews = allReviews.filter(r => String(r.cafeId) === String(cafeId));

        // Fetch all users once, then map by id
        const usersRes = await axiosInstance.get('/users');
        const usersMap = {};
        usersRes.data.forEach(u => { usersMap[u.id] = u; });

        return reviews.map(review => ({
            ...review,
            user: usersMap[review.userId] || null,
        }));
    },

    create: async (data) => {
        const response = await axiosInstance.post('/reviews', data);
        return response.data;
    },
};
