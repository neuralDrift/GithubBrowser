// This file contains unit tests for our GitHub API routes using supertest and Jest

const request = require("supertest");
const app = require("../app");

// Group related tests under describe block
describe("GitHub Routes", () => {
  // Test the search users endpoint
  test("searches users", async () => {
    // Make a GET request to the /users/search endpoint with query 'octocat'
    const res = await request(app).get("/api/github/users/search?q=octocat");

    // Expect HTTP status 200 (success)
    expect(res.status).toBe(200);

    // Expect the response body to be an array (list of users)
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test fetching a single user and their repos
  test("gets user details", async () => {
    // Make a GET request to the /search/:username endpoint
    const res = await request(app).get("/api/github/search/octocat");

    // Expect HTTP status 200 (success)
    expect(res.status).toBe(200);

    // Expect the response to have a 'user' object with 'login' property
    expect(res.body.user).toHaveProperty("login");
  });
});
