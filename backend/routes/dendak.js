const express = require('express');
const router = express.Router();
const dendakController = require('../controllers/dendakController');

/**
 * @route GET /api/dendak
 * @description Obtener todas las dendak
 * @access Public
 */
router.get('/dendak', dendakController.getAllDendak);

/**
 * @route GET /api/dendak/:id
 * @description Obtener una tienda por ID
 * @access Public
 */
router.get('/dendak/:id', dendakController.getDendaById);

/**
 * @route GET /api/dendak-geojson
 * @description Obtener todas las dendak en formato GeoJSON para mapas
 * @access Public
 */
router.get('/dendak-geojson', dendakController.getDendakGeoJSON);

/**
 * @route GET /api/dendak/search
 * @description Buscar dendak por municipio, tipo o nombre
 * @access Public
 */
router.get('/dendak/search', dendakController.searchDendak);

/**
 * @route GET /api/municipios
 * @description Obtener lista de municipios únicos
 * @access Public
 */
router.get('/herriak', dendakController.getHerriak);

/**
 * @route GET /api/tipos
 * @description Obtener lista de tipos únicos
 * @access Public
 */
router.get('/motak', dendakController.getMotak);

module.exports = router;