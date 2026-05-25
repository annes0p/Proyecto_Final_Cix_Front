import { useState } from 'react';
import Navbar from './Navbar';
import PersonalList from './PersonalList';
import Lubricantes from './Lubricantes';
import Clientes from './Clientes';
import { useTheme } from '../context/ThemeContext';

function Dashboard() {
  const [currentView, setCurrentView] = useState('inicio');
  const { colors } = useTheme();

  return (
    <div style={{ 
      backgroundColor: colors.fondo,
      minHeight: '100vh', 
      color: colors.texto, // Texto dinámico adaptable
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      transition: 'background-color 0.2s ease, color 0.2s ease'
    }}>
      <Navbar onViewChange={setCurrentView} currentView={currentView} />

      <div style={{ marginLeft: '260px', padding: '40px', boxSizing: 'border-box' }}>
        <header style={{ borderBottom: `1px solid ${colors.borde}`, paddingBottom: '15px', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, fontSize: '1.8em', fontWeight: '700', color: colors.textoFuerte }}>
            {currentView === 'inicio' && 'Dashboard Principal'}
            {currentView === 'usuarios' && 'Personal Técnico Autorizado'}
            {currentView === 'clientes' && 'Cartera de Clientes y Vehículos'}
            {currentView === 'lubricantes' && 'Catálogo de Lubricantes e Inventario'}
          </h1>
          <p style={{ color: colors.textoSuave, margin: '5px 0 0 0', fontSize: '0.9em', fontWeight: '500' }}>
            Terminal de Control Centralizado — CIXOIL S.A.C.
          </p>
        </header>

        {currentView === 'inicio' && (
          <div style={{ backgroundColor: colors.tarjeta, padding: '40px', borderRadius: '16px', border: `1px solid ${colors.borde}`, textAlign: 'center' }}>
            <h2 style={{ color: '#64dfdf', margin: '0 0 12px 0', fontWeight: '600' }}>Estatus del Sistema: Operativo</h2>
            <p style={{ color: colors.textoSuave, maxWidth: '520px', margin: '0 auto', fontSize: '0.95em', lineHeight: '1.5' }}>
              Base de arquitectura ERP completada. Elige cualquier módulo del panel izquierdo para ejecutar operaciones de inventario, registrar flotas o auditar el personal.
            </p>
          </div>
        )}

        {currentView === 'usuarios' && <PersonalList />}
        {currentView === 'clientes' && <Clientes />}
        {currentView === 'lubricantes' && <Lubricantes />}
      </div>
    </div>
  );
}

export default Dashboard;