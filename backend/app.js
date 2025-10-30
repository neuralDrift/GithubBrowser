const express = require("express");
const cors = require("cors");
const githubRoutes = require("./routes/github");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON

// Routes
app.use("/api/github", githubRoutes);

// Export the app
module.exports = app;
