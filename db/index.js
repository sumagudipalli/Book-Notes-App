require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Try connecting to the database and log the connection status
pool.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err.message);
  });

// Export the pool for usage in other parts of the app
module.exports = pool;
