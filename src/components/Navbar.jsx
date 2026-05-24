import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ 
      width: '260px', 
      backgroundColor: '#111115', // Negro mate industrial
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      padding: '25px 20px',
      boxSizing: 'border-box',
      borderRight: '2px solid #27272a'
    }}>
      <div>
        <div style={{ paddingBottom: '25px', borderBottom: '1px solid #27272a', marginBottom: '30px', textAlign: 'center' }}>
          <h2 style={{ color: '#f59e0b', margin: 0, fontSize: '1.6em', fontWeight: '800', letterSpacing: '1.5px' }}>
            CIXOIL <span style={{ color: '#d97706' }}>S.A.C.</span>
          </h2>
          <span style={{ fontSize: '0.75em', color: '#71717a', tracking: '2px' }}>CONTROL PANEL v1.0</span>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '12px' }}>
            <button 
              onClick={() => navigate('/dashboard')} 
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: '#1e1e24', 
                color: '#f59e0b', // Item activo en dorado
                borderLeft: '4px solid #d97706', // Indicador de aceite lateral
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                borderRadius: '0 6px 6px 0', 
                textAlign: 'left', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              📊 Dashboard General
            </button>
          </li>
          <li style={{ marginBottom: '12px' }}>
            <button 
              onClick={() => navigate('/dashboard/usuarios')} 
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: 'transparent', 
                color: '#a1a1aa', 
                border: 'none', 
                borderRadius: '6px', 
                textAlign: 'left', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => (e.target.style.color = '#fff')}
              onMouseOut={(e) => (e.target.style.color = '#a1a1aa')}
            >
              ⚙️ Gestión de Personal
            </button>
          </li>
          <li style={{ marginBottom: '12px' }}>
            <button 
              disabled
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: 'transparent', 
                color: '#3f3f46', 
                border: 'none', 
                textAlign: 'left', 
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              🛢️ Catálogo Lubricantes
            </button>
          </li>
          <li style={{ marginBottom: '12px' }}>
            <button 
              disabled
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: 'transparent', 
                color: '#3f3f46', 
                border: 'none', 
                textAlign: 'left', 
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              📦 Control de Inventario
            </button>
          </li>
        </ul>
      </div>

      <button 
        onClick={handleLogout}
        style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: 'transparent', 
          color: '#ef4444', 
          border: '1px solid #7f1d1d', 
          borderRadius: '6px', 
          cursor: 'pointer', 
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => { e.target.style.backgroundColor = '#7f1d1d'; e.target.style.color = '#fff'; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ef4444'; }}
      >
        🛑 Apagar Sesión
      </button>
    </nav>
  );
}

export default Navbar;