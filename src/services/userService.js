import api from './api';

export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios'); 
    return response.data.data; 
  } catch (error) {
    console.error("Error al obtener usuarios en el servicio:", error);
    throw error;
  }
};