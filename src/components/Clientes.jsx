// src/components/Clientes.jsx
import { useState, useEffect } from 'react';
import { getClientes, registrarCliente } from '../services/clienteService';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados del Formulario de Registro
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  
  // Datos del primer vehículo a asociar
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');

  useEffect(() => {
    const cargarClientes = async () => {
      const data = await getClientes();
      setClientes(data);
      setLoading(false);
    };
    cargarClientes();
  }, []);

  const handleGuardarCliente = async (e) => {
    e.preventDefault();
    const nuevoCliente = {
      nombre, dni, telefono, email,
      vehiculos: placa ? [{ placa: placa.toUpperCase(), marca, modelo, anio: '2020', kilometraje: '0' }] : []
    };

    await registrarCliente(nuevoCliente);
    setClientes([...clientes, { ...nuevoCliente, id: clientes.length + 1 }]);
    
    // Limpiar formulario
    setNombre(''); setDni(''); setTelefono(''); setEmail('');
    setPlaca(''); setMarca(''); setModelo('');
  };

  // 🔍 Filtro inteligente por Nombre, DNI o Placa del Vehículo
  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    c.dni.includes(filtro) ||
    c.vehiculos.some(v => v.placa.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      
      {/* BUSCADOR DE TIEMPO REAL */}
      <div style={{ backgroundColor: '#222733', padding: '20px', borderRadius: '12px', border: '1px solid #2d3548' }}>
        <label style={{ color: '#64dfdf', fontSize: '0.95em', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
          🔍 Localizador Rápido de Clientes y Flotas
        </label>
        <input 
          type="text" 
          placeholder="Buscar por Nombre, DNI o Placa del vehículo (Ej: M1B-452)..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a1d24', color: '#fff', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', alignItems: 'start' }}>
        
        {/* FORMULARIO DE REGISTRO */}
        <form onSubmit={handleGuardarCliente} style={{ backgroundColor: '#222733', padding: '25px', borderRadius: '12px', border: '1px solid #2d3548', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 style={{ margin: 0, color: '#64dfdf', fontSize: '1.15em' }}>👤 Ficha de Cliente Nuevo</h3>
          
          <input type="text" placeholder="Nombre Completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="DNI / RUC" value={dni} onChange={(e) => setDni(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Teléfono Celular" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          
          <h4 style={{ margin: '10px 0 0 0', color: '#4ea8de', fontSize: '0.95em' }}>🚗 Vincular Vehículo Inicial</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="text" placeholder="N° Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} style={inputStyle} />
          </div>
          <input type="text" placeholder="Modelo del Vehículo" value={modelo} onChange={(e) => setModelo(e.target.value)} style={inputStyle} />

          <button type="submit" style={{ padding: '12px', backgroundColor: '#64dfdf', color: '#1a1d24', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '5px' }}>
            Dar de Alta Cliente
          </button>
        </form>

        {/* LISTADO DE CLIENTES Y VEHÍCULOS */}
        <div style={{ backgroundColor: '#222733', padding: '25px', borderRadius: '12px', border: '1px solid #2d3548' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#64dfdf', fontSize: '1.15em' }}>👥 Clientes Frecuentes Registrados</h3>
          
          {loading ? (
            <p style={{ color: '#94a3b8' }}>Consultando registros corporativos...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {clientesFiltrados.map(cliente => (
                <div key={cliente.id} style={{ backgroundColor: '#1a1d24', padding: '15px', borderRadius: '8px', border: '1px solid #2d3548' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: '#fff' }}>{cliente.nombre}</span>
                    <span style={{ color: '#64dfdf', fontSize: '0.85em', fontWeight: '600' }}>DNI: {cliente.dni}</span>
                  </div>
                  <div style={{ fontSize: '0.85em', color: '#94a3b8', marginBottom: '10px' }}>
                    📞 {cliente.telefono} | ✉️ {cliente.email || 'No asignado'}
                  </div>
                  
                  {/* Vehículos del Cliente */}
                  <div style={{ borderTop: '1px dashed #2d3548', paddingTop: '8px' }}>
                    <span style={{ fontSize: '0.8em', color: '#4ea8de', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Unidades Vinculadas:</span>
                    {cliente.vehiculos.length === 0 ? (
                      <span style={{ fontSize: '0.8em', color: '#64748b' }}>Sin vehículos registrados</span>
                    ) : (
                      cliente.vehiculos.map((v, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', color: '#cbd5e1', backgroundColor: '#222733', padding: '6px 10px', borderRadius: '4px', marginTop: '4px' }}>
                          <span>🚗 {v.marca} {v.modelo}</span>
                          <span style={{ color: '#4ea8de', fontWeight: '700' }}>{v.placa}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a1d24', color: '#fff', boxSizing: 'border-box', outline: 'none' };

export default Clientes;