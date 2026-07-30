const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: '🚀 Backend Speed Merchants OK' });
});

app.use('/api/productos', require('./routes/productos'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ventas', require('./routes/ventas'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});         