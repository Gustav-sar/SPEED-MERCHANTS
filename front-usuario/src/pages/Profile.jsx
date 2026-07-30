// import { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { api } from '../services/api';
// import ProductCard from '../components/ProductCard';

// const Profile = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [misProductos, setMisProductos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       cargarMisProductos();
//     }
//   }, [user]);

//   const cargarMisProductos = async () => {
//     try {
//       const data = await api.getMisPublicaciones();
//       setMisProductos(data);
//     } catch (error) {
//       console.error("Error cargando productos:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return <h3 className="text-center mt-5">Debes iniciar sesión para ver tu perfil</h3>;
//   }

//   return (
//     <div className="container my-5">
//       <div className="row">
//         <div className="col-lg-4 mb-4">
//           <div className="card shadow h-100 text-center">
//             <div className="card-body p-5">
//               <div className="display-1 mb-3">👤</div>
//               <h3 className="fw-bold">{user.nombre} {user.apellido || ''}</h3>
//               <p className="text-muted">{user.email}</p>
//               <span className="badge bg-primary fs-6">{user.rol}</span>

//               <hr className="my-4" />

//               <button 
//                 onClick={logout}
//                 className="btn btn-outline-danger w-100"
//               >
//                 Cerrar Sesión
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-8">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h3>Mis Publicaciones</h3>
//             <a href="/create-product" className="btn btn-success">
//               + Publicar Nuevo Disco
//             </a>
//           </div>

//           {loading ? (
//             <p className="text-center">Cargando publicaciones...</p>
//           ) : misProductos.length === 0 ? (
//             <div className="text-center py-5">
//               <p>Aún no tienes discos publicados.</p>
//               <a href="/create-product" className="btn btn-outline-primary">Publicar mi primer disco</a>
//             </div>
//           ) : (
//             <div className="row row-cols-1 row-cols-md-2 g-4">
//               {misProductos.map(producto => (
//                 <div className="col" key={producto.productos_id}>
//                   <ProductCard producto={producto} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');

 const handlePasswordResetRequest = async () => {
  try {
    const res = await fetch('http://localhost:3001/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email })
    });

    if (res.ok) {
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    } else {
      setMessage('Error al procesar la solicitud.');
    }
  } catch (err) {
    setMessage('Error de conexión.');
  }
};

  if (!user) {
    return <h3 className="text-center mt-5">Debes iniciar sesión para ver tu perfil</h3>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Perfil izquierdo */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body p-5">
              <div className="display-1 mb-3">👤</div>
              <h3 className="fw-bold">{user.nombre} {user.apellido || ''}</h3>
              <p className="text-muted">{user.email}</p>
              <span className="badge bg-primary fs-6">{user.rol}</span>

              <hr className="my-4" />

              <button 
                onClick={logout}
                className="btn btn-outline-danger w-100"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="mb-4">Recuperacion de contraseña</h3>

              <div className="mb-4">
                <label className="form-label">Nombre de usuario o correo electrónico</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={user.email} 
                  disabled 
                />
              </div>

              <button 
                onClick={handlePasswordResetRequest}
                className="btn btn-primary w-100 py-3"
              >
                Enviar enlace para cambiar contraseña
              </button>

              {message && <div className="alert alert-success mt-3">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;