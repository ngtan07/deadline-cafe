import axiosInstance from '../config/axios.config';

export const authService = {
    login: async (email, password) => {
        // Query users by email first to avoid json-server beta multi-param query issues
        const response = await axiosInstance.get(`/users?email=${encodeURIComponent(email)}`);
        const users = response.data;
        if (users && users.length > 0) {
            const user = users.find(u => u.password === password);
            if (user) {
                return user; // Return the matched user
            } else {
                throw new Error("Mật khẩu không chính xác.");
            }
        } else {
            throw new Error("Email không tồn tại.");
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
