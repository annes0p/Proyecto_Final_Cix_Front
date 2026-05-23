import api from './api';

export const getUsers = async () => {
    try {
        const response = await api.get('/usuarios');
        console.log("Estructura completa de tu backend:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener usuarios desde el backend:", error);
        throw error;
        }
};