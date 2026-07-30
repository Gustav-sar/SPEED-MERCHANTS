import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await api.getProductoById(id);
        setFormData({
          nombre: data.nombre,
          artista: data.artista,
          anio: data.anio || '',
          genero: data.genero || '',
          precio: data.precio,
          condicion: data.condicion,
          imagen_url: data.imagen_url || '',
          stock: data.stock
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const dataToSend = {
      ...formData,
      precio: parseFloat(formData.precio)  
    };

    await api.updateProducto(id, dataToSend);
    alert('Producto actualizado exitosamente');
    navigate('/mis-discos');
  } catch (error) {
    console.error(error);
    alert('Error al actualizar');
  }
};

  if (loading) return <h3>Cargando...</h3>;

  return (
    <div className="container my-5">
      <h2>Editar Disco</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Nombre</label>
            <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Artista</label>
            <input type="text" name="artista" className="form-control" value={formData.artista} onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Año</label>
            <input type="number" name="anio" className="form-control" value={formData.anio} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Género</label>
            <input type="text" name="genero" className="form-control" value={formData.genero} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Precio</label>
            <input type="number" name="precio" className="form-control" value={formData.precio} onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label>Condición</label>
          <select name="condicion" className="form-select" value={formData.condicion} onChange={handleChange}>
            <option value="Nuevo">Nuevo</option>
            <option value="Excelente">Excelente</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        <div className="mb-3">
          <label>URL Imagen</label>
          <input type="text" name="imagen_url" className="form-control" value={formData.imagen_url} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Stock</label>
          <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success w-100 py-3">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;