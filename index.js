const express = require("express");
const { Pool } = require("pg");
const app = express();

// Use the port from environment variables or default to 10000
const PORT = process.env.PORT || 10000;
app.use(express.json());

// Connect to Postgres using your DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Root route
app.get("/", (req, res) => {
  res.send("Konova Tracker is LIVE 🚀");
});

// Test route
app.get("/test", (req, res) => {
  res.send("Test route working ✅");
});

// Track a new user visiting
app.post("/track", async (req, res) => {
  const { username } = req.body;
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT)"
    );
    await pool.query("INSERT INTO users (username) VALUES ($1)", [username]);
    res.send(`User ${username} tracked!`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Show all tracked users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Start the server (only once)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
