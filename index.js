const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Connect to Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Routes
app.get("/", (req, res) => {
  res.send("Konova Tracker is LIVE 🚀");
});

app.get("/test", (req, res) => {
  res.send("Test route working ✅");
});

app.post("/track", async (req, res) => {
  const { username } = req.body;

  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT)"
    );

    await pool.query(
      "INSERT INTO users (username) VALUES ($1)",
      [username]
    );

    res.send(`User ${username} tracked!`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Start server (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
