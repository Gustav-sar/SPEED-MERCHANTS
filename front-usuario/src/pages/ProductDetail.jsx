import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { api } from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await api.getProductoById(id);
        setProducto(data);
      } catch (error) {
        console.error('Error cargando producto:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleAgregarCarrito = () => {
    if (!producto) return;
    addToCart(producto, cantidad);
    alert(`✅ Agregado ${cantidad} unidad(es) de "${producto.nombre}" al carrito`);
  };

  const handleComprarAhora = () => {
    if (!producto) return;
    addToCart(producto, cantidad);
    navigate('/cart');
  };

  if (loading) return <h3 className="text-center mt-5">Cargando producto...</h3>;
  if (!producto) return <h3 className="text-center mt-5">Producto no encontrado</h3>;

  return (
    <div className="container my-5">
      <Link to="/catalog" className="btn btn-outline-secondary mb-4">
        ← Volver al Catálogo
      </Link>

      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="display-6 fw-bold">{producto.nombre}</h2>
          <h4 className="text-muted">{producto.artista}</h4>

          <div className="my-4">
            <span className="badge bg-success fs-5 me-2">{producto.condicion}</span>
            <span className="badge bg-primary fs-5">{producto.genero}</span>
          </div>

          <h3 className="text-warning fw-bold fs-1">
            ${producto.precio.toLocaleString('es-CL')}
          </h3>

          <p className="text-muted">Año: {producto.anio} | Stock: {producto.stock} unidades</p>

          <div className="mb-4">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control w-25"
              min="1"
              max={producto.stock || 10}
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <div className="d-flex gap-3">
            <button
              className="btn btn-warning btn-lg flex-grow-1"
              onClick={handleAgregarCarrito}
            >
              Agregar al Carrito
            </button>
            <button
              className="btn btn-success btn-lg flex-grow-1"
              onClick={handleComprarAhora}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;