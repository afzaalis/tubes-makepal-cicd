const { createBooking, addBookingDetails } = require('./model/booking');

// Fungsi untuk menambah booking baru
const addNewBooking = async (req, res) => {
  const { customerName, customerEmail, selectedPCs, totalPrice } = req.body;

  try {
    // Membuat booking baru
    const bookingData = await createBooking({ customerName, customerEmail, selectedPCs, totalPrice });
    
    // Menambahkan detail booking
    const bookingId = bookingData.insertId; // ID booking yang baru saja dibuat
    const bookingDetails = selectedPCs.map(pc => ({
      booking_id: bookingId,
      pc_id: pc.pcId,
      hours: pc.duration,
      price: pc.price
    }));
    
    // Menambahkan detail booking ke database
    await addBookingDetails(bookingDetails);

    res.status(201).json({ message: 'Booking and details added successfully', bookingId });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

module.exports = { addNewBooking };
