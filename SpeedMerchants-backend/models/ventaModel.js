const pool = require('../config/db');

const VentaModel = {
  create: async (usuario_id, total, productos) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const ventaResult = await client.query(
        `INSERT INTO ventas (usuario_id, total, estado) 
         VALUES ($1, $2, 'completada') RETURNING id`,
        [usuario_id, total]
      );

      const venta_id = ventaResult.rows[0].id;

      for (const item of productos) {
        await client.query(
          `INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario) 
           VALUES ($1, $2, $3, $4)`,
          [venta_id, item.producto_id, item.cantidad, item.precio_unitario]
        );

        await client.query(
          `UPDATE productos SET stock = stock - $1 WHERE productos_id = $2`,
          [item.cantidad, item.producto_id]
        );
      }

      await client.query('COMMIT');
      return venta_id;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
};

module.exports = VentaModel;