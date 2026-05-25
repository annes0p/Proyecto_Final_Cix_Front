import { useState, useEffect } from 'react';
import { getClientes, registrarCliente } from '../services/clienteService';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  // Formulario
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');

  useEffect(() => {
    const cargarData = async () => {
      const data = await getClientes();
      setClientes(data);
      setLoading(false);
    };
    cargarData();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    const nuevo = {
      nombre, dni, telefono, email,
      vehiculos: placa ? [{ placa: placa.toUpperCase(), marca, modelo, anio: '2026', kilometraje: '0' }] : []
    };
    await registrarCliente(nuevo);
    setClientes([...clientes, { ...nuevo, id: clientes.length + 1 }]);
    setNombre(''); setDni(''); setTelefono(''); setEmail(''); setPlaca(''); setMarca(''); setModelo('');
  };

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    c.dni.includes(filtro) ||
    c.vehiculos.some(v => v.placa.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Buscador Estilizado */}
      <div style={{ backgroundColor: '#222733', padding: '20px 25px', borderRadius: '12px', border: '1px solid #2d3548', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <i className="bi bi-search" style={{ color: '#64dfdf', fontSize: '1.2em' }}></i>
        <input 
          type="text" 
          placeholder="Filtrar por nombres, número de DNI o placa de rodaje..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ width: '100%', padding: '8px 0', border: 'none', backgroundColor: 'transparent', color: '#fff', outline: 'none', fontSize: '1em' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Formulario de Alta */}
        <form onSubmit={handleGuardar} style={{ backgroundColor: '#222733', padding: '30px', borderRadius: '12px', border: '1px solid #2d3548', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <i className="bi bi-person-plus" style={{ color: '#64dfdf', fontSize: '1.2em' }}></i>
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.1em', fontWeight: '600' }}>Nueva Ficha de Registro</h3>
          </div>
          
          <input type="text" placeholder="Nombre completo del titular" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Documento de Identidad (DNI/RUC)" value={dni} onChange={(e) => setDni(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Teléfono de contacto" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="Correo electrónico corporativo" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', borderTop: '1px solid #2d3548', paddingTop: '15px' }}>
            <i className="bi bi-ev-front" style={{ color: '#4ea8de', fontSize: '1.1em' }}></i>
            <h4 style={{ margin: 0, color: '#4ea8de', fontSize: '0.95em', fontWeight: '600' }}>Vincular Unidad Inicial</h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input type="text" placeholder="Código de Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Fabricante / Marca" value={marca} onChange={(e) => setMarca(e.target.value)} style={inputStyle} />
          </div>
          <input type="text" placeholder="Línea / Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} style={inputStyle} />

          <button type="submit" style={{ padding: '14px', backgroundColor: '#64dfdf', color: '#1a1d24', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95em', marginTop: '10px' }}>
            Registrar Cliente
          </button>
        </form>

        {/* Tarjetas de Clientes Recurrentes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <i className="bi bi-collection" style={{ color: '#64dfdf' }}></i>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1em', fontWeight: '600' }}>Registros de Clientes Activos</h3>
          </div>
          
          {loading ? (
            <p style={{ color: '#94a3b8' }}>Buscando registros...</p>
          ) : (
            clientesFiltrados.map(cliente => (
              <div key={cliente.id} style={{ backgroundColor: '#222733', padding: '20px', borderRadius: '12px', border: '1px solid #2d3548' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600', color: '#fff', fontSize: '1.05em' }}>{cliente.nombre}</span>
                  <span style={{ color: '#64dfdf', fontSize: '0.8em', backgroundColor: '#1e293b', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>
                    ID: {cliente.dni}
                  </span>
                </div>
                
                <div style={{ fontSize: '0.85em', color: '#94a3b8', display: 'flex', gap: '20px', marginBottom: '15px' }}>
                  <span><i className="bi bi-telephone" style={{ marginRight: '6px' }}></i>{cliente.telefono}</span>
                  <span><i className="bi bi-envelope" style={{ marginRight: '6px' }}></i>{cliente.email || 'Sin correo'}</span>
                </div>
                
                {/* Lista de vehículos modular */}
                <div style={{ borderTop: '1px solid #2d3548', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.8em', color: '#4ea8de', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                    Flota Autorizada
                  </span>
                  {cliente.vehiculos.map((v, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9em', color: '#cbd5e1', backgroundColor: '#1a1d24', padding: '10px 14px', borderRadius: '8px', marginTop: '6px' }}>
                      <span><i className="bi bi-wrench" style={{ marginRight: '8px', color: '#64748b' }}></i>{v.marca} {v.modelo}</span>
                      <span style={{ color: '#4ea8de', fontWeight: '700', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{v.placa}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a1d24', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '0.9em' };

export default Clientes;