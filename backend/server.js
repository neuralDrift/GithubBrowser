const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const githubRoutes = require("./routes/github");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// Enable CORS for dev
app.use(
  cors({
    origin: ["http://localhost:5173"], // Vite default dev port
  })
);

app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/github", githubRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
