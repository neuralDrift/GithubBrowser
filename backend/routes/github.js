const express = require("express");
const router = express.Router();

// Import GitHub API helpers
const {
  fetchGithubUser,
  fetchGithubRepo,
  fetchGithubSearchUsers,
} = require("../utils/fetchGithub"); // Add new function

// Sets headers for token authentication to enable higher API requests for dev
const headers = {};
if (process.env.GITHUB_TOKEN) {
  // If no token default to empty for unauthenticated request
  headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
}

/**
 * Route: Get users/search
 * Purpose: Search for users via query string
 */
router.get("/users/search", async (req, res) => {
  const { q } = req.query;
  if (!q)
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  try {
    const data = await fetchGithubSearchUsers(q); // Call helper
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to search GitHub users" });
  }
});

/**
 * Route: Get search/:username
 * Purpose: Fetch details for single user
 * URL Parameter: username
 * */ router.get("/search/:username", async (req, res) => {
  try {
    const data = await fetchGithubUser(req.params.username); // Call helper
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch GitHub user" });
  }
});

/**
 * Route: Get repo/:username/:repo
 * Purpose: Fetch details for single repository including commits
 * URL Parameters:
 * username
 * repo
 * */ router.get("/repo/:username/:repo", async (req, res) => {
  try {
    const data = await fetchGithubRepo(req.params.username, req.params.repo); // Call helper
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch repository" });
  }
});

module.exports = router;
