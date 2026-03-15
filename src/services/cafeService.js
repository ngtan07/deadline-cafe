import axiosInstance from '../config/axios.config';

export const cafeService = {
    getAll: async () => {
        const response = await axiosInstance.get('/cafes');
        return response.data;
    },

    getById: async (id) => {
        const response = await axiosInstance.get(`/cafes/${id}`);
        return response.data;
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
