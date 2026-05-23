// src/App.jsx
import { useState, useEffect } from 'react';
import { getUsers } from './services/userService';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorApi, setErrorApi] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const listaDeUsuarios = await getUsers();
        setUsuarios(listaDeUsuarios || []);
      } catch (error) {
        setErrorApi("Error al conectar con la API de CIXOIL. Revisa la consola o el filtro de seguridad.");
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, []);

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: 'white' }}>
        <h2>Cargando sistema CIXOIL...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', color: 'white', backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1>Panel de Administración - CIXOIL</h1>
      <p style={{ color: '#aaa' }}>Usuarios Activos en la plataforma</p>

      {errorApi ? (
        <div style={{ padding: '15px', backgroundColor: '#4a1515', border: '1px solid #ff4444', borderRadius: '5px', color: '#ff9999' }}>
          {errorApi}
        </div>
      ) : usuarios.length === 0 ? (
        <p style={{ color: '#aaa' }}>Conexión exitosa, pero no se encontraron usuarios activos en la base de datos.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#1e1e1e' }}>
          <thead>
            <tr style={{ backgroundColor: '#2a2a2a', textAlign: 'left', borderBottom: '2px solid #333' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Username</th>
              <th style={{ padding: '12px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id || user.username} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '12px' }}>{user.id || '-'}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.username}</td>
                <td style={{ padding: '12px', color: '#4dabf7' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;