import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

const Catalog = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        console.log("Intentando cargar productos...");
        const data = await api.getProductos();
        console.log("Productos recibidos:", data);
        setProductos(data);
      } catch (err) {
        console.error("Error completo:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Cargando productos...</h3>;
  if (error) return <h3 className="text-center mt-5 text-danger">Error: {error}</h3>;
  if (productos.length === 0) return <h3 className="text-center mt-5">No hay productos disponibles</h3>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Catálogo de Productos</h2>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productos.map(producto => (
          <div className="col" key={producto.productos_id || producto.id}>
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;