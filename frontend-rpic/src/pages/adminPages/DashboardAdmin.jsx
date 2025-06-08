import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardAdmin.css"; 

export const DashboardAdmin = () => {
  const [completedBookings, setCompletedBookings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Memastikan hanya admin yang dapat mengakses halaman ini
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
    } else {
      fetchCompletedBookings();
    }
  }, [navigate]);

  // Fungsi untuk mendapatkan data booking yang statusnya 'completed'
  const fetchCompletedBookings = async () => {
    try {
      const response = await axios.get("https://backend-rpic-production.up.railway.app/api/bookings");
      if (response.data && Array.isArray(response.data)) {
        const completed = response.data.filter(
          (booking) => booking.status === "completed"
        );
        setCompletedBookings(completed);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to fetch completed bookings. Please try again later.");
    }
  };

  return (
    <div className="dashboard-admin-container">
      <nav className="navbar">
        <div className="navbar-container">
          <img src="../../favicon.ico" alt="Logo" className="navbar-logo" style={{ marginRight: "20px" }} />
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/homeadmin" className="navbar-link">Booking Management</Link>
            </li>
            <li className="navbar-item">
              <Link to="/dashboardadmin" className="navbar-link">Dashboard</Link>
            </li>
            <li className="navbar-item">
            <Link to="/usermanagement" className="navbar-link">User Management</Link> {/* Link ke halaman User Management */}
          </li>
            <li className="navbar-item">
              <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="logout-btn">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <h1>Admin Dashboard - Completed Bookings</h1>

      {/* Jika ada error */}
      {error && <p className="error-message">{error}</p>}

      {/* Daftar booking yang telah selesai */}
      <div className="completed-booking-list">
        {completedBookings.length > 0 ? (
          completedBookings.map((booking) => (
            <div key={booking.id} className="completed-booking-item">
              <h3>Reservation #{booking.id}</h3>
              <div><strong>User ID:</strong> {booking.user_id}</div>
              <div><strong>Total Price:</strong> Rp.{booking.total_price}</div>
              <div><strong>Status:</strong> {booking.status}</div>
              <div><strong>Created At:</strong> {booking.created_at}</div>
              <div><strong>Updated At:</strong> {booking.updated_at}</div>
            </div>
          ))
        ) : (
          <p>No completed bookings found</p>
        )}
      </div>
    </div>
  );
};
