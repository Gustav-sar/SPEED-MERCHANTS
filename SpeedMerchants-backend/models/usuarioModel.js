const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = {
    create: async (usuario) => {
        const { nombre, apellido, email, password, rol = 'cliente' } = usuario;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(`
            INSERT INTO usuarios (nombre, apellido, email, contrasena, rol)
            VALUES ($1, $2, $3, $4, $5) RETURNING usuarios_id, nombre, apellido, email, rol
        `, [nombre, apellido, email, hashedPassword, rol]);

        return result.rows[0];
    },

    findByEmail: async (email) => {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows[0];
    },

    findById: async (id) => {
        const result = await pool.query('SELECT usuarios_id, nombre, apellido, email, rol FROM usuarios WHERE usuarios_id = $1', [id]);
        return result.rows[0];
    },

    updatePassword: async (email, hashedPassword) => {
        const result = await pool.query(
            'UPDATE usuarios SET contrasena = $1 WHERE email = $2 RETURNING *',
            [hashedPassword, email]
        );
        return result.rows[0];
    }
};

module.exports = Usuario;