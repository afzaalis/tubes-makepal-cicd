import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // Import Link
import "./UserManagement.css";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/users");
        if (response.status === 200 && Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Unexpected response format or no users found");
        }
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  // Handle search input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter users by search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-management-container">
      {/* Navbar with Link */}
      <nav className="navbar">
        <div className="navbar-container">
          <img
            src="../../favicon.ico"
            alt="Logo"
            className="navbar-logo"
            style={{ marginRight: "20px" }}
          />
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/homeadmin" className="navbar-link">
                Booking Management
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/dashboardadmin" className="navbar-link">
                Dashboard
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/usermanagement" className="navbar-link">
                User Management
              </Link>
            </li>
            <li className="navbar-item">
            <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="logout-btn">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <h1>User Management</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Users Table */}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/edituser/${user.id}`} className="edit-btn">
                      Edit
                    </Link>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
