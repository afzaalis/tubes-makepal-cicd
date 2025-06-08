const request = require('supertest');
const express = require('express');
const bookingRoutes = require('../routes/booking'); 

// Mock dependencies
jest.mock('../model/booking');
jest.mock('../db', () => ({
  execute: jest.fn().mockResolvedValue([[]]),
}));

const Booking = require('../model/booking');
const db = require('../db');

const app = express();
app.use(express.json());
app.use('/booking', bookingRoutes); // GANTI: bookings → booking

describe('Booking Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /booking should create booking(s)', async () => {
    Booking.createBooking.mockResolvedValueOnce(123);

    const res = await request(app).post('/booking').send({
      userId: 1,
      selectedPCs: [{
        pc_id: 2,
        startTime: '2025-06-01T10:00:00Z',
        hours: 2,
        price: 20000,
        type: 'Alpha'
      }],
      totalPrice: 20000
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Booking berhasil");
    expect(Array.isArray(res.body.bookingIds)).toBe(true);
  });

  test('GET /booking should return all bookings', async () => {
    const dummyBookings = [{ id: 1, user_id: 2 }];
    Booking.getAllBookings.mockResolvedValue(dummyBookings);

    const res = await request(app).get('/booking');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(dummyBookings);
  });

  test('GET /booking/user/:userId should return user bookings', async () => {
    const dummyBookings = [{ id: 2, user_id: 1 }];
    Booking.getBookingsByUserId.mockResolvedValue(dummyBookings);

    const res = await request(app).get('/booking/user/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(dummyBookings);
  });


  test('GET /booking/history/:userId should return user booking history', async () => {
    const dummy = [{ id: 9, user_id: 2 }];
    Booking.getBookingsByUserId.mockResolvedValue(dummy);

    const res = await request(app).get('/booking/history/2');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(dummy);
  });

  test('GET /booking/active should return active bookings', async () => {
    const dummyActiveBookings = [{
      id: 1,
      userName: 'Alice',
      pcType: 'Alpha',
      pc_number: 'Alpha-01',
      end_time: '2025-06-01T12:00:00Z'
    }];
    db.execute.mockResolvedValueOnce([dummyActiveBookings]);

    const res = await request(app).get('/booking/active');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(dummyActiveBookings);
  });
});
