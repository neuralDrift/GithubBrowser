// Display users github profile information and repositories
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";

function UserDetails() {
  // get username from route
  const { username } = useParams();

  // States to store data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user and repository data from backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/github/search/${username}`
        );
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  // Show loader while fetching
  if (loading) return <Loader />;

  // Show error on failure
  if (error) return <div className="alert alert-danger">{error}</div>;

  const { user, repos } = userData;

  return (
    <div>
      {/* User profile info*/}
      <h2>{user.login}</h2>
      <img src={user.avatar_url} alt="avatar" width="150" className="mb-3" />
      <p>{user.bio || "No bio available"}</p>
      <p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "green" }}
        >
          View on GitHub
        </a>
      </p>

      {/* Repository list */}
      <h3>Top Repositories</h3>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <ul className="list-group">
          {repos.map((repo) => (
            <li key={repo.id} className="list-group-item">
              <Link to={`/repo/${user.login}/${repo.name}`}>{repo.name}</Link>
              <p>{repo.description || "No description"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDetails;
