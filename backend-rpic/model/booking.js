const db = require('../db');

const Booking = {
  createBooking: async (userId, pcId, startTime, endTime, totalPrice, type) => {
    const query = `
      INSERT INTO bookings 
      (user_id, pc_id, start_time, end_time, total_price, status, created_at, updated_at, type)
      VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW(), ?)
    `;
    const [result] = await db.execute(query, [
      userId, pcId, startTime, endTime, totalPrice, type
    ]);
    return result.insertId;
  },

  getAllBookings: async () => {
    const [rows] = await db.query(`
      SELECT b.*, u.name AS user_name, p.pc_number, p.type AS pc_type
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN pcs p ON b.pc_id = p.id
      ORDER BY b.created_at DESC
    `);
    return rows;
  },

getBookingsByUserId: async (userId) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         b.id AS booking_id,
         b.start_time,
         b.end_time,
         b.total_price,
         b.status,
         b.created_at,
         b.type,
         b.payment_method,
         pcs.pc_number,
         pt.name AS pc_type
       FROM bookings b
       JOIN pcs ON b.pc_id = pcs.id
       JOIN pc_types pt ON pcs.pc_type_id = pt.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );

    // Map untuk mengelompokkan hasil berdasarkan booking_id
    const bookingsMap = new Map();

    for (const row of rows) {
      if (!bookingsMap.has(row.booking_id)) {
        bookingsMap.set(row.booking_id, {
          id: row.booking_id,
          start_time: row.start_time,
          end_time: row.end_time,
          total_price: row.total_price,
          status: row.status,
          created_at: row.created_at,
          type: row.type,
          payment_method: row.payment_method,
          selected_pcs: [],
        });
      }
      bookingsMap.get(row.booking_id).selected_pcs.push({
        pc_number: row.pc_number,
        type: row.pc_type,
        start_time: row.start_time,
        end_time: row.end_time,
        hours: (new Date(row.end_time) - new Date(row.start_time)) / 3600000,
        price: row.total_price 
      });
    }

    return Array.from(bookingsMap.values());

  } catch (err) {
    throw err;
  }
},


  updatePaymentStatus: async (bookingId, paymentStatus, paymentMethod) => {
    const [result] = await db.execute(`
      UPDATE bookings
      SET status = ?, payment_method = ?, updated_at = NOW()
      WHERE id = ?
    `, [paymentStatus, paymentMethod, bookingId]);
    return result.affectedRows > 0;
  }
};


module.exports = Booking;
