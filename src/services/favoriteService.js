import axiosInstance from '../config/axios.config';

export const favoriteService = {
    getAll: async () => {
        const response = await axiosInstance.get('/favorites');
        return response.data;
    },

    getByUser: async (userId) => {
        const response = await axiosInstance.get(`/favorites?userId=${userId}`);
        return response.data;
    },

    add: async (userId, cafeId) => {
        const response = await axiosInstance.post('/favorites', { userId, cafeId });
        return response.data;
    },

    remove: async (id) => {
        const response = await axiosInstance.delete(`/favorites/${id}`);
        return response.data;
    },
};
