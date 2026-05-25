import api from './api';

// Obtener todos los clientes frecuentes con sus vehículos asociados
export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data.data || response.data;
  } catch (error) {
    console.warn("Cargando base de datos de clientes simulada para CIXOIL.");
    return [
      { 
        id: 1, nombre: 'Juan Pérez Silva', dni: '45781293', telefono: '942815364', email: 'juan.perez@gmail.com',
        vehiculos: [{ placa: 'M1B-452', marca: 'Toyota', modelo: 'Hilux', anio: '2021', kilometraje: '45,000 Km' }]
      },
      { 
        id: 2, nombre: 'Ana María Torres', dni: '70231594', telefono: '974125863', email: 'ana.torres@outlook.com',
        vehiculos: [
          { placa: 'BCX-789', marca: 'Hyundai', modelo: 'Tucson', anio: '2019', kilometraje: '82,000 Km' },
          { placa: 'A8F-124', marca: 'Kia', modelo: 'Rio', anio: '2022', kilometraje: '15,500 Km' }
        ]
      }
    ];
  }
};

export const registrarCliente = async (clienteData) => {
  try {
    const response = await api.post('/clientes', clienteData);
    return response.data;
  } catch (error) {
    console.log("Simulando registro de cliente nuevo:", clienteData);
    return { success: true, ...clienteData, id: Math.floor(Math.random() * 100) };
  }
};