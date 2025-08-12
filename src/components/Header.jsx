import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";


export default function Header({ toggleSidebar }) {
  const { user, logout } = useContext(AuthContext); // Access current user and logout
  const [search, setSearch] = useState(""); // Track search input
  const navigate = useNavigate(); 

  // Handle search submission and route user to query result
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    // Main header container
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-50">
      
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button (☰) */}
        <button onClick={toggleSidebar} className="text-2xl">☰</button>

        {/* Logo link to homepage */}
        <Link to="/" className="text-xl font-semibold text-red-600">
          YouTubeClone
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex flex-1 mx-4 max-w-xl">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search button */}
        <button
          type="submit"
          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200"
        >
          🔍
        </button>
      </form>

      {/* Right side: User info or Sign In button */}
      {user ? (
        <div className="flex items-center gap-3">
          {/* Username display */}
          <span className="font-medium text-gray-800">{user.username}</span>

          {/* Logout button */}
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        // If not logged in, show Sign In button
        <Link to="/login">
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign In
          </button>
        </Link>
      )}
    </header>
  );
}