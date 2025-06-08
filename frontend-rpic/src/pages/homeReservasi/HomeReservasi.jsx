// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; 
// import axios from 'axios';
// import './homereservasi.css';

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     console.log('user berhasil keluar dari aplikasi');
//     navigate('/login');
//   };

//   return (
//     <button onClick={handleLogout} className="navbar-link logout-btn">
//       <FaSignOutAlt className="logout-icon" /> 
//       <span>Logout</span>
//     </button>
//   );
// };

// const formatTimeLeft = (seconds) => {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;
//   return `${hrs}h ${mins}m ${secs}s`;
// };

// const HomeReservasi = () => {
//   const [queue, setQueue] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchQueue = async () => {
//       try {
//         const res = await axios.get("https://backend-rpic-production.up.railway.app/api/booking/active");
//         const now = new Date();
//         const dataWithCountdown = res.data.map(item => {
//           const endTime = new Date(item.end_time);
//           const secondsLeft = Math.max(0, Math.floor((endTime - now) / 1000));
//           return {
//             ...item,
//             countdown: secondsLeft,
//           };
//         });
//         setQueue(dataWithCountdown);
//       } catch (err) {
//         console.error('Gagal mengambil data antrian:', err);
//       }
//     };

//     fetchQueue();
//     const interval = setInterval(fetchQueue, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setQueue(prevQueue =>
//         prevQueue.map(item => ({
//           ...item,
//           countdown: Math.max(0, item.countdown - 1),
//         }))
//       );
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(prev => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMenuOpen && !event.target.closest('.navbar-container')) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   return (
//     <div className="app-container">
//       <nav className="navbar">
//         <div className="navbar-container">
//           <div className="navbar-brand">
//             <img src="/favicon.ico" alt="Logo" className="navbar-logo" />
//           </div>

//           <button 
//             className="navbar-toggle" 
//             onClick={toggleMenu}
//             aria-label="Toggle navigation menu"
//           >
//             {isMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
//             <li className="navbar-item">
//               <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
//                 Profile
//               </Link>
//             </li>
//             <li className="navbar-item">
//               <Link to="/homereservasi" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
//                 Home
//               </Link>
//             </li>
//             <li className="navbar-item">
//               <Link to="/history" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
//                 History
//               </Link>
//             </li>
//             <li className="navbar-item">
//               <LogoutButton />
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <main className="main-content">
//         <div className="home-content">
//           <h1 className="main-title">Select Your PC Type</h1>
          
//           <div className="pc-selection-container">
//             <div className="pc-cards-wrapper">
//               {/* Alpha PC */}
//               <div className="pc-card">
//                 <div className="card-header">
//                   <h3 className="card-title">Alpha PC</h3>
//                   <div className="progress-bar">
//                     <div className="progress-fill"></div>
//                   </div>
//                 </div>
//                 <Link to="/alphapage" className="card-link">
//                   <div className="card-image-container">
//                     <img src="/img/imgDashboard/alpha.png" alt="Alpha PC" className="card-image" />
//                   </div>
//                 </Link>
//                 <div className="card-content">
//                   <p className="card-description">High-performance PC for ultimate gaming experience.</p>
//                 </div>
//               </div>

//               {/* Beta PC */}
//               <div className="pc-card">
//                 <div className="card-header">
//                   <h3 className="card-title">Beta PC</h3>
//                   <div className="progress-bar">
//                     <div className="progress-fill"></div>
//                   </div>
//                 </div>
//                 <Link to="/betapage" className="card-link">
//                   <div className="card-image-container">
//                     <img src="/img/imgDashboard/beta.png" alt="Beta PC" className="card-image" />
//                   </div>
//                 </Link>
//                 <div className="card-content">
//                   <p className="card-description">Balanced performance for all-around use.</p>
//                 </div>
//               </div>

//               {/* Driving Simulator */}
//               <div className="pc-card">
//                 <div className="card-header">
//                   <h3 className="card-title">Driving Simulator</h3>
//                   <div className="progress-bar">
//                     <div className="progress-fill"></div>
//                   </div>
//                 </div>
//                 <Link to="/drivingsimulator" className="card-link">
//                   <div className="card-image-container">
//                     <img src="/img/imgDashboard/drivesimulator.png" alt="Driving Simulator" className="card-image" />
//                   </div>
//                 </Link>
//                 <div className="card-content">
//                   <p className="card-description">Realistic driving experience with state-of-the-art simulator.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <section className="price-section">
//             <h2 className="section-title">PRICE LIST</h2>
//             <div className="price-list-container">
//               <div className="price-card">
//                 <img src="/img/pricelistAlphaBeta.png" alt="Alpha & Beta PC Price List" className="price-image" />
//               </div>
//               <div className="price-card">
//                 <img src="/img/pricelistDrivingSimulator.png" alt="Driving Simulator Price List" className="price-image" />
//               </div>
//             </div>
//           </section>

//           <section className="booking-queue-section">
//             <h2 className="section-title">📋 Antrian Booking Saat Ini</h2>
//             <div className="queue-container">
//               {queue.length === 0 ? (
//                 <div className="empty-queue">
//                   <p>Tidak ada booking aktif saat ini.</p>
//                 </div>
//               ) : (
//                 <div className="queue-list">
//                   {queue.map((item, index) => (
//                     <div key={index} className="queue-item">
//                       <div className="queue-info">
//                         <span className="queue-user">User: {item.userName || "User"}</span>
//                         <span className="queue-pc">Tipe: {item.pcType}</span>
//                         <span className="queue-pc">PC: {item.pc_number}</span>
//                       </div>
//                       <div className="queue-countdown">
//                         ⏳ {formatTimeLeft(item.countdown)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomeReservasi;
