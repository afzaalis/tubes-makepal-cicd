const bcrypt = require('bcryptjs');

// Simulasi password dari frontend
const password = '123';

// Simulasi hash dari database
const hashFromDatabase = '$2a$10$JtjKaQfJDNI2sotSqjTF.uPqP3ZA.FIamv5pOs0PeV6KgBuVHsh1K';

console.log('Password to test:', password);
console.log('Hash from database:', hashFromDatabase);

// Test hashing ulang dengan format $2a
bcrypt.hash(password, 10, (err, newHash) => {
  if (err) return console.error('Error generating hash:', err);

  console.log('New hash generated:', newHash);

  // Compare plaintext password with hash from DB
  bcrypt.compare(password, hashFromDatabase, (err, isMatch) => {
    if (err) return console.error('Error during comparison:', err);
    if (isMatch) {
      console.log('Password matches the hash!');
    } else {
      console.log('Password mismatch!');
    }
  });
});
