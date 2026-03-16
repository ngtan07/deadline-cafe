import axiosInstance from '../config/axios.config';

export const authService = {
    login: async (email, password) => {
        // Query users by email and password
        const response = await axiosInstance.get(`/users?email=${email}&password=${password}`);
        const users = response.data;
        if (users && users.length > 0) {
            return users[0]; // Return the matched user
        } else {
            throw new Error("Email hoặc mật khẩu không chính xác.");
        }
    },
    
    register: async (userData) => {
        // Check if email already exists
        const checkResponse = await axiosInstance.get(`/users?email=${userData.email}`);
        if (checkResponse.data && checkResponse.data.length > 0) {
            throw new Error("Email này đã được sử dụng.");
        }

        // Default role is user
        const newUser = {
            ...userData,
            role: 'user',
            avatar: `https://i.pravatar.cc/150?u=${userData.name.replace(/\s/g, '').toLowerCase()}` // Generate a random avatar based on name
        };

        const response = await axiosInstance.post('/users', newUser);
        return response.data;
    }
};
