// Displays details about specific GitHub repository with 5x commits
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";

function RepoDetails() {
  // Get routes
  const { username, repo } = useParams();

  // States for storing data
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch repository via backend API
  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/github/repo/${username}/${repo}`
        );
        if (!res.ok) throw new Error("Repository not found");
        const data = await res.json();
        setRepoData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [username, repo]);

  // Show loader while fetching
  if (loading) return <Loader />;

  // Show error on failure
  if (error) return <div className="alert fetch failure">{error}</div>;

  const { repo: repoInfo, commits } = repoData;

  return (
    <div>
      {/* basic repository info */}
      <h2>{repoInfo.name}</h2>
      <p>{repoInfo.description || "No description"}</p>
      <p>
        Created at: {new Date(repoInfo.created_at).toLocaleDateString()} <br />
        Last updated: {new Date(repoInfo.updated_at).toLocaleDateString()}{" "}
        <br />
        <a
          href={repoInfo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "green" }}
        >
          View on GitHub
        </a>
      </p>

      {/* commits list */}
      <h4>Last 5 Commits</h4>
      {commits.length === 0 ? (
        <p>No commits found.</p>
      ) : (
        <ul className="list-group">
          {commits.map((commitObj, index) => (
            <li key={index} className="list-group-item">
              <strong>{commitObj.commit.author.name}</strong>:{" "}
              {commitObj.commit.message}
              <br />
              <small>
                {new Date(commitObj.commit.author.date).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}

      {/* link back to user */}
      <Link to={`/user/${username}`} className="btn btn-secondary mt-3">
        Back to User
      </Link>
    </div>
  );
}

export default RepoDetails;
