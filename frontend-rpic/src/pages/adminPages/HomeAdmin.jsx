import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./HomeAdmin.css"; 

export const HomeAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  useEffect(() => {
    const role = localStorage.getItem("role"); 
    if (role !== "admin") {
      navigate("/login"); 
    } else {
      fetchBookings();
    }
  }, [navigate]);

  const updateBookingToCompleted = async (id) => {
    if (window.confirm("Are you sure you want to mark this booking as completed?")) {
      try {
        const response = await axios.put(
          `https://backend-rpic-production.up.railway.app/api/bookings/${id}/completed`,
          { status: "completed" }, 
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          alert("Booking status updated to completed.");
          fetchBookings(); // Refresh list bookings
        } else {
          alert("Failed to update booking status.");
        }
      } catch (err) {
        alert("Error updating booking status. Please try again.");
      }
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("https://backend-rpic-production.up.railway.app/api/bookings");
      if (response.data && Array.isArray(response.data)) {
        // Filter booking yang tidak berstatus 'completed'
        const filteredBookings = response.data.filter(booking => booking.status !== 'completed');
        setBookings(filteredBookings);
        console.log("Fetched bookings:", filteredBookings); // Tambahkan log untuk melihat data bookings yang diterima
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
      console.error("Fetch bookings error:", err); // Log error jika terjadi masalah saat fetch
    }
  };
  

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await axios.delete(`https://backend-rpic-production.up.railway.app/api/bookings/${id}`);
        if (response.data && response.data.message === "Booking deleted successfully") {
          alert(response.data.message);
          fetchBookings();
        } else {
          alert(response.data.message || "Failed to delete booking.");
        }
      } catch (err) {
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  return (
    <div className="home-admin-container">
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
              <Link to="/usermanagement" className="navbar-link">User Management</Link> 
            </li>
            <li className="navbar-item">
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <h1>Bookings Management</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <div className="booking-header">
                <h3>Reservation #{booking.id}</h3>
                <button onClick={() => deleteBooking(booking.id)} className="delete-btn">
                  Delete
                </button>
                {booking.status !== "completed" && (
                  <button
                    onClick={() => updateBookingToCompleted(booking.id)}
                    className="complete-btn"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
              <div className="booking-details">
                <div><strong>User ID:</strong> {booking.user_id}</div>
                <div><strong>Total Price:</strong> Rp.{booking.total_price}</div>
                <div><strong>Status:</strong> {booking.status}</div>
                <div><strong>Created At:</strong> {booking.created_at}</div>
                <div><strong>Updated At:</strong> {booking.updated_at}</div>

                {/* Display Selected PCs */}
                {/* <div><strong>Selected PCs:</strong></div> */}
                {/* {Array.isArray(booking.selected_pcs) && booking.selected_pcs.length > 0 ? (
                  booking.selected_pcs.map((pc, index) => (
                    <div key={index}>
                      <div><strong>PC ID:</strong> {pc.pc_id}</div>
                      <div><strong>Hours:</strong> {pc.hours}</div>
                      <div><strong>Price:</strong> ${pc.price}</div>
                    </div>
                  ))
                ) : (
                  <div>No selected PCs</div>
                )} */}
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
};
