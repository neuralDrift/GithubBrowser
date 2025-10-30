require("dotenv").config();
const fetch = require("node-fetch");

const BASE_URL = "https://api.github.com";

// Add Authorization header if token exists
const headers = {};
if (process.env.GITHUB_TOKEN) {
  headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
}

// Search users (returns list)
async function fetchGithubSearchUsers(query) {
  const response = await fetch(
    `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=10`,
    { headers }
  );
  if (!response.ok) throw new Error("Search failed");
  const data = await response.json();
  return data.items; // returns user list array
}

// Fetch single user + 5x repositories
async function fetchGithubUser(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`, { headers });
  if (!response.ok) throw new Error("User not found");
  const user = await response.json();

  const reposRes = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=5`,
    { headers }
  );
  const repos = await reposRes.json();

  return { user, repos };
}

// Fetch repository + 5x commits
async function fetchGithubRepo(username, repo) {
  const repoRes = await fetch(`${BASE_URL}/repos/${username}/${repo}`, {
    headers,
  });
  if (!repoRes.ok) throw new Error("Repo not found");
  const repoData = await repoRes.json();

  const commitsRes = await fetch(
    `${BASE_URL}/repos/${username}/${repo}/commits?per_page=5`,
    { headers }
  );
  const commits = await commitsRes.json();

  return { repo: repoData, commits };
}

module.exports = { fetchGithubUser, fetchGithubRepo, fetchGithubSearchUsers };
