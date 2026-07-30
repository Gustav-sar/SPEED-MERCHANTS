import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    telefono: '',
    rut: '',
    direccion: '',
    numeroCasa: '',
    ciudad: '',
    region: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Debes iniciar sesión para completar la compra");
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        alert(`🎉 ¡Compra realizada y guardada exitosamente!`);
        clearCart();
        navigate('/profile');
      } else {
        alert("Error al guardar la compra");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Finalizar Compra</h2>

      <div className="row">
        {/* Formulario de datos */}
        <div className="col-lg-7">
          <div className="card shadow">
            <div className="card-body">
              <h4>Datos de Envío y Pago</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input 
                      type="text" 
                      name="nombreCompleto" 
                      className="form-control" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">RUT</label>
                    <input 
                      type="text" 
                      name="rut" 
                      className="form-control" 
                      placeholder="12.345.678-9" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    required 
                    onChange={handleChange} 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                      type="tel" 
                      name="telefono" 
                      className="form-control" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ciudad</label>
                    <input 
                      type="text" 
                      name="ciudad" 
                      className="form-control" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input 
                    type="text" 
                    name="direccion" 
                    className="form-control" 
                    required 
                    onChange={handleChange} 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Número de Casa / Depto</label>
                    <input 
                      type="text" 
                      name="numeroCasa" 
                      className="form-control" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Región</label>
                    <input 
                      type="text" 
                      name="region" 
                      className="form-control" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <hr className="my-4" />
                <h5>Datos de Tarjeta</h5>

                <div className="mb-3">
                  <label className="form-label">Número de Tarjeta</label>
                  <input 
                    type="text" 
                    name="numeroTarjeta" 
                    className="form-control" 
                    placeholder="1234 5678 9012 3456" 
                    maxLength="19" 
                    required 
                    onChange={handleChange} 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Expiración</label>
                    <input 
                      type="text" 
                      name="fechaExpiracion" 
                      className="form-control" 
                      placeholder="MM/AA" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV</label>
                    <input 
                      type="text" 
                      name="cvv" 
                      className="form-control" 
                      maxLength="4" 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 py-3 mt-4">
                  Confirmar Pago - ${getTotal().toLocaleString('es-CL')}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h4>Resumen del Pedido</h4>
              <hr />
              {cart.map(item => (
                <div key={item.productos_id} className="d-flex justify-content-between mb-2">
                  <span>{item.nombre} × {item.cantidad}</span>
                  <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total a pagar</span>
                <span>${getTotal().toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;