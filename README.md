# GitHub Browser

A MERN-stack project with a Vite + React frontend for searching GitHub users, viewing user details, and exploring repositories and commits.

## Features

- Search GitHub users by username.
- View user profiles with top repositories.
- Explore repositories and their last 5 commits.
- Responsive UI with Bootstrap 5.
- Loader for API requests.

## Prerequisites

- Node.js v18+
- npm or yarn
- Git

## Setup

### 1. Backend

cd backend

npm install

Create a .env file in the backend folder (optional) for a GitHub token:

GITHUB_TOKEN=your_github_token
PORT=5000

Start the server

npm start

### 2. frontend

cd frontend-vite

npm install

npm run dev

Frontend runs on: http://localhost:5173

### Running tests

Frontend snapshot & unit tests:

cd frontend-vite

npm run test

Backend tests:

cd backend

npm test

### Notes

Backend uses helmet for security headers and cors for cross-origin requests.

Frontend uses Bootstrap 5 for styling.
