import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ResetPassword = () => {
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: user.email,  
          newPassword: formData.newPassword 
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('¡Contraseña actualizada exitosamente!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.error || 'Error al actualizar');
      }
    } catch (err) {
      setMessage('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Nueva Contraseña</h2>

              {message && <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nueva Contraseña</label>
                  <input 
                    type="password" 
                    name="newPassword" 
                    className="form-control" 
                    value={formData.newPassword} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirmar Nueva Contraseña</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    className="form-control" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 py-3" disabled={loading}>
                  {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;