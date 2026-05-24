import api from './api';

export const getLubricantes = async () => {
    try {
        const response = await api.get('/lubricantes');
        return response.data.data || response.data;
    } catch (error) {
        console.warn("Cargando catálogo simulado de CIXOIL para desarrollo visual.");

        return [
            { id: 1, nombre: 'Helix Ultra', marca: 'Shell', viscosidad: '5W-40', tipo: 'Sintético', precio: 45.00, stock: 24 },
            { id: 2, nombre: 'Magnatec', marca: 'Castrol', viscosidad: '10W-40', tipo: 'Semi-Sintético', precio: 38.50, stock: 15 },
            { id: 3, nombre: 'Mobil 1 Super', marca: 'Mobil', viscosidad: '0W-20', tipo: 'Sintético', precio: 52.00, stock: 8 },
            { id: 4, nombre: 'Rimula R4 X', marca: 'Shell', viscosidad: '15W-40', tipo: 'Mineral (Alto Rendimiento)', precio: 32.00, stock: 40 }
        ];
    }
};

export const crearLubricante = async (data) => {
    try {
        const response = await api.post('/lubricantes', data);
        return response.data;
    } catch (error) {
        console.log("Simulando guardado de lubricante en modo desarrollo:", data);
        return { success: true, ...data, id: Math.floor(Math.random() * 100) };
    }
};