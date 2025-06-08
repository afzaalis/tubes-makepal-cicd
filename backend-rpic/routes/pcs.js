const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua PC berdasarkan jenis (Alpha/Beta/Driving)
router.get('/:type', async (req, res) => {
  const pcTypeName = req.params.type; // misal 'Beta'
  try {
    const [rows] = await db.query(
      `SELECT pcs.id, pcs.pc_number, pc_types.name AS type,
       CASE WHEN bookings.id IS NULL THEN 1 ELSE 0 END AS available
       FROM pcs
       LEFT JOIN bookings ON pcs.id = bookings.pc_id AND bookings.status IN ('pending', 'confirmed')
       JOIN pc_types ON pcs.pc_type_id = pc_types.id
       WHERE pc_types.name = ?
       GROUP BY pcs.id`,
       [pcTypeName]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching PCs:', error);
    res.status(500).json({ message: 'Error fetching PCs' });
  }
});


// GET ketersediaan PC berdasarkan jenis dengan cek booking aktif
router.get('/availability/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT pcs.id, pcs.pc_number, pc_types.name AS type,
        CASE WHEN EXISTS (
          SELECT 1 FROM bookings
          WHERE bookings.pc_id = pcs.id
            AND bookings.status IN ('pending', 'confirmed')
            AND NOW() BETWEEN bookings.start_time AND bookings.end_time
        ) THEN 0 ELSE 1 END AS available
      FROM pcs
      JOIN pc_types ON pcs.pc_type_id = pc_types.id
      WHERE pc_types.name = ?
    `, [type]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching PC availability:', error);
    res.status(500).json({ error: 'Failed to get PC availability' });
  }
});






module.exports = router;
