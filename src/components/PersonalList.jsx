import { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';

function PersonalList() {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const cargarUsuarios = async () => {
      setLoadingUsers(true);
      try {
        const lista = await getUsers();
        setUsuarios(lista || []);
      } catch (error) {
        console.warn("Entorno de desarrollo: Cargando nómina simulada de operadores.");
        
        // Datos de prueba
        setUsuarios([
          { id: 1, username: 'soph_cerna', email: 'soph@cixoil.com', rol: 'Administrador' },
          { id: 2, username: 'moxi_bestie', email: 'moxi@cixoil.com', rol: 'Técnico Especialista' },
          { id: 3, username: 'cristhie_manager', email: 'cristhie@cixoil.com', rol: 'Gerente General' }
        ]);
      } finally {
        setLoadingUsers(false);
      }
    };
    cargarUsuarios();
  }, []);

  return (
    <div style={{ backgroundColor: '#222733', padding: '25px', borderRadius: '12px', border: '1px solid #2d3548' }}>
      
      {/* Encabezado con Icono Profesional */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
        <i className="bi bi-person-vcard" style={{ color: '#64dfdf', fontSize: '1.3em' }}></i>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15em', fontWeight: '600' }}>
          Personal de Credenciales Autorizadas
        </h3>
      </div>
      
      {loadingUsers ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
          <i className="bi bi-arrow-clockwise" style={{ animation: 'spin 1s linear infinite', fontSize: '1.2em' }}></i>
          <span>Consultando base de datos interna...</span>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a1d24', textAlign: 'left', borderBottom: '1px solid #2d3548' }}>
              <th style={thStyle}>ID Credencial</th>
              <th style={thStyle}>Nombre de Usuario</th>
              <th style={thStyle}>Canal de Comunicación</th>
              <th style={thStyle}>Rol Operativo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id || user.username} style={{ borderBottom: '1px solid #2d3548', transition: 'background 0.2s' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#64748b' }}>
                  #{user.id || 'N/A'}
                </td>
                <td style={{ ...tdStyle, fontWeight: '600', color: '#fff' }}>
                  <i className="bi bi-person" style={{ marginRight: '8px', color: '#94a3b8' }}></i>
                  {user.username}
                </td>
                <td style={{ ...tdStyle, color: '#64dfdf' }}>
                  <i className="bi bi-envelope-at" style={{ marginRight: '8px', color: '#2d3548' }}></i>
                  {user.email}
                </td>
                <td style={tdStyle}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    backgroundColor: '#1e293b', 
                    color: '#cbd5e1', 
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    fontSize: '0.85em',
                    fontWeight: '500'
                  }}>
                    <i className="bi bi-shield-lock" style={{ color: '#4ea8de', fontSize: '0.9em' }}></i>
                    {user.rol || 'Empleado'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = { padding: '14px 16px', color: '#cbd5e1', fontWeight: '600' };
const tdStyle = { padding: '14px 16px', color: '#cbd5e1', verticalAlign: 'middle' };

export default PersonalList;