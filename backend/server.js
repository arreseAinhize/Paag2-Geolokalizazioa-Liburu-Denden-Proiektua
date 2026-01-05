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
app.use('/', tiendasRoutes);

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
    // Si la petición es para la API o acepta JSON, devolver JSON en vez de HTML
    if (req.originalUrl.startsWith('/') || req.accepts('json')) {
        return res.status(404).json({ error: 'Not found', path: req.originalUrl });
    }

    // Intentar servir 404.html; si falla (archivo inexistente), enviar un texto plano
    const filePath = path.join(__dirname, '../frontend/404.html');
    res.status(404).sendFile(filePath, (err) => {
        if (err) {
            console.error('Ezin izan da 404.html bidali:', err.message);
            res.type('txt').send('404 - Not Found');
        }
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Zerbitzarian zerbait txarto atara da:',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Backend: http://127.0.0.1:${PORT}`);
    console.log(`📁 Frontend: http://127.0.0.1:80`);
});
