const pool = require('../config/db');

const Producto = {
    getAll: async () => {
        const result = await pool.query(`
            SELECT * FROM productos 
            WHERE activo = true 
            ORDER BY productos_id DESC
        `);
        return result.rows;
    },

    getById: async (id) => {
        try {
            const result = await pool.query(
                'SELECT * FROM productos WHERE productos_id = $1', 
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error en getById:', error);
            throw error;
        }
    },

    create: async (producto) => {
        const { nombre, artista, anio, genero, precio, condicion, imagen_url, stock, usuario_id } = producto;
        
        const result = await pool.query(`
            INSERT INTO productos (nombre, artista, anio, genero, precio, condicion, imagen_url, stock, usuario_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *
        `, [nombre, artista, anio, genero, precio, condicion, imagen_url, stock, usuario_id]);
        
        return result.rows[0];
    },

    getByUserId: async (usuario_id) => {
        const result = await pool.query(
            `SELECT * FROM productos 
             WHERE usuario_id = $1 
             ORDER BY fecha_creacion DESC`,
            [usuario_id]
        );
        return result.rows;
    },

    update: async (id, data, usuario_id) => {
  const { nombre, artista, anio, genero, precio, condicion, imagen_url, stock } = data;
  
  console.log('Actualizando ID:', id);
  console.log('Usuario ID:', usuario_id);
  console.log('Datos:', data);

  const result = await pool.query(`
    UPDATE productos 
    SET nombre = $1, artista = $2, anio = $3, genero = $4, 
        precio = $5, condicion = $6, imagen_url = $7, stock = $8
    WHERE productos_id = $9 AND usuario_id = $10
    RETURNING *
  `, [nombre, artista, anio, genero, precio, condicion, imagen_url, stock, id, usuario_id]);
  
  console.log('Resultado update:', result.rows[0]);
  
  return result.rows[0];
},

    delete: async (id, usuario_id) => {
        const result = await pool.query(
            'DELETE FROM productos WHERE productos_id = $1 AND usuario_id = $2 RETURNING *',
            [id, usuario_id]
        );
        return result.rows[0];
    }
};

module.exports = Producto;