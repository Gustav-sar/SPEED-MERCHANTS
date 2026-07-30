import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  return (
    <div className="card h-100 bg-dark text-white border-secondary">
      <img 
        src={producto.imagen_url || producto.imagen} 
        className="card-img-top" 
        alt={producto.nombre}
        style={{ height: '240px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="text-muted small">{producto.artista}</p>
        
        <p className="text-warning fw-bold fs-4 mt-auto">
          ${producto.precio?.toLocaleString('es-CL')}
        </p>

        <Link 
          to={`/product/${producto.productos_id || producto.id}`} 
          className="btn btn-outline-light mt-2"
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;