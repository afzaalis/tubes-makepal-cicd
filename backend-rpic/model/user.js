const db = require('../db'); 

// Get user by email
const getUserByEmail = async (email, callback) => {
  try {
    const [results] = await db.query('SELECT id, name, email, password, role FROM users WHERE email = ?', [email]);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  } catch (err) {
    console.error('Database query error:', err);
    callback(err);
  }
};

// Get user by ID
const getUserById = async (id, callback) => {
  try {
    const [results] = await db.query('SELECT id, name, email, phone FROM users WHERE id = ?', [id]);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  } catch (err) {
    console.error('Database query error:', err);
    callback(err);
  }
};

// Update user by ID
const updateUserById = async (userId, userData, callback) => {
  const { name, email, phone } = userData;
  try {
    await db.query('UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, userId]);
    callback(null, { id: userId, name, email, phone });
  } catch (err) {
    callback(err);
  }
};

// Add new user
const addUser = async (user, callback) => {
  const { name, email, password, role } = user;
  try {
    const [results] = await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
    callback(null, results);
  } catch (err) {
    console.error('Error inserting user into database:', err);
    callback(err);
  }
};

module.exports = { getUserByEmail, addUser, getUserById, updateUserById };
