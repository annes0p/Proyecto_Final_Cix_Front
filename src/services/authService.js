import api from './api';

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });

        console.log("Respuesta del login:", response.data);

        const token = response.data.data?.token || response.data.token;

        if (token) {

            localStorage.setItem('token', token);

    }

    return response.data;
    } catch (error) {
        console.error("Error en el servicio de autenticación:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
};