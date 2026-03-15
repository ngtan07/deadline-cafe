import axiosInstance from '../config/axios.config';

export const locationService = {
    getAll: async () => {
        const response = await axiosInstance.get('/locations');
        return response.data;
    },
};
