const Producto = require('../models/productoModel');

const productoController = {
    create: async (req, res) => {
        try {
            const { nombre, artista, anio, genero, precio, condicion, imagen_url, stock } = req.body;

            if (!nombre || !artista || !precio) {
                return res.status(400).json({ error: 'Nombre, artista y precio son obligatorios' });
            }

            const usuario_id = req.user.id;

            const nuevoProducto = await Producto.create({
                nombre,
                artista,
                anio: anio || null,
                genero: genero || null,
                precio,
                condicion: condicion || 'Nuevo',
                imagen_url: imagen_url || null,
                stock: stock || 1,
                usuario_id
            });

            res.status(201).json({
                mensaje: 'Producto publicado exitosamente',
                producto: nuevoProducto
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al publicar el producto' });
        }
    },

    getMisPublicaciones: async (req, res) => {
        try {
            const usuario_id = req.user.id;
            const productos = await Producto.getByUserId(usuario_id);
            res.json(productos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener tus publicaciones' });
        }
    },

   update: async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user ? req.user.id : null;
    const data = req.body;

    console.log('Datos recibidos:', data);
    console.log('ID:', id, 'Usuario ID:', usuario_id);

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const producto = await Producto.update(id, data, usuario_id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado o no autorizado' });

    res.json({ mensaje: 'Producto actualizado', producto });
  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
},

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario_id = req.user.id;

            const deleted = await Producto.delete(id, usuario_id);
            if (!deleted) return res.status(404).json({ error: 'Producto no encontrado o no autorizado' });

            res.json({ mensaje: 'Producto eliminado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
};

module.exports = productoController;