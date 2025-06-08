// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'; // Impor Axios
// import './signup.css'; 

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fungsi untuk menangani form submit
//   const handleSubmit = (e) => {
//     e.preventDefault(); 

//     // Reset error dan success sebelumnya
//     setError('');
//     setSuccessMessage('');

//     // Validasi input
//     if (!username || !email || !password || !confirmPassword) {
//       setError('Please fill in all fields.');
//     } else if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//     } else if (password.length < 8) {
//       setError('Password must be at least 8 characters.');
//     } else {
//       // Kirim data ke backend
//       axios.post('https://backend-rpic-production.up.railway.app/api/auth/signup', {
//         // axios.post('http://localhost:3000/api/auth/signup', {
//         name: username,
//         email: email,
//         password: password
//       })
//       .then((response) => {
//         // Respons sukses
//         console.log('Signup successful:', response.data);
//         setSuccessMessage('Signup successful! Please log in.');
        
//         // Reset form setelah signup berhasil
//         setUsername('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//       })
//       .catch((error) => {
//         // Tangani error dari API
//         console.error('Error during signup:', error.response ? error.response.data : error);
//         if (error.response && error.response.data) {
//           setError(error.response.data.message || 'Something went wrong.');
//         } else {
//           setError('Error connecting to the server.');
//         }
//       });
//     }
//   };

//   return (
//     <div className="signup-outsideContainer">
//       <div className="signup-container">
//         <h1>Sign Up</h1>
//         <form id="signupForm" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             id="email"
//             placeholder="Example@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             id="password"
//             placeholder="At least 8 characters"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <p id="error" style={{ color: 'red', fontSize: '10px' }}>
//             {error}
//           </p>
//           <input
//             type="password"
//             id="confirmPassword"
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           <button className="btn-submit" type="submit">
//             Sign up
//           </button>
//         </form>
//         <div className="line-or">
//           <span>Or</span>
//         </div>
//         <p>
//         Already have an account? <Link to="/login">Login</Link>
//         </p>
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </div>
//       <div className="signup-gambar">
//         <img src="/img/mod2.jpg" alt="signup image" />
//       </div>
//     </div>
//   );
// };

// export default Signup;
