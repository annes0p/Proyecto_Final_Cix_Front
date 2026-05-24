import { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import Navbar from './Navbar';

function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const cargarUsuarios = async () => {
      setLoadingUsers(true);
      try {
        const lista = await getUsers();
        setUsuarios(lista || []);
      } catch (error) {
        console.error("Error al cargar la lista protegida:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    cargarUsuarios();
  }, []);

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      {/* Menú lateral estático */}
      <Navbar />

      {/* Contenedor del contenido que se desplaza a la derecha del Navbar */}
      <div style={{ marginLeft: '240px', padding: '40px', boxSizing: 'border-box' }}>
        <header style={{ borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
          <h1>Panel de Control Integrado</h1>
          <p style={{ color: '#aaa' }}>Bienvenido al sistema de gestión de lubricantes CIXOIL S.A.C.</p>
        </header>

        {loadingUsers ? (
          <p style={{ color: '#aaa' }}>Cargando información del servidor...</p>
        ) : usuarios.length === 0 ? (
          <p style={{ color: '#aaa' }}>Conexión exitosa. No se encontraron usuarios en la base de datos.</p>
        ) : (
          <div>
            <h3 style={{ marginBottom: '15px', color: '#4dabf7' }}>Lista de Personal Autorizado</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1e1e1e', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#2a2a2a', textAlign: 'left', borderBottom: '2px solid #333' }}>
                  <th style={{ padding: '15px' }}>ID</th>
                  <th style={{ padding: '15px' }}>Username</th>
                  <th style={{ padding: '15px' }}>Email</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id || user.username} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '15px' }}>{user.id || '-'}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{user.username}</td>
                    <td style={{ padding: '15px', color: '#4dabf7' }}>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;