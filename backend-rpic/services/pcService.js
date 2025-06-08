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

module.exports = {
  validatePCs,
};
