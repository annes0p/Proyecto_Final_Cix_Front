import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Navbar({ onViewChange, currentView }) {
  const navigate = useNavigate();
  const { mode, setMode, colors } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const btnStyle = (viewName) => ({
    width: '100%', padding: '12px 16px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', border: 'none', 
    display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.95em',
    fontWeight: currentView === viewName ? '600' : '400',
    backgroundColor: currentView === viewName ? (mode === 'claro' ? '#e2e8f0' : '#2c3242') : 'transparent',
    color: currentView === viewName ? '#64dfdf' : colors.textoSuave,
    transition: 'all 0.15s ease'
  });

  const themeTabStyle = (tabMode) => ({
    flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8em',
    fontWeight: mode === tabMode ? '600' : '400',
    backgroundColor: mode === tabMode ? (mode === 'claro' ? '#cbd5e1' : '#2d3548') : 'transparent',
    color: mode === tabMode ? '#64dfdf' : colors.textoSuave,
    transition: 'all 0.15s ease'
  });

  return (
    <nav style={{ 
      width: '260px', height: '100vh', position: 'fixed', top: 0, left: 0, 
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '30px 20px', boxSizing: 'border-box', 
      backgroundColor: colors.tarjeta, borderRight: `1px solid ${colors.borde}` 
    }}>
      <div>
        <div style={{ paddingBottom: '25px', borderBottom: `1px solid ${colors.borde}`, marginBottom: '25px' }}>
          <h2 style={{ color: colors.textoFuerte, margin: 0, fontSize: '1.4em', fontWeight: '700' }}>
            CIXOIL <span style={{ color: '#64dfdf', fontWeight: '700', fontSize: '0.9em' }}>S.A.C.</span>
          </h2>
          <span style={{ fontSize: '0.7em', color: colors.textoSuave, fontWeight: '600', letterSpacing: '1px', display: 'block', marginTop: '3px' }}>
            SISTEMA INTEGRAL DE GESTIÓN COMERCIAL
          </span>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <button onClick={() => onViewChange('inicio')} style={btnStyle('inicio')}>
              <i className="bi bi-speedometer2" style={{ fontSize: '1.1em' }}></i>
              Dashboard General
            </button>
          </li>
          <li>
            <button onClick={() => onViewChange('usuarios')} style={btnStyle('usuarios')}>
              <i className="bi bi-person-badge" style={{ fontSize: '1.1em' }}></i>
              Gestión de Personal
            </button>
          </li>
          <li>
            <button onClick={() => onViewChange('clientes')} style={btnStyle('clientes')}>
              <i className="bi bi-car-front" style={{ fontSize: '1.1em' }}></i>
              Clientes y Vehículos
            </button>
          </li>
          <li>
            <button onClick={() => onViewChange('lubricantes')} style={btnStyle('lubricantes')}>
              <i className="bi bi-droplet-half" style={{ fontSize: '1.1em' }}></i>
              Catálogo Lubricantes
            </button>
          </li>
        </ul>
      </div>

      {/* Footer del Navbar: Cierre de Sesión y Selector de Tema */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Selector Modular de 3 Estados (Claro / Oscuro / Sistema) */}
        <div style={{ 
          display: 'flex', backgroundColor: mode === 'claro' ? '#f1f5f9' : '#1a1d24', 
          padding: '4px', borderRadius: '8px', border: `1px solid ${colors.borde}` 
        }}>
          <button onClick={() => setMode('claro')} style={themeTabStyle('claro')} title="Modo Claro">
            <i className="bi bi-sun"></i>
          </button>
          <button onClick={() => setMode('oscuro')} style={themeTabStyle('oscuro')} title="Modo Oscuro">
            <i className="bi bi-moon-stars"></i>
          </button>
          <button onClick={() => setMode('sistema')} style={themeTabStyle('sistema')} title="Modo Sistema">
            <i className="bi bi-display"></i>
          </button>
        </div>

        <button onClick={handleLogout} style={{ 
          width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#f87171', 
          border: '1px solid #452a2a', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.9em'
        }}>
          <i className="bi bi-box-arrow-left"></i>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;