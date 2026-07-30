const Usuario = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const authController = {
    register: async (req, res) => {
        try {
            const { nombre, apellido, email, password } = req.body;

            const existingUser = await Usuario.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'El correo ya está registrado' });
            }

            const newUser = await Usuario.create({ nombre, apellido, email, password });
            
            res.status(201).json({ 
                mensaje: 'Usuario registrado exitosamente',
                usuario: newUser 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Usuario.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const validPassword = await bcrypt.compare(password, user.contrasena);
            if (!validPassword) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: user.usuarios_id, email: user.email, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                mensaje: 'Login exitoso',
                token,
                user: {
                    id: user.usuarios_id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                    rol: user.rol
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el login' });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            console.log(`🔑 Enlace de recuperación solicitado para: ${email}`);
            console.log(`Dirígete a: http://localhost:5173/reset-password`);

            res.json({ 
                mensaje: 'Se ha enviado un enlace de recuperación a tu correo electrónico.' 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al procesar la solicitud' });
        }
    },

    resetPassword: async (req, res) => {
  try {
    const { newPassword, email } = req.body;  // Recibe el email

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await Usuario.updatePassword(email, hashedPassword);

    if (!result) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log('✅ Contraseña actualizada en BD para:', email);

    res.json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar contraseña' });
  }
},
};

module.exports = authController;