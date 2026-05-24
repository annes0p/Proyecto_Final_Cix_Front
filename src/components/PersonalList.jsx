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
        console.warn("Cargando personal simulado para desarrollo.");
        setUsuarios([
          { id: 1, username: 'soph_cerna', email: 'soph@cixoil.com' },
          { id: 2, username: 'moxi_bestie', email: 'moxi@cixoil.com' },
          { id: 3, username: 'cristhie_manager', email: 'cristhie@cixoil.com' }
        ]);
      } finally {
        setLoadingUsers(false);
      }
    };
    cargarUsuarios();
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: '#e5a93b', fontSize: '1.2em', fontWeight: '600' }}>
        👥 Registro de Personal y Operadores Activos
      </h3>
      
      {loadingUsers ? (
        <p style={{ color: '#808090' }}>Sincronizando operadores...</p>
      ) : (
        <table style={{ 
          width: '100%', borderCollapse: 'collapse', backgroundColor: '#18181c', 
          borderRadius: '8px', overflow: 'hidden', border: '1px solid #2e2e38'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#1f1f26', textAlign: 'left', borderBottom: '2px solid #2e2e38' }}>
              <th style={{ padding: '15px', color: '#cbd5e1' }}>ID Operador</th>
              <th style={{ padding: '15px', color: '#cbd5e1' }}>Nombre de Usuario</th>
              <th style={{ padding: '15px', color: '#cbd5e1' }}>Email Corporativo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id || user.username} style={{ borderBottom: '1px solid #23232a' }}>
                <td style={{ padding: '15px', color: '#a0a0b0' }}>#{user.id || '-'}</td>
                <td style={{ padding: '15px', fontWeight: '600', color: '#fff' }}>{user.username}</td>
                <td style={{ padding: '15px', color: '#e5a93b' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PersonalList;