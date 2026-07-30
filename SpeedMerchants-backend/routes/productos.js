const express = require('express');
const router = express.Router();
const Producto = require('../models/productoModel');
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middleware/auth');


router.get('/mis-publicaciones', authMiddleware, productoController.getMisPublicaciones);

router.get('/', async (req, res) => {
    try {
        const productos = await Producto.getAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.getById(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});

router.post('/', authMiddleware, productoController.create);

router.put('/:id', authMiddleware, productoController.update);

router.delete('/:id', authMiddleware, productoController.delete);

module.exports = router;