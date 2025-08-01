import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // allow cookies (HttpOnly)
});

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const changePassword = async (
    oldPassword: string,
    newPassword: string
) => {
    const response = await api.post('/auth/change-password', {
        oldPassword,
        newPassword,
    });
    return response.data;
};
