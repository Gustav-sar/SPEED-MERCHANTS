import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

const MisDiscos = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    cargarMisProductos();
  }, [user, navigate]);

  const cargarMisProductos = async () => {
    try {
      const data = await api.getMisPublicaciones();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando mis discos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este disco?')) return;
    try {
      await api.deleteProducto(id);
      setProductos(productos.filter(p => p.productos_id !== id));
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  if (loading) return <h3 className="text-center mt-5">Cargando tus discos...</h3>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Discos Publicados</h2>
        <a href="/create-product" className="btn btn-success">
          + Publicar Nuevo Disco
        </a>
      </div>

      {productos.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-4">Aún no has publicado ningún disco.</p>
          <a href="/create-product" className="btn btn-outline-primary btn-lg">
            Publicar mi primer disco
          </a>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productos.map(producto => (
            <div className="col" key={producto.productos_id}>
              <ProductCard producto={producto} />
              <div className="d-flex gap-2 mt-2">
                <button 
                  onClick={() => navigate(`/edit-product/${producto.productos_id}`)}
                  className="btn btn-warning btn-sm flex-grow-1"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(producto.productos_id)}
                  className="btn btn-danger btn-sm flex-grow-1"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisDiscos;