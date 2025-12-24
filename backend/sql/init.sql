-- Crear base de datos (ya se crea con variables de entorno, pero por si acaso)
CREATE DATABASE IF NOT EXISTS liburu_dendak_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE liburu_dendak_db;

-- Tabla principal
CREATE TABLE IF NOT EXISTS liburu_dendak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('libreria', 'biblioteca', 'mediateca')),
    municipio VARCHAR(100),
    direccion TEXT,
    telefono VARCHAR(50),
    email VARCHAR(150),
    lat DECIMAL(9,6),
    lon DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_municipio (municipio),
    INDEX idx_tipo (tipo),
    INDEX idx_location (lat, lon)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo
INSERT INTO liburu_dendak (nombre, tipo, municipio, direccion, telefono, email, lon, lat) VALUES
-- ABADIÑO
('Libreria PETITE', 'libreria', 'Abadiano',
 'Zubibitarte Kalea, 11 BAJO, 48220 Matiena, Abadiano (Bizkaia)',
 '946810438', NULL, -2.609843, 43.150921),

('Mediateca Municipal', 'biblioteca', 'Abadiano',
 'Zelatabe, 10, 48220 Abadiano (Bizkaia)',
 '946813415', 'liburutegia@abadiano.eus', -2.6040060025059737, 43.15650831168161),

-- AMOREBIETA-ETXANO
('Libreria Ayerdi', 'libreria', 'Amorebieta-Etxano',
 'Calle Sabino Arana, 2 BAJO, 48340 Amorebieta-Etxano (Bizkaia)',
 '946731522', NULL, -2.7335983748930865, 43.220224747000444),

('Udaloste Liburudenda', 'libreria', 'Amorebieta-Etxano',
 'Calle Konbenio, 2, 48340 Amorebieta-Etxano (Bizkaia)',
 '946732437', NULL, -2.7319013614005443, 43.22030238364673),

('Biblioteca Municipal', 'biblioteca', 'Amorebieta-Etxano',
 'Zelaieta Zentroa, Zelaieta parkea s/n, 48340 Amorebieta-Etxano (Bizkaia)',
 '946300626', 'liburutegia@amorebieta.eus', -2.735040485931212, 43.22057013208304),

-- ATXONDO
('Atxondoko Liburutegia', 'biblioteca', 'Atxondo',
 'Estazio auzoa, 1, 48291 Atxondo (Bizkaia)',
 '946821009', 'liburutegia@atxondo.eus', -2.5851317289083537 , 43.131581005884236 ),

-- BERRIZ
('Amalur', 'libreria', 'Berriz',
 'Iturritza Kalea, 29 Bajo, 48240 Olakueta, Berriz (Bizkaia)',
 '946826248', NULL, -2.5759008639859347, 43.17090058780412),

('Biblioteca Municipal', 'biblioteca', 'Berriz',
 'Geltoki kalea, 3, 48240 Berriz (Bizkaia)',
 '946225113', 'liburutegi@berriz.eus', -2.5747756963884556, 43.168292975831555),

-- DURANGO
('Hitz Liburu Denda', 'libreria', 'Durango',
 'Artekale, 23, 48200 Durango (Bizkaia)',
 '946810776', 'info@hitzliburudenda.com', -2.6314963424738944, 43.16731615815065),

('Urrike Liburudenda', 'libreria', 'Durango',
 'Kalebarria, 15, 48200 Durango (Bizkaia)',
 '946201893', NULL, -2.6303735000498887, 43.16718687878703),

('Etxebarria Liburudenda', 'libreria', 'Durango',
 'Juan Mari Altuna Kalea, 7, 48200 Durango (Bizkaia)',
 '944669398', NULL, -2.6280266577554894, 43.169884149071436),

('Arteka Liburu Denda', 'libreria', 'Durango',
 'Calle Arte, 20 / Artekalea Kalea, 22, 48200 Durango (Bizkaia)',
 '944657292', NULL, -2.6319063849477895, 43.16683391472011),

('Bixenta Moguel Biblioteka', 'biblioteca', 'Durango',
 'Komentukale, 8, 48200 Durango (Bizkaia)',
 '946030041', 'biblioteka@durango.eus',  -2.630077130728718, 43.16744890403399),

('IKERFER', 'libreria', 'Durango',
 'Calle Ermodo, 25, 48200 Durango (Bizkaia)',
 '946810566', NULL, -2.633251225750624, 43.17118250126715),

-- ELORRIO
('Biblioteca Municipal', 'biblioteca', 'Elorrio',
 'Elizburu, 18, 48230 Elorrio (Bizkaia)',
 '946032032', 'liburutegia@elorrio.eus',  -2.5422592423877104, 43.12955087036705),

-- ERMUA
('Maribel Libreria', 'libreria', 'Ermua',
 'Calle Goienkalea, 9, 48260 Ermua (Bizkaia)',
 '943170407', NULL,  -2.5022371000573727, 43.18740324632401),

('Biblioteca Municipal', 'biblioteca', 'Ermua',
 'Goienkale s/n, 48260 Ermua (Bizkaia)',
 '943179212', 'iblioteca@udalermua.net', NULL, NULL),

('Xiripot', 'libreria', 'Ermua',
 'Erdikokale Kalea, 8, 48260 Ermua (Bizkaia)',
 '688713189', NULL,  -2.5027779577572353, 43.18651923172573),

-- IURRETA
('Biblioteca Municipal', 'biblioteca', 'Iurreta',
 'Bidebarrieta, 4, 48215 Iurreta (Bizkaia)',
 '946812726 / 688863736', 'biblioteka@iurreta.eus', -2.635706300076569, 43.17549400685316),

-- MALLABIA
('Bliblioteca Municipal', 'biblioteca', 'Mallabia',
 'Intxaurtia Kalea, 48269 Mallabia, (Bizkaia)',
 '943176691', NULL, -2.5301230423722494, 43.19029336731778),

-- MAÑARIA
('Kirikiño Biblioteca Municipal', 'biblioteca', 'Mañaria',
 'Andra Mari Kalea, 1, 48212 Mañaria, (Bizkaia)',
 '946835540', NULL, -2.659731444214456, 43.13889260529959),

-- OTXANDIO
('Biblioteca Municipal', 'biblioteca', 'Otxandio',
 'Nagusia Plaza, 6, 48210 Otxandio,  (Bizkaia)',
NULL, NULL, -2.6552268711951394, 43.04037202852517),

-- ZALDIBAR
('Biblioteca Municipal', 'biblioteca', 'Zaldibar',
 'Euskal Herria Etorbidea, 5, 48250 Zaldibar (Bizkaia)',
 '946225415', NULL, -2.545598273603118, 43.17074178253438),

('Sala estudio Zaldibar', 'mediateca', 'Zaldibar',
 'Aldatsa Kalea, 15, 48250 Zaldibar (Bizkaia)',
 NULL, NULL, -2.5467140725253437, 43.17143817990393);