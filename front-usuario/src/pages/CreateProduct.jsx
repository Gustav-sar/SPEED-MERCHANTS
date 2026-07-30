import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateProduct = () => {
  const { user, logout } = useContext(AuthContext);   // Agregamos logout por si el token es inválido
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    artista: '',
    anio: '',
    genero: '',
    precio: '',
    condicion: 'Nuevo',
    imagen_url: '',
    stock: 1
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

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

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Debes iniciar sesión nuevamente');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/productos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('¡Disco publicado exitosamente!');
        setTimeout(() => {
          navigate('/mis-discos');
        }, 1500);
      } else {
        if (data.error === 'Token inválido') {
          setError('Sesión expirada. Inicia sesión nuevamente.');
          logout();
          setTimeout(() => navigate('/login'), 1500);
        } else {
          setError(data.error || 'Error al publicar el disco');
        }
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <h3 className="text-center mt-5">Debes iniciar sesión para publicar un disco</h3>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Publicar Nuevo Disco</h2>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                {/* Tu formulario actual */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre del Disco</label>
                    <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Artista</label>
                    <input type="text" name="artista" className="form-control" value={formData.artista} onChange={handleChange} required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Año</label>
                    <input type="number" name="anio" className="form-control" value={formData.anio} onChange={handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Género</label>
                    <input type="text" name="genero" className="form-control" value={formData.genero} onChange={handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Precio ($)</label>
                    <input type="number" name="precio" className="form-control" value={formData.precio} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Condición</label>
                  <select name="condicion" className="form-select" value={formData.condicion} onChange={handleChange}>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Excelente">Excelente</option>
                    <option value="Usado">Usado</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">URL de la Imagen</label>
                  <input type="text" name="imagen_url" className="form-control" value={formData.imagen_url} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock disponible</label>
                  <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} min="1" />
                </div>

                <button type="submit" className="btn btn-success w-100 py-3" disabled={loading}>
                  {loading ? 'Publicando...' : 'Publicar Disco'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;