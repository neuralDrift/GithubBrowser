// Main react entry point for frontend
// Sets up routing between pages/components via react-router-dom
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import UserSearch from "./components/UserSearch";
import UserDetails from "./components/UserDetails";
import RepoDetails from "./components/RepoDetails";

function App() {
  return (
    // Router wraps app to enable client-side routing
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<UserSearch />} />
          <Route path="/user/:username" element={<UserDetails />} />
          <Route path="/repo/:username/:repo" element={<RepoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
