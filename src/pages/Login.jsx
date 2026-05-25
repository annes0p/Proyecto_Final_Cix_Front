import { useContext, useState } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoadingLogin(true);

    try {
        const data = await api.post("/auth/login", {
            identifier,
            password,
        });
        
        const {auth, user} = data.data.data;

        login(user, auth.accessToken, auth.refreshToken);

        // navigate("/dashboard");
    } catch (e) {
        setLoginError("Credenciales inválidas");
    } finally {
        setLoadingLogin(false);
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#1a1d24', // Gris oscuro relajado (no negro puro)
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <form onSubmit={handleSubmitLogin} style={{ 
        backgroundColor: '#222733', // Tarjeta grafito suave
        padding: '40px', 
        borderRadius: '16px', 
        border: '1px solid #2d3548', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)', 
        width: '350px' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#64dfdf', margin: 0, fontSize: '1.8em', letterSpacing: '1px', fontWeight: '700' }}>
            CIXOIL <span style={{ fontSize: '0.8em' }}>📊</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85em', marginTop: '6px', fontWeight: '500' }}>
            SISTEMA DE GESTIÓN INTEGRAL
          </p>
        </div>

        {loginError && (
          <div style={{ 
            backgroundColor: '#382226', 
            color: '#fca5a5', 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '0.85em', 
            marginBottom: '20px', 
            border: '1px solid #6b21a8' 
          }}>
            ⚠️ {loginError}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '6px', fontSize: '0.9em', fontWeight: '500' }}>
            Usuario
          </label>
          <input 
            type="text" 
            // value={username} 
            value={identifier} 
            // onChange={(e) => setUsername(e.target.value)}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="Introduce tu usuario"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #374151', 
              backgroundColor: '#1a1d24', 
              color: '#f8fafc', 
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: '0.95em'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '6px', fontSize: '0.9em', fontWeight: '500' }}>
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
              borderRadius: '8px', 
              border: '1px solid #374151', 
              backgroundColor: '#1a1d24', 
              color: '#f8fafc', 
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: '0.95em'
            }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loadingLogin}
          style={{ 
            width: '100%', 
            padding: '14px', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: '#4ea8de', // Azul cobalto suave, muy amigable
            color: '#fff', 
            fontWeight: '600', 
            cursor: loadingLogin ? 'not-allowed' : 'pointer', 
            fontSize: '1em',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            transition: 'background 0.2s',
            boxShadow: '0 4px 12px rgba(78, 168, 222, 0.2)'
          }}
          onMouseOver={(e) => !loadingLogin && (e.target.style.backgroundColor = '#56b4eb')}
          onMouseOut={(e) => !loadingLogin && (e.target.style.backgroundColor = '#4ea8de')}
        >
          {loadingLogin ? 'Conectando...' : 'Ingresar al Sistema'}
        </button>

        {/* <button 
          type="button"
          onClick={() => {
            localStorage.setItem('token', 'token_falso_de_prueba_cixoil');
            onLoginSuccess();
          }}
          style={{ 
            width: '100%', 
            padding: '11px', 
            borderRadius: '8px', 
            border: '1px solid #4b5563', 
            backgroundColor: 'transparent',
            color: '#9ca3af',
            cursor: 'pointer', 
            fontSize: '0.85em',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.target.style.borderColor = '#9ca3af'; e.target.style.color = '#fff'; }}
          onMouseOut={(e) => { e.target.style.borderColor = '#4b5563'; e.target.style.color = '#9ca3af'; }}
        >
          Omitir e Ir al Dashboard (Desarrollo)
        </button> */}
      </form>
    </div>
  );
}

export default Login;