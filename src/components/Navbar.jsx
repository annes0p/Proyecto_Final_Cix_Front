// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom';

function Navbar({ onViewChange, currentView }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const btnStyle = (viewName) => ({
    width: '100%', padding: '12px 16px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer',
    border: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95em',
    fontWeight: currentView === viewName ? '600' : '500',
    backgroundColor: currentView === viewName ? '#2c3242' : 'transparent',
    color: currentView === viewName ? '#64dfdf' : '#94a3b8',
    transition: 'all 0.2s'
  });

  return (
    <nav style={{ 
      width: '260px', backgroundColor: '#1e222b', height: '100vh', position: 'fixed', 
      top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '30px 20px', boxSizing: 'border-box', borderRight: '1px solid #2d3548'
    }}>
      <div>
        <div style={{ paddingBottom: '20px', borderBottom: '1px solid #2d3548', marginBottom: '25px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', margin: 0, fontSize: '1.5em', fontWeight: '700', letterSpacing: '0.5px' }}>
            CIXOIL <span style={{ color: '#64dfdf' }}>S.A.C.</span>
          </h2>
          <span style={{ fontSize: '0.75em', color: '#64748b', fontWeight: '500' }}>WORKSPACE PANEL</span>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>
            <button onClick={() => onViewChange('inicio')} style={btnStyle('inicio')}>
              📊 Dashboard General
            </button>
          </li>
          <li>
            <button onClick={() => onViewChange('usuarios')} style={btnStyle('usuarios')}>
              👥 Gestión de Personal
            </button>
          </li>
          <li>
            <button onClick={() => onViewChange('lubricantes')} style={btnStyle('lubricantes')}>
              🛢️ Catálogo Lubricantes
            </button>
          </li>
        </ul>
      </div>

      <button onClick={handleLogout} style={{ 
        width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#f87171', 
        border: '1px solid #ef4444', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s'
      }}
        onMouseOver={(e) => { e.target.style.backgroundColor = '#2d1f22'; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}

export default Navbar;