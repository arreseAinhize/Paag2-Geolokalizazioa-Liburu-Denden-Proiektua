const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'liburugune_user',
    password: process.env.DB_PASSWORD || 'liburugune_pass',
    database: process.env.DB_NAME || 'liburugune_dendak_db',
    port: process.env.DB_PORT_INTERNAL || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

const promisePool = pool.promise();

// Función para probar la conexión
const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ Docker-eko MySQL konektatua');
        connection.release();
    } catch (error) {
        console.error('❌ Error: MySQL-ra konektatzen:', error.message);
        console.log('Berriz zaiatzen 5 segundu barru...');
        setTimeout(testConnection, 5000);
    }
};

// Probar conexión al inicio
testConnection();

module.exports = promisePool;