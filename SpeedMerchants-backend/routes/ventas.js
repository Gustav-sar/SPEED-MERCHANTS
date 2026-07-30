// const express = require('express');
// const router = express.Router();
// const VentaModel = require('../models/ventaModel');
// const authMiddleware = require('../middleware/auth');

// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const { productos } = req.body;
//     const usuario_id = req.user.id;

//     if (!productos || productos.length === 0) {
//       return res.status(400).json({ error: 'No hay productos en el carrito' });
//     }

//     const total = productos.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);

//     const venta_id = await VentaModel.create(usuario_id, total, productos);

//     res.json({ 
//       mensaje: 'Compra guardada exitosamente', 
//       venta_id 
//     });"·"
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al procesar la compra' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const VentaModel = require('../models/ventaModel');

router.post('/', async (req, res) => {
  try {
    const { productos } = req.body;
    const usuario_id = req.user ? req.user.id : null;   // null = invitado

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: 'No hay productos en el carrito' });
    }

    const total = productos.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);

    const venta_id = await VentaModel.create(usuario_id, total, productos);

    res.json({ 
      mensaje: 'Compra guardada exitosamente', 
      venta_id,
      esInvitado: !usuario_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

module.exports = router;