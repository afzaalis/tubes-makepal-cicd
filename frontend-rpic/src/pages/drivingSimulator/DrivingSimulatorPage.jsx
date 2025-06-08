import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Drive.css";

const DrivingSimulatorPage = () => {
  const navigate = useNavigate();
  const [pcs, setPcs] = useState([]); // data PC Driving Simulator dari backend
  const [selectedPCs, setSelectedPCs] = useState([]);
  const [bookedPCIds, setBookedPCIds] = useState([]); // PC yang sudah dibooking

useEffect(() => {
  // Ambil semua PC Driving
  axios.get("https://backend-rpic-production.up.railway.app/api/pcs/Driving")
    .then(response => {
      setPcs(response.data);
    })
    .catch(error => {
      console.error("Error fetching Driving PCs:", error);
    });

  const fetchAvailability = () => {
  axios.get("https://backend-rpic-production.up.railway.app/api/pcs/availability/Driving")
      .then(response => {
        const unavailablePCs = response.data
          .filter(pc => !pc.available)
          .map(pc => pc.pc_number);
        setBookedPCIds(unavailablePCs);
      })
      .catch(error => {
        console.error("Error fetching booked PCs:", error);
      });
  };

  // Panggil pertama kali
  fetchAvailability();

  // Set interval untuk auto-refresh setiap 30 detik
  const interval = setInterval(fetchAvailability, 30000);

  // Bersihkan interval saat komponen unmount
  return () => clearInterval(interval);
}, []);


  const handleClick = (pc) => {
    if (bookedPCIds.includes(pc.pc_number)) return;

    if (selectedPCs.find(p => p.id === pc.id)) {
      setSelectedPCs(prev => prev.filter(p => p.id !== pc.id));
    } else if (selectedPCs.length < 3) {
      setSelectedPCs(prev => [...prev, { ...pc, price: 20000, type: "Driving" }]);
    } else {
      alert("Maksimal 3 PC dapat dipilih.");
    }
  };

  const handleConfirm = () => {
    if (selectedPCs.length === 0) {
      alert("Pilih minimal 1 PC sebelum konfirmasi.");
      return;
    }

    localStorage.setItem("selectedPCs", JSON.stringify(selectedPCs));
    navigate("/orderPage", { state: { selectedPCs } });
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-container">
          <img src="../../favicon.ico" alt="Logo" className="navbar-logo" />
          <ul className="navbar-menu">
            <li className="navbar-item"><a href="/profile" className="navbar-link">Profile</a></li>
            <li className="navbar-item"><a href="/homeReservasi" className="navbar-link">Home</a></li>
            <li className="navbar-item"><a href="/history" className="navbar-link">History</a></li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="flex-container">
          <div className="pc-list">
            <h1 style={{ color: "white", textAlign: "center" }}>DRIVING SIMULATOR</h1>
            <div className="color-note">
              <div className="note-item"><div className="color-box purple"></div><span>Dipilih</span></div>
              <div className="note-item"><div className="color-box black"></div><span>Tidak Tersedia</span></div>
              <div className="note-item"><div className="color-box white"></div><span>Tersedia</span></div>
            </div>

            <div className="grid-container">
              {pcs.map((pc) => {
                const isSelected = selectedPCs.some(p => p.id === pc.id);
                const isUnavailable = bookedPCIds.includes(pc.pc_number);
                return (
                  <div
                    key={pc.id}
                    className={`grid-item ${isSelected ? "selected" : ""} ${isUnavailable ? "unavailable" : ""}`}
                    onClick={() => handleClick(pc)}
                  >
                    {pc.pc_number}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="info-panel">
            <h2>NOMOR PC</h2>
            <p>MAX : 3 PC UNTUK SEMUA JENIS PC</p>
            <div className="pc-display">
              {selectedPCs.length > 0
                ? selectedPCs.map(pc => pc.pc_number).join(", ")
                : "PC belum dipilih"}
            </div>
            <button className="confirm-btn" onClick={handleConfirm}>KONFIRMASI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSimulatorPage;
