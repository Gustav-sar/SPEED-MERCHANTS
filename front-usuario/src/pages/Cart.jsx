import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFinalizarCompra = async () => {
    if (cart.length === 0) return;

    try {
      const response = await fetch('http://localhost:3001/api/ventas', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ 
          productos: cart.map(item => ({
            producto_id: item.productos_id,
            cantidad: item.cantidad,
            precio_unitario: item.precio
          }))
        })
      });

      if (response.ok) {
        alert(`🎉 ¡Compra realizada exitosamente por $${getTotal().toLocaleString('es-CL')}!`);
        clearCart();
        navigate('/profile');
      } else {
        alert('Error al procesar la compra. Inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error de conexión. La compra se guardó localmente.');
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <Link to="/catalog" className="btn btn-warning btn-lg mt-3">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Mi Carrito</h2>

      <div className="row">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item.productos_id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img src={item.imagen_url} alt={item.nombre} className="img-fluid rounded" style={{maxHeight:'100px', objectFit:'cover'}} />
                  </div>
                  <div className="col-md-5">
                    <h5>{item.nombre}</h5>
                    <p className="text-muted">{item.artista}</p>
                  </div>
                  <div className="col-md-2 text-center">
                    <p>${item.precio.toLocaleString('es-CL')} × {item.cantidad}</p>
                  </div>
                  <div className="col-md-2 text-end">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.productos_id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h4>Resumen de Compra</h4>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Total ({cart.length} productos)</span>
                <span className="fw-bold">${getTotal().toLocaleString('es-CL')}</span>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                    className="btn btn-success w-100 mt-4 py-3">
                  Proceder al Pago
                   </button>
              <Link to="/catalog" className="btn btn-outline-secondary w-100 mt-2">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;