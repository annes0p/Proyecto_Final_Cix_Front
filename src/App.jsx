import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        {/* ¡CORREGIDO! Cambiado de <path> a <Route> */}
        <Route 
          path="/login" 
          element={<Login />} 
        />
        
        <Route element={<ProtectedRoute/>}>
          <Route
            path="/dashboard" 
            element={<Dashboard/>}
          />
        </Route>

        {/* Esta ruta comodín redirige automáticamente si escriben cualquier otra cosa */}
        {/* <Route 
          path="*" 
          element={<Navigate to="/dashboard" replace />} 
        /> */}
      </Routes>
    </Router>
  );
}

export default App;