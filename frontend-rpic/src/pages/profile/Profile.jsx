import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [voucherDetail, setVoucherDetail] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "-",
  });

  // States for managing edited values in form
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login"); 
    } else if (storedUser) {
      setUserData({
        name: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone || "-",
      });
      
      // Initialize edit form with existing user data
      setEditedName(storedUser.name);
      setEditedEmail(storedUser.email);
      setEditedPhone(storedUser.phone || "-");
    }
  }, [navigate]);

  const handleVoucherClick = (voucherName) => {
    setVoucherDetail(`Detail for ${voucherName}`);
    setIsVoucherModalOpen(true);
  };

  const handleCloseVoucherModal = () => {
    setIsVoucherModalOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleSaveProfileChanges = () => {
    const token = localStorage.getItem("token");

    // Updated profile data
    const updatedData = {
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
    };

   fetch("https://backend-rpic-production.up.railway.app/api/auth/updateProfile", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(updatedData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Server response:", data); 
    if (data.message) {
      console.log("Profile updated successfully");
      setUserData(updatedData);
      localStorage.setItem("user", JSON.stringify(updatedData));
      setIsEditProfileModalOpen(false);
    } else {
      console.error("Error:", data.error);
      alert("Failed to update profile. Please try again.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Failed to update profile. Please try again.");
  });
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-container">
        <img src="../../favicon.ico" alt="Logo" className="navbar-logo" style={{marginRight:"20px"}}/>
        <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/homereservasi" className="navbar-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/history" className="navbar-link">
                History
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-judul">
        <h1>Profile</h1>
      </div>

      <div className="profile-container">
        <img src="/img/profileBg.png" alt="" className="profile-image" />
        <div className="profile-header">
          <h2 className="profile-name" style={{ textAlign: "left" }}>
            {userData.name}
          </h2>
          <p className="profile-username" style={{ textAlign: "left" }}>
            {userData.email}
          </p>
        </div>

        <div className="profile-info">
          <p className="profile-bio">Customer</p>
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{userData.phone}</span>
            </div>
          </div>
          <button className="btn-edit" onClick={handleEditProfileClick}>
            Edit Profile
          </button>
        </div>

        <div className="voucher-section">
          <h3>Voucher Saya</h3>
          <div className="voucher-list">
            <div className="voucher-item">
              <span className="voucher-name">Voucher 10% Off</span>
              <span className="voucher-expiry">Expires: 31 Dec 2024</span>
              <button
                className="btn-view-voucher"
                onClick={() => handleVoucherClick("Voucher 10% Off")}
              >
                Lihat Voucher
              </button>
            </div>
            <div className="voucher-item">
              <span className="voucher-name">Voucher Free 1 Hour</span>
              <span className="voucher-expiry">Expires: 15 Jan 2025</span>
              <button
                className="btn-view-voucher"
                onClick={() => handleVoucherClick("Voucher Free 1 Hour")}
              >
                Lihat Voucher
              </button>
            </div>
          </div>
        </div>
      </div>

      {isVoucherModalOpen && (
        <div id="voucherModal" className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseVoucherModal}>
              &times;
            </span>
            <h2>Voucher Detail</h2>
            <p id="voucherDetail">{voucherDetail}</p>
          </div>
        </div>
      )}

      {isEditProfileModalOpen && (
        <div id="editProfileModal" className={`modal ${isEditProfileModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseEditProfileModal}>
              &times;
            </span>
            <h2>Edit Profile</h2>
            <form id="editProfileForm">
              <label htmlFor="editName">Name</label>
              <input
                type="text"
                id="editName"
                name="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />

              <label htmlFor="editEmail">Email</label>
              <input
                type="email"
                id="editEmail"
                name="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />

              <label htmlFor="editPhone">Phone</label>
              <input
                type="text"
                id="editPhone"
                name="phone"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />

              <button
                type="button"
                className="btn-save"
                onClick={handleSaveProfileChanges}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
