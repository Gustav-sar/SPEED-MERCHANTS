import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

const Register = () => {
  const { login } = useContext(AuthContext);   

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.register(formData);
      
      if (response.mensaje) {
        setSuccess('¡Registro exitoso! Iniciando sesión...');

        try {
          const loginResponse = await api.login({
            email: formData.email,
            password: formData.password
          });

          if (loginResponse.token) {
            login(loginResponse.token, loginResponse.user);
            setTimeout(() => {
              navigate('/catalog');
            }, 1000);
          }
        } catch (loginErr) {
          setTimeout(() => navigate('/login'), 1500);
        }
      } else {
        setError(response.error || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Crear Cuenta</h2>
              
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input type="text" name="apellido" className="form-control" value={formData.apellido} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-success w-100 py-2" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/login">¿Ya tienes cuenta? Inicia Sesión</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;