import axiosInstance from '../config/axios.config';

export const reviewService = {
    getAll: async () => {
        const response = await axiosInstance.get('/reviews');
        return response.data;
    },
    getByCafeExpandUser: async (cafeId) => {
        const response = await axiosInstance.get(`/reviews?cafeId=${cafeId}&_expand=user`);
        return response.data;
    },
    create: async (data) => {
        const response = await axiosInstance.post('/reviews', data);
        return response.data;
    }
};
