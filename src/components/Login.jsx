import { useState } from 'react';
import { login } from '../services/authService';
import { useTheme } from '../context/ThemeContext';

function Login({ onLoginSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const { colors } = useTheme();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoadingLogin(true);

    try {
      await login(identifier, password);
      onLoginSuccess(); 
    } catch (error) {
      setLoginError("Las credenciales ingresadas no corresponden a un operador autorizado.");
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
      backgroundColor: colors.fondo,
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{ 
        backgroundColor: colors.tarjeta, 
        padding: '45px 40px', 
        borderRadius: '24px',
        border: `1px solid ${colors.borde}`, 
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)', 
        width: '380px',
        boxSizing: 'border-box'
      }}>
        
        {/* Cabecera Minimalista */}
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ color: colors.textoFuerte, margin: 0, fontSize: '1.6em', fontWeight: '700', tracking: '-0.5px' }}>
            CIXOIL <span style={{ color: '#64dfdf', fontWeight: '700' }}>S.A.C.</span>
          </h2>
          <p style={{ color: colors.textoSuave, fontSize: '0.88em', marginTop: '6px', lineHeight: '1.4' }}>
            Introduce tus credenciales para acceder a la terminal de control comercial.
          </p>
        </div>

        {loginError && (
          <div style={{ 
            backgroundColor: '#fef2f2', 
            color: '#991b1b', 
            padding: '12px 16px', 
            borderRadius: '10px', 
            fontSize: '0.85em', 
            marginBottom: '20px', 
            border: '1px solid #fee2e2',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="bi bi-exclamation-circle-fill"></i>
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Input de Identificador */}
          <div>
            <label style={{ color: colors.texto, display: 'block', marginBottom: '8px', fontSize: '0.88em', fontWeight: '500' }}>
              Identificador del Operador
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <i className="bi bi-shield-lock" style={{ position: 'absolute', left: '14px', color: colors.textoSuave }}></i>
              <input 
                type="text" 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder="Usuario, correo o DNI"
                style={{ ...inputStyle, backgroundColor: colors.inputFondo, color: colors.textoFuerte, borderColor: colors.borde }}
              />
            </div>
          </div>

          {/* Input de Contraseña */}
          <div>
            <label style={{ color: colors.texto, display: 'block', marginBottom: '8px', fontSize: '0.88em', fontWeight: '500' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <i className="bi bi-key" style={{ position: 'absolute', left: '14px', color: colors.textoSuave }}></i>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ ...inputStyle, backgroundColor: colors.inputFondo, color: colors.textoFuerte, borderColor: colors.borde }}
              />
            </div>
          </div>

          {/* Botón de Envío Principal */}
          <button 
            type="submit" 
            disabled={loadingLogin}
            style={{ 
              width: '100%', 
              padding: '14px', 
              borderRadius: '12px', 
              border: 'none', 
              backgroundColor: '#4ea8de', 
              color: '#fff', 
              fontWeight: '600', 
              cursor: loadingLogin ? 'not-allowed' : 'pointer', 
              fontSize: '0.95em',
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(78, 168, 222, 0.25)'
            }}
            onMouseOver={(e) => !loadingLogin && (e.target.style.backgroundColor = '#3da0dd')}
            onMouseOut={(e) => !loadingLogin && (e.target.style.backgroundColor = '#4ea8de')}
          >
            {loadingLogin ? (
              <>
                <i className="bi bi-arrow-clockwise" style={{ animation: 'spin 1s linear infinite' }}></i>
                <span>Verificando firmas...</span>
              </>
            ) : (
              <>
                <i className="bi bi-unlock" style={{ fontSize: '1.05em' }}></i>
                <span>Acceder al ERP</span>
              </>
            )}
          </button>

          {/* Botón de Bypass de Desarrollo */}
          <button 
            type="button"
            onClick={() => {
              localStorage.setItem('token', 'token_falso_de_prueba_cixoil');
              onLoginSuccess();
            }}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '12px', 
              border: `1px dashed ${colors.borde}`, 
              backgroundColor: 'transparent',
              color: colors.textoSuave,
              cursor: 'pointer', 
              fontSize: '0.85em',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.target.style.color = colors.textoFuerte; e.target.style.borderColor = colors.textoSuave; }}
            onMouseOut={(e) => { e.target.style.color = colors.textoSuave; e.target.style.borderColor = colors.borde; }}
          >
            <i className="bi bi-cpu" style={{ fontSize: '1.1em' }}></i>
            Omitir autenticación (Desarrollo)
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { 
  width: '100%', 
  padding: '13px 14px 13px 42px', 
  borderRadius: '12px', 
  border: '1px solid', 
  boxSizing: 'border-box', 
  outline: 'none', 
  fontSize: '0.92em',
  transition: 'all 0.2s ease'
};

export default Login;