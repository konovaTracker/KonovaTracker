// index.js
// Import PostgreSQL client
const { Pool } = require('pg');

// Read database config from environment variables
const pool = new Pool({
  host: process.env.DB_HOST,        // e.g., 'konova-server-94821.database.windows.net'
  user: process.env.DB_USER,        // DB username
  password: process.env.DB_PASS,    // DB password
  database: process.env.DB_NAME,    // e.g., 'konova_tracker'
  port: 5432,
  ssl: { rejectUnauthorized: false } // Needed for Azure SQL / PostgreSQL over SSL
});

// Simple test query to verify DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected! Current time:', res.rows[0]);
  }
});

// Example: minimal Express server
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Konova Tracker is LIVE!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
