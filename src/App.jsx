import { useState, useEffect } from 'react';
import { getProducts } from './services/productService';

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getProducts();
        console.log("Datos que vienen del backend:", data);
        setProductos(data);
      } catch (error) {
        alert("No se pudo conectar con el servidor");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  if (cargando) return <p>Cargando datos del sistema...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Control - Proyecto Final</h1>
      <h2>Lista de Productos</h2>
      <ul>
        {productos?.map((prod) => (
          <li key={prod.id}>
            <strong>{prod.nombre}</strong> - Stock: {prod.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;