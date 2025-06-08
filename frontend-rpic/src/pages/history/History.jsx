  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import "./history.css"; 

  const HistoryPage = () => {
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
    useEffect(() => {
      const userId = localStorage.getItem("userId"); 
      if (userId) {
        fetchBookingHistory(userId);
      }
    }, []);

    const fetchBookingHistory = async (userId) => {
      try {
        const response = await fetch(`https://backend-rpic-production.up.railway.app/api/booking/history/${userId}`)
        const data = await response.json();
        if (response.ok) {
          setOrderData(data);
        } else {
          console.error("Failed to fetch history:", data.error);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "pending":
          return "yellow";
        case "cancelled":
          return "red";
        case "confirmed":
          return "green";
        default:
          return "grey";
      }
    };

    const showReservationDetails = (item) => {
      alert(`Reservation #${item.id}\nStatus: ${item.status}\nDate: ${item.created_at}\nSelected PCs: ${JSON.stringify(item.selected_pcs)}`);
    };

    return (
      <div>
        {/* Navbar */}
        <div className="navbar">
            <div className="navbar-container">
            <img src="../../favicon.ico" alt="Logo" className="navbar-logo" style={{marginRight:"20px"}}/>
            <ul className="navbar-menu">
                <li className="navbar-item">
                  <Link to="/profile" className="navbar-link">Profile</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/homereservasi" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/history" className="navbar-link">History</Link>
                </li>
              </ul>
            </div>
        </div>

        {/* History Page Content */}
        <div className="history-container">
          <h1>Booking History</h1>
          {isLoading ? (
            <p style={{ textAlign: "center", color: "white" }}>Loading...</p>
          ) : orderData.length === 0 ? (
            <p style={{ textAlign: "center", color: "red" }}>No booking history available.</p>
          ) : (
            <div className="history-list">
              {orderData.map((order) => {
                const statusColor = getStatusColor(order.status);
                return (
  <div key={order.id} className="history-item">
  <h4>Reservation #{order.id}</h4>
  <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
  <p><strong>Status:</strong> <span style={{ color: getStatusColor(order.status) }}>{order.status}</span></p>
  <p><strong>Total Price:</strong> Rp {order.total_price?.toLocaleString() || 'N/A'}</p>

  {order.selected_pcs && order.selected_pcs.length > 0 && (
    <div className="pc-list">
      <p style={{color:'white'}}><strong> PC yang digunakan:</strong></p>
      <div className="pc-table-wrapper">
        <table className="pc-table">
          <thead>
            <tr>
              <th>No</th>
              <th>PC Number</th>
              <th>Type</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Hours</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.selected_pcs.map((pc, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pc.pc_number || pc.pc_id}</td>
                <td>{pc.type}</td>
                <td>{new Date(pc.start_time).toLocaleString()}</td>
                <td>{new Date(pc.end_time).toLocaleString()}</td>
                <td>{pc.hours}</td>
                <td>Rp {pc.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>


                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default HistoryPage;
