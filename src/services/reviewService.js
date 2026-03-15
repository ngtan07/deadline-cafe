import axiosInstance from '../config/axios.config';

export const reviewService = {
    getAll: async () => {
        const response = await axiosInstance.get('/reviews');
        return response.data;
    },
};
