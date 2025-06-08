// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; 
// import './login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//     } else if (password.length < 8) {
//       setError("Password must be at least 8 characters.");
//     } else {
//       setError("");
//       setLoading(true);
  
//       try {
//         // Kirim request login ke backend
//         const response = await axios.post("https://backend-rpic-production.up.railway.app/api/auth/login", {
//           email: email,
//           password: password,
//         });
  
//         // Jika login berhasil, simpan token, user_id, dan data pengguna di localStorage
//         const { token, user } = response.data; 
//         console.log('Login successful:', response.data);
        
//         // Menyimpan data ke localStorage
//         localStorage.setItem('token', token); 
//         localStorage.setItem('userId', user.id); 
//         localStorage.setItem('role', user.role);  // Menyimpan role
//         localStorage.setItem('user', JSON.stringify(user)); // Menyimpan data pengguna dalam bentuk string JSON
        
  
//         // Check user role and navigate accordingly
//         if (user.role === 'admin') {
//           navigate('/homeadmin'); 
//         } else {
//           navigate('/homereservasi'); 
//         }
  
//         setLoading(false);
//       } catch (error) {
//         console.error("Error during login:", error);
//         setLoading(false);
//         setError("Login failed. Please try again.");
//       }
//     }
//   };
  
  

//   // const setCookie = (name, value, days) => {
//   //     const date = new Date();
//   //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//   //     document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
//   // };
//   // const getCookie = (name) => {
//   //   const cookies = document.cookie.split("; ");
//   //   for (let cookie of cookies) {
//   //       const [key, value] = cookie.split("=");
//   //       if (key === name) return value;
//   //   }
//   //   return null;
//   // };

//   // const deleteCookie = (name) => {
//   //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
//   // };
    
//   return (
//     <div className="login-outsideContainer">
//       <div className="login-container">
//         <h1>Login</h1>
//         <form id="login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               id="email"
//               placeholder="Example@email.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={{ backgroundColor: '#F7FBFF' }}
//             />
//           </div>
//           <div className="form-group">
//             {/* Display error message if any */}
//             <p id="error" style={{ color: 'red', fontSize: '10px' }}>
//               {error}
//             </p>
//             <input
//               type="password"
//               id="password"
//               placeholder="At least 8 characters"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ backgroundColor: '#F7FBFF' }}
//             />
//           </div>
//           <p className="forgot-password" style={{ textAlign: 'right' }}>
//             <a href="#">Forgot Password?</a>
//           </p>
//           <button className="btn-submit" type="submit" disabled={loading}>
//             {loading ? 'Logging in...' : 'Sign in'}
//           </button>
//         </form>
//         <div className="line-or">
//           <span style={{ color: 'white' }}>Or</span>
//         </div>
//         <p>
//           Don't you have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </div>
//       <div className="login-gambar">
//         <img src="/img/loginimg.jpg" alt="login" />
//       </div>
//     </div>
//   );
// };

// export default Login;
