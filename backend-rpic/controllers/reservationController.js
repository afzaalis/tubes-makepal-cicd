const db = require('../db');

const validatePCs = async (selectedPCs) => {
  const pcIds = selectedPCs.map(pc => pc.pcId); // Sesuaikan key sesuai JSON
  const placeholders = pcIds.map(() => '?').join(',');
  const query = `SELECT id, status FROM pcs WHERE id IN (${placeholders}) AND status = 'available'`;
  return new Promise((resolve, reject) => {
    db.query(query, pcIds, (err, results) => {
      if (err) return reject(err);
      resolve(results.length === selectedPCs.length); // Pastikan semua PC tersedia
    });
  });
};

// Example endpoint
const reservePCs = async (req, res) => {
  const { selectedPCs } = req.body;

  try {
    const areValid = await validatePCs(selectedPCs);
    if (!areValid) {
      return res.status(400).json({ message: 'Some PCs are not available' });
    }

    // Lanjutkan proses reservasi
    res.status(200).json({ message: 'Reservation successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  reservePCs,
};
