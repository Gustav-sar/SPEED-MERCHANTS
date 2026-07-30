const API_URL = 'http://localhost:3001/api';

export const api = {
    getProductos: async () => {
        const res = await fetch(`${API_URL}/productos`);
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
    },

    getProductoById: async (id) => {
        const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
    },

    getMisPublicaciones: async () => {
        const res = await fetch(`${API_URL}/productos/mis-publicaciones`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!res.ok) throw new Error('Error al cargar tus publicaciones');
        return res.json();
    },

    updateProducto: async (id, data) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Error al actualizar');
  }
  return res.json();
},

    deleteProducto: async (id) => {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        });
        if (!res.ok) throw new Error('Error al eliminar');
        return res.json();
    },

    register: async (userData) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData) 
        });
        return res.json();
    },

    login: async (credentials) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return res.json();
    }
};