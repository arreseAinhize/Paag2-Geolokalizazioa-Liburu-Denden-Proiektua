const express = require('express');
const cors = require('cors');
const path = require('path');
const tiendasRoutes = require('./routes/dendak');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend desde el contenedor
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas API
app.use('/api', tiendasRoutes);

// Ruta principal - servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para el mapa
app.get('/kokapena', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/kokapena.html'));
});

// Ruta de salud para Docker healthcheck
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'liburu-dendak-api',
        timestamp: new Date().toISOString()
    });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/404.html'));
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Algo salió mal en el servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
    console.log(`📁 Frontend en: ${path.join(__dirname, '../frontend')}`);
});