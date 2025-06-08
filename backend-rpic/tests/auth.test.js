const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const bodyParser = require('body-parser');

// Mock model/user
jest.mock('../model/user', () => ({
  getUserByEmail: jest.fn(),
  addUser: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn()
}));

const { getUserByEmail, addUser, getUserById, updateUserById } = require('../model/user');

// Setup Express app
const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

describe('Auth API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /auth/signup - success', async () => {
    getUserByEmail.mockImplementation((email, cb) => cb(null, null)); // email not taken
    addUser.mockImplementation((user, cb) => cb(null, { id: 1 }));

    const response = await request(app)
      .post('/auth/signup')
      .send({ name: 'Iki', email: 'iki@example.com', password: 'password123' });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  test('POST /auth/signup - email already taken', async () => {
    getUserByEmail.mockImplementation((email, cb) => cb(null, { id: 2 }));

    const response = await request(app)
      .post('/auth/signup')
      .send({ name: 'Iki', email: 'iki@example.com', password: 'password123' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email already taken');
  });
});
