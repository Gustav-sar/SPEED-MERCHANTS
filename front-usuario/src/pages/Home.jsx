import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { useState, useEffect } from 'react';

const Home = () => {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        const data = await api.getProductos();
        setDestacados(data.slice(0, 4));
      } catch (error) {
        console.error("Error cargando destacados:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDestacados();
  }, []);

  return (
    <>
      <Hero />

      <div className="container my-5">
        <h2 className="text-center mb-5 display-6 fw-bold">Productos Destacados</h2>
        
        {loading ? (
          <h4 className="text-center">Cargando destacados...</h4>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {destacados.map((producto) => (
              <div className="col" key={producto.productos_id}>
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <a href="/catalog" className="btn btn-warning btn-lg px-5">
            Ver Catálogo Completo →
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;