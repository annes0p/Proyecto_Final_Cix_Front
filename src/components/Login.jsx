// src/components/Login.jsx
import { useState } from 'react';
import { login } from '../services/authService';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoadingLogin(true);

    try {
      await login(username, password);
      onLoginSuccess(); 
    } catch (error) {
      setLoginError("Credenciales incorrectas o servidor inaccesible.");
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#0f0f12', // Fondo oscuro tipo asfalto profundo
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <form onSubmit={handleSubmitLogin} style={{ 
        backgroundColor: '#16161a', 
        padding: '40px', 
        borderRadius: '12px', 
        border: '1px solid #d97706', // Borde ámbar/aceite
        boxShadow: '0 8px 30px rgba(217, 119, 6, 0.15)', // Resplandor dorado tenue
        width: '350px' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#f59e0b', margin: 0, fontSize: '1.8em', letterSpacing: '2px', fontWeight: '800' }}>
            CIXOIL S.A.C.<span style={{ fontSize: '0.8em' }}></span>
          </h2>
          <p style={{ color: '#8c8c9e', fontSize: '0.85em', marginTop: '5px' }}>
            SISTEMA DE GESTIÓN Y RECOMENDACIÓN DE LUBRICANTES
          </p>
        </div>

        {loginError && (
          <div style={{ 
            backgroundColor: '#2d1414', 
            color: '#fca5a5', 
            padding: '12px', 
            borderRadius: '6px', 
            fontSize: '0.85em', 
            marginBottom: '20px', 
            border: '1px solid #7f1d1d' 
          }}>
            ⚠️ {loginError}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '6px', fontSize: '0.9em', fontWeight: '600' }}>
            Usuario Industrial
          </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ej. admin_cixoil"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #3f3f46', 
              backgroundColor: '#202024', 
              color: 'white', 
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '6px', fontSize: '0.9em', fontWeight: '600' }}>
            Contraseña
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #3f3f46', 
              backgroundColor: '#202024', 
              color: 'white', 
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loadingLogin}
          style={{ 
            width: '100%', 
            padding: '14px', 
            borderRadius: '6px', 
            border: 'none', 
            backgroundColor: '#d97706', // Oro industrial / Aceite de motor
            color: '#000', // Texto negro para alto contraste
            fontWeight: 'bold', 
            cursor: loadingLogin ? 'not-allowed' : 'pointer', 
            fontSize: '1em',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => !loadingLogin && (e.target.style.backgroundColor = '#f59e0b')}
          onMouseOut={(e) => !loadingLogin && (e.target.style.backgroundColor = '#d97706')}
        >
          {loadingLogin ? 'Sincronizando Motor...' : 'Encender Sistema'}
        </button>
      </form>
    </div>
  );
}

export default Login;