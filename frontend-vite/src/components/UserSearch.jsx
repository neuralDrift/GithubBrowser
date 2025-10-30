// Searches users and displays results

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function UserSearch() {
  // States for data storage
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle search form
  const handleSearch = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!query.trim()) return; // do nothing on empty input
    setLoading(true); // activate loader animation
    setError(null);
    setResults([]);

    try {
      // Call backend API with query
      const res = await fetch(
        `http://localhost:5000/api/github/users/search?q=${encodeURIComponent(
          query
        )}`
      );

      // Throw error on negative response
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setResults(data); // save results to state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search GitHub users (e.g., 'octo')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search results */}
      {results.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul className="list-group">
            {results.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex align-items-center"
              >
                {/* User avatar */}
                <img
                  src={user.avatar_url}
                  alt="avatar"
                  width="50"
                  className="me-3 rounded-circle"
                />

                {/* Username and external profile link */}
                <div>
                  <Link to={`/user/${user.login}`}>{user.login}</Link>
                  <p>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "green" }} // Different color for external links
                    >
                      View on GitHub
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
