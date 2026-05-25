import { useState, useEffect } from 'react';
import { getLubricantes, crearLubricante } from '../services/lubricanteService';

function Lubricantes() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [viscosidad, setViscosidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    const cargarData = async () => {
      const data = await getLubricantes();
      setProductos(data);
      setLoading(false);
    };
    cargarData();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    const nuevoItem = { nombre, marca, viscosidad, precio: parseFloat(precio), stock: parseInt(stock) };
    await crearLubricante(nuevoItem);
    setProductos([...productos, { ...nuevoItem, id: productos.length + 1 }]);
    setNombre(''); setMarca(''); setViscosidad(''); setPrecio(''); setStock('');
  };

  return (
    <div style={{ display: 'flex', gap: '30px', flexDirection: 'column' }}>
      
      {/* Formulario de Stock */}
      <div style={{ backgroundColor: '#222733', padding: '25px', borderRadius: '12px', border: '1px solid #2d3548' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <i className="bi bi-plus-circle" style={{ color: '#64dfdf', fontSize: '1.2em' }}></i>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15em', fontWeight: '600' }}>Ingreso de Mercadería al Almacén</h3>
        </div>
        <form onSubmit={handleGuardar} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', alignItems: 'end' }}>
          <div>
            <label style={labelStyle}>Descripción del Lubricante</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} placeholder="Ej. Helix Ultra" />
          </div>
          <div>
            <label style={labelStyle}>Fabricante</label>
            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required style={inputStyle} placeholder="Ej. Shell" />
          </div>
          <div>
            <label style={labelStyle}>Índice Viscosidad</label>
            <input type="text" value={viscosidad} onChange={(e) => setViscosidad(e.target.value)} required style={inputStyle} placeholder="5W-40" />
          </div>
          <div>
            <label style={labelStyle}>Precio Unitario</label>
            <input type="number" step="0.1" value={precio} onChange={(e) => setPrecio(e.target.value)} required style={inputStyle} placeholder="45.00" />
          </div>
          <div>
            <label style={labelStyle}>Unidades</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required style={inputStyle} placeholder="10" />
          </div>
          <button type="submit" style={{ padding: '12px', backgroundColor: '#64dfdf', color: '#1a1d24', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9M' }}>
            Registrar Stock
          </button>
        </form>
      </div>

      {/* Tabla limpia de Inventario */}
      <div style={{ backgroundColor: '#222733', padding: '25px', borderRadius: '12px', border: '1px solid #2d3548' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <i className="bi bi-box-seam" style={{ color: '#64dfdf', fontSize: '1.15em' }}></i>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15em', fontWeight: '600' }}>Inventario de Lubricantes Disponible</h3>
        </div>
        
        {loading ? (
          <p style={{ color: '#94a3b8' }}>Cargando catálogo...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a1d24', textAlign: 'left', borderBottom: '1px solid #2d3548' }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Línea</th>
                <th style={thStyle}>Marca</th>
                <th style={thStyle}>Especificación SAE</th>
                <th style={thStyle}>Precio Venta</th>
                <th style={thStyle}>Estado Almacén</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id} style={{ borderBottom: '1px solid #2d3548', transition: 'background 0.2s' }}>
                  <td style={tdStyle}>#{prod.id}</td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#fff' }}>{prod.nombre}</td>
                  <td style={tdStyle}>{prod.marca}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{prod.viscosidad}</td>
                  <td style={{ ...tdStyle, color: '#64dfdf', fontWeight: '600' }}>S/. {prod.precio.toFixed(2)}</td>
                  <td style={tdStyle}>
                    <div style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: prod.stock > 10 ? '#142c26' : '#3c1e22', 
                      color: prod.stock > 10 ? '#a7f3d0' : '#fca5a5',
                      padding: '5px 12px', borderRadius: '6px', fontSize: '0.85em', fontWeight: '600'
                    }}>
                      <i className={prod.stock > 10 ? "bi bi-check-circle-fill" : "bi bi-exclamation-triangle-fill"}></i>
                      {prod.stock} UNID
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const labelStyle = { color: '#94a3b8', fontSize: '0.85em', display: 'block', marginBottom: '6px', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a1d24', color: '#fff', boxSizing: 'border-box', outline: 'none' };
const thStyle = { padding: '14px 16px', color: '#cbd5e1', fontWeight: '600' };
const tdStyle = { padding: '14px 16px', color: '#cbd5e1' };

export default Lubricantes;