const express = require("express");
const { Pool } = require("pg");
const app = express();

app.use(express.json());

// Connect to Postgres using your DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/test", (req, res) => {
  res.send("Test route working ✅");
});

// Track a new user visiting
app.post("/track", async (req, res) => {
  const { username } = req.body;
  try {
    await pool.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT)");
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
