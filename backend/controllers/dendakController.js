const pool = require('../config/database');

// Controlador para obtener todas las tiendas
exports.getAllDendak = async (req, res) => {
    try {
        // Opciones de ordenación desde query params
        const orderBy = req.query.orderBy || 'municipio';
        const orderDir = req.query.orderDir || 'ASC';
        
        // Validar parámetros de ordenación para prevenir SQL injection
        const validOrderColumns = ['nombre', 'municipio', 'tipo'];
        const validOrderDirections = ['ASC', 'DESC'];
        
        const safeOrderBy = validOrderColumns.includes(orderBy) ? orderBy : 'municipio';
        const safeOrderDir = validOrderDirections.includes(orderDir.toUpperCase()) ? orderDir.toUpperCase() : 'ASC';
        
        const query = `
            SELECT * FROM liburu_dendak 
            ORDER BY ${safeOrderBy} ${safeOrderDir}, nombre ASC
        `;
        
        const [rows] = await pool.query(query);
        
        res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching tiendas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las tiendas',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Controlador para obtener una tienda por ID
exports.getDendaById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM liburu_dendak WHERE id = ?', 
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tienda no encontrada'
            });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching tienda:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la tienda',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Controlador para obtener tiendas en formato GeoJSON
exports.getDendakGeoJSON = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM liburu_dendak 
            WHERE lat IS NOT NULL 
            AND lon IS NOT NULL
            AND lat != 0 
            AND lon != 0
        `);
        
        const geojson = {
            type: "FeatureCollection",
            features: rows.map(tienda => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [parseFloat(tienda.lon), parseFloat(tienda.lat)]
                },
                properties: {
                    id: tienda.id,
                    nombre: tienda.nombre,
                    tipo: tienda.tipo,
                    municipio: tienda.municipio,
                    direccion: tienda.direccion,
                    telefono: tienda.telefono,
                    email: tienda.email,
                    icon: getIconByType(tienda.tipo),
                    color: getColorByType(tienda.tipo)
                }
            }))
        };
        
        res.json({
            success: true,
            count: rows.length,
            data: geojson
        });
    } catch (error) {
        console.error('Error fetching GeoJSON:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener datos GeoJSON',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Controlador para buscar tiendas
exports.searchDendak = async (req, res) => {
    try {
        const { municipio, tipo, nombre } = req.query;
        let query = 'SELECT * FROM liburu_dendak WHERE 1=1';
        const params = [];

        if (municipio) {
            query += ' AND municipio LIKE ?';
            params.push(`%${municipio}%`);
        }

        if (tipo) {
            query += ' AND tipo = ?';
            params.push(tipo);
        }

        if (nombre) {
            query += ' AND nombre LIKE ?';
            params.push(`%${nombre}%`);
        }

        query += ' ORDER BY municipio, nombre';

        const [rows] = await pool.query(query, params);
        
        res.json({
            success: true,
            count: rows.length,
            filters: { municipio, tipo, nombre },
            data: rows
        });
    } catch (error) {
        console.error('Error searching tiendas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al buscar tiendas',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Controlador para obtener municipios únicos
exports.getHerriak = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT DISTINCT municipio 
            FROM liburu_dendak 
            WHERE municipio IS NOT NULL 
            ORDER BY municipio
        `);
        
        const municipios = rows.map(row => row.municipio);
        
        res.json({
            success: true,
            count: municipios.length,
            data: municipios
        });
    } catch (error) {
        console.error('Error fetching municipios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener municipios',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Controlador para obtener tipos únicos
exports.getMotak = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT DISTINCT tipo 
            FROM liburu_dendak 
            WHERE tipo IS NOT NULL 
            ORDER BY tipo
        `);
        
        const tipos = rows.map(row => row.tipo);
        
        res.json({
            success: true,
            count: tipos.length,
            data: tipos
        });
    } catch (error) {
        console.error('Error fetching tipos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener tipos',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Funciones auxiliares
function getIconByType(tipo) {
    switch (tipo) {
        case 'libreria': return '📚';
        case 'biblioteca': return '🏛️';
        case 'mediateca': return '🎬';
        default: return '📍';
    }
}

function getColorByType(tipo) {
    switch (tipo) {
        case 'libreria': return '#00c6e6';
        case 'biblioteca': return '#017c8fff';
        case 'mediateca': return '#01424dff';
        default: return '#bfc0d1';
    }
}