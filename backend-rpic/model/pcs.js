const db = require('../db');

// Ambil semua PC dengan tipe tertentu
const getPCsByType = async (typeName) => {
  const [rows] = await db.query(
    `SELECT pcs.id, pcs.pc_number, pcs.pc_type_id, pc_types.name AS type
     FROM pcs
     JOIN pc_types ON pcs.pc_type_id = pc_types.id
     WHERE pc_types.name = ?`,
    [typeName]
  );
  return rows;
};

// Ambil semua PC yang sedang dibooking (status pending/confirmed)
const getBookedPCs = async () => {
  const [rows] = await db.query(
    `SELECT pcs.pc_number
     FROM bookings
     JOIN pcs ON bookings.pc_id = pcs.id
     WHERE bookings.status IN ('pending', 'confirmed')
       AND NOW() BETWEEN bookings.start_time AND bookings.end_time`
  );
  return rows.map(row => row.pc_number);
};

module.exports = {
  getPCsByType,
  getBookedPCs
};
