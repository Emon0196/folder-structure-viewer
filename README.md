# Folder Structure Viewer

A full-stack web application for viewing and managing a nested folder structure. Users can create, delete, and explore folders in a hierarchical, tree-like view.

This project is a monorepo containing a Node.js backend and a React frontend.

## Features

- **Hierarchical View:** Displays folders in an expandable/collapsible tree structure, similar to a file explorer.
- **Folder Management:** Allows for the creation of new folders at any level of the hierarchy.
- **Safe Deletion:** Supports the deletion of empty folders while preventing the deletion of the root folder or folders that contain children.
- **API-Driven:** The frontend communicates with the backend via a RESTful API to manage folder data.

## Technologies Used

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express:** Web application framework for building the API.
- **TypeScript:** Typed superset of JavaScript.
- **MongoDB:** NoSQL database for storing folder data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **Nodemon:** Utility that automatically restarts the server on file changes.
- **ts-node:** Executes TypeScript files directly.
- **CORS:** Middleware for enabling Cross-Origin Resource Sharing.

### Frontend
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Adds static typing to the frontend code.
- **Vite:** Next-generation frontend tooling for a fast development experience.
- **Styled-Components:** Library for writing component-based CSS in JavaScript.
- **React Icons:** Provides a variety of icons for a clean UI.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher recommended) & **npm**
- **MongoDB** (running locally or a cloud instance)
- **Postman** or a similar API client for testing the endpoints

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Backend Setup

First, set up and start the backend server.

1.  **Navigate to the backend directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    Create a file named `.env` in the `server` directory and add your MongoDB connection string.
    ```env
    # MongoDB connection string
    MONGO_URI="Your_personal_mongodb_url"
    CLIENT_URL=http://localhost:5173
    ```
    *Note: If you are using a different MongoDB URI, replace the value accordingly.*
4.  **Start the server:**
    ```bash
    npm run dev
    ```
    The server will start on port `5000`. You should see a message in the console indicating that the server is running and connected to MongoDB.

### 2. Frontend Setup

Next, set up and start the frontend application.

1.  **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    Create a file named `.env` in the `client` directory to configure the backend API URL.
    ```env
    # The URL of the backend API
    VITE_API_URL="http://localhost:5000"
    ```
4.  **Start the frontend:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or a similar port). Your web browser will automatically open the application.

