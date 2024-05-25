import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3030', // Substitua pelo endereço do seu backend - Authentication-NestJS
});

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUsers = async (token) => {
    try {
        const response = await api.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (user, token) => {
    try {
        const response = await api.post('/users', user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, user, token) => {
    try {
        const response = await api.put(`/users/${id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id, token) => {
    try {
        const response = await api.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
