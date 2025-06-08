const express = require("express");
const router = express.Router();
const Booking = require("../model/booking");
const db = require('../db'); 

router.post("/", async (req, res) => {
  try {
    const { userId, selectedPCs, totalPrice } = req.body;

    if (!userId || !Array.isArray(selectedPCs) || selectedPCs.length === 0) {
      return res.status(201).json({ message: "Booking berhasil", bookingIds });
    }

    let bookingIds = [];

  for (const pc of selectedPCs) {
    const startTime = new Date(pc.startTime);
    const endTime = new Date(startTime.getTime() + pc.hours * 60 * 60 * 1000);

    const bookingId = await Booking.createBooking(
      userId,
      pc.pc_id,
      startTime,
      endTime,
      pc.price,
      pc.type // ✅ tambahkan ini
    );

    bookingIds.push(bookingId);
  }


    res.status(201).json({ message: "Booking berhasil", bookingIds });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat melakukan booking" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error("Fetch all bookings error:", error);
    res.status(500).json({ error: "Gagal mengambil data booking" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.getBookingsByUserId(userId);
    res.json(bookings);
  } catch (error) {
    console.error("Fetch user bookings error:", error);
    res.status(500).json({ error: "Gagal mengambil data booking user" });
  }
});

//payment
// router.put('/bookings/:bookingId/payment', async (req, res) => {
//   const { bookingId } = req.params;
//   const { paymentStatus, paymentMethod } = req.body;

//   try {
//     const success = await Booking.updatePaymentStatus(bookingId, paymentStatus, paymentMethod);
//     if (!success) return res.status(404).json({ message: 'Booking not found' });
//     res.json({ message: 'Payment updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// routes/bookings.js

router.get('/history/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.getBookingsByUserId(userId);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch booking history' });
  }
});

/* ini buat active list*/
router.get('/active', async (req, res) => {
  try {
    const [results] = await db.execute(`
     SELECT 
        bookings.id,
        users.name AS userName,
        pc_types.name AS pcType,
        pcs.pc_number,          
        bookings.end_time
      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN pcs ON bookings.pc_id = pcs.id
      JOIN pc_types ON pcs.pc_type_id = pc_types.id
      WHERE bookings.status = 'confirmed'
      ORDER BY bookings.end_time ASC;

    `);
    res.json(results);
  } catch (err) {
    console.error('Gagal mengambil booking aktif:', err);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil booking aktif' });
  }
});

module.exports = router;
