// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./betapage.css";

// const BetaPage = () => {
//   const navigate = useNavigate();
//   const [pcs, setPcs] = useState([]); // data pc Beta dari backend
//   const [selectedPCs, setSelectedPCs] = useState([]);
//   const [bookedPCIds, setBookedPCIds] = useState([]); // data PC yang sudah dibooking

// useEffect(() => {
//   axios.get("https://backend-rpic-production.up.railway.app/api/pcs/Beta")
//     .then(response => {
//       setPcs(response.data);
//     })
//     .catch(error => {
//       console.error("Error fetching Beta PCs:", error);
//     });

//   axios.get("https://backend-rpic-production.up.railway.app/api/pcs/availability/Beta")
//     .then(response => {
//       // Toleransi tipe data available
//       const unavailablePCs = response.data
//         .filter(pc => !pc.available || pc.available === 0)
//         .map(pc => pc.pc_number);
//       setBookedPCIds(unavailablePCs);
//     })
//     .catch(error => {
//       console.error("Error fetching booked PCs:", error);
//     });
// }, []);



//   const handleClick = (pc) => {
//   if (bookedPCIds.includes(pc.pc_number)) return;

//   if (selectedPCs.find(p => p.id === pc.id)) {
//     setSelectedPCs(prev => prev.filter(p => p.id !== pc.id));
//   } else if (selectedPCs.length < 3) {
//     setSelectedPCs(prev => [...prev, { ...pc, price: 12000, type: "Beta" }]);
//   } else {
//     alert("Maksimal 3 PC dapat dipilih.");
//   }
// };

//   const handleConfirm = () => {
//     if (selectedPCs.length === 0) {
//       alert("Pilih minimal 1 PC sebelum konfirmasi.");
//       return;
//     }

//     localStorage.setItem("selectedPCs", JSON.stringify(selectedPCs));
//     navigate("/orderPage", { state: { selectedPCs } });
//   };

//   return (
//     <div>
//       <div className="navbar">
//         <div className="navbar-container">
//           <img src="../../favicon.ico" alt="Logo" className="navbar-logo" />
//           <ul className="navbar-menu">
//             <li className="navbar-item"><a href="/profile" className="navbar-link">Profile</a></li>
//             <li className="navbar-item"><a href="/homeReservasi" className="navbar-link">Home</a></li>
//             <li className="navbar-item"><a href="/history" className="navbar-link">History</a></li>
//           </ul>
//         </div>
//       </div>

//       <div className="container">
//         <div className="flex-container">
//           <div className="pc-list">
//             <h1 style={{ color: "white", textAlign: "center" }}>PC BETA</h1>
//             <div className="color-note">
//               <div className="note-item"><div className="color-box purple"></div><span>Dipilih</span></div>
//               <div className="note-item"><div className="color-box black"></div><span>Tidak Tersedia</span></div>
//               <div className="note-item"><div className="color-box white"></div><span>Tersedia</span></div>
//             </div>

//             <div className="grid-container">
//               {pcs.map((pc) => {
//                 const isSelected = selectedPCs.some(p => p.id === pc.id);
//                 const isUnavailable = bookedPCIds.includes(pc.pc_number);
//                 return (
//                   <div
//                     key={pc.id}
//                     className={`grid-item ${isSelected ? "selected" : ""} ${isUnavailable ? "unavailable" : ""}`}
//                     onClick={() => handleClick(pc)}
//                   >
//                     {pc.pc_number}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="info-panel">
//             <h2>NOMOR PC</h2>
//             <p>MAX : 3 PC UNTUK SEMUA JENIS PC</p>
//             <div className="pc-display">
//               {selectedPCs.length > 0
//                 ? selectedPCs.map(pc => pc.pc_number).join(", ")
//                 : "PC belum dipilih"}
//             </div>
//             <button className="confirm-btn" onClick={handleConfirm}>KONFIRMASI</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BetaPage;
