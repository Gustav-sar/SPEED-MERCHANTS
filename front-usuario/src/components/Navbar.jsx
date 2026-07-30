import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart?.length || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          🎵 Speed Merchants
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contacto</Link>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center">
            {/* Ícono del Carrito - Visible para TODOS */}
            {/* <li className="nav-item me-3 position-relative">
              <Link to="/cart" className="nav-link fs-4">
                   🛒
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li> */}
            <Link className="nav-link" to="/mis-discos">Mis Discos</Link>
            {user ? (
              <>
                <li className="nav-item me-3">
                  <Link to="/profile" className="nav-link">
                    👤 {user.nombre}
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link to="/create-product" className="btn btn-outline-light btn-sm">
                    + Vender Disco
                  </Link>
                </li>

             <li className="nav-item me-3 position-relative">
               <Link to="/cart" className="nav-link fs-4">
                  🛒
              {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
             </span>
           )}
           </Link>
               </li>

                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;