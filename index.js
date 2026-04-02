const express = require("express");
const app = express();

// Use the port from environment variables or default to 10000
const PORT = process.env.PORT || 10000;

// Root route
app.get("/", (req, res) => {
  res.send("Konova Tracker is LIVE 🚀");
});

// Test route to verify deployment
app.get("/test", (req, res) => {
  res.send("Test route working ✅");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
